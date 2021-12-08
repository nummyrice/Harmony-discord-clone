import React, { useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as serverActions from '../../store/servers'

import style from './serversList.module.css'

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
            <div className={style.home}>Home Server</div>
            { servers?.map(server => (
                // <div>hi</div>
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
        </div>
    )
}
