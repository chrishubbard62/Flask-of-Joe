from sqlalchemy.sql import text

from app.models import SCHEMA, db, environment, CoffeeImage
from .coffee import coffee1, coffee2, coffee3, coffee4, coffee5, coffee6, coffee7, coffee8, coffee9, coffee10, coffee11, coffee12, coffee13

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
coffee_image6 = CoffeeImage(
                 coffee=coffee6,
                 url= 'https://byte-ninja-coffee.s3.us-west-1.amazonaws.com/23a5a7dd1bde4e5f818dce298bccbc42.jpg'
)
coffee_image7 = CoffeeImage(
                 coffee=coffee7,
                 url= 'https://byte-ninja-coffee.s3.us-west-1.amazonaws.com/030fad2787ff41d3ba3892d394fdc879.jpg'
)
coffee_image8 = CoffeeImage(
                 coffee=coffee8,
                 url= 'https://byte-ninja-coffee.s3.us-west-1.amazonaws.com/0479ecda5f0a4513847d1a8a649c1dce.jpg'
)
coffee_image9 = CoffeeImage(
                 coffee=coffee9,
                 url= 'https://byte-ninja-coffee.s3.us-west-1.amazonaws.com/e6bc100266b34bf996629871b3395356.jpg'
)
coffee_image10 = CoffeeImage(
                 coffee=coffee10,
                 url= 'https://byte-ninja-coffee.s3.us-west-1.amazonaws.com/f15eb77d2e594f769eedf08cb16b728c.jpg'
)
coffee_image11 = CoffeeImage(
                 coffee=coffee11,
                 url= 'https://byte-ninja-coffee.s3.us-west-1.amazonaws.com/8ec538aec5444449bbb1dae032708d35.jpg'
)
coffee_image12 = CoffeeImage(
                 coffee=coffee12,
                 url= 'https://byte-ninja-coffee.s3.us-west-1.amazonaws.com/9052aba1b4dd4b80845a81cc7a125359.jpg'
)
coffee_image13 = CoffeeImage(
                 coffee=coffee13,
                 url= 'https://byte-ninja-coffee.s3.us-west-1.amazonaws.com/d31bc98ac9e34aee8a80c0a3cc9a8295.jpg'
)



#add demo coffee_images
def seed_coffee_images():
    db.session.add(coffee_image1)
    db.session.add(coffee_image2)
    db.session.add(coffee_image3)
    db.session.add(coffee_image4)
    db.session.add(coffee_image5)
    db.session.add(coffee_image6)
    db.session.add(coffee_image7)
    db.session.add(coffee_image8)
    db.session.add(coffee_image9)
    db.session.add(coffee_image10)
    db.session.add(coffee_image11)
    db.session.add(coffee_image12)
    db.session.add(coffee_image13)

    db.session.commit()

def undo_coffee_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.coffee_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM coffee_images"))

    db.session.commit()
