import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import * as serverActions from "../../store/servers";
import style from "./ChannelList.module.css";

const ChannelList = () => {
    const {serverId} = useParams();
    const dispatch = useDispatch();
    const servers = useSelector(state => (state.servers));
    const channels = useSelector(state => (state.servers[serverId]?.channels));

    useEffect(() => {
        dispatch(serverActions.getServersThunk())
    }, [dispatch]);

    if (!channels) {
        dispatch(serverActions.getChannelsThunk(+serverId))
    }

    return (
        <div>
            <div className={style.channel_heading}>
                { channels && Object.values(channels).map((channel) => {
                    return (
                        <li key={channel.id}>
                            <button>{channel.name}</button>
                        </li>
                    );
                })}
            </div>

        </div>
    );
}

export default ChannelList;
