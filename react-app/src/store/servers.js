//Server consts
const GET_SERVERS = "servers/GET_SERVERS";
const POST_SERVER = "servers/POST_SERVER";
const EDIT_SERVER = "servers/EDIT_SERVER";
const DELETE_SERVER = "servers/DELETE_SERVER";

//Member consts
const POST_MEMBER = "members/POST_MEMBER";
const DELETE_MEMBER = "members/DELETE_MEMBER";

// Channel Consts
const GET_CHANNELS = "servers/GET_CHANNELS";
const POST_CHANNEL = "servers/POST_CHANNEL";
const EDIT_CHANNEL = "servers/EDIT_CHANNEL";
const DELETE_CHANNEL = "servers/DELETE_CHANNEL";

// Messages Consts
const GET_MESSAGES = "servers/GET_MESSAGES";
const POST_MESSAGE = "servers/POST_MESSAGE";
const EDIT_MESSAGE = "servers/EDIT_MESSAGE";
const DELETE_MESSAGE = "servers/DELETE_MESSAGE";

//Server actions
const getServers = (servers) => ({
  type: GET_SERVERS,
  servers,
});
export const postServer = (server) => ({
  type: POST_SERVER,
  server,
});
export const editServer = (server) => ({
  type: EDIT_SERVER,
  server,
});
export const deleteServer = (serverId) => ({
  type: DELETE_SERVER,
  serverId,
});

//Member actions
const postMember = (server) => ({
  type: POST_MEMBER,
  server,
});
const deleteMember = (server) => ({
  type: DELETE_MEMBER,
  server,
});

// Channel Actions
const getChannels = (channels, serverId) => ({
  type: GET_CHANNELS,
  channels,
  serverId,
});
export const postChannel = (channel) => ({
  type: POST_CHANNEL,
  channel,
});
export const editChannel = (channel) => ({
  type: EDIT_CHANNEL,
  channel,
});
export const deleteChannel = (channel) => ({
  type: DELETE_CHANNEL,
  channel,
});

// Messages Actions
const getMessages = (messages, server_id) => ({
  type: GET_MESSAGES,
  messages,
  server_id,
});
export const postMessage = (message, server_id) => ({
  type: POST_MESSAGE,
  message,
  server_id,
});
export const editMessage = (message, server_id) => ({
  type: EDIT_MESSAGE,
  message,
  server_id,
});
export const deleteMessage = (message) => ({
  type: DELETE_MESSAGE,
  message,
});

//Server Thunks
export const getServersThunk = () => async (dispatch) => {
  const response = await fetch(`/api/servers/`);
  const data = await response.json();
  dispatch(getServers(data.servers));
  return data.servers;
};

export const postServerThunk = (server) => async (dispatch) => {
  const { name, image_url, isPrivate } = server;
  console.log('image_url', image_url)
  const response = await fetch(`/api/servers/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      image_url,
      private: isPrivate,
    }),
  });
  const data = await response.json();
  console.log('after fetch', data)
  dispatch(postServer(data));
  return data;
};
export const editServerThunk = (server) => async (dispatch) => {
  const { name, image_url, id } = server;
  const response = await fetch(`/api/servers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      image_url,
    }),
  });
  const data = await response.json();
  dispatch(editServer(data));

  return data;
};

export const deleteServerThunk = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  dispatch(deleteServer(data));
  return data;
};

//Member thunks
export const postMemberThunk = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  const response2 = await fetch(`/api/servers/`);
  const data2 = await response2.json();
  dispatch(getServers(data2.servers));
  dispatch(postMember(data));
  return data;
};
export const postPrivateMemberThunk =
  (serverId, memberId) => async (dispatch) => {
    const response = await fetch(
      `/api/servers/${serverId}/members/${memberId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(postMember(data));
    return data;
  };

export const deleteMemberThunk = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}/members`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  const response2 = await fetch(`/api/servers/`);
  const data2 = await response2.json();
  dispatch(getServers(data2.servers));
  dispatch(deleteMember(data));
  return data;
};

// Channel Thunks
export const getChannelsThunk = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`);
  const data = await response.json();

  dispatch(getChannels(data.channels));
  return data;
};

export const postChannelThunk = (channel) => async (dispatch) => {
  const { name, server_id } = channel;
  const response = await fetch(`/api/servers/${server_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });
  const data = await response.json();
  dispatch(postChannel(data));
  return data;
};

