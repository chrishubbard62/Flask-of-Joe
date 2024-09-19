from .db import db

class Cart(db.Model):
  __tablename__ = 'carts'

  id = db.Column(db.Integer, primary_key=True)
  pending = db.Column(db.Boolean, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  #!Relations...

  def to_dict_basic(self):
    return {
      "id": self.id,
      "pending": self.pending,
      "userId": self.user_id,
    }