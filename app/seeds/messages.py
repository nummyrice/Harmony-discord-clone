from app.models import db, Message, User, Channel, Member
from faker import Faker
from sqlalchemy.sql.expression import func, select

fake = Faker()


def seed_messages():
    # adjust the range to add more or less seed data

    for x in range(3):
        channel_id = db.session.query(
            Channel.id).order_by(func.random()).first()[0]
        owner_id = db.session.query(User.id).order_by(func.random()).first()[0]
        # server_id = db.session.query(Channel.server_id).get(channel_id)
        seed_message = Message(
            # number of sentences can be adjusted for comments
            content=fake.paragraph(nb_sentences=3),
            channel_id=channel_id,
            owner_id=owner_id
        )

        # make_member = Member(
        #     user_id=owner_id,
        #     server_id=server_id
        # )
        # db.session.add(make_member)
        db.session.add(seed_message)

    db.session.commit()


def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE')
    db.session.commit()
