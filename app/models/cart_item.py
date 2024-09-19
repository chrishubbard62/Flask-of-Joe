from .db import db, environment, SCHEMA, add_prefix_for_prod

class CartItem(db.Model):
  __tablename__ = 'cart_items'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  quantity = db.Column(db.Integer, nullable=False)
  coffee_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('coffees.id')), nullable=False)
  cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')), nullable=False)

  #!Relations...
  coffee = db.relationship('Coffee', back_populates='cart_item')
  cart = db.relationship('Cart', back_populates='cart_items')

  def to_dict_basic(self):
    return {
      "id": self.id,
      "quantity": self.quantity,
      "coffeeId": self.coffee_id,
      "cartId": self.cart_id,
    }