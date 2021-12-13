import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import * as serverActions from "./store/servers";
import Servers from "./components/Main";
import ChannelList from "./components/ChannelList";
import Main from "./components/Main";
import Landing from "./components/Landing";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const session = useSelector((state) => state.session);


  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }


  return (
    <BrowserRouter>
      <Route exact path="/">
        {session.user && <Redirect to='/servers/@me'/>}
        <NavBar />
      </Route>
      <Switch>
        <Route exact={true} path="/">
          <Landing />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <Route path="/servers">
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
