import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { BrowserRouter, Route, Switch, useParams, Link } from "react-router-dom";
import * as serverActions from "../../store/servers";
import style from "./ChannelList.module.css";

const UserSettingsModal = () => {
    const {serverId} = useParams();
    const dispatch = useDispatch();
    const server = useSelector(state => (state.servers[serverId]));
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(serverActions.getServersThunk())
    }, [dispatch]);

    // if (JSON.stringify(channels) === '{}') {
    //     dispatch(serverActions.getChannelsThunk(+serverId))
    // }
    console.log('SESSION USER----: ', +sessionUser.id)
    console.log('SERVER OWNER----: ', +server?.owner_id)

    const settingsAvatar = document.getElementById('settingsAvatar');

    if (!sessionUser.image_url) {
        settingsAvatar?.classList.add(style.sampleProfileImage);
    }

    return (
        // <div className={style.userDetailsWrapper}>
        //     <div className={style.userDetailsContent}>
        //         <div id='channelListAvatar' className={style.userProfileImage} style={{backgroundImage:'url(' + sessionUser.image_url + ')'}}></div>
        //         <div>
        //             <p className={style.detailsUsername}>{sessionUser.username}</p>
        //             <p className={style.detailsId}>#{sessionUser.id}</p>
        //         </div>
        //     </div>
        //     <div className={style.userDetailsSettingsBtn}>
        //         {userSettingsIcon}
        //         <div className={style.settingsTooltip}>User Settings</div>
        //     </div>
        // </div>
        <div className={style.userSettingsModalBg}>
            <div className={style.userSettingsModal}>
                <div className={style.userSettingsWrapper}>
                    <h2>
                        My Account
                    </h2>
                    <div>
                        <div className={style.userContent}>
                            <div div id='settingsAvatar' className={style.userProfileImage} style={{backgroundImage:'url(' + sessionUser.image_url + ')'}}></div>
                            <div className={style.deleteUserBtn}>Delete Account</div>
                        </div>
                        {/* <div className={style.userDetailsContent}>
                            <div id='channelListAvatar' className={style.userProfileImage} style={{backgroundImage:'url(' + sessionUser.image_url + ')'}}></div>
                            <div>
                                <p className={style.detailsUsername}>{sessionUser.username}</p>
                                <p className={style.detailsId}>#{sessionUser.id}</p>
                            </div>
                        </div>
                        <div className={style.userDetailsSettingsBtn}>
                            {userSettingsIcon}
                            <div className={style.settingsTooltip}>User Settings</div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserSettingsModal;
