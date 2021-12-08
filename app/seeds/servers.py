from app.models import db, Server, User, Member
from sqlalchemy.sql.expression import func


def seed_servers():
    # adjust the range to add more or less seed data
    for x in range(1, 5):
        random_user_id = db.session.query(User.id).order_by(
                func.random()).first()[0]
        seed_server = Server(
            name=f'Server {x}',
            image_url="https://picsum.photos/200/300?random=1",
            private=False,
            owner_id=random_user_id
        )
        db.session.add(seed_server)
        db.session.commit()

        make_member = Member(
            user_id=1,
            server_id=x
        )
        make_member2 = Member(
            user_id=2,
            server_id=x
        )
        make_member3 = Member(
            user_id=3,
            server_id=x
        )
        make_member4 = Member(
            user_id=4,
            server_id=x
        )
        db.session.add(make_member3)
        db.session.add(make_member)
        db.session.add(make_member2)
        db.session.add(make_member4)

        db.session.commit()

def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE')
    db.session.commit()
