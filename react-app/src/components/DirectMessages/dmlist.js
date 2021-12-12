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

    let xIcon = (
      <svg
        className={style.xIcon}
        aria-hidden="false"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="rgb(142,146,151)"
          d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
        ></path>
      </svg>
    );
    function removeDm(e, server) {
      e.preventDefault();
      dispatch(serverActions.deleteServerThunk(server?.id));
    }

    if (otherMember) {
      let channel = Object.values(server.channels)[0];
      return (
        <>
          <Link
            key={otherMember.id}
            to={`/servers/@me/${server?.id}/${channel?.id}`}
            style={{ position: "relative" }}
          >
            <Member member={otherMember} />
            <button
              className={style.serverX}
              onClick={(e) => removeDm(e, server)}
            >
              {xIcon}
            </button>
          </Link>
        </>
      );
    }
  }

  return (
    <div class={style.privateServerList}>
      <div>
        <div className={style.dmlistHeader}></div>
        <h3>DIRECT MESSAGES</h3>
        {privateServers && privateServers?.map(privateServer)}
      </div>
      <UserDetails />
    </div>
  );
}
