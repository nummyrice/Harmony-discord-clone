import React, { useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as serverActions from '../../store/servers';
import '../CreateChannel/CreateChannel.css';

const EditChannel = ({setEditChannelModalActive}) => {
    const { serverId, channelId } = useParams();
    const server_id = serverId;
    const id = channelId;
    const channel = useSelector((state) => state.servers?.[serverId]?.channels[id]);
    let channelName = channel?.name;

    const dispatch = useDispatch();
    const [name, setName] = useState(`${channelName}`);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(serverActions.editChannelThunk({
            name,
            server_id,
            id
        }))

        {setEditChannelModalActive(false)}
        console.log('EDITED CHANNEL!!')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='input-wrapper'>
                    <label htmlFor='name'>Channel Name</label>
                    <div>
                        <input type='text' name='name' placeholder='edit-channel' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                </div>
                <button>Save Changes</button>
            </form>
        </>
    );
};

export default EditChannel;
