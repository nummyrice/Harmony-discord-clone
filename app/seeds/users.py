from app.models import db, User
from faker import Faker
fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_users():
    # print('////')
    # print(fake.profile()['mail'])
    demo = User(
        username='Demo', email='demo@aa.io', password='password', image_url="https://picsum.photos/200/300?random=1")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', image_url="https://picsum.photos/200/300?random=1")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', image_url="https://picsum.photos/200/300?random=1")
    # adjust the range to add more or less seed data
    for x in range(1, 10):
        additionalUser = User(
            username= f'{fake.first_name()}{x}',
            email= fake.profile()['mail'],
            password=f'password{x}',
            image_url="https://picsum.photos/200/300?random=1"
        )
        db.session.add(additionalUser)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
