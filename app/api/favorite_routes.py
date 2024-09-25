from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Favorite, db, Coffee

favorite_routes = Blueprint('favorites', __name__)

@favorite_routes.route('')
@login_required
def favs():
    '''
    Get all favorites based off of current user. returns a list of all favorites
    '''
    users_favs = Favorite.query.filter(Favorite.user_id == current_user.id).all()
    # will want to return the coffee as well
    return [coffee.to_dict() for coffee in users_favs]


@favorite_routes.route('/<int:coffee_id>', methods=['POST'])
@login_required
def new_fav(coffee_id):
    '''
    Create a new favorite for the current user. checks if coffee exists and if you already favorite it
    '''
    already_exist = Favorite.query.filter(Favorite.coffee_id == coffee_id).filter(Favorite.user_id == current_user.id).first()
    if already_exist:
        return {'errors':'This favorite already exists!'}

    this_coffee = Coffee.query.filter(Coffee.id == coffee_id)
    if not this_coffee:
        return{'errors':'This coffee doesnt exist! Please try again'}

    new_favorite = Favorite(user_id = current_user.id, coffee_id=coffee_id)
    db.session.add(new_favorite)
    db.session.commit()
    return new_favorite.to_dict_basic()


@favorite_routes.route('/delete/<int:fav_id>', methods=['DELETE'])
@login_required
def remove_fav(fav_id):
    '''
    Deletes favorite for current user if user owns favorite and if favorite exists
    '''
    # curr_fav = Favorite.query.filter(Favorite.id == fav_id).first()
    curr_fav = Favorite.query.filter(Favorite.coffee_id == fav_id).filter(Favorite.user_id == current_user.id).first()
    this_id = curr_fav.id

    if not curr_fav:
        return {'errors': 'current favorite cannot be found'}, 404
    if not curr_fav.user_id == current_user.id:
        return {'errors': 'This is not your favorite. How are you even doing this?'}, 403

    db.session.delete(curr_fav)
    db.session.commit()
    return {'message': 'Successfully deleted!', 'deletedFavId': this_id}, 200
