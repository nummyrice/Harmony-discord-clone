import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import style from "./members.module.css";
import * as serverActions from "../../store/servers";
import { useLocation } from "react-router-dom";

export default function Members() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.servers[2]?.member_list);
  useEffect(() => {
    dispatch(serverActions.getServersThunk());
  }, [dispatch]);

  console.log("membersssssss", members);
  return (
    <aside className={style.main}>
      <h5>Members - {members ? members.length : 0}</h5>
      {members?.map(({ image_url, username }) => (
        <>
          <div className={style.div1} tabindex="1">
            <img src={image_url} alt="" />
            <span>{username}</span>
            <div className={style.card}>
              <img src={image_url} alt="" />
              <h3>{username}</h3>
            </div>
          </div>
        </>
      ))}
    </aside>
  );
}
