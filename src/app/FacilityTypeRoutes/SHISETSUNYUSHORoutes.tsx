import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminRoute from "@app/Auth/AdminRoute";
import { UserState } from "@stores/domain/user/type";
import * as URL from "@constants/url";

// 利用実績
import ReportDaily from "@components/pages/mgr/SHISETSUNYUSHO/Report/Daily";
import ReportUsers from "@components/pages/mgr/SHISETSUNYUSHO/Report/Users";

// 利用者情報
import UsersList from "@components/pages/mgr/SHISETSUNYUSHO/Users/UsersList";
import CreateUser from "@components/pages/mgr/SHISETSUNYUSHO/Users/CreateUser";
import EditUser from "@components/pages/mgr/SHISETSUNYUSHO/Users/EditUser";

// 事業者情報
import Facility from "@components/pages/mgr/SHISETSUNYUSHO/facility";

// 初期設定情報
import InitialData from "@components/pages/mgr/SHISETSUNYUSHO/initialData";

interface OwnProps {
  user: UserState;
}

type Props = OwnProps;

/**
 * 施設入所支援施設でログインした時だけ有効になるルーティング
 */
const SHISETSUNYUSHORoutes: React.FunctionComponent<Props> = ({ user }) => (
  <Switch>
    {/* 利用実績 */}
    <AdminRoute path="/report/daily" component={ReportDaily} />
    <AdminRoute path="/report/users" component={ReportUsers} />
    {/* 利用者情報 */}
    <AdminRoute exact path={URL.USERS} component={UsersList} />
    <AdminRoute exact path="/users/new" component={CreateUser} />
    <AdminRoute exact path="/users/:id" component={EditUser} />
    {/* 事業者情報 */}
    <AdminRoute path="/facility" component={Facility} />
    {/* 初期設定情報 */}
    <AdminRoute path="/initial" component={InitialData} />
    {/* default path */}
    <Route path="/">
      <Redirect
        to={user.role === "mgruser" ? "/attendance" : "/report/daily"}
      />
    </Route>
  </Switch>
);

export default SHISETSUNYUSHORoutes;
