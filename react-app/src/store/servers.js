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

//Server actions
const getServers = (servers) => ({
  type: GET_SERVERS,
  servers,
});
const postServer = (server) => ({
  type: POST_SERVER,
  server,
});
const editServer = (server) => ({
  type: EDIT_SERVER,
  server,
});
const deleteServer = (serverId) => ({
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
const getChannels = (channels) => ({
  type: GET_CHANNELS,
  channels,
});
const postChannel = (channel) => ({
  type: POST_CHANNEL,
  channel,
});
const editChannel = (channel) => ({
  type: EDIT_CHANNEL,
  channel,
});
const deleteChannel = (channel) => ({
  type: DELETE_CHANNEL,
  channel,
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
  dispatch(deleteMember(data));
  return data;
};

// Channel Thunks
export const getChannelsThunk = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`);
  const data = await response.json();
  console.log('channels: !!!!!', data.channels)
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
  const { server_id, id} = channel
  const response = await fetch(`/api/servers/${server_id}/${id}`, {
    method: "DELETE",
  });
  // const data = await response.json();
  dispatch(deleteChannel(channel));
  return channel;
};

export default function serverReducer(state = {}, action) {
  let serverId
  const newState = { ...state };
  switch (action.type) {
    case GET_SERVERS:
      console.log(action.servers);
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
      if (serverId) newState[serverId].members = action.server.members;
      return newState;
    case DELETE_MEMBER:
      serverId = action.server.id;
      if (serverId) newState[serverId].members = action.server.members;
      return newState;
    case GET_CHANNELS:
      for (let channel of action.channels) {
        if (newState[channel.server_id]) {
          newState[channel.server_id].channels[channel.id] = channel
        }
      }
      return newState
    case POST_CHANNEL:
      if (newState[action.channel.server_id]) {
        newState[action.channel.server_id].channels[action.channel.id] = action.channel
      }
      return newState;
    case EDIT_CHANNEL:
      if (newState[action.channel.server_id]) {
        newState[action.channel.server_id].channels[action.channel.id] = action.channel
      }
      return newState;
    case DELETE_CHANNEL:
      console.log('delete channel', action.channel)
      if (newState[action.channel.server_id]) {
        delete newState[action.channel.server_id].channels[action.channel.id]
      }
      return newState;
    default:
      return state;
  }
}