from .db import db
# members = db.Table('members',
#                    db.Column('user_id', db.Integer, db.ForeignKey(
#                        'users.id'), primary_key=True),
#                    db.Column('server_id', db.Integer, db.ForeignKey('servers.id'), primary_key=True))

class Member(db.Model):
    __tablename__ = 'members'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)

    # users = db.relationship('User', back_populates='members')
    # servers = db.relationship('Server', back_populates='members')
