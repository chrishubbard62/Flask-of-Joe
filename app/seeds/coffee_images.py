from sqlalchemy.sql import text

from app.models import SCHEMA, db, environment, CoffeeImage
from .coffee import coffee1, coffee2, coffee3, coffee4, coffee5

coffee_image1 = CoffeeImage(
                 coffee=coffee1,
                 url= 'http://byte-ninja-coffee.s3.amazonaws.com/93d3be0ded094443a8d0208a2b7b150a.jpg'
)
coffee_image2 = CoffeeImage(
                 coffee=coffee2,
                 url= 'http://byte-ninja-coffee.s3.amazonaws.com/ac10abbebc5e469ca4fcad851b48d9f0.jpg'
)
coffee_image3 = CoffeeImage(
                 coffee=coffee3,
                 url= 'http://byte-ninja-coffee.s3.amazonaws.com/590346c802ca4511bc8e87825e7bad65.jpg'
)
coffee_image4 = CoffeeImage(
                 coffee=coffee4,
                 url= 'http://byte-ninja-coffee.s3.amazonaws.com/1cb11cdefd31443f81a5ff355bdb8cd9.jpg'
)
coffee_image5 = CoffeeImage(
                 coffee=coffee5,
                 url= 'http://byte-ninja-coffee.s3.amazonaws.com/ab8830b99c0c4b18852e7787aed53fe0.jpg'
)



#add demo coffee_images
def seed_coffee_images():
    db.session.add(coffee_image1)
    db.session.add(coffee_image2)
    db.session.add(coffee_image3)
    db.session.add(coffee_image4)
    db.session.add(coffee_image5)

    db.session.commit()

def undo_coffee_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.coffee_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM coffee_images"))

    db.session.commit()
