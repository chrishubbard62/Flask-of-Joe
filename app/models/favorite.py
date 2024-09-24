from .db import db, environment, SCHEMA, add_prefix_for_prod

class Favorite(db.Model):
  __tablename__ = 'favorites'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  coffee_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('coffees.id')), nullable=False)

  #!Relations...
  user = db.relationship('User', back_populates='favorites')
  coffee = db.relationship('Coffee', back_populates='favorites')

  def to_dict_basic(self):
    return {
      "id": self.id,
      "userId": self.user_id,
      "coffeeId": self.coffee_id,
    }

  def to_dict(self):
     return{
        **self.to_dict_basic(),
        "coffee": self.coffee.to_dict_picture(),
        "user": self.user.to_dict()
     }
