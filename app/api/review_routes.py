from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Review, db

review_routes = Blueprint('reviews', __name__)


# Delete a review 
@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
  review = Review.query.get(review_id)
  if not review:
    return {"message": "Review couldn't be found"}, 404
  
  if current_user.id != review.user_id:
    return {'message': "Forbidden"}, 403
  
  db.session.delete(review)
  db.session.commit()
  return {"message": "Successfully deleted"}