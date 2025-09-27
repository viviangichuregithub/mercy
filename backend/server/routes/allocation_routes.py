from flask import Blueprint, request, jsonify
from server.extensions import db
from server.models.allocation import Allocation
from server.schemas.allocation_schema import AllocationSchema
from marshmallow import ValidationError

# Blueprint
allocation_bp = Blueprint("allocation_bp", __name__)
allocation_schema = AllocationSchema()
allocations_schema = AllocationSchema(many=True)

# -------------------------
# Get all allocations
# -------------------------
@allocation_bp.route("/", methods=["GET"])
def get_allocations():
    allocations = Allocation.query.all()
    return allocations_schema.dump(allocations), 200

# -------------------------
# Create an allocation
# -------------------------
@allocation_bp.route("/", methods=["POST"])
def create_allocation():
    data = request.get_json()
    try:
        validated = allocation_schema.load(data)
    except ValidationError as err:
        return jsonify(err.messages), 400

    new_allocation = Allocation(**validated)
    db.session.add(new_allocation)
    db.session.commit()
    return allocation_schema.dump(new_allocation), 201

# -------------------------
# Delete an allocation
# -------------------------
@allocation_bp.route("/<int:id>", methods=["DELETE"])
def delete_allocation(id):
    allocation = Allocation.query.get_or_404(id)
    db.session.delete(allocation)
    db.session.commit()
    return jsonify({"message": "Allocation deleted"}), 200