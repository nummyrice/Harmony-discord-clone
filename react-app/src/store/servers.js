//Server consts
const GET_SERVERS = "servers/GET_SERVERS";
const POST_SERVER = "servers/POST_SERVER";
const EDIT_SERVER = "servers/EDIT_SERVER";
const DELETE_SERVER = "servers/DELETE_SERVER";

//Member consts
const POST_MEMBER = "members/POST_MEMBER";
const DELETE_MEMBER = "members/DELETE_MEMBER";

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

export default function serverReducer(state = {}, action) {
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
      let serverId = action.server.id;
      if (serverId) newState[serverId].members = action.server.members;
      return newState;
    case DELETE_MEMBER:
      let serverId = action.server.id;
      if (serverId) newState[serverId].members = action.server.members;
      return newState;
    default:
      return state;
  }
}
