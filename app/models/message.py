from .db import db
from sqlalchemy.sql import func


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        'channels.id'), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False,
                           server_default=func.now())
    updated_at = db.Column(
        db.DateTime(), onupdate=func.now(), default=func.now())

    channels = db.relationship("Channel", back_populates="messages")
    users = db.relationship("User", back_populates="messages")

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "channel_id": self.channel_id,
            "owner_id": self.owner_id,
            "owner": self.users.to_dict(),
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
