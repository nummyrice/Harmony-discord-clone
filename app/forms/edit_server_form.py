from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class EditServerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    image_url = StringField('image_url')
