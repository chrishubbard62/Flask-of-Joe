from .db import db

class Coffee(db.Models):
  __tablename__ = 'coffees'

  id = db.Column(db.Integer, primary_key=True)
  owner_id = db.Column(db.Integer, nullable=False)
  name = db.Column(db.String(50), nullable=False)
  price = db.Column(db.Float(), nullable=False)
  description = db.Column(db.String(500), nullable=False)
  roast = db.Column(db.String(20), nullable=False)
  region = db.Column(db.String(20), nullable=False)

  def to_dict_basic(self):
    return {
      "id": self.id,
      "ownerId": self.owner_id,
      "name": self.name,
      "price": self.price,
      "description": self.description,
      "roast": self.roast,
      "region": self.region
    }
