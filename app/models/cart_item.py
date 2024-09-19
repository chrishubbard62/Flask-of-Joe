from .db import db

class CartItem(db.Model):
  __tablename__ = 'cart_items'

  id = db.Column(db.Integer, primary_key=True)
  quantity = db.Column(db.Integer, nullable=False)
  coffee_id = db.Column(db.Integer, db.ForeignKey('coffees.id'), nullable=False)
  cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)

  #!Relations...

  def to_dict_basic(self):
    return {
      "id": self.id,
      "quantity": self.quantity,
      "coffeeId": self.coffee_id,
      "cartId": self.cart_id,
    }