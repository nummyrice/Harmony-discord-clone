import React, { useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as serverActions from '../../store/servers';

const DeleteChannel = () => {
    const { serverId, channelId } = useParams();
    const server_id = serverId;
    const id = channelId;

    console.log('SERVER FROM CHANNEL FORM', useParams());
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(serverActions.deleteChannelThunk({
            server_id,
            id
        }))
        console.log('Deleted CHANNEL!!')
    }

    return (
        <>
            <button onClick={handleSubmit}>Delete Channel</button>
        </>
    );
};

export default DeleteChannel;
