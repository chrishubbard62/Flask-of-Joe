from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart(db.Model):
  __tablename__ = 'carts'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  pending = db.Column(db.Boolean, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

  #!Relations...
  user = db.relationship('User', back_populates='carts')
  cart_items = db.relationship('CartItem', back_populates='cart', cascade='all, delete-orphan')


  def to_dict_basic(self):
    return {
      "id": self.id,
      "pending": self.pending,
      "userId": self.user_id,
    }

  def to_dict(self):
    return {
      **self.to_dict_basic(),
      "cartItems": [cartItem.to_dict_basic() for cartItem in self.cart_items],
    }
