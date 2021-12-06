from app.models import db, Server, User
# from faker import Faker
from sqlalchemy.sql.expression import func, select

# faker = Faker()

def seed_servers():
    # adjust the range to add more or less seed data
    for x in range(3):
        seed_server = Server(
            name = f'Server ${x}',
            image_url = "https://picsum.photos/200/300?random=1",
            private = False,
            owner_id = 1
        )

        db.session.add(seed_server)
    db.session.commit()

def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE')
    db.session.commit()
