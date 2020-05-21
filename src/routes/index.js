import React from "react";
import { Switch, Redirect } from "react-router-dom";

import Main from "../scenes/Main"
import SetupPy from "../pages/SetupPy"
import Homepage from "../pages/Homepage"
import RouteWithScene from "./RouteWithScene";

export default function Routes() {
  return (
    <Switch>
      <RouteWithScene path="/setup-py-generator" component={SetupPy} scene={Main} />
      <RouteWithScene path="/" component={Homepage} scene={Main} />
      <Redirect to="/" />
    </Switch>
  );
}
