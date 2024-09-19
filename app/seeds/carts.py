from sqlalchemy.sql import text

from app.models import SCHEMA, db, environment, Cart
from .users import bobbie, demo, marnie

cart1 = Cart(
                 user=marnie,
                 pending=True
)
cart2 = Cart(
                 user=demo,
                 pending=True
)
cart3 = Cart(
                 user=bobbie,
                 pending=True
)


#add demo carts
def seed_carts():
    db.session.add(cart1)
    db.session.add(cart2)
    db.session.add(cart3)
    db.session.commit()

def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))

    db.session.commit()
