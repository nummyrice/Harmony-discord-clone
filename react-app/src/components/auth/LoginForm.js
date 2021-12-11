import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import * as serverActions from "../../store/servers";
import style from './LoginForm.module.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className={style.loginFormContainer}>
        <div className={style.loginFormWrapper}>
          <div className={style.loginFormHeading}>
            <div className={style.loginFormTitle}>Welcome Back!</div>
            <div className={style.loginFormSubheading}>We're so glad to see you again!</div>
          </div>
          <form
            onSubmit={onLogin}
            className={style.loginFormForm}
          >
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div
              className={style.loginFormInputContainer}
            >
              <label
                htmlFor="email"
                className={style.loginFormLabel}
              >
                Email<span
                    className={style.loginFormErrorSpan}
                  >
                    {errors.length > 0 && errors.map(error => (
                      error.includes('email')
                    )) ? errors.map(error => error.includes('email') ?
                      ` - ${error.split(':')[1]}` : null) : null}
                    {/* {errors.length > 0 && errors.map(error => (
                      error.includes('email')
                    )) ? ` - ${errors[0].split(':')[1]}` : null} */}
                  </span>
              </label>
              <input
                className={style.loginFormInputField}
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div
              className={style.loginFormInputContainer}
            >
              <label
                htmlFor="password"
                className={style.loginFormLabel}
              >
                Password<span
                    className={style.loginFormErrorSpan}
                  >
                    {errors.length > 0 && errors.map(error => (
                      error.includes('password')
                    )) ? errors.map(error => error.includes('password') ?
                      ` - ${error.split(':')[1]}` : null) : null}

                    {errors.length > 0 && errors.map(error => (
                      error.includes('password')
                    )) ?  errors.map(error => (console.log(error, error.split(':')[1]))) : null}
                  </span>
              </label>
              <input
                className={style.loginFormInputField}
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
