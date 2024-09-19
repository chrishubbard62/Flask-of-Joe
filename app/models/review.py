from .db import db

class Review(db.Model):
  __tablename__ = 'reviews'

  id = db.Column(db.Integer, primary_key=True)
  review = db.Column(db.String(200), nullable=False)
  img = db.Column(db.String, nullable=False)   #? could be without img?
  stars = db.Column(db.Integer, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  coffee_id = db.Column(db.Integer, db.ForeignKey('coffees.id'), nullable=False)

  #!Relations...

  def to_dict_basic(self):
    return {
      "id": self.id,
      "review": self.review,
      "img": self.img,
      "stars": self.stars,
      "userId": self.user_id,
      "coffeeId": self.coffee_id,
    }