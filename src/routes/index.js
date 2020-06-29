import React from "react";
import { Switch, Redirect } from "react-router-dom";

import Paperbase from "scenes/Main";
import SetupPy from "pages/SetupPy";
import Homepage from "pages/Homepage";
import RouteWithScene from "./RouteWithScene";

export const routes = [
  {
    path: "/setup-py-generator",
    scene: Paperbase,
    component: SetupPy
  },
  {
    path: "/",
    scene: Paperbase,
    component: Homepage
  }
];

export default function RoutesSwitch() {
  return (
    <Switch>
      {
        routes.map((route, index) => (
          <RouteWithScene path={route.path} scene={route.scene} component={route.component} key={index} />
        ))
      }
      <Redirect to="/" />
    </Switch>
  );
}
