import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { BrowserRouter, Route, Switch, useParams, Link } from "react-router-dom";
import * as serverActions from "../../store/servers";
import style from "./ChannelList.module.css";

const ServerDetails = () => {
    const {serverId} = useParams();
    const dispatch = useDispatch();
    const server = useSelector(state => (state.servers[serverId]));

    useEffect(() => {
        dispatch(serverActions.getServersThunk())
    }, [dispatch]);

    // if (JSON.stringify(channels) === '{}') {
    //     dispatch(serverActions.getChannelsThunk(+serverId))
    // }
    console.log('CURRENT SERVER----: ', server)

    return (
        <div className={style.serverDetailsWrapper}>
            <div>
                <p>{server?.name}</p>
                <p>X</p>
            </div>
            <div className={style.serverSettingsMenu}>
                <p>Settings</p>
            </div>
        </div>
    );
}

export default ServerDetails;
