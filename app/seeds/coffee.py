from sqlalchemy.sql import text

from app.models import SCHEMA, db, environment, Coffee
from .users import bobbie, demo, marnie

# these numbers are actually misleading
coffee1 = Coffee(name='Ritual coffee',
                    price=19.99,
                    description='A bold, dark roast from the highlands of Costa Rica, Ritual Coffee offers a rich and earthy flavor with a smooth finish. Notes of dark chocolate and subtle spices make this the perfect daily coffee for those who enjoy a robust, full-bodied cup.',
                    roast='Dark',
                    region='Costa Rica',
                    owner=demo)
coffee2 = Coffee(name='Morning Bliss',
                    price=15.99,
                    description='A smooth and well-balanced medium roast from Ethiopia, Morning Bliss blends fruity undertones with a velvety finish. Its mild acidity and sweet notes make it ideal for a bright and refreshing start to your day.',
                    roast='Medium',
                    region='Ethiopia',
                    owner=marnie)
coffee3 = Coffee(name='Espresso Delight',
                    price=22.50,
                    description='Espresso Delight is a rich, bold dark roast made for espresso lovers. Sourced from Italy, it delivers a full-bodied, creamy texture with strong notes of cocoa and roasted nuts. Ideal for a perfect espresso shot or luxurious latte.',
                    roast='Espresso',
                    region='Italy',
                    owner=bobbie)
coffee4 = Coffee(name='Tropical Brew',
                    price=18.75,
                    description='Tropical Brew is a light, fruity coffee sourced from Hawaii, offering vibrant notes of pineapple and citrus. With its refreshing, bright flavor profile, it’s perfect for those who enjoy a light roast with a tropical twist.',
                    roast='Light',
                    region='Hawaii',
                    owner=demo)
coffee5 = Coffee(name='Highland Reserve',
                    price=20.00,
                    description=' A premium dark roast from the lush mountains of Colombia, Highland Reserve offers rich, complex flavors of dark chocolate, caramel, and a hint of fruit. Its smooth and full-bodied texture makes it perfect for coffee lovers everywhere.',
                    roast='Dark',
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
