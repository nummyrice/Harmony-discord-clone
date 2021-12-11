import React, { useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as serverActions from '../../store/servers';

const DeleteChannel = () => {
    const { serverId, channelId } = useParams();
    const server_id = serverId;
    const id = channelId;
    const history = useHistory();

    console.log('SERVER FROM CHANNEL FORM', useParams());
    const dispatch = useDispatch();
    const channelList = useSelector((state) => state.servers?.[serverId]?.channels);
    const channelsArr = Object.values(channelList);

    // if (JSON.stringify(channelList) !== '{}') {
    //     const channelsArr = Object.values(channelList);
    // }

    const firstChannel = channelsArr[0];

    console.log('CHANNEL LIST FROM DELETE--', channelsArr[0]?.id);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (firstChannel.id !== +id) {
            dispatch(serverActions.deleteChannelThunk({
                server_id,
                id
            })).then(() => history.push(`/servers/${serverId}/${firstChannel}`));
        }
    }

    return (
        <>
            <button onClick={handleSubmit}>Delete Channel</button>
        </>
    );
};

export default DeleteChannel;
