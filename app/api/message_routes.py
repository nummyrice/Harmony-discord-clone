from app.forms.edit_message_form import EditMessageForm
from .auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Message, Server, User, Member, server, db
from app.forms import NewMessageForm
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
            content = form.data["content"],
            channel_id = channelId,
            owner_id = 1
        )
        db.session.add(message)
        db.session.commit()
        return message.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@message_routes.route('/<int:serverId>/<int:channelId>/<int:messageId>', methods=['PUT'])
@login_required
def edit_message(serverId, channelId, messageId):
    form = EditMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    message = Message.query.get(int(messageId))

    if form.validate_on_submit() and message.owner_id == session.id:
        message.content = form.data['content']

        db.session.commit()

        return message.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@message_routes.route('/<int:serverId>/<int:channelId>/<int:messageId>', methods=['DELETE'])
@login_required
def delete_message(serverId, channelId, messageId):
    message = Message.query.get(int(messageId))
    if message.owner_id == session.id:
        db.session.delete(message)
        db.session.commit()
        return {"result": "success"}
