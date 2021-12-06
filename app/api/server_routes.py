from flask import Blueprint, jsonify, session
from flask_login import login_required
from app.models import Server, User, members

server_routes = Blueprint('servers', __name__)


@server_routes.route('/', methods=['GET'])
# @login_required
def servers():
    servers = Server.query.join(members).filter(
        Server.owner_id == session.id or session.id == members.user_id)
    return {'servers': [server.to_dict() for server in servers]}
