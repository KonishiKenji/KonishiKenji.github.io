import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminRoute from "@app/Auth/AdminRoute";
import { UserState } from "@stores/domain/user/type";
import * as URL from "@constants/url";

// 利用実績
import Report from "@components/pages/mgr/SHUROTEICHAKU/report";

// 利用者情報
import UsersList from "@components/pages/mgr/SHUROTEICHAKU/Users/UsersList";
import CreateUser from "@components/pages/mgr/SHUROTEICHAKU/Users/CreateUser";
import EditUser from "@components/pages/mgr/SHUROTEICHAKU/Users/EditUser";

// 事業者情報
import Facility from "@components/pages/mgr/SHUROTEICHAKU/facility";

interface OwnProps {
  user: UserState;
}

type Props = OwnProps;

/**
 * 就労定着支援施設でログインした時だけ有効になるルーティング
 */
const SHUROTEICHAKURoutes: React.FunctionComponent<Props> = ({ user }) => (
  <Switch>
    {/* 利用実績 */}
    <AdminRoute path="/report" component={Report} />
    {/* 利用者情報 */}
    <AdminRoute exact path={URL.USERS} component={UsersList} />
    <AdminRoute exact path="/users/new" component={CreateUser} />
    <AdminRoute exact path="/users/:id" component={EditUser} />
    {/* 事業者情報 */}
    <AdminRoute path="/facility" component={Facility} />
    {/* default path */}
    <Route path="/">
      <Redirect
        to={user.role === "mgruser" ? "/attendance" : "/report/daily"}
      />
    </Route>
  </Switch>
);

export default SHUROTEICHAKURoutes;
