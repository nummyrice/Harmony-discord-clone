import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./messages.module.css";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as serverActions from '../../store/servers.js';

function Message() {
    return (
        <div></div>
    )
}

export default function ChannelMessages() {
    const {serverId, channelId} = useParams();
    // const channelMessages = useSelector(state => state);
    const dispatch = useDispatch()
    // console.log('///////////////')
    // console.log(serverId, channelId);
    useEffect(() => {
        dispatch(serverActions.getServersThunk())
        //   .then(() => dispatch(serverActions.getChannelsThunk(serverId)))
        //   .then(() =>
        //     dispatch(
        //       serverActions.getMessagesThunk({ server_id: serverId, channel_id: channelId })
        //     )
        //   )
      }, [dispatch])

    // console.log('///////////////')
    // console.log(channelMessages);
    // useEffect()
    return (
        <div>
            <div className={style.channel_welcome}></div>
                <img className={style.channel_image}/>
                <div className={style.channel_welcome_message}></div>
        </div>
    )
}
