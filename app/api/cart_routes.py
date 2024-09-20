from flask import Blueprint
from flask_login import login_required
from app.models import User

cart_routes = Blueprint('carts', __name__)
