import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminRoute from "@app/Auth/AdminRoute";

// 利用実績
import ReportDaily from "@components/pages/mgr/GroupHome/Report/Daily";
import ReportMonthly from "@components/pages/mgr/GroupHome/Report/Monthly";

// 利用者情報
import UsersList from "@components/pages/mgr/GroupHome/Users/UsersList";
import CreateUser from "@components/pages/mgr/GroupHome/Users/CreateUser";
import EditUser from "@components/pages/mgr/GroupHome/Users/EditUser";

// 事業者情報
import Facility from "@components/pages/mgr/GroupHome/Facility";

/**
 * グループホームでログインした時だけ有効になるルーティング
 */
const GroupHomeRoutes: React.FunctionComponent = () => (
  <Switch>
    {/* 利用実績 */}
    <AdminRoute path="/report/daily" component={ReportDaily} />
    <AdminRoute path="/report/monthly" component={ReportMonthly} />
    {/* 利用者情報 */}
    <AdminRoute exact path="/users" component={UsersList} />
    <AdminRoute exact path="/users/new" component={CreateUser} />
    <AdminRoute exact path="/users/:id" component={EditUser} />
    {/* 事業者情報 */}
    <AdminRoute path="/facility" component={Facility} />
    {/* default path */}
    <Route path="/">
      <Redirect to="/report/daily" />
    </Route>
  </Switch>
);

export default GroupHomeRoutes;
