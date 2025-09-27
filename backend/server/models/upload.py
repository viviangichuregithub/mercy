from datetime import datetime
from server.extensions import db
from server.models.user import User

class Upload(db.Model):
    __tablename__ = 'uploads'

    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    size = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    user = db.relationship('User', backref='uploads')
    #allocations = db.relationship('Allocation', backref='upload', cascade='all, delete-orphan')
    #allocations = db.relationship('Allocation', back_populates='upload', cascade='all, delete-orphan')