import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "@components/pages/auth/Login";
import Reminder from "@components/pages/auth/password/Reminder";
import ReminderComplete from "@components/pages/auth/password/ReminderComplete";

const GuestRoutes: React.FunctionComponent = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/password/reminder/complete" component={ReminderComplete} />
    <Route path="/password/reminder" component={Reminder} />
    {/* default path */}
    <Route path="/">
      <Redirect to="/login" />
    </Route>
  </Switch>
);

export default GuestRoutes;
