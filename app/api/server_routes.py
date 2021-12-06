from flask import Blueprint, jsonify, session
from flask_login import login_required
from app.models import Server, User, members

server_routes = Blueprint('servers', __name__)


@server_routes.route('/', methods=['GET'])
# @login_required
def servers():
    # print('server', Server)
    # print('hello', Server.members)
    servers = Server.query.filter(
        Server.owner_id == 1)
    return {'servers': [server.to_dict() for server in servers]}
