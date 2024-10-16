from sqlalchemy.sql import text

from app.models import SCHEMA, db, environment, Coffee, Review
from .users import bobbie, demo, marnie
from .coffee import coffee1, coffee2, coffee3, coffee4, coffee5, coffee6, coffee7, coffee8, coffee9, coffee10, coffee11, coffee12, coffee13

review1 = Review(
    review="This coffee was so terrific", stars=5, user=marnie, coffee=coffee1
)
review2 = Review(
    review="This coffee was so bad I'll never get it again!",
    stars=1,
    user=demo,
    coffee=coffee2,
)
review3 = Review(
    review="This coffee was so good I can't wait to have it tomorrorw!",
    stars=4,
    user=marnie,
    coffee=coffee3,
)
review4 = Review(
    review="This coffee was so ok, buy at your own discretion",
    stars=3,
    user=bobbie,
    coffee=coffee4,
)
review5 = Review(
    review="This coffee was so mid. Not my favorite",
    stars=2,
    user=bobbie,
    coffee=coffee5,
)
review6 = Review(
    review="This coffee was surprisingly strong and flavorful.",
    stars=4,
    user=marnie,
    coffee=coffee6,
)
review7 = Review(
    review="I was really disappointed with this coffee. It was weak and tasteless.",
    stars=1,
    user=bobbie,
    coffee=coffee7,
)
review8 = Review(
    review="This coffee is just okay. It's not bad, but it's not great either.",
    stars=3,
    user=demo,
    coffee=coffee8,
)
review9 = Review(
    review="I really enjoyed this coffee. It has a nice, smooth flavor.",
    stars=4,
    user=demo,
    coffee=coffee9,
)
review10 = Review(
    review="This coffee is too bitter for me. I prefer something with a sweeter taste.",
    stars=2,
    user=bobbie,
    coffee=coffee10,
)
review11 = Review(
    review="This coffee is really good! It has a great aroma and flavor.",
    stars=5,
    user=marnie,
    coffee=coffee11,
)
review12 = Review(
    review="I'm not a fan of this coffee. It's too strong for my taste.",
    stars=2,
    user=demo,
    coffee=coffee12,
)
review13 = Review(
    review="This coffee is delicious! It has a rich, chocolatey flavor.",
    stars=5,
    user=marnie,
    coffee=coffee13,
)


# add demo reviews
def seed_reviews():
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
