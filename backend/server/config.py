import os


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "devkey")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///db.sqlite3")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Fix PostgreSQL URL format for SQLAlchemy 1.4+
    if os.getenv("FLASK_ENV") == "production":
        database_url = os.getenv("DATABASE_URL")
        if database_url and database_url.startswith("postgres://"):
            SQLALCHEMY_DATABASE_URI = database_url.replace(
                "postgres://", "postgresql://", 1
            )
