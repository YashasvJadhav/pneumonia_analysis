import os
import uuid

from flask import Blueprint, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename

from database import db
from models import Upload
from services.prediction_service import predict_xray, generate_gradcam

upload_bp = Blueprint("upload", __name__)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}


def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower()
        in ALLOWED_EXTENSIONS
    )


@upload_bp.route("/api/upload", methods=["POST"])
def upload_xray():

    if "image" not in request.files:
        return jsonify({
            "success": False,
            "message": "No image provided"
        }), 400

    image = request.files["image"]
    user_id = request.form.get("user_id")

    if not user_id:
        return jsonify({
            "success": False,
            "message": "User ID is required"
        }), 400

    if image.filename == "":
        return jsonify({
            "success": False,
            "message": "No image selected"
        }), 400

    if not allowed_file(image.filename):
        return jsonify({
            "success": False,
            "message": "Only JPG, JPEG and PNG files are allowed"
        }), 400

    original_filename = secure_filename(image.filename)

    unique_filename = (
        f"{uuid.uuid4().hex}_{original_filename}"
    )

    upload_folder = os.path.join(
        os.path.dirname(os.path.dirname(__file__)),
        "uploads"
    )

    os.makedirs(upload_folder, exist_ok=True)

    image_path = os.path.join(
        upload_folder,
        unique_filename
    )

    # 1. Save the uploaded X-ray
    image.save(image_path)

    try:
        # 2. Run DenseNet121 prediction
        result = predict_xray(image_path)

        # Generate Grad-CAM Heatmap
        heatmap_filename = f"gradcam_{unique_filename}"
        heatmap_save_path = os.path.join(upload_folder, heatmap_filename)
        gradcam_success = generate_gradcam(image_path, heatmap_save_path)

        # 3. Create database record with prediction and heatmap
        new_upload = Upload(
            user_id=int(user_id),
            image_name=original_filename,
            image_path=image_path,
            prediction=result["prediction"],
            confidence=result["confidence"],
            heatmap_path=heatmap_save_path if gradcam_success else None
        )

        # 4. Save everything to PostgreSQL
        db.session.add(new_upload)
        db.session.commit()

        # 5. Return result to React
        return jsonify({
            "success": True,
            "message": "X-Ray analyzed successfully",
            "upload": {
                "id": new_upload.id,
                "image_name": new_upload.image_name,
                "image_url": f"/api/uploads/{os.path.basename(new_upload.image_path)}",
                "heatmap_url": f"/api/uploads/{os.path.basename(new_upload.heatmap_path)}" if new_upload.heatmap_path else None,
                "prediction": new_upload.prediction,
                "confidence": new_upload.confidence,
                "raw_score": result["raw_score"]
            }
        }), 201

    except Exception as error:

        db.session.rollback()

        print("Prediction error:", error)

        return jsonify({
            "success": False,
            "message": "X-Ray prediction failed",
            "error": str(error)
        }), 500


@upload_bp.route("/api/uploads/<filename>", methods=["GET"])
def serve_upload(filename):
    upload_folder = os.path.join(
        os.path.dirname(os.path.dirname(__file__)),
        "uploads"
    )
    return send_from_directory(upload_folder, filename)