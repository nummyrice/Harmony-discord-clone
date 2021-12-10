import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { BrowserRouter, Route, Switch, useParams, Link } from "react-router-dom";
import * as serverActions from "../../store/servers";
import style from "./ChannelList.module.css";

const ServerDetails = () => {
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
    // console.log('SESSION USER----: ', +sessionUser.id)
    // console.log('SERVER OWNER----: ', +server?.owner_id)



    const serverSettingsMenu = document.getElementById('serverSettingsMenu');
    const serverMenuDropdown = document.getElementById('serverMenuDropdown');
    const serverMenuIcon = document.getElementById('serverMenuIcon');

    const inviteIcon = (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.2727 2.72727H24V4.54545H21.2727V7.27273H19.4545V4.54545H16.7273V2.72727H19.4545V0H21.2727V2.72727ZM11.2727 10.9091C13.2773 10.9091 14.9091 9.27727 14.9091 7.27273C14.9091 5.26818 13.2773 3.63636 11.2727 3.63636C9.26818 3.63636 7.63636 5.26818 7.63636 7.27273C7.63636 9.27727 9.26818 10.9091 11.2727 10.9091ZM11.2727 11.8182C6.99 11.8182 4 14.0609 4 17.2727V18.1818H18.5455V17.2727C18.5455 14.0609 15.5555 11.8182 11.2727 11.8182Z"/>
        </svg>
    );

    const editIcon = (
        <svg class="icon-LYJorE" aria-hidden="false" width="18" height="18" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z" fill="currentColor"></path></svg>
    );

    const disableServerIcon = (
        <svg class="icon-LYJorE" aria-hidden="false" width="18" height="18" viewBox="0 0 24 24"><path d="M10.418 13L12.708 15.294L11.292 16.706L6.586 11.991L11.294 7.292L12.707 8.708L10.41 11H21.949C21.446 5.955 17.177 2 12 2C6.486 2 2 6.487 2 12C2 17.513 6.486 22 12 22C17.177 22 21.446 18.046 21.949 13H10.418Z"></path></svg>
    );

    let invitePeople;
    let editServer;
    let deleteServer;
    let leaveServer;

    if (+sessionUser.id === +server?.owner_id) {
        invitePeople = (
            <div className={style.settingLink}>
                <Link className={style.inviteLink}>
                    <p>Invite People</p>
                    {inviteIcon}
                </Link>
            </div>
        );

        editServer = (
            <div className={style.settingLink}>
                <Link className={style.stdServerLink}>
                    <p>Edit Server</p>
                    {editIcon}
                </Link>
            </div>
        );

        deleteServer = (
            <div className={style.settingLink}>
                <Link className={style.disableOption}>
                    <p>Delete Server</p>
                    {disableServerIcon}
                </Link>
            </div>
        );
    } else {
        leaveServer = (
            <div className={style.settingLink}>
                <Link className={style.disableOption}>
                    <p>Leave Server</p>
                    {disableServerIcon}
                </Link>
            </div>
        );
    }

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
                {invitePeople}
                {editServer}
                {deleteServer}
                {leaveServer}
            </div>
        </div>
    );
}

export default ServerDetails;
