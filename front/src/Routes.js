import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Tasks from "./components/Tasks";

export default function Routes({ handleLogin, isAuthenticated }) {
  let history = useHistory();

  return (
    <Switch>
      <Route exact path="/">
        <LoginForm handleLogin={handleLogin} />
      </Route>
      <Route exact path="/signup">
        <SignUpForm />
      </Route>
      <Route exact path="/tasks">
        {isAuthenticated ? <Tasks /> : history.push("/")}
      </Route>
    </Switch>
  );
}
