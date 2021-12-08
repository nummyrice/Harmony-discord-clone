import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import * as serverActions from "../../store/servers";
import style from "./ChannelList.module.css";

const ChannelList = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const servers = useSelector(state => Object.values(state.servers));
    // const channels = servers.channels;
    // console.log('servers', servers);
    // console.log('channels from channel list: ', channels);

    useEffect(() => {
        dispatch(serverActions.getServersThunk())
            .then(() => dispatch(serverActions.getChannelsThunk(id)))
    }, [dispatch]);

    if (!servers) {
        return null;
    }

    const channels = servers.map(server => {
        return server.channels;
    })

    // const channels = servers.filter(server => {
    //     if (!Object.entries(server.channels) === {}) {
    //         return server.channels
    //     }
    // })

    // const channelComponent = channels.map((channel) => {
    //     console.log('channel', channel);
    //     return (
    //         <li key={channel.id}>{channel.name}</li>
    //     );
    // });

    // console.log('channel component: ', channelComponent)

    console.log('new channels: ', channels);

    return (
        <div>
            <div className={style.channel_heading}>
                <p>^</p>
                <p>Channel Name</p>
                {/* {channels.map((channel) => {
                    return (
                        <li key={channel?.id}>{channel?.name}</li>
                    );
                })} */}
            </div>

        </div>
    );
}

export default ChannelList;
