from .db import db, add_prefix_for_prod, environment, SCHEMA


class Review(db.Model):
  __tablename__ = 'reviews'

  if environment == "production":
     __table_args__ = {'schema': SCHEMA}


  id = db.Column(db.Integer, primary_key=True)
  review = db.Column(db.String(200), nullable=False)
  ## could be without img? img = db.Column(db.String, nullable=False)
  stars = db.Column(db.Integer, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  coffee_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('coffees.id')), nullable=False)

  #!Relations...
  coffee = db.relationship('Coffee', back_populates='reviews')
  user = db.relationship('User', back_populates='reviews')

  def to_dict_basic(self):
    return {
      "id": self.id,
      "review": self.review,
      "img": self.img,
      "stars": self.stars,
      "userId": self.user_id,
      "coffeeId": self.coffee_id,
    }
