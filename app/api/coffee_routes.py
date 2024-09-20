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


@coffee_routes.route('/current')
@login_required
def user_coffee():
  """
  Queries all the coffees owned by the current user also returns the user info
  """
  return {"Coffee": [coffee.to_dict_picture() for coffee in current_user.coffees]}


@coffee_routes.route('/<int:id>')
def single_coffee(id):
  """
  Queries a single coffee based on that coffees id
  """
  coffee = Coffee.query.get(id)

  return coffee.to_dict_picture()

#?############################# Chris #################################################################
