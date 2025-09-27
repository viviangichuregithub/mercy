from functools import wraps
from flask import request, jsonify, current_app
import jwt
from models.user import User

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        # JWT comes from the Authorization header
        if "Authorization" in request.headers:
            auth_header = request.headers["Authorization"]
            if auth_header.startswith("Bearer "):
                token = auth_header.split(" ")[1]

        if not token:
            return jsonify({"error": "Token is missing"}), 401

        try:
            data = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            current_user = User.query.get(data["user_id"])
            if not current_user:
                raise Exception("User not found")
        except Exception as e:
            return jsonify({"error": "Token is invalid"}), 401

        # Pass current_user to the route
        return f(current_user, *args, **kwargs)

    return decorated