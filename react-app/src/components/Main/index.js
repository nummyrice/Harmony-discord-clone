import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import style from "./servers.module.css";
import Members from "../Members";
import Header from "../Header";
export default function Servers() {
  return (
    <main className={style.main}>
      <div className={style.div1}></div>
      <div className={style.div2}></div>
      <div className={style.div3}>
        <Route path="/servers/:serverId">
          <Header />
        </Route>
        <div></div>
        <Route path="/servers/:serverId">
          <Members />
        </Route>
      </div>
    </main>
  );
}
