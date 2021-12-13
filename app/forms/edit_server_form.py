from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired


class EditServerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    image_url = FileField('image_url')
