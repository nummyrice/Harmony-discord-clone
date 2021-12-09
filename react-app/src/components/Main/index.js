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
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import * as serverActions from "../../store/servers";

let socket;

export default function Servers() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const [serverActive, setServerActive] = useState(false);
  useEffect(() => {
    socket = io();
    socket.on("add_server", (server) => {
      if (server.members.includes(session.user.id))
        dispatch(serverActions.postServer(server));
    });
    socket.on("edit_server", (server) => {
      if (server.members.includes(session.user.id))
        dispatch(serverActions.editServer(server));
    });
    socket.on("delete_server", (server) => {
      if (server.members.includes(session.user.id))
        dispatch(serverActions.deleteServer(server));
    });
    socket.on("add_channel", (channel) => {
      dispatch(serverActions.postChannel(channel));
    });
    socket.on("edit_channel", (channel) => {
      dispatch(serverActions.editChannel(channel));
    });
    socket.on("delete_channel", (channel) => {
      dispatch(serverActions.deleteChannel(channel));
    });
    socket.on("add_message", (message) => {
      dispatch(serverActions.postMessage(message));
    });
    socket.on("edit_message", (message) => {
      dispatch(serverActions.editMessage(message));
    });
    socket.on("delete_message", (message) => {
      dispatch(serverActions.deleteMessage(message));
    });
    return () => {
      socket.disconnect();
    };
  }, []);
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
