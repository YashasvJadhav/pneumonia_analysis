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