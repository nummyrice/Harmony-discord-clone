import React from 'react';
import { useParams } from 'react-router-dom';

import style from '../../components/JoinServer/JoinServer.module.css';

export default function InvitePeople({setInviteActive}) {
    const {serverId} = useParams();

    return (
        <>
            <div
                className={style.joinServerBackground}
                onClick={() => setInviteActive(false)}
            >
            </div>
            <div className={style.joinServerContainer}>
                <form
                    className={style.joinServerForm}
                >
                    <div
                        className={style.joinServerCloseContainer}
                        onClick={() => setInviteActive(false)}
                    >
                        <svg
                            className={style.joinServerX}
                            aria-hidden="false"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                            d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
                            ></path>
                        </svg>
                    </div>
                    <div className={style.joinServerHeading}>
                        <div className={style.joinServerTitle}>Send An Invite</div>
                        <div className={style.joinServerSubheading}>
                            Copy the link and send to your friends.
                        </div>
                    </div>
                    <div className={style.joinServerContent}>
                        <div className={style.joinServerInputWrapper}>
                            <label className={style.joinServerLabel}>INVITE LINK</label>
                            <input
                                className={style.joinServerInputField}
                                type='text'
                                placeholder={`https://harmony-io.herokuapp.com/servers/${serverId}`}
                                value={`https://harmony-io.herokuapp.com/servers/${serverId}`}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
