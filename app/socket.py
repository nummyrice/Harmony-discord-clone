from flask_socketio import SocketIO

socketio = SocketIO(cors_allowed_origins="*")


def handle_add_server(data):
    socketio.emit("add_server", data, broadcast=True)


def handle_edit_server(data):
    socketio.emit("edit_server", data, broadcast=True)


def handle_delete_server(data):
    socketio.emit("delete_server", data, broadcast=True)


def handle_add_channel(data):
    socketio.emit("add_channel", data, broadcast=True)


def handle_edit_channel(data):
    socketio.emit("edit_channel", data, broadcast=True)


def handle_delete_channel(data):
    socketio.emit("delete_channel", data, broadcast=True)


def handle_add_message(data, server_id):
    print(server_id)
    socketio.emit("add_message", {"data": data,
                  "server_id": server_id}, broadcast=True)


def handle_edit_message(data, server_id):
    socketio.emit("edit_message", {"data": data,
                  "server_id": server_id}, broadcast=True)


def handle_delete_message(data, server_id):
    socketio.emit("delete_message", {"data": data,
                  "server_id": server_id}, broadcast=True)
