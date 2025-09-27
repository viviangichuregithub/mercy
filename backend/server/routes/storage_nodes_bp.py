from flask import Blueprint, request, jsonify
from server.extensions import db
from server.models.storage_node import StorageNode
from server.schemas.storage_node_schema import StorageNodeSchema
from marshmallow import ValidationError

storage_nodes_bp = Blueprint("storage_nodes", __name__)
storage_node_schema = StorageNodeSchema()
storage_nodes_schema = StorageNodeSchema(many=True)

@storage_nodes_bp.route("/", methods=["GET"])
def get_storage_nodes():
    nodes = StorageNode.query.all()
    return jsonify(storage_nodes_schema.dump(nodes))

@storage_nodes_bp.route("/", methods=["POST"])
def create_storage_node():
    data = request.get_json()
    try:
        validated = storage_node_schema.load(data)
    except ValidationError as err:
        return jsonify(err.messages), 400

    new_node = StorageNode(**validated)
    db.session.add(new_node)
    db.session.commit()
    return storage_node_schema.dump(new_node), 201

@storage_nodes_bp.route("/<int:id>", methods=["GET"])
def get_storage_node(id):
    node = StorageNode.query.get_or_404(id)
    return storage_node_schema.dump(node)

@storage_nodes_bp.route("/<int:id>", methods=["PUT"])
def update_storage_node(id):
    node = StorageNode.query.get_or_404(id)
    data = request.get_json()
    
    try:
        validated = storage_node_schema.load(data, partial=True)
    except ValidationError as err:
        return jsonify(err.messages), 400

    for key, value in validated.items():
        setattr(node, key, value)
    
    db.session.commit()
    return storage_node_schema.dump(node)

@storage_nodes_bp.route("/<int:id>", methods=["DELETE"])
def delete_storage_node(id):
    node = StorageNode.query.get_or_404(id)
    db.session.delete(node)
    db.session.commit()
    return jsonify({"message": f"Node {id} deleted"}), 200

@storage_nodes_bp.route("/summary", methods=["GET"])
def node_summary():
    nodes = StorageNode.query.all()
    summary = []

    for node in nodes:
        used = sum(a.allocated_size for a in node.allocations)
        remaining = node.capacity - used
        summary.append({
            "id": node.id,
            "name": node.name,
            "location": node.location,
            "status": node.status,
            "capacity": node.capacity,
            "used": used,
            "remaining": remaining,
            "allocations": len(node.allocations)
        })

    return jsonify(summary), 200