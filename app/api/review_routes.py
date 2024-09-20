from flask import Blueprint
from flask_login import login_required
from app.models import User, Review

review_routes = Blueprint('reviews', __name__)
