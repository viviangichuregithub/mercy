from flask import Flask
from flask_cors import CORS
from .extensions import db, ma, migrate
from .config import Config

# Blueprints
from server.routes.users import users_bp
from server.routes.upload_routes import upload_bp
from server.routes.allocation_routes import allocation_bp
from server.routes.storage_nodes_bp import storage_nodes_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS
    CORS(app)

    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints
    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(upload_bp, url_prefix="/api")
    app.register_blueprint(allocation_bp, url_prefix="/api/allocations")
    app.register_blueprint(storage_nodes_bp, url_prefix="/api/storage-nodes")

    # Health check endpoint
    @app.route("/")
    def health_check():
        return {
            "status": "healthy",
            "message": "Community Data Storage Hub API is running!",
            "version": "1.0.0",
            "endpoints": {
                "users": "/api/users/",
                "storage_nodes": "/api/storage-nodes/",
                "uploads": "/api/uploads",
                "allocations": "/api/allocations/",
            },
        }

    return app


__all__ = ["create_app", "db"]
