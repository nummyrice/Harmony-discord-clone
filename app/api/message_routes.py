from app.forms.edit_message_form import EditMessageForm
from .auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Message, Server, User, Member, server, db
from app.forms import NewMessageForm
from app.socket import handle_add_message, handle_edit_message, handle_delete_message

message_routes = Blueprint('messages', __name__)


@message_routes.route('/<int:serverId>/<int:channelId>')
@login_required
def messages(serverId, channelId):
    messages = Message.query.filter(Message.channel_id == channelId).all()

    return {'messages': [message.to_dict() for message in messages]}


@message_routes.route('/<int:serverId>/<int:channelId>', methods=['POST'])
@login_required
def new_message(serverId, channelId):
    form = NewMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message = Message(
            content=form.data["content"],
            channel_id=channelId,
            owner_id=current_user.id
        )
        server = Server.query.get(int(serverId))
        serverinfo = server.to_dict()
        db.session.add(message)
        db.session.commit()
        handle_add_message(message.to_dict(), serverinfo["id"])
        return message.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@message_routes.route('/<int:serverId>/<int:channelId>/<int:messageId>', methods=['PUT'])
@login_required
def edit_message(serverId, channelId, messageId):
    form = EditMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    message = Message.query.get(int(messageId))

    if form.validate_on_submit() and message.owner_id == current_user.id:
        message.content = form.data['content']
        server = Server.query.get(int(serverId))
        serverinfo = server.to_dict()
        db.session.commit()
        handle_edit_message(message.to_dict(), serverinfo["id"])

        return message.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@message_routes.route('/<int:serverId>/<int:channelId>/<int:messageId>', methods=['DELETE'])
@login_required
def delete_message(serverId, channelId, messageId):
    message = Message.query.get(int(messageId))
    if message.owner_id == current_user.id:
        server = Server.query.get(int(serverId))
        serverinfo = server.to_dict()
        handle_delete_message(message.to_dict(), serverinfo["id"])
        db.session.delete(message)
        db.session.commit()
        return {"result": "success"}
