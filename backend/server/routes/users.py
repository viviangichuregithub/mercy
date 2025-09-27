from flask import request, jsonify, session, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from server.models import User, db
from datetime import datetime

# Make sure you have set a secret key in your Flask app:
# app.secret_key = "super-secret-key"   # in run.py or __init__.py

@users_bp.route("/", methods=["POST"])
def create_user():
    data = request.get_json()

    # Clean input
    username = data.get("username", "").strip()
    email = data.get("email", "").strip()
    password = data.get("password")
    role = data.get("role", "user")

    if not username or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    # Check duplicates
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already taken"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400

    # Hash password
    hashed_password = generate_password_hash(password)

    # Create user
    new_user = User(
        username=username,
        email=email,
        password_hash=hashed_password,
        role=role,
        created_at=datetime.utcnow(),
    )
    db.session.add(new_user)
    db.session.commit()

    # Set session cookie
    session["user_id"] = new_user.id
    session["username"] = new_user.username
    session["role"] = new_user.role

    resp = make_response(jsonify({"message": "User created and logged in"}), 201)
    resp.set_cookie("username", new_user.username, httponly=True, samesite="Lax")
    return resp


@users_bp.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()
    username = data.get("username", "").strip()
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid username or password"}), 401

    # Set session
    session["user_id"] = user.id
    session["username"] = user.username
    session["role"] = user.role

    resp = make_response(jsonify({"message": "Login successful"}), 200)
    resp.set_cookie("username", user.username, httponly=True, samesite="Lax")
    return resp


@users_bp.route("/logout", methods=["POST"])
def logout_user():
    session.clear()
    resp = make_response(jsonify({"message": "Logged out"}), 200)
    resp.delete_cookie("username")
    return resp


@users_bp.route("/me", methods=["GET"])
def get_current_user():
    """Check who is logged in"""
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Not logged in"}), 401

    user = User.query.get(user_id)
    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role,
    }), 200
