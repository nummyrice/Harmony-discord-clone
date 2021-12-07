from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Server

user_routes = Blueprint('users', __name__)


# @user_routes.route('/')
# @login_required
# def users():
#     servers = User.query.all()
#     return {'servers': [server.to_dict() for server in servers]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
