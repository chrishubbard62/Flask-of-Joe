from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, NumberRange, Length, InputRequired


class CoffeeForm(FlaskForm):
  name = StringField('name', validators=[DataRequired(), Length(min=1, max=50)])
  price = FloatField('price', validators=[InputRequired(), NumberRange(min=.01)])
  description = StringField('description', validators=[DataRequired(), Length(min=1, max=500)])
  roast = StringField('roast', validators=[DataRequired(), Length(min=1, max=20)])
  region = StringField('region', validators=[DataRequired(), Length(min=1, max=50)])
