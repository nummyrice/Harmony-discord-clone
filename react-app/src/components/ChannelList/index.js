import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, createSelectorHook } from "react-redux";
import { useParams, Link, Redirect } from "react-router-dom";
import * as serverActions from "../../store/servers";
import CreateChannel from "../CreateChannel";
import DeleteChannel from "../DeleteChannel";
import EditChannel from "../EditChannel";
import style from "./ChannelList.module.css";
import ServerDetails from "./ServerDetails";
import UserDetails from "./UserDetails";

const ChannelList = () => {
  const { serverId, channelId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.servers?.[serverId]);
  let channels = useSelector((state) => state.servers?.[serverId]?.channels);

  console.log("CHANNEL ID!!!-----: ", channelId);

  const [channelModalActive, setChannelModalActive] = useState(false);
  const [editChannelModalActive, setEditChannelModalActive] = useState(false);

  if (server && JSON.stringify(channels) === "{}" && !channelId) {
    dispatch(serverActions.getChannelsThunk(+serverId));
  }
  if (!server) {
    return <Redirect to="/servers/@me" />;
  }
  if (channels && !channelId && JSON.stringify(channels) !== "{}") {
    let firstChannel = Object.values(channels)[0];
    return <Redirect to={`/servers/${serverId}/${firstChannel?.id}`} />;
  }

  const channelIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" class="icon-1DeIlz">
      <path
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"
      ></path>
    </svg>
  );

  const editChannelIcon = (
    <svg aria-hidden="false" width="14" height="14" viewBox="0 0 24 24">
      <path
        clip-rule="evenodd"
        d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
      ></path>
    </svg>
  );

  const newChannelIcon = (
    <svg
      class="addButtonIcon-2CbG1X"
      aria-hidden="false"
      width="14"
      height="14"
      viewBox="0 0 18 18"
    >
      <polygon points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon>
    </svg>
  );

  // const channelSettings = document.getElementById("editChannelModal");

  let newChannelBtn;
  let editChannelBtn;
  // let editBtn;

  // const openChannelEdit = () => {
  //   if (!channelSettings?.classList.contains(style.channelSettingsBgActive)) {
  //     console.log('made it to channel edit!!!');
  //     channelSettings?.classList.add('channelSettingsBgActive');
  //     <EditChannelModal />
  //   }
  // };

  if (+sessionUser?.id === +server?.owner_id) {
    newChannelBtn = (
      <div
        className={style.createChannelIcon}
        onClick={() => {
          setChannelModalActive(true);
        }}
      >
        {newChannelIcon}
      </div>
    );

    // let editBtn = document.getElementById(`channelEditBtn-${channelId}`);

    editChannelBtn = (
      <div
        id={`channelEditBtn-${channelId}`}
        onClick={() => {
          setEditChannelModalActive(true);
        }}
      >
        {editChannelIcon}
      </div>
    );
  }

  // function editServerFunc() {
  //   return (
  //     <>
  //       <div
  //         className={style.channelModalBackground}
  //         onClick={() => setEditChannelModalActive(false)}
  //       ></div>
  //       <div id='channelModal' className={style.channelModalContainer}>
  //         <div className={style.channelModalWrapper}>
  //             <div className={style.newChannelModalHeading}>
  //                 <h2>Edit Server</h2>
  //             </div>
  //             <EditServer setEditChannelModalActive={setEditChannelModalActive}/>
  //           <div
  //             className={style.channelsCloseModal}
  //             onClick={() => setEditChannelModalActive(false)}
  //           >
  //             <svg
  //               className={style.channelsCloseX}
  //               aria-hidden="false"
  //               width="24"
  //               height="24"
  //               viewBox="0 0 24 24"
  //             >
  //               <path d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
  //             </svg>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  function editChannelFunc() {
    return (
      <>
        <div
          className={style.channelModalBackground}
          onClick={() => setEditChannelModalActive(false)}
        ></div>
        <div id="channelModal" className={style.channelModalContainer}>
          <div className={style.channelModalWrapper}>
            <div className={style.newChannelModalHeading}>
              <h2>Edit Channel Name</h2>
              <p>in Text Channels</p>
            </div>
            <EditChannel
              setEditChannelModalActive={setEditChannelModalActive}
            />
            <div
              className={style.channelsCloseModal}
              onClick={() => setEditChannelModalActive(false)}
            >
              <svg
                className={style.channelsCloseX}
                aria-hidden="false"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </>
    );
  }

  function addChannelFunc() {
    return (
      <>
        <div
          className={style.channelModalBackground}
          onClick={() => setChannelModalActive(false)}
        ></div>
        <div id="channelModal" className={style.channelModalContainer}>
          <div className={style.channelModalWrapper}>
            <div className={style.newChannelModalHeading}>
              <h2>Create Text Channel</h2>
              <p>in Text Channels</p>
            </div>
            <CreateChannel setChannelModalActive={setChannelModalActive} />
            <div
              className={style.channelsCloseModal}
              onClick={() => setChannelModalActive(false)}
            >
              <svg
                className={style.channelsCloseX}
                aria-hidden="false"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={style.channelComponentWrapper}>
      {channelModalActive && addChannelFunc()}
      {editChannelModalActive && editChannelFunc()}
      <ServerDetails />
      <div className={style.channelListWrapper}>
        <div className={style.channelHeader}>
          <p>Channels</p>
          {newChannelBtn}
        </div>
        {channels &&
          channelId &&
          Object.values(channels).map((channel) => {
            return (
              <div key={channel.id}>
                <div>
                  <Link
                    id={`channel-${channel.id}`}
                    to={`/servers/${serverId}/${channel.id}`}
                    className={style.channelLink}
                  >
                    <div className={style.channelLinkContent}>
                      <div className={style.channelIcon}>{channelIcon}</div>
                      <p>{channel.name}</p>
                    </div>
                    <div className={style.channelControls}>
                      {editChannelBtn}
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
      <UserDetails />
    </div>
  );
};

export default ChannelList;
