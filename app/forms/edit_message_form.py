from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class EditMessageForm(FlaskForm):
    content = StringField('name', validators=[DataRequired()])
