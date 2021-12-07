from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class NewMessageForm(FlaskForm):
    content = StringField('content', validators=[DataRequired()])
