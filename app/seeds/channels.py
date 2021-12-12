from app.models import db, Server, Channel
from sqlalchemy.sql.expression import func

def seed_channels():
    # adjust the range to add more or less seed data
    for x in range(1, 100):
        seed_channel = Channel(
            name = f'Channel {x}',
            server_id = db.session.query(Server.id).order_by(func.random()).first()[0]
        )
        db.session.add(seed_channel)
        db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE')
    db.session.commit()
