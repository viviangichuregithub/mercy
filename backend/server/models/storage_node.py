from server.extensions import db

class StorageNode(db.Model):
    __tablename__ = 'storage_nodes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=True)
    capacity = db.Column(db.Integer, nullable=False)
    used = db.Column(db.Integer, default=0)
    status = db.Column(db.String(50), default='active')

    def __repr__(self):
        return f"<StorageNode {self.name}>"
