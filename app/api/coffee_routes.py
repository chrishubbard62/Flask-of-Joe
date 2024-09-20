from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Coffee, db

coffee_routes = Blueprint('coffees', __name__)

#?############################# Chris #################################################################

@coffee_routes.route('')
def all_coffee():
  """
  Queries for all the coffees and returns the dictionary of each includes the coffee images
  """
  coffees = Coffee.query.all()
  return {"Coffees" : [coffee.to_dict_picture() for coffee in coffees]}




#?############################# Chris #################################################################
