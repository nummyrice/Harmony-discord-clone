from .db import db
from sqlalchemy.sql import func

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False,
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(), onupdate=func.now(), default=func.now())
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)

    servers = db.relationship('Server', back_populates='channels')
    messages = db.relationship('Message', back_populates='channels', cascade="all, delete")

    def to_dict(self):
            return {
                'id': self.id,
                'name': self.name,
                'created_at': self.created_at,
                'updated_at': self.updated_at,
                'server_id': self.server_id
            }
