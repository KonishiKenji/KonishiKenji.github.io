import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminRoute from "@app/Auth/AdminRoute";
import { UserState } from "@stores/domain/user/type";
import * as URL from "@constants/url";

// 利用実績
import ReportDaily from "@components/pages/mgr/SEIKATSUKAIGO/report/Daily";
import ReportUsers from "@components/pages/mgr/SEIKATSUKAIGO/report/Users";

// 利用者情報
import UsersList from "@components/pages/mgr/SEIKATSUKAIGO/users/UsersList";
import CreateUser from "@components/pages/mgr/SEIKATSUKAIGO/users/CreateUser";
import EditUser from "@components/pages/mgr/SEIKATSUKAIGO/users/EditUser";

// 事業者情報
import Facility from "@components/pages/mgr/SEIKATSUKAIGO/Facility";

// 初期設定情報
import InitialData from "@components/pages/mgr/SEIKATSUKAIGO/InitialData";

// 記録機能
import RecordRoutes from "@app/CommonRoutes/RecordRoutes";
import DailyRecord from "@components/pages/mgr/SEIKATSUKAIGO/record/Daily";
import OperationsRecord from "@components/pages/mgr/SEIKATSUKAIGO/record/Operations";
import UserDetail from "@components/pages/mgr/SEIKATSUKAIGO/record/UserDetail";
import SupportPlan from "@components/pages/mgr/SEIKATSUKAIGO/record/SupportPlan";
import SupportPlanNew from "@components/pages/mgr/SEIKATSUKAIGO/record/SupportPlanNew";
import SupportPlanList from "@components/pages/mgr/SEIKATSUKAIGO/record/SupportPlanList";
import RecordUsersSummary from "@components/pages/mgr/SEIKATSUKAIGO/record/UsersSummary";

interface OwnProps {
  user: UserState;
}

type Props = OwnProps;

/**
 * 生活介護施設でログインした時だけ有効になるルーティング
 */
const SEIKATSUKAIGORoutes: React.FunctionComponent<Props> = ({ user }) => (
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
    {/* 記録機能 */}
    {RecordRoutes}
    <AdminRoute exact path="/record/daily/:yyyymmdd?" component={DailyRecord} />
    <AdminRoute exact path="/record/operations" component={OperationsRecord} />
    <AdminRoute
      exact
      path="/record/operations/:year/:month"
      component={OperationsRecord}
    />
    <AdminRoute
      exact
      path="/record/:uifId/support_plan/new"
      component={SupportPlanNew}
    />
    <AdminRoute
      exact
      path="/record/:uifId/support_plan/:supportPlanId"
      component={SupportPlan}
    />
    <AdminRoute
      exact
      path="/record/:uifId/:recordType(support|work|interview)/:year?/:month?"
      component={UserDetail}
    />
    <AdminRoute
      exact
      path="/record/:uifId/:recordType(support_plan)/:year?/:month?"
      component={SupportPlanList}
    />
    <AdminRoute
      exact
      path="/record/users_summary"
      component={RecordUsersSummary}
    />
    {/* default path */}
    <Route path="/">
      <Redirect
        to={user.role === "mgruser" ? "/attendance" : "/report/daily"}
      />
    </Route>
  </Switch>
);

export default SEIKATSUKAIGORoutes;
