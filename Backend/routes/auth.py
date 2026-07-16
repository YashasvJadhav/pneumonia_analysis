from flask import Blueprint, request, jsonify

from database import db, bcrypt
from models import User

from datetime import datetime

auth_bp = Blueprint("auth", __name__)




@auth_bp.route("/api/register", methods=["POST"])
def register():

    data = request.get_json()

    first_name = data.get("first_name")
    last_name = data.get("last_name")
    gender = data.get("gender")
    date_of_birth = data.get("date_of_birth")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")

    # Check existing user
    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            "success": False,
            "message": "Email already registered."
        }), 400

    hashed_password = bcrypt.generate_password_hash(
        password
    ).decode("utf-8")

    new_user = User(
        first_name=first_name,
        last_name=last_name,
        gender=gender,
        date_of_birth=datetime.strptime(
            date_of_birth,
            "%Y-%m-%d"
        ).date(),
        email=email,
        phone=phone,
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Registration Successful"
    }), 201


@auth_bp.route("/api/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(
        email=email
    ).first()

    if not user:

        return jsonify({
            "success": False,
            "message": "Invalid Email"
        }), 401

    if not bcrypt.check_password_hash(
        user.password,
        password
    ):

        return jsonify({
            "success": False,
            "message": "Invalid Password"
        }), 401

    return jsonify({

        "success": True,

        "message": "Login Successful",

        "user": {

            "id": user.id,

            "first_name": user.first_name,

            "last_name": user.last_name,

            "email": user.email

        }

    }), 200