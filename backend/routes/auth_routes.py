from flask import Blueprint, request, jsonify
from config import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from bson import ObjectId
import datetime

auth_bp = Blueprint("auth", __name__)
users = db["users"]

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    fullname = data.get("fullname")
    email = data.get("email")
    password = data.get("password")

    if users.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 400

    users.insert_one({
        "fullname": fullname,
        "email": email,
        "password": password
    })
    return jsonify({"message": "User registered successfully"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = users.find_one({"email": email, "password": password})
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(
        identity=str(user["_id"]),
        expires_delta=datetime.timedelta(hours=2)
    )

    return jsonify({
        "message": "Login successful",
        "token": access_token,
        "user": {"_id": str(user["_id"]), "fullname": user["fullname"], "email": user["email"]}
    }), 200



