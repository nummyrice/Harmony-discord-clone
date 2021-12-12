import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

import style from './SignupForm.module.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/servers/@me' />;
  }

  const emailRed = () => {
    if (errors.length > 0 && errors.map(error => error.includes('email'))) {
      return {color:'red'} ;
    }
  }

  const usernameRed = () => {
    if (errors.length > 0 && errors.map(error => error.includes('username'))) {
      return {color:'red'} ;
    }
  }

  const passwordRed = () => {
    if (errors.length > 0 && errors.map(error => error.includes('password'))) {
      return {color:'red'} ;
    }
  }

  return (
    <>
      <div className={style.signupFormContainer}>
        <div className={style.signupFormWrapper}>
          <div className={style.signupFormHeading}>
            <div className={style.signupFormTitle}>Create an account</div>
          </div>
          <form
            onSubmit={onSignUp}
            className={style.signupFormForm}
          >
            <div
              className={style.signupFormInputContainer}
            >
              <label
                htmlFor={email}
                className={style.signupFormLabel}
                style={emailRed()}
              >
                EMAIL<span
                className={style.signupFormErrorSpan}
                >
                  {errors.length > 0 && errors.map(error => (
                    error.includes('email')
                  )) ? errors.map(error => error.includes('email') ?
                    ` - ${error.split(':')[1]}` : null) : null}
                </span>
              </label>
              <input
                className={style.signupFormInputField}
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div
              className={style.signupFormInputContainer}
            >
              <label
                htmlFor='username'
                className={style.signupFormLabel}
                style={usernameRed()}
              >
                USERNAME<span
                  className={style.signupFormErrorSpan}
                >
                  {errors.length > 0 && errors.map(error => (
                    error.includes('username')
                  )) ? errors.map(error => error.includes('username') ?
                    ` - ${error.split(':')[1]}` : null) : null}
                </span>
              </label>
              <input
                className={style.signupFormInputField}
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div
              className={style.signupFormInputContainer}
            >
              <label
                htmlFor='password'
                className={style.signupFormLabel}
                style={passwordRed()}
              >
                PASSWORD<span
                  className={style.signupFormErrorSpan}
                >
                  {errors.length > 0 && errors.map(error => (
                    error.includes('password')
                  )) ? errors.map(error => error.includes('password') ?
                    ` - ${error.split(':')[1]}` : null) : null}
                </span>
              </label>
              <input
                className={style.signupFormInputField}
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div
              className={style.signupFormInputContainer}
            >
              <label
                htmlFor='repeat_password'
                className={style.signupFormLabel}
                style={passwordRed()}
              >
                REPEAT PASSWORD<span
                  className={style.signupFormErrorSpan}
                >
                  {errors.length > 0 && errors.map(error => (
                    error.includes('password')
                  )) ? errors.map(error => error.includes('password') ?
                    ` - ${error.split(':')[1]}` : null) : null}
                </span>
              </label>
              <input
                className={style.signupFormInputField}
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
              ></input>
            </div>
            <div
              className={style.signupFormInputContainer}
              id={style.signupFormButtonDiv}
            >
              <button
                type='submit'
                className={style.signupFormSignupButton}
                id={style.signupFormContinue}
              >
                Continue
              </button>
            </div>
            <div
              className={style.signupFormInputContainer}
              id={style.signupFormLoginDiv}
            >
              <div className={style.signupFormLogin}>
                <NavLink
                  to='/login'
                  className={style.signupFormLoginLink}
                >
                  Already have an account?
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
