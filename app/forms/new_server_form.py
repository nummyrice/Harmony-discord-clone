from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, FileField
from wtforms.validators import DataRequired


class NewServerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    image_url = FileField('image_url')
    private = BooleanField('private')
