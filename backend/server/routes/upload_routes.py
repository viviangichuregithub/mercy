from flask import Blueprint, request, jsonify
from server.extensions import db
from server.models.upload import Upload
from server.schemas.upload_schema import UploadSchema
from marshmallow import ValidationError

# Blueprint
upload_bp = Blueprint("upload_bp", __name__)
upload_schema = UploadSchema()
uploads_schema = UploadSchema(many=True)

# -------------------------
# Get all uploads
# -------------------------
@upload_bp.route("/uploads", methods=["GET"])
@upload_bp.route("/uploads/", methods=["GET"])  # allow trailing slash
def get_uploads():
    user_id = request.args.get("user_id")
    query = Upload.query
    if user_id:
        query = query.filter_by(user_id=user_id)
    uploads = query.all()
    return uploads_schema.dump(uploads), 200

# -------------------------
# Create a new upload
# -------------------------
@upload_bp.route("/uploads", methods=["POST"])
def create_upload():
    data = request.get_json()
    try:
        validated = upload_schema.load(data)
    except ValidationError as err:
        return jsonify(err.messages), 400

    new_upload = Upload(**validated)
    db.session.add(new_upload)
    db.session.commit()
    return upload_schema.dump(new_upload), 201

# -------------------------
# Delete an upload
# -------------------------
@upload_bp.route("/uploads/<int:id>", methods=["DELETE"])
def delete_upload(id):
    upload = Upload.query.get_or_404(id)
    db.session.delete(upload)
    db.session.commit()
    return jsonify({"message": "Upload deleted"}), 200

"""
from flask import Blueprint, request, jsonify
from server.extensions import db
from server.models.upload import Upload
from server.schemas.upload_schema import UploadSchema
#from server.models.schemas.upload_schema import UploadSchema

upload_bp = Blueprint('upload_bp', __name__)
upload_schema = UploadSchema()
uploads_schema = UploadSchema(many=True)

@upload_bp.route('/uploads', methods=['POST'])
def create_upload():
    data = request.get_json()
    validated = upload_schema.load(data)
    new_upload = Upload(**validated)
    db.session.add(new_upload)
    db.session.commit()
    return upload_schema.dump(new_upload), 201

@upload_bp.route('/uploads', methods=['GET'])
def get_uploads():
    uploads = Upload.query.all()
    return uploads_schema.dump(uploads), 200

@upload_bp.route('/uploads/<int:id>', methods=['DELETE'])
def delete_upload(id):
    upload = Upload.query.get_or_404(id)
    db.session.delete(upload)
    db.session.commit()
    return jsonify({"message": "Upload deleted"}), 200
"""