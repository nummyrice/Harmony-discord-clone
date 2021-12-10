from app.socket import handle_add_channel, handle_edit_channel, handle_delete_channel
from .auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Channel, Server, User, Member, channel, server, db
from app.forms import NewChannelForm, EditChannelForm
channel_routes = Blueprint('channels', __name__)


@channel_routes.route('/<int:id>')
@login_required
def channels(id):
    channels = Channel.query.filter(Channel.server_id == id).all()

    return {'channels': [channel.to_dict() for channel in channels]}


@channel_routes.route('/<int:id>', methods=['POST'])
@login_required
def new_channel(id):
    server = Server.query.get(int(id))
    form = NewChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and server.owner_id == current_user.id:
        channel = Channel(
            name=form.data['name'],
            server_id=id
        )
        db.session.add(channel)
        db.session.commit()
        handle_add_channel(channel.to_dict(), server.todict().id)
        return channel.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@channel_routes.route('/<int:serverId>/<int:channelId>', methods=['PUT'])
@login_required
def edit_channel(serverId, channelId):
    server = Server.query.get(int(serverId))
    form = EditChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and server.owner_id == current_user.id:
        channel = Channel.query.get(int(channelId))
        channel.name = form.data['name']
        db.session.commit()
        handle_edit_channel(channel.to_dict())

        return channel.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@channel_routes.route('/<int:serverId>/<int:channelId>', methods=['DELETE'])
@login_required
def delete_channel(serverId, channelId):
    server = Server.query.get(int(serverId))
    if server.owner_id == current_user.id:
        channel = Channel.query.get(int(channelId))
        handle_delete_channel(channel.to_dict())
        db.session.delete(channel)
        db.session.commit()
    return {"result": "success"}
