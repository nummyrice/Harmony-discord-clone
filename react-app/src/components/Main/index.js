import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ServersList from "../ServerList";

import style from "./servers.module.css";

export default function Servers() {

  const [serverActive, setServerActive] = useState(false);
  function addServerFunc () {
    return (
      <>
        <div
          className={style.serverModalContainer}
          onClick={() => setServerActive(false)}
        ></div>
        <div className={style.addServer}>
          asndlnasd
        </div>
      </>
    )
  }
  return (
    <main className={style.main}>
      {serverActive && (
        addServerFunc()
      )}
      <div className={style.div1}>
        <ServersList setServerActive = {setServerActive} />
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
