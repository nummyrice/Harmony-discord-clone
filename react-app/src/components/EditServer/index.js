import React, { useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as serverActions from '../../store/servers';
import '../CreateChannel/CreateChannel.css';

const EditServer = ({setEditServerModalActive, setServerSettingsModal}) => {
    const { serverId, channelId } = useParams();
    const server_id = serverId;
    const server = useSelector((state) => state.servers?.[serverId]);
    const id = server.id;
    const dispatch = useDispatch();
    const [serverName, setServerName] = useState(`${server.name}`);
    const [imageUrl, setImageUrl] = useState('');
    const [oldImageUrl, setOldImageUrl] = useState('');

    console.log('IMAGE URL...', imageUrl);

    const handleSubmit = async (e) => {
        console.log('image url', imageUrl)
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', serverName);
        formData.append('image_url', imageUrl);
        formData.append('id', id);
        console.log('xxxxxxxxxxxx', formData.get('name'));

        await dispatch(serverActions.editServerThunk(formData))
        await dispatch(serverActions.getChannelsThunk(id))

        {setEditServerModalActive(false)}
        {setServerSettingsModal(false)}
    }

    const setImage = (e) => {
        let file = e.target.files[0];

        setImageUrl(e.target.files[0]);

        if (file) {
            setOldImageUrl(file)
            file = URL.createObjectURL(file);
        } else {
            setImageUrl(oldImageUrl)
        }
    };

    const serverIcon = (
        <svg width="14" height="10.5" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.2933 1.50785C18.7199 0.796059 17.0594 0.289196 15.3537 0C15.122 0.413002 14.9122 0.837664 14.7253 1.27225C12.9005 1.00522 11.0458 1.00522 9.22093 1.27225C9.0313 0.837561 8.8189 0.412904 8.58459 0C6.87883 0.289196 5.21839 0.796059 3.64497 1.50785C0.853157 5.41741 -0.402196 10.1965 0.113267 14.9529C1.02738 15.6279 2.00182 16.2193 3.02454 16.7199C4.02394 17.2301 5.06416 17.6582 6.13466 18C6.62658 17.3388 7.06034 16.6373 7.43121 15.9031C6.72127 15.6436 6.03698 15.3203 5.38696 14.9372L5.88808 14.5681C7.78889 15.4471 9.8622 15.9027 11.9612 15.9027C14.0602 15.9027 16.1335 15.4471 18.0343 14.5681C18.1934 14.6937 18.3604 14.8194 18.5354 14.9372C17.88 15.3155 17.1935 15.6386 16.4832 15.9031C16.8532 16.6394 17.2898 17.3413 17.7877 18C19.9834 17.3524 22.0479 16.3319 23.8886 14.9843C23.9612 14.2902 23.9984 13.593 24 12.8953C23.9852 8.81262 22.6903 4.83464 20.2933 1.50785V1.50785ZM7.98006 12.2513C7.37869 12.2168 6.81506 11.9506 6.41045 11.51C6.00583 11.0694 5.79255 10.4896 5.81649 9.89529C5.78544 9.59977 5.81245 9.30112 5.89604 9.01571C6.00245 8.7225 6.17052 8.45485 6.3892 8.23037C6.58968 8.00258 6.83989 7.82267 7.121 7.70419C7.38916 7.57492 7.68183 7.50268 7.98006 7.49215C8.2872 7.49183 8.5909 7.55608 8.87094 7.68063C9.14168 7.81191 9.38046 7.99944 9.57092 8.23037C9.77532 8.45845 9.92969 8.72584 10.0243 9.01571C10.1126 9.30559 10.1424 9.60979 10.1118 9.91099C10.1424 10.4909 9.94914 11.0606 9.57092 11.5052C9.36957 11.7281 9.12509 11.9089 8.85187 12.037C8.57866 12.1652 8.28223 12.238 7.98006 12.2513V12.2513ZM15.9344 12.2513C15.6322 12.238 15.3358 12.1652 15.0625 12.037C14.7893 11.9089 14.5448 11.7281 14.3435 11.5052C13.9403 11.0597 13.7291 10.4765 13.7549 9.87958C13.7416 9.58562 13.7875 9.29199 13.8901 9.01571C13.9839 8.72547 14.1383 8.45791 14.3435 8.23037C14.5457 8.00989 14.7922 7.83337 15.0673 7.71204C15.3414 7.59571 15.6361 7.53431 15.9344 7.53141C16.2354 7.53219 16.5332 7.59365 16.8093 7.71204C17.0925 7.83029 17.346 8.00826 17.5521 8.23346C17.7582 8.45866 17.9119 8.72565 18.0025 9.01571C18.1002 9.29824 18.1355 9.59817 18.1059 9.89529C18.1299 10.4883 17.9177 11.067 17.5148 11.5074C17.1118 11.9478 16.5502 12.2148 15.9503 12.2513H15.9344Z" fill="white"/>
        </svg>

    );

    return (
        <>
            <form onSubmit={handleSubmit} className='channel-create-form'>
                <div>
                    <div className='input-wrapper'>
                        <label htmlFor='name'>Server Name</label>
                        <div className='field-wrapper'>
                            <input type='text' name='name' placeholder='edit-server' value={serverName} onChange={(e) => setServerName(e.target.value)} required />
                            <div className='icon-wrapper'>
                                    {serverIcon}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor='edit-server-image'>Edit Image</label>
                        <div className='image-uploader-wrapper'>
                            <div>
                                <input type='file' accept='.jpg, .jpeg, .png, .gif' name='edit-server-image' onChange={setImage}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='form-btn-wrapper'>
                    <p onClick={() => {setEditServerModalActive(false)}} className='cancelLink'>Cancel</p>
                    <button>Save Changes</button>
                </div>
            </form>
        </>
    );
};

export default EditServer;
