from .db import db

class CoffeeImage(db.Models):
  __tablename__ = 'coffee_images'

  id = db.Column(db.Integer, primary_key=True)
  url = db.Column(db.String, nullable=False)
  coffee_id = db.Column(db.Integer, db.ForeignKey('coffees.id'), nullable=False)

  #!Relations...

  def to_dict_basic(self):
    return {
      "id": self.id,
      "url": self.url,
      "coffeeId": self.coffee_id,
    }