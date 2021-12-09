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



    const serverSettingsMenu = document.getElementById('serverSettingsMenu');
    const serverMenuDropdown = document.getElementById('serverMenuDropdown');
    const serverMenuIcon = document.getElementById('serverMenuIcon');

    const handleServerMenuDropdown = () => {
        if (serverSettingsMenu.classList.contains(style.serverMenuOpen)
            && serverMenuDropdown.classList.contains(style.serverMenuDropdownActive)) {
            serverMenuDropdown.classList.remove(style.serverMenuDropdownActive);
            serverSettingsMenu.classList.remove(style.serverMenuOpen);
            serverMenuIcon.classList.remove(style.iconClose);
            serverMenuIcon.classList.add(style.iconOpen);

            // window.addEventListener('click', () => {
            //     serverSettingsMenu.style.background = 'yellow'
            //     console.log('hello')
            // });
        } else {
            serverMenuDropdown.classList.add(style.serverMenuDropdownActive);
            serverSettingsMenu.classList.add(style.serverMenuOpen);
            serverMenuIcon.classList.remove(style.iconOpen);
            serverMenuIcon.classList.add(style.iconClose);

            // window.addEventListener('click', () => {
            //     serverSettingsMenu.style.background = 'yellow'
            //     console.log('hello')
            // });
        }
    }

    return (
        <div className={style.serverDetailsWrapper}>
            <div id='serverMenuDropdown' className={style.serverMenuDropdown} onClick={handleServerMenuDropdown}>
                <p>{server?.name}</p>
                <i id='serverMenuIcon' className={style.iconOpen}></i>
            </div>
            <div id='serverSettingsMenu' className={style.serverSettingsMenu}>
                <p>Settings</p>
            </div>
        </div>
    );
}

export default ServerDetails;
