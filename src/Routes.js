import React from "react";
import {Router as Switch, Route } from "react-router";
//Pages
import Home from "./pages/Home/";


const Routes = () => {
  return (
    <Switch >
      <Route path="/" exact component={Home} />
    </Switch >
  );
};
export default Routes;