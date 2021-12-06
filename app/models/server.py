from .db import db
from .member import members
from sqlalchemy.sql import func

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)
    image_url = db.Column(db.String(255))
    private = db.Column(db.Boolean, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False,
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(), onupdate=func.now(), default=func.now())

    users = db.relationship('User', back_populates='servers')
    members = db.relationship(
        "User", secondary=members, back_populates="servers")
    channels = db.relationship('Channel', back_populates='servers', cascade="all, delete")

    def to_dict(self):
            return {
                'id': self.id,
                'name': self.name,
                'image_url': self.image_url,
                'private': self.private,
                'owner_id': self.owner_id,
                'created_at': self.created_at,
                'updated_at': self.updated_at
            }
