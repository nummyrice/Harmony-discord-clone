from flask import Blueprint, jsonify, session
from flask_login import login_required
from app.models import Server, User, Member, server

server_routes = Blueprint('servers', __name__)


@server_routes.route('/')
@login_required
def servers():
    servers = Server.query.all()

    user_servers = [server for server in servers if session.id in server.member_ids()]

    return {'servers': [server.to_dict() for server in user_servers]}
