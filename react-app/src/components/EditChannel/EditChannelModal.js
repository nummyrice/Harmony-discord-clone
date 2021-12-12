import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as serverActions from "../../store/servers";
import "./EditChannel.css";
import EditChannel from "../EditChannel";
import DeleteChannel from "../DeleteChannel";

const EditChannelModal = () => {
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

//   if (!sessionUser.image_url) {
//     settingsAvatar?.classList.add('sampleProfileImage');
//   }

  const closeChannelEditModal = (e) => {
    const openChannelSettings = document.getElementById("editChannelModal");

    if (openChannelSettings?.classList.contains('channelSettingsBgActive')) {
      openChannelSettings.classList.remove('channelSettingsBgActive');
    }
  };

  return (
    <div
      id="editChannelModal"
      className='channelSettingsBg'
      onClick={closeChannelEditModal}
    >
      <div className='channelSettingsModal'>
        <div
          className='channelSettingsWrapper'
          onClick={(e) => e.stopPropagation()}
        >
            {/* <h2>My Account</h2> */}
          <div>
            <div className='userContent'>
                 <EditChannel />
                 {/* <DeleteChannel /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditChannelModal;
