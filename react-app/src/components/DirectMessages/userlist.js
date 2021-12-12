import React, { useState, useEffect } from "react";

import style from "./directmessages.module.css";
import Member from "../Members/member";
import * as serverActions from "../../store/servers";
import { useDispatch, useSelector } from "react-redux";

export default function UserList() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const servers = useSelector((state) => state.servers);
  const session = useSelector((state) => state.session);

  let privateServers;
  if (servers) {
    privateServers = Object.values(servers).filter((server) => server.private);
  }
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/@me");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);
  function hasMember(member) {
    return privateServers.find((server) =>
      server.member_list.find((user) => +user.id === +member.id)
    );
  }
  async function privateServer(member) {
    if (hasMember(member)) return;

    let server = await dispatch(
      serverActions.postServerThunk({
        name: "Your Direct Message",
        isPrivate: true,
        owner_id: session.id,
      })
    );
    dispatch(serverActions.postPrivateMemberThunk(server.id, member.id));
    dispatch(
      serverActions.postChannelThunk({
        name: "Direct Message",
        server_id: server.id,
      })
    );
    dispatch(serverActions.getServersThunk());
  }

  return (
    <div className={style.main}>
      {users?.map((member) => {
        if (+member.id !== +session.user.id && !hasMember(member)) {
          return (
            <div key={member.id} onClick={() => privateServer(member)}>
              <Member member={member} />
            </div>
          );
        }
      })}
    </div>
  );
}
