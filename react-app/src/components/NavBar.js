
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import style from './navbar.module.css';

const NavBar = () => {
  return (
    <nav className={style.landing_navbar}>
      <ul className={style.landing_navbar_grid}>
        <li className={style.home}>
          <NavLink to='/' exact={true} activeClassName='active'>
            Harmony
          </NavLink>
        </li>
        <li className={style.login}>
          <NavLink className={style.login_button} to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li className={style.signup}>
          <NavLink className={style.signup_button} to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li className={style.users}>
          <NavLink className={style.users_button} to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li className={style.logout}>
          <LogoutButton className={style.logout_button} />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
