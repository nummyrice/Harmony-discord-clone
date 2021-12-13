import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';
import style from '../ChannelList/ChannelList.module.css'

const LogoutButton = () => {
  const poop = useHistory();
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    await dispatch(logout());

    poop.push('/')
  };

  return <button className={style.logout} onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
