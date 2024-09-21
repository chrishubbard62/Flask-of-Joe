from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError, NumberRange, Length


class ReviewsForm(FlaskForm):
  review = TextAreaField('review', validators=[
    DataRequired(message='Review is required'),
    Length(max=200, message='Review must be less than 200 characters')
    ])
  stars = IntegerField('stars', validators=[
    DataRequired(message='Stars are required'),
    NumberRange(min=1, max=5, message='Stars must be an integer from 1 to 5')
    ])
