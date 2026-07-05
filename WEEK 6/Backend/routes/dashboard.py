from flask import Blueprint, jsonify

from models import Upload


dashboard_bp = Blueprint("dashboard", __name__)


# =========================================================
# DASHBOARD API
# Summary statistics + latest 5 analyses
# =========================================================

@dashboard_bp.route(
    "/api/dashboard/<int:user_id>",
    methods=["GET"]
)
def get_dashboard(user_id):

    user_uploads = Upload.query.filter_by(
        user_id=user_id
    )

    total_analyses = user_uploads.count()

    normal_count = user_uploads.filter_by(
        prediction="NORMAL"
    ).count()

    pneumonia_count = user_uploads.filter_by(
        prediction="PNEUMONIA"
    ).count()

    recent_uploads = (
        Upload.query
        .filter_by(user_id=user_id)
        .order_by(Upload.uploaded_at.desc())
        .limit(5)
        .all()
    )

    recent_analyses = []

    for upload in recent_uploads:
        recent_analyses.append({
            "id": upload.id,
            "image_name": upload.image_name,
            "prediction": upload.prediction,
            "confidence": upload.confidence,
            "uploaded_at": (
                upload.uploaded_at.isoformat()
                if upload.uploaded_at
                else None
            )
        })

    return jsonify({
        "success": True,
        "total_analyses": total_analyses,
        "normal_count": normal_count,
        "pneumonia_count": pneumonia_count,
        "recent_analyses": recent_analyses
    }), 200


# =========================================================
# ANALYSIS HISTORY API
# Complete history for one user
# =========================================================

@dashboard_bp.route(
    "/api/history/<int:user_id>",
    methods=["GET"]
)
def get_analysis_history(user_id):

    uploads = (
        Upload.query
        .filter_by(user_id=user_id)
        .order_by(Upload.uploaded_at.desc())
        .all()
    )

    analyses = []

    for upload in uploads:
        analyses.append({
            "id": upload.id,
            "image_name": upload.image_name,
            "prediction": upload.prediction,
            "confidence": upload.confidence,
            "uploaded_at": (
                upload.uploaded_at.isoformat()
                if upload.uploaded_at
                else None
            )
        })

    return jsonify({
        "success": True,
        "total_analyses": len(analyses),
        "analyses": analyses
    }), 200


# =========================================================
# SINGLE ANALYSIS RESULT API
# Securely returns one analysis belonging to one user
# =========================================================

@dashboard_bp.route(
    "/api/analysis/<int:analysis_id>/<int:user_id>",
    methods=["GET"]
)
def get_analysis_result(analysis_id, user_id):

    upload = Upload.query.filter_by(
        id=analysis_id,
        user_id=user_id
    ).first()

    if not upload:
        return jsonify({
            "success": False,
            "message": "Analysis not found"
        }), 404

    return jsonify({
        "success": True,
        "analysis": {
            "id": upload.id,
            "image_name": upload.image_name,
            "prediction": upload.prediction,
            "confidence": upload.confidence,
            "uploaded_at": (
                upload.uploaded_at.isoformat()
                if upload.uploaded_at
                else None
            )
        }
    }), 200