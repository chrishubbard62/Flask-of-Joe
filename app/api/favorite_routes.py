from flask import Blueprint
from flask_login import login_required
from app.models import User

favorite_routes = Blueprint('favorites', __name__)
