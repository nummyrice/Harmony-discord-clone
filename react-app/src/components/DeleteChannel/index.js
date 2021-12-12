import React, { useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as serverActions from '../../store/servers';
import '../CreateChannel/CreateChannel.css'

const DeleteChannel = ({setEditChannelModalActive}) => {
    const { serverId, channelId } = useParams();
    const server_id = serverId;
    const id = channelId;
    const history = useHistory();

    const dispatch = useDispatch();
    const channelList = useSelector((state) => state.servers?.[serverId]?.channels);
    const channelsArr = Object.values(channelList);

    // if (JSON.stringify(channelList) !== '{}') {
    //     const channelsArr = Object.values(channelList);
    // }

    const firstChannel = channelsArr[0];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (firstChannel.id !== +id) {
            dispatch(serverActions.deleteChannelThunk({
                server_id,
                id
            })).then(() => history.push(`/servers/${serverId}/${firstChannel.id}`));
        }

        {setEditChannelModalActive(false)}
    }

    return (
        <>
            <button onClick={handleSubmit} className='delete-channel-btn'>Delete Channel</button>
        </>
    );
};

export default DeleteChannel;
