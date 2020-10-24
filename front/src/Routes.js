import React from "react";
import { Route, Switch } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Tasks from "./components/Tasks";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <LoginForm />
      </Route>
      <Route exact path="/signup">
        <SignUpForm />
      </Route>
      <Route exact path="/tasks">
        <Tasks />
      </Route>
    </Switch>
  );
}
