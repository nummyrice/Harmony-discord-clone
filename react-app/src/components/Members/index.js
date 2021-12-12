import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import style from "./members.module.css";
import * as serverActions from "../../store/servers";
import { useParams } from "react-router-dom";
import Member from "./member";
export default function Members() {
  const { serverId, channelId } = useParams();
  const dispatch = useDispatch();
  const server = useSelector((state) => state.servers[serverId]);
  const members = useSelector((state) => state.servers[serverId]?.member_list);

  if (!server) dispatch(serverActions.getServersThunk());
  return (
    <aside className={style.main}>
      <h5>MEMBERS - {members ? members.length : 0}</h5>
      {members?.map((member) => (
        <Member
          key={member.id}
          owner_id={server?.owner_id}
          member={member}
          card={true}
        />
      ))}
    </aside>
  );
}
