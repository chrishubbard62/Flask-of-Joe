from .db import db, add_prefix_for_prod, environment, SCHEMA

class CoffeeImage(db.Model):
  __tablename__ = 'coffee_images'

  if environment == "production":
      __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  url = db.Column(db.String, nullable=False)
  coffee_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('coffees.id')), nullable=False)

  #!Relations...
  coffee = db.relationship('Coffee', back_populates='coffee_images')

  def to_dict_basic(self):
    return {
      "id": self.id,
      "url": self.url,
      "coffeeId": self.coffee_id,
    }
