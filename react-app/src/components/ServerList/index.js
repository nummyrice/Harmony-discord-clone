import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as serverActions from "../../store/servers";

import style from "./serversList.module.css";
import logo from "./images/white-logo.png";

export default function ServersList({ setServerActive }) {
  const dispatch = useDispatch();
  const servers = useSelector((state) => Object.values(state.servers));

  useEffect(() => {
    dispatch(serverActions.getServersThunk());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <NavLink className={style.home} to={"/servers/@me"}>
        <img className={style.directMessages} src={logo} />
      </NavLink>
      {servers?.map((server) => {
        if (!server.private) {
          return (
            <NavLink
              to={`/servers/${server.id}`}
              className={style.serverWrapper}
              key={server.id}
            >
              <img className={style.serverImg} src={server.image_url} />
            </NavLink>
          );
        }
      })}
      <button className={style.newServer} onClick={() => setServerActive(true)}>
        <div className={style.newWrapper}>
          <div className={style.addServer}>+</div>
        </div>
      </button>
    </div>
  );
}
