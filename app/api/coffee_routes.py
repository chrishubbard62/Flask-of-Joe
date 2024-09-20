from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Coffee

coffee_routes = Blueprint('coffees', __name__)

