from server.models.storage_node import StorageNode
from server.extensions import db


def seed_storage_nodes():
    # Avoid duplicating nodes if run multiple times
    if StorageNode.query.first():
        print("Storage nodes already exist. Skipping seeding.")
        return

    nodes = [
        StorageNode(name="Node Alpha", capacity=100.0, location="Nairobi"),
        StorageNode(name="Node Beta", capacity=50.0, location="Mombasa"),
        StorageNode(name="Node Gamma", capacity=75.0, location="Kisumu"),
    ]

    db.session.add_all(nodes)
    try:
        db.session.commit()
        print("Seeded storage nodes successfully.")
    except Exception as e:
        db.session.rollback()
        print(f"Failed to seed storage nodes: {e}")

"""
from server.models.storage_node import StorageNode
from server.extensions import db

def seed_storage_nodes():
    nodes = [
        StorageNode(name="Node Alpha", capacity=100.0, location="Nairobi"),
        StorageNode(name="Node Beta", capacity=50.0, location="Mombasa"),
        StorageNode(name="Node Gamma", capacity=75.0, location="Kisumu"),
    ]
    db.session.add_all(nodes)
    db.session.commit()
    print("Seeded storage nodes successfully.")
"""