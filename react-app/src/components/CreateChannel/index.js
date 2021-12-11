import React, { useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as serverActions from '../../store/servers';
import './CreateChannel.css';

const CreateChannel = ({setChannelModalActive}) => {
    const { serverId, channelId } = useParams();
    const server_id = serverId;
    const history = useHistory();

    console.log('SERVER FROM CHANNEL FORM', serverId);
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const reset = () => {
        setName('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newChannel = {
            name: name,
            server_id: serverId
        };

        let createdChannel = await dispatch(serverActions.postChannelThunk(newChannel));

        history.push(`/servers/${serverId}/${createdChannel.id}`);

        {setChannelModalActive(false)}
        reset();
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
                <button>Create Channel</button>
            </form>
        </>
    );
};

export default CreateChannel;
