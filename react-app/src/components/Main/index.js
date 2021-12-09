import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChannelList from "../ChannelList";
import style from "./servers.module.css";
import ChannelMessages from "../Messages";
import UserList from "../DirectMessages/userlist";
import ServersList from "../ServerList";
import DMList from "../DirectMessages/dmlist";
import Members from "../Members";
import Header from "../Header";
import DirectMessages from "../DirectMessages";

export default function Servers() {
  const [serverActive, setServerActive] = useState(false);
  function addServerFunc() {
    return (
      <>
        <div
          className={style.serverModalBackground}
          onClick={() => setServerActive(false)}
        ></div>
        <div className={style.serverModalContainer}>
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
                fill="currentColor"
                d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
              ></path>
            </svg>
          </div>
          <div className={style.subheading}>
            Your server is where you and your friends hang out. Make it yours
            and start talking.
          </div>
        </div>
      </>
    );
  }

  return (
    <main className={style.main}>
      {serverActive && addServerFunc()}
      <div className={style.div1}>
        <ServersList setServerActive={setServerActive} />
      </div>
      <div className={style.div2}>
        <Switch>
          <Route path="/servers/@me">
            <DMList />
          </Route>
          <Route path="/servers/:serverId">
            <ChannelList />
          </Route>
        </Switch>
      </div>
      <div className={style.div3}>
        <Switch>
          <Route exact path="/servers/@me">
            <DirectMessages />
          </Route>
          <Route path={["/servers/:serverId/:channelId"]}>
            <Header />
          </Route>
        </Switch>
        <Switch>
          <Route exact path={["/servers/@me"]}>
            <UserList />
          </Route>
          <Route exact path={"/servers/:serverId"}>
            <div></div>
          </Route>
          <Route path="/servers/:serverId/:channelId">
            <ChannelMessages />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/servers/@me">
            <div className={style.div10}></div>
          </Route>
          <Route path={["/servers/@me/:serverId", "/servers/:serverId"]}>
            <Members />
          </Route>
        </Switch>
      </div>
    </main>
  );
}
