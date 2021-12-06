from .db import db

members = db.Table('members',
                   db.Column('user_id', db.integer, db.ForeignKey(
                       'user.id'), primary_key=True),
                   db.Column('server_id', db.integer, db.ForeignKey('server.id'), primary_key=True))
