from .db import db
from sqlalchemy.sql import func


class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)
    image_url = db.Column(db.String(255))
    private = db.Column(db.Boolean, default=False, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False,
                           server_default=func.now())
    updated_at = db.Column(
        db.DateTime(), onupdate=func.now(), default=func.now())

    users = db.relationship('User', back_populates='servers')
    members = db.relationship(
        "User", secondary="members", back_populates="servers")
    channels = db.relationship(
        'Channel', back_populates='servers', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'image_url': self.image_url,
            'private': self.private,
            'owner_id': self.owner_id,
            'members': [user.id for user in self.members],
            "member_list": [user.to_dict() for user in self.members],
            'channels': self.channels[0].to_dict() if len(self.channels) and self.private else {},
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def member_ids(self):
        return [user.id for user in self.members]
