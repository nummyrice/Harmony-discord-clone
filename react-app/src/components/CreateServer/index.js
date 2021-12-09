import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postServerThunk } from '../../store/servers';

import style from './CreateServer.module.css';

export default function CreateServer({setCreateNewServer}) {
    const dispatch = useDispatch();

    const [imageUrl, setImageUrl] = useState('');
    const [serverName, setServerName] = useState('');
    const [errors, setErrors] = useState([]);

    const validate = () => {
        const validationErrors = [];
        if (!serverName) validationErrors.push('You must name your server.');

        return validationErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate();

        if (errors && errors.length > 0) {
            return setErrors(errors);
        }

        const newServer = {
            imageUrl,
            serverName,
            isPrivate: false
        }

        dispatch(postServerThunk(newServer));
    }

    return (
        <>
            <div
            className={style.newServerBackground}
            onClick={() => setCreateNewServer(false)}
            >
            </div>
            <div className={style.newServerContainer}>
                <form className={style.newServerForm}>
                    <div className={style.newServerHeading}>
                        
                    </div>
                </form>
            </div>
        </>
    )
}
