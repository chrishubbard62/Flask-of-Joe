from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Coffee, Review, db
from app.forms import ReviewsForm

coffee_routes = Blueprint('coffees', __name__)


#!######################### Luna ##############################
def format_errors_reviews(validation_errors):
  """
    Simple function that turns the WTForms validation errors into a simple list
    """
  errorMessages = dict()
  for field in validation_errors:
    # errorMessages[field] = [error for error in validation_errors[field]]
    errorMessages[field] = validation_errors[field][0]

  return errorMessages


#Get all Reviews by a Coffee's id
@coffee_routes.route("/<int:coffee_id>/reviews")
def coffee_reviews(coffee_id):
  coffee = Coffee.query.get(coffee_id)
  if not coffee:
    return {"message": "Coffee couldn't be found"}, 404
  
  reviews = Review.query.filter_by(coffee_id=coffee_id).all()

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