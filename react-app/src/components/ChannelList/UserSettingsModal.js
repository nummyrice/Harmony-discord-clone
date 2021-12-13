import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as serverActions from "../../store/servers";
import style from "./ChannelList.module.css";
import LogoutButton from '../../components/auth/LogoutButton'

const UserSettingsModal = () => {
  const { serverId } = useParams();
  const dispatch = useDispatch();
  const server = useSelector((state) => state.servers[serverId]);
  const sessionUser = useSelector((state) => state.session.user);

  // useEffect(() => {
  //     dispatch(serverActions.getServersThunk())
  // }, [dispatch]);

  // if (JSON.stringify(channels) === '{}') {
  //     dispatch(serverActions.getChannelsThunk(+serverId))
  // }
  // console.log('SESSION USER----: ', +sessionUser.id)
  // console.log('SERVER OWNER----: ', +server?.owner_id)

  const settingsAvatar = document.getElementById("settingsAvatar");

  if (!sessionUser?.image_url) {
    settingsAvatar?.classList.add(style.sampleProfileImage);
  }

  const closeUserModal = (e) => {
    const openUserSettings = document.getElementById("userSettingsModal");

    if (openUserSettings?.classList.contains(style.userSettingsModalBgActive)) {
      openUserSettings.classList.remove(style.userSettingsModalBgActive);
    }
  };

  return (
    <div
      id="userSettingsModal"
      className={style.userSettingsModalBg}
      onClick={closeUserModal}
    >
      <div className={style.userSettingsModal}>
        <div
          className={style.userSettingsWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>My Account</h2>
          <div>
            <div className={style.decoHeader}>
            </div>
            <div className={style.userHeading}>
              <div className={style.userContent}>
                <div className={style.userLabels}>
                  <div id="settingsAvatar" className={style.settingsAvatar} style={{
                      backgroundImage: "url(" + sessionUser?.image_url + ")",
                    }}
                  ></div>
                  <div className={style.userTitle}>
                    <h2>{sessionUser?.username}</h2>
                    <h2>#{sessionUser?.id}</h2>
                  </div>
                </div>
                <LogoutButton />
              </div>
              <div className={style.futureEdit}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsModal;
