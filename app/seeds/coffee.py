from sqlalchemy.sql import text

from app.models import SCHEMA, db, environment, Coffee
from .users import bobbie, demo, marnie

# these numbers are actually misleading
coffee1 = Coffee(name='Ritual coffee',
                    price=19.99,
                    description='This bag of coffee is the best!',
                    roast='Dark',
                    region='Costa Rica',
                    owner=demo)
coffee2 = Coffee(name='Morning Bliss',
                    price=15.99,
                    description='A smooth blend to start your day!',
                    roast='Medium',
                    region='Ethiopia',
                    owner=marnie)
coffee3 = Coffee(name='Espresso Delight',
                    price=22.50,
                    description='Rich and bold, perfect for espresso lovers!',
                    roast='Dark',
                    region='Italy',
                    owner=bobbie)
coffee4 = Coffee(name='Tropical Brew',
                    price=18.75,
                    description='A fruity and vibrant coffee from the tropics!',
                    roast='Light',
                    region='Hawaii',
                    owner=demo)
coffee5 = Coffee(name='Highland Reserve',
                    price=20.00,
                    description='A premium coffee with complex flavors!',
                    roast='Espresso',
                    region='Colombia',
                    owner=marnie)

# Adds demo coffees
def seed_coffees():
    db.session.add(coffee1)
    db.session.add(coffee2)
    db.session.add(coffee3)
    db.session.add(coffee4)
    db.session.add(coffee5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the coffees table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_coffees():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.coffees RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM coffees"))

    db.session.commit()
