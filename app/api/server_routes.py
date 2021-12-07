from .auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Server, User, Member, server, db
from app.forms import NewServerForm, EditServerForm
server_routes = Blueprint('servers', __name__)


@server_routes.route('/')
@login_required
def servers():
    servers = Server.query.all()

    user_servers = [
        server for server in servers if session.id in server.member_ids()]

    return {'servers': [server.to_dict() for server in user_servers]}


@server_routes.route('/', methods=['POST'])
@login_required
def new_server():
    form = NewServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server = Server(
            name=form.data['name'],
            image_url=form.data['image_url'],
            private=form.data['private'],
            owner_id=session.id
        )
        db.session.add(server)
        db.session.commit()
        member = Member(
            user_id=session.id,
            server_id=server.to_dict()['id']
        )
        db.session.add(member)
        db.session.commit()
        return server.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@server_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_server(id):
    form = EditServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server = Server.query.get(int(id))
        server.name = form.data['name']
        server.image_url = form.data['image_url']
        db.session.commit()

        return server.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@server_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_server(id):
    server = Server.query.get(int(id))
    db.session.delete(server)
    db.session.commit()
    return {"result": "success"}


@server_routes.route('/<int:serverid>/members/<int:userid>', methods=['POST'])
@login_required
def edit_members(serverid, userid):
    user = User.query.get(int(userid))
    server = Server.query.get(int(serverid))
    if user and user not in server.members:
        member = Member(
            user_id=userid,
            server_id=serverid
        )
        db.session.add(member)
        db.session.commit()
        return server.to_dict()

    return {'errors': "bad user data"}


@server_routes.route('/<int:serverid>/members/<int:userid>', methods=['DELETE'])
@login_required
def delete_member(serverid, userid):
    user = User.query.get(int(userid))
    server = Server.query.get(int(serverid))
    if user in server.members:
        member = Member.query.filter(
            userid == Member.user_id and serverid == Member.server_id)[0]
        db.session.delete(member)
        db.session.commit()
        return {"result": "success"}
    return {"result": "failed"}
