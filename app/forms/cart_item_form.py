from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, NumberRange, Length, InputRequired

class CartItemForm(FlaskForm):
    coffee_id = IntegerField('coffee_id', validators=[DataRequired()])
    # quantity = IntegerField('quantity', validators=[DataRequired()])
