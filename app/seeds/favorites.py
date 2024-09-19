from sqlalchemy.sql import text

from app.models import SCHEMA, db, environment, Favorite
from .users import bobbie, demo, marnie
from .coffee import coffee1, coffee2, coffee3


fav1 = Favorite(user=bobbie, coffee=coffee1) # this one is good
fav2 = Favorite(user=demo, coffee=coffee2) #this should be marnie
fav3 = Favorite(user=marnie, coffee=coffee3) # this should be demo



def seed_favorites():
     db.session.add(fav1)
     db.session.add(fav2)
     db.session.add(fav3)
     db.session.commit()

def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
