import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ServersList from "../ServerList";

import style from "./servers.module.css";

export default function Servers() {
  return (
    <main className={style.main}>
      <div className={style.div1}>
        <ServersList />
      </div>
      <div className={style.div2}></div>
      <div className={style.div3}>
        <div className={style.div4}></div>
        <div></div>
        <div></div>
      </div>
    </main>
  );
}
