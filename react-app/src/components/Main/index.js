import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import style from "./servers.module.css";
import ChannelMessages from "../Messages";

export default function Servers() {
  return (
    <main className={style.main}>
      <div className={style.div1}></div>
      <div className={style.div2}></div>
      <div className={style.div3}>
        <div className={style.div4}></div>
        <Route path="/servers/:serverId/:channelId" component={ChannelMessages}/>
        <div></div>
      </div>
    </main>
  );
}
