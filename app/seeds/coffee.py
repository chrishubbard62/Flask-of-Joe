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
                    description='A premium dark roast from the lush mountains of Colombia, Highland Reserve offers rich, complex flavors of dark chocolate, caramel, and a hint of fruit. Its smooth and full-bodied texture makes it perfect for coffee lovers everywhere.',
                    roast='Dark',
                    region='Colombia',
                    owner=marnie)


coffee6 = Coffee(
    name="Ethiopian Yirgacheffe",
    price=18.99,
    description="A classic Ethiopian coffee known for its delicate floral aroma and bright acidity. Notes of jasmine, citrus, and berry dance on the palate, making it a favorite among light roast enthusiasts.",
    roast="light",
    region="Yirgacheffe, Ethiopia",
    owner=demo
)

coffee7 = Coffee(
    name="Guatemalan Antigua",
    price=17.50,
    description="A balanced and flavorful coffee from the Antigua region of Guatemala. Expect notes of stone fruit, citrus, and a hint of chocolate. The acidity is bright and refreshing, making it a versatile choice for both pour-over and espresso.",
    roast="light",
    region="Antigua, Guatemala",
    owner=demo
)

coffee8 = Coffee(
    name="Colombian Supremo",
    price=16.99,
    description="A smooth and well-rounded Colombian coffee with a medium-bodied profile. Notes of chocolate, caramel, and a touch of nuttiness are balanced by a pleasant acidity. It's a classic choice for those who enjoy a balanced cup of coffee.",
    roast="medium",
    region="Colombia",
    owner=demo
)

coffee9 = Coffee(
    name="Kenyan AA",
    price=19.99,
    description="A bold and flavorful Kenyan coffee known for its bright acidity and complex flavor profile. Expect notes of berry, spice, and a touch of citrus. The finish is long and satisfying, making it a favorite among coffee connoisseurs.",
    roast="medium",
    region="Kenya",
    owner=demo
)

coffee10 = Coffee(
    name="Sumatra Mandheling",
    price=15.99,
    description="A rich and full-bodied Indonesian coffee with a low acidity and a hint of bitterness. Notes of earth, spice, and a touch of chocolate dominate the palate. It's a classic choice for those who enjoy a bold and flavorful cup of coffee.",
    roast="dark",
    region="Sumatra, Indonesia",
    owner=marnie
)

coffee11 = Coffee(
    name="French Roast",
    price=16.50,
    description="A strong and smoky coffee with a bold flavor profile. The acidity is low, and the body is full. Notes of dark chocolate, caramel, and a hint of smoke dominate the palate. It's a classic choice for those who enjoy a strong and flavorful cup of coffee.",
    roast="dark",
    region="Blend",
    owner=marnie
)

coffee12 = Coffee(
    name="Italian Espresso Blend",
    price=18.99,
    description="A balanced blend of beans from various regions, designed for espresso. Expect a rich and full-bodied cup with notes of dark chocolate, caramel, and a hint of nuttiness. The crema is thick and velvety, making it a perfect choice for espresso-based drinks.",
    roast="espresso",
    region="Blend",
    owner=bobbie
)

coffee13 = Coffee(
    name="Brazilian Espresso",
    price=17.50,
    description="A smooth and creamy Brazilian coffee with a medium-bodied profile. Notes of chocolate, caramel, and a hint of nuttiness are balanced by a pleasant acidity. It's a classic choice for those who enjoy a well-balanced espresso with a rich and creamy texture.",
    roast="espresso",
    region="Brazil",
    owner=bobbie
)

# Adds demo coffees
def seed_coffees():
    db.session.add(coffee1)
    db.session.add(coffee2)
    db.session.add(coffee3)
    db.session.add(coffee4)
    db.session.add(coffee5)
    db.session.add(coffee6)
    db.session.add(coffee7)
    db.session.add(coffee8)
    db.session.add(coffee9)
    db.session.add(coffee10)
    db.session.add(coffee11)
    db.session.add(coffee12)
    db.session.add(coffee13)
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
