import React, { useState, useEffect } from "react";

import style from "./directmessages.module.css";
import * as serverActions from "../../store/servers";
import { useDispatch, useSelector } from "react-redux";
import Member from "../Members/member";
import { Link } from "react-router-dom";
import UserDetails from "../ChannelList/UserDetails";
export default function DMList() {
  const dispatch = useDispatch();
  const servers = useSelector((state) => state.servers);
  const session = useSelector((state) => state.session);

  let privateServers;
  if (servers) {
    privateServers = Object.values(servers).filter((server) => server.private);
  }
  function privateServer(server) {
    const otherMember = server.member_list.find(
      (member) => +session.user.id !== +member.id
    );

    if (otherMember) {
      let channel = Object.values(server.channels)[0];
      return (
        <Link
          key={otherMember.id}
          to={`/servers/@me/${server.id}/${channel.id}`}
        >
          <Member member={otherMember} />
        </Link>
      );
    }
  }

  return (
    <div class={style.privateServerList}>
      <div>
        <div className={style.dmlistHeader}></div>
        <h3>DIRECT MESSAGES</h3>
        {privateServers?.map(privateServer)}
      </div>
      <UserDetails />
    </div>
  );
}