export const editChannelThunk = (channel) => async (dispatch) => {
  const { name, server_id, id } = channel;
  const response = await fetch(`/api/servers/${server_id}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });
  const data = await response.json();
  dispatch(editChannel(data));
  return data;
};

export const deleteChannelThunk = (channel) => async (dispatch) => {
  const { server_id, id } = channel;
  const response = await fetch(`/api/servers/${server_id}/${id}`, {
    method: "DELETE",
  });
  dispatch(deleteChannel(channel));
  return channel;
};

// Message Thunks
export const getMessagesThunk = (message) => async (dispatch) => {
  const { server_id, channel_id } = message;
  const response = await fetch(`/api/servers/${server_id}/${channel_id}`);
  const data = await response.json();

  dispatch(getMessages(data.messages, server_id));
  return data;
};

export const postMessageThunk = (message) => async (dispatch) => {
  const { content, server_id, channel_id } = message;
  const response = await fetch(`/api/servers/${server_id}/${channel_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    }),
  });
  const data = await response.json();
  dispatch(postMessage(data, server_id));
  return data;
};

export const editMessageThunk = (message) => async (dispatch) => {
  const { content, server_id, channel_id, message_id } = message;
  const response = await fetch(
    `/api/servers/${server_id}/${channel_id}/${message_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    }
  );
  const data = await response.json();
  dispatch(editMessage(data, server_id));
  return data;
};

export const deleteMessageThunk = (message) => async (dispatch) => {
  const { server_id, channel_id, message_id } = message;
  const response = await fetch(
    `/api/servers/${server_id}/${channel_id}/${message_id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  dispatch(deleteMessage(message));
  return data;
};

export default function serverReducer(state = {}, action) {
  let serverId;
  const newState = { ...state };
  switch (action.type) {
    case GET_SERVERS:
      for (let server of action.servers) {
        newState[server.id] = server;
      }
      return newState;
    case POST_SERVER:
      return { ...state, [action.server.id]: action.server };
    case EDIT_SERVER:
      newState[[action.server.id]] = action.server;
      return newState;
    case DELETE_SERVER:
      delete newState[action.serverId];
      return newState;
    case POST_MEMBER:
      serverId = action.server.id;
      if (serverId) {
        newState[serverId].members = action.server.members;
        newState[serverId].member_list = action.server.member_list;
      }
      return newState;
    case DELETE_MEMBER:
      serverId = action.server.id;
      if (serverId) {
        newState[serverId].members = action.server.members;
        newState[serverId].member_list = action.server.member_list;
      }
      return newState;
    case GET_CHANNELS:
      for (let channel of action.channels) {
        if (newState[channel.server_id]) {
          // console.log('newState from reducer: ', newState[channel.server_id]);
          newState[channel.server_id].channels[channel.id] = channel;
          // console.log('channel from reducer-----: ', channel);
        }
      }
      return newState;
    case POST_CHANNEL:
      if (newState[action.channel.server_id]) {
        newState[action.channel.server_id].channels[action.channel.id] =
          action.channel;
      }
      return newState;
    case EDIT_CHANNEL:
      if (newState[action.channel.server_id]) {
        newState[action.channel.server_id].channels[action.channel.id] =
          action.channel;
      }
      return newState;
    case DELETE_CHANNEL:
      if (newState[action.channel.server_id]) {
        delete newState[action.channel.server_id].channels[action.channel.id];
      }
      return newState;
    case GET_MESSAGES:
      for (let message of action.messages) {
        if (
          newState[action.server_id] &&
          newState[action.server_id].channels[message.channel_id]
        ) {
          newState[action.server_id].channels[message.channel_id].messages[
            message.id
          ] = message;
        }
      }
      return newState;
    case POST_MESSAGE:
      if (
        newState[action.server_id] &&
        newState[action.server_id].channels[action.message.channel_id]
      ) {
        newState[action.server_id].channels[action.message.channel_id].messages[
          action.message.id
        ] = action.message;
      }
      return newState;
    case EDIT_MESSAGE:
      if (
        newState[action.server_id] &&
        newState[action.server_id].channels[action.message.channel_id]
      ) {
        newState[action.server_id].channels[action.message.channel_id].messages[
          action.message.id
        ] = action.message;
      }
      return newState;
    case DELETE_MESSAGE:
      if (
        newState[action.message.server_id] &&
        newState[action.message.server_id].channels[action.message.channel_id]
      ) {
        delete newState[action.message.server_id].channels[
          action.message.channel_id
        ].messages[action.message.message_id];
      }
      return newState;
    default:
      return state;
  }
}
