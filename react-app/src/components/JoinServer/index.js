import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import style from './JoinServer.module.css';

export default function JoinServer({setServerActive, setJoinServer}) {
    const history = useHistory();

    const [serverLink, setServerLink] = useState('');
    const [errors, setErrors] = useState([]);

    const validate = () => {
        const validationErrors = [];
        if (!serverLink) validationErrors.push('Please enter a valid invite link.');

        return validationErrors;
    }

    const goBack = () => {
        setJoinServer(false);
        setServerActive(true);
        return;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate();

        if (errors && errors.length > 0) {
            return setErrors(errors);
        }

        if (serverLink) {
            const routeLinkArr = serverLink.split('https://harmony-io.herokuapp.com');
            const routeLink = routeLinkArr[1];
            console.log('shorter link', routeLink);

            setJoinServer(false);
            history.push(`${routeLink}`);
        }
        console.log('link', serverLink.split('https://harmony-io.herokuapp.com'));
    }

    return (
        <>
            <div
                className={style.joinServerBackground}
                onClick={() => setJoinServer(false)}
            >
            </div>
            <div className={style.joinServerContainer}>
                <form
                    className={style.joinServerForm}
                    onSubmit={handleSubmit}
                >
                    <div
                        className={style.joinServerCloseContainer}
                        onClick={() => setJoinServer(false)}
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
                        <div className={style.joinServerTitle}>Join a Server</div>
                        <div className={style.joinServerSubheading}>
                            Enter an invite below to join an existing server.
                        </div>
                    </div>
                    <div className={style.joinServerContent}>
                        <div className={style.joinServerInputWrapper}>
                            <label className={style.joinServerLabel}>
                                INVITE LINK<span
                                    className={style.joinServerLabelSpan}
                                    >
                                        {errors.length > 0 ? errors.map(error => ` - ${error}`) : ' *'}
                                    </span>
                            </label>
                            <input
                                className={style.joinServerInputField}
                                type='text'
                                placeholder='https://harmony-io.herokuapp.com/servers/1'
                                value={serverLink}
                                onChange={(e) => setServerLink(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={style.joinServerButtons}>
                        <div
                            className={style.joinServerBack}
                            onClick={() => goBack()}
                        >
                            Back
                        </div>
                        <button className={style.joinServerSubmit}>
                            Join Server
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
