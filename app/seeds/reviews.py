from sqlalchemy.sql import text

from app.models import SCHEMA, db, environment, Coffee, Review
from .users import bobbie, demo, marnie
from .coffee import coffee1, coffee2, coffee3, coffee4, coffee5

review1 = Review(review='This coffee was so terrific',
                 stars=5,
                 user=marnie,
                 coffee=coffee1
)
review2 = Review(review='This coffee was so bad',
                 stars=1,
                 user=demo,
                 coffee=coffee2
)
review3 = Review(review='This coffee was so good',
                 stars=4,
                 user=marnie,
                 coffee=coffee3
)
review4 = Review(review='This coffee was so ok',
                 stars=3,
                 user=bobbie,
                 coffee=coffee4
)
review5 = Review(review='This coffee was so mid',
                 stars=2,
                 user=bobbie,
                 coffee=coffee5
)

#add demo reviews
def seed_reviews():
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
