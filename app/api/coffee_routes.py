from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Coffee, db
from app.forms import CoffeeForm

coffee_routes = Blueprint('coffees', __name__)

#?############################# Chris #################################################################


@coffee_routes.route('/hello')
def hello():
  return 'hello'

@coffee_routes.route('')
def all_coffees():
  """
  Queries for all the coffees and returns the dictionary of each includes the coffee images
  """
  coffees = Coffee.query.all()
  return {"Coffees" : [coffee.to_dict_picture() for coffee in coffees]}


@coffee_routes.route('/current')
@login_required
def user_coffees():
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
  if not coffee:
    return {"message": "Coffee does not exist"}, 404

  return coffee.to_dict_picture()


@coffee_routes.route('', methods=['POST'])
@login_required
def create_coffee():
  """
  Validates and submits a new coffee if the user is logged in!
  """
  form = CoffeeForm()

  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    coffee = Coffee(
      owner_id = int(current_user.id),
      name = form.data['name'],
      price = form.data['price'],
      description = form.data['description'],
      roast = form.data['roast'],
      region = form.data['region']
    )
    db.session.add(coffee)
    db.session.commit()

    return coffee.to_dict_basic(), 201

  return form.errors, 401


@coffee_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_coffee(id):
  """
  Updates an existing coffee if the user is logged in
  """
  coffee = Coffee.query.get(id)

  if not coffee:
    return {"message": "Coffee does not exist"}, 404
  if coffee.owner_id != current_user.id:
    return {"message" : "Forbidden"}, 403

  form = CoffeeForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    coffee.name = form.data['name']
    coffee.price = form.data['price']
    coffee.description = form.data['description']
    coffee.roast = form.data['roast']
    coffee.region = form.data['region']
    db.session.commit()
    return coffee.to_dict_basic()

  return form.errors, 401


@coffee_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_coffee(id):
  """
  Deletes and existing coffee based off its id if the user is logged in
  """
  coffee = Coffee.query.get(id)
  print('ok')

  if not coffee:
    return {"message": "Coffee does not exist"}, 404
  if coffee.owner_id != current_user.id:
    return {"message" : "Forbidden"}, 403

  db.session.delete(coffee)
  db.session.commit()

  return {"message": "Successfully deleted"}


#?############################# Chris #################################################################
