from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Coffee, db, Review
from app.forms import CoffeeForm, ReviewsForm

coffee_routes = Blueprint('coffees', __name__)

#?############################# Chris #################################################################
def format_errors_reviews(validation_errors):
  """
    Simple function that turns the WTForms validation errors into a simple list
    """
  errorMessages = dict()
  for field in validation_errors:
    # errorMessages[field] = [error for error in validation_errors[field]]
    errorMessages[field] = validation_errors[field][0]

  return errorMessages

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
  return {coffee.id: coffee.to_dict_picture() for coffee in current_user.coffees}


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

  return {"errors": format_errors_reviews(form.errors)}, 400 ## added on sunday not tested


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

  return {"errors": format_errors_reviews(form.errors)}, 400 ## added on sunday not tested


@coffee_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_coffee(id):
  """
  Deletes and existing coffee based off its id if the user is logged in
  """
  coffee = Coffee.query.get(id)
  # print('ok')
  id = coffee.id

  if not coffee:
    return {"message": "Coffee does not exist"}, 404
  if coffee.owner_id != current_user.id:
    return {"message" : "Forbidden"}, 403

  db.session.delete(coffee)
  db.session.commit()

  return {"message": "Successfully deleted", 'coffeeId': id}


#?############################# Chris #################################################################

#!######################### Luna ##############################
#Get all Reviews by a Coffee's id
@coffee_routes.route("/<int:coffee_id>/reviews")
def coffee_reviews(coffee_id):
  coffee = Coffee.query.get(coffee_id)
  if not coffee:
    return {"message": "Coffee couldn't be found"}, 404

  reviews = Review.query.filter_by(coffee_id=coffee_id).order_by(Review.created_at.desc()).all()

  return {'Reviews': [review.to_dict() for review in reviews]}


# Create a Review for a Coffee based on the coffee's id
@coffee_routes.route('/<int:coffee_id>/reviews', methods=['POST'])
@login_required
def make_review(coffee_id):
  coffee = Coffee.query.get(coffee_id)

  # check coffee exist or not and if the curr user is the owner of that coffee
  if not coffee:
    return {"message": "Coffee couldn't be found"}, 404

  if current_user.id == coffee.owner_id:
    return {'message': "Forbidden"}, 403

  existed_review = Review.query.filter(
    Review.user_id == current_user.id,
    Review.coffee_id == coffee.id
  ).first()

  if existed_review:
    return {"message": "User already has a review for this spot"}, 500

  form = ReviewsForm()

  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    review = form.data["review"]
    stars = form.data["stars"]

    new_review = Review(review=review, stars=stars, user_id=current_user.id, coffee_id=coffee_id)

    db.session.add(new_review)
    db.session.commit()

    return new_review.to_dict()

  if form.errors:
    return {"errors": format_errors_reviews(form.errors)}, 400
#!######################### Luna ##############################
