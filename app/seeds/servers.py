from app.models import db, Server, User, Member
from sqlalchemy.sql.expression import func


def seed_servers():
    # adjust the range to add more or less seed data
    demoServer = Server(
        name="App Academy Chat",
        image_url="https://www.tinkeringmonkey.com/wp-content/uploads/2020/09/app-academy-closeup2-scaled.jpg",
        private=False,
        owner_id=1
    )
    db.session.add(demoServer)
    db.session.commit()

     # adds users 1 thru 5 to "App Academy Chat"
    for y in range(1, 6):
        demoMember = Member(
            user_id=y,
            server_id=1
        )
        db.session.add(demoMember)
        db.session.commit()

    demoPrivateServer = Server(
        name="Boas Private Chat",
        image_url="https://www.hospitalveterinariglories.com/wp-content/uploads/2019/11/19-11-27-boa-constrictor.jpg",
        private=True,
        owner_id=1
    )
    db.session.add(demoPrivateServer)
    db.session.commit()

    # adds users 1 thru 5 to "Boas Private Chat"
    for z in range(1, 6):
        demoMember = Member(
            user_id=z,
            server_id=2
        )
        db.session.add(demoMember)
        db.session.commit()

    for x in range(3, 16):
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
        make_member5 = Member(
            user_id=5,
            server_id=x
        )
        db.session.add(make_member3)
        db.session.add(make_member)
        db.session.add(make_member2)
        db.session.add(make_member4)
        db.session.add(make_member5)
        db.session.commit()


def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE')
    db.session.commit()
