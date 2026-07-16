from flask import Blueprint, request, jsonify

from database import db
from models import User


profile_bp = Blueprint("profile", __name__)


@profile_bp.route("/api/profile/<int:user_id>", methods=["GET"])
def get_profile(user_id):

    user = db.session.get(User, user_id)

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found"
        }), 404

    return jsonify({
        "success": True,
        "user": {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone": user.phone,
            "gender": user.gender,
            "date_of_birth": (
                user.date_of_birth.isoformat()
                if user.date_of_birth
                else None
            )
        }
    }), 200


from datetime import datetime

@profile_bp.route("/api/profile/<int:user_id>", methods=["PUT"])
def update_profile(user_id):
    user = db.session.get(User, user_id)

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found"
        }), 404

    data = request.get_json()
    if not data:
        return jsonify({
            "success": False,
            "message": "No data provided"
        }), 400

    first_name = data.get("first_name")
    last_name = data.get("last_name")
    gender = data.get("gender")
    date_of_birth = data.get("date_of_birth")
    phone = data.get("phone")

    if not first_name or not last_name:
        return jsonify({
            "success": False,
            "message": "First name and last name are required"
        }), 400

    user.first_name = first_name
    user.last_name = last_name
    user.gender = gender
    user.phone = phone

    if date_of_birth:
        try:
            user.date_of_birth = datetime.strptime(
                date_of_birth,
                "%Y-%m-%d"
            ).date()
        except ValueError:
            return jsonify({
                "success": False,
                "message": "Invalid date of birth format. Use YYYY-MM-DD."
            }), 400
    else:
        user.date_of_birth = None

    try:
        db.session.commit()
        return jsonify({
            "success": True,
            "message": "Profile updated successfully",
            "user": {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "phone": user.phone,
                "gender": user.gender,
                "date_of_birth": (
                    user.date_of_birth.isoformat()
                    if user.date_of_birth
                    else None
                )
            }
        }), 200
    except Exception as error:
        db.session.rollback()
        return jsonify({
            "success": False,
            "message": "Failed to update profile",
            "error": str(error)
        }), 500