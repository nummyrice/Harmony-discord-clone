import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChannelList from "../ChannelList";
import style from "./servers.module.css";
import ChannelMessages from "../Messages";
import arrow from './assets/discord-arrow.svg';

import ServersList from "../ServerList";
import CreateServer from "../CreateServer";

import Members from "../Members";
import Header from "../Header";
export default function Servers() {
  const [serverActive, setServerActive] = useState(false);
  const [createNewServer, setCreateNewServer] = useState(false);

  function clickifier() {
    setServerActive(false);
    setCreateNewServer(true);
    return;
  }

  function addServerFunc() {
    return (
      <>
        <div
          className={style.serverModalBackground}
          onClick={() => setServerActive(false)}
        >
        </div>
        <div className={style.serverModalContainer}>
          <div className={style.serverModalWrapper}>
            <div className={style.title}>Create a server</div>
            <div
              className={style.closeModal}
              onClick={() => setServerActive(false)}
            >
              <svg
                className={style.closeX}
                aria-hidden="false"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
                ></path>
              </svg>
            </div>
            <div className={style.subheading}>
              Your server is where you and your friends hang out. Make it yours
              and start talking.
            </div>
            <div
              className={style.createServerContainer}
              onClick={() => clickifier()}
            >
              <div className={style.createServerName}>Create My Own</div>
              <img
                className={style.createServerArrow}
                src={arrow}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  // function newServer() {
  //   return (
  //     <>
  //       <div
  //         className={style.newServerBackground}
  //         onClick={() => setCreateNewServer(false)}
  //       >
  //       </div>
  //       <div className={style.newServerContainer}>
  //         <form className={style.newServerForm}
  //       </div>
  //     </>
  //   )
  // }

  return (
    <main className={style.main}>
      {serverActive && addServerFunc()}
      {createNewServer && (
        <CreateServer
          setCreateNewServer={setCreateNewServer}
          setServerActive={setServerActive}
        />
      )}
      <div className={style.div1}>
        <ServersList setServerActive={setServerActive} />
      </div>
      <div className={style.div2}>
        <Route path='/servers/:serverId'>
          <ChannelList />
        </Route>
      </div>
      <div className={style.div3}>
        <Route path={["/servers/:serverId", "/servers/:serverId/:channelId"]}>
          <Header />
        </Route>
        <Route path="/servers/:serverId/:channelId">
          <ChannelMessages/>
        </Route>
        <Route path={["/servers/:serverId", "/servers/:serverId/:channelId"]}>
          <Members />
        </Route>
      </div>
    </main>
  );
}
