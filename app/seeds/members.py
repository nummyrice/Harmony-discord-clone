from sqlalchemy.sql.functions import user
from app.models import db, Member, server
from sqlalchemy.sql.expression import func, select


def seed_members():
    # adjust the range to add more or less seed data
    member1 = Member(
        user_id=1, server_id=2
    )
    member2 = Member(
        user_id=1, server_id=3
    )
    member3 = Member(
        user_id=2, server_id=1
    )
    member4 = Member(
        user_id=1, server_id=1
    )

    db.session.add(member1)
    db.session.add(member2)
    db.session.add(member3)
    db.session.add(member4)
    db.session.commit()


def undo_members():
    db.session.execute('TRUNCATE members RESTART IDENTITY CASCADE')
    db.session.commit()
