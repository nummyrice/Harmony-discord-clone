from app.models import db, Member
# from faker import Faker
from sqlalchemy.sql.expression import func, select

# faker = Faker()

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

    db.session.add(member1)
    db.session.add(member2)
    db.session.add(member3)
    db.session.commit()

def undo_members():
    db.session.execute('TRUNCATE members RESTART IDENTITY CASCADE')
    db.session.commit()
