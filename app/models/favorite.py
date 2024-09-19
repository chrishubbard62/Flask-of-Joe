from .db import db

class Favorite(db.Model):
  __tablename__ = 'favorites'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  coffee_id = db.Column(db.Integer, db.ForeignKey('coffees.id'), nullable=False)

  #!Relations...

  def to_dict_basic(self):
    return {
      "id": self.id,
      "userId": self.user_id,
      "coffeeId": self.coffee_id,
    }