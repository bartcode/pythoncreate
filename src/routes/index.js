import React from "react";
import { Switch, Redirect } from "react-router-dom";

import Paperbase from "../scenes/Main"
import SetupPy from "../pages/SetupPy"
import Homepage from "../pages/Homepage"
import RouteWithScene from "./RouteWithScene";

export default function Routes() {
  return (
    <Switch>
      <RouteWithScene path="/setup-py-generator" scene={Paperbase} component={SetupPy} />
      <RouteWithScene path="/" scene={Paperbase} component={Homepage} />
      <Redirect to="/" />
    </Switch>
  );
}
