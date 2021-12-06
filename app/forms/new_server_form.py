from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired


class NewServerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    image_url = StringField('image_url')
    private = BooleanField('private')
