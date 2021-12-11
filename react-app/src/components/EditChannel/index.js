import React, { useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as serverActions from '../../store/servers';
import '../CreateChannel/CreateChannel.css';

const EditChannel = () => {
    const { serverId, channelId } = useParams();
    const server_id = serverId;
    const id = channelId;
    let channel = useSelector((state) => state.servers?.[serverId]?.channels[id]);
    let channelName = channel?.name;

    console.log('SERVER FROM CHANNEL EDIT--', channel?.name);
    const dispatch = useDispatch();
    const [name, setName] = useState(`#${channelName}`);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(serverActions.editChannelThunk({
            name,
            server_id,
            id
        }))
        console.log('EDITED CHANNEL!!')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='input-wrapper'>
                    <label htmlFor='name'>Channel Name</label>
                    <div>
                        <input type='text' name='name' placeholder='new-channel' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                </div>
                <button>Save Changes</button>
            </form>
        </>
    );
};

export default EditChannel;
