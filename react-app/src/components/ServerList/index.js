import React, { useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as serverActions from '../../store/servers'

import style from './serversList.module.css'
import logo from './images/white-logo.png'

export default function ServersList() {
    const dispatch = useDispatch();
    const servers = useSelector((state) => Object.values(state.servers));
    let channels = useSelector((state) => Object.values(state.servers))
    console.log('all servers', servers)

    useEffect(() => {
        dispatch(serverActions.getServersThunk())
    }, [dispatch])

    return (
        <div className={style.container}>
            <NavLink
                className={style.home}
                to={'/servers/@me'}
            >
                <img
                    className={style.directMessages}
                    src={logo}
                />
            </NavLink>
            { servers?.map(server => (
                <NavLink
                    to={`/servers/${server.id}`}
                    className={style.serverWrapper}
                    key={server.id}
                >
                    <img
                        className={style.serverImg}
                        src={ server.image_url }
                    />
                </NavLink>
            ))}
            <NavLink
                className={style.newServer}
                to={`/servers/create`}
            >
                <div className={style.newWrapper}>
                    <div className={style.addServer}>+</div>
                </div>
            </NavLink>
        </div>
    )
}
