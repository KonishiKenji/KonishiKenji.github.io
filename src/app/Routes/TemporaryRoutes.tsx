import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Reset from "@components/pages/auth/password/Reset";
import ResetComplete from "@components/pages/auth/password/ResetComplete";

const TemporaryRoutes: React.FunctionComponent = () => (
  <Switch>
    <Route path="/password/reset" component={Reset} />
    <Route path="/password/reset/complete" component={ResetComplete} />
    {/* default path */}
    <Route path="/">
      <Redirect to="/password/reset" />
    </Route>
  </Switch>
);

export default TemporaryRoutes;
