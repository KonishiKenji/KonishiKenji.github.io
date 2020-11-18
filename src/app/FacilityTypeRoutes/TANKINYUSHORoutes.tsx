import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminRoute from "@app/Auth/AdminRoute";
import { UserState } from "@stores/domain/user/type";
import * as URL from "@constants/url";

// 利用実績
import ReportDaily from "@components/pages/mgr/TANKINYUSHO/Report/Daily";
import ReportMonthly from "@components/pages/mgr/TANKINYUSHO/Report/Monthly";

// 利用者情報
import UsersList from "@components/pages/mgr/TANKINYUSHO/Users/UsersList";
import CreateUser from "@components/pages/mgr/TANKINYUSHO/Users/CreateUser";
import EditUser from "@components/pages/mgr/TANKINYUSHO/Users/EditUser";

// 事業者情報
import Facility from "@components/pages/mgr/TANKINYUSHO/facility";

// 初期設定情報
import InitialData from "@components/pages/mgr/TANKINYUSHO/initialData";

interface OwnProps {
  user: UserState;
}

type Props = OwnProps;

/**
 * 短期入所施設でログインした時だけ有効になるルーティング
 */
const TANKINYUSHORoutes: React.FunctionComponent<Props> = ({ user }) => (
  <Switch>
    {/* 利用実績 */}
    <AdminRoute exact path={URL.REPORT_DAILY} component={ReportDaily} />
    <AdminRoute exact path={URL.REPORT_MONTHLY} component={ReportMonthly} />
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

export default TANKINYUSHORoutes;
