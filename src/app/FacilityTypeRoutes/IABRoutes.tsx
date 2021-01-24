import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AdminRoute from "@app/Auth/AdminRoute";
import { UserState } from "@stores/domain/user/type";
import { FacilityType } from "@constants/variables";
import * as URL from "@constants/url";

// 利用実績
import ReportDaily from "@components/pages/mgr/IAB/report/Daily";
import ReportMonthly from "@components/pages/mgr/IAB/report/Monthly";

// 利用者情報
import UsersList from "@components/pages/mgr/IAB/users/UsersList";
import CreateUser from "@components/pages/mgr/IAB/users/CreateUser";
import EditUser from "@components/pages/mgr/IAB/users/EditUser";

// 事業者情報
import Facility from "@components/pages/mgr/IAB/Facility";

// 初期設定情報
import InitialData from "@components/pages/mgr/IAB/InitialData";

// 記録機能
import RecordRoutes from "@app/CommonRoutes/RecordRoutes";
import DailyRecord from "@components/pages/mgr/IAB/record/Daily";
import OperationsRecord from "@components/pages/mgr/IAB/record/Operations";
import UserDetail from "@components/pages/mgr/IAB/record/UserDetail";
import SupportPlan from "@components/pages/mgr/IAB/record/SupportPlan";
import SupportPlanNew from "@components/pages/mgr/IAB/record/SupportPlanNew";
import SupportPlanList from "@components/pages/mgr/IAB/record/SupportPlanList";
import SupportPlanA from "@components/pages/mgr/A/record/SupportPlanA";
import SupportPlanANew from "@components/pages/mgr/A/record/SupportPlanANew";
import SupportPlanAList from "@components/pages/mgr/A/record/SupportPlanAList";
import RecordUsersSummary from "@components/pages/mgr/IAB/record/UsersSummary";
import OffsiteWork from "@components/pages/mgr/IAB/record/OffsiteWork";
import WorkplaceCompanyEdit from "@components/pages/mgr/IAB/record/WorkplaceCompanyEdit";
import OffsiteWorkPrint from "@components/pages/record/print/OffsiteWorkPrint";
import OffsiteWorkPreview from "@components/pages/record/print/OffsiteWorkPreview";

// 作業時間
import WorkRecords from "@components/pages/mgr/IAB/WorkRecords";
import EvaluationA from "@components/pages/mgr/A/record/EvaluationA";

interface OwnProps {
  user: UserState;
}

type Props = OwnProps;

/**
 * 移行/A型/B型施設でログインした時だけ有効になるルーティング
 */
const IABRoutes: React.FunctionComponent<Props> = ({ user }) => (
  <Switch>
    {/* 利用実績 */}
    <AdminRoute path="/report/daily" component={ReportDaily} />
    <AdminRoute path="/report/monthly" component={ReportMonthly} />
    {/* 利用者情報 */}
    <AdminRoute exact path={URL.USERS} component={UsersList} />
    <AdminRoute exact path="/users/new" component={CreateUser} />
    <AdminRoute exact path="/users/:id" component={EditUser} />
    {/* 事業者情報 */}
    <AdminRoute path="/facility" component={Facility} />
    {/* 初期設定情報 */}
    <AdminRoute path="/initial" component={InitialData} />
    {/* 作業時間 */}
    <AdminRoute path="/work-records" component={WorkRecords} />
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
      component={
        user.facility_type !== FacilityType.A ? SupportPlanNew : SupportPlanANew
      }
    />
    <AdminRoute
      exact
      path="/record/:uifId/support_plan/:supportPlanId"
      component={
        user.facility_type !== FacilityType.A ? SupportPlan : SupportPlanA
      }
    />
    {user.facility_type === FacilityType.A && (
      <AdminRoute
        exact
        path="/record/:uifId/support_plan/evaluation/:supportPlanId"
        component={EvaluationA}
      />
    )}
    <AdminRoute
      exact
      path="/record/:uifId/:recordType(support|work|interview)/:year?/:month?"
      component={UserDetail}
    />
    <AdminRoute
      exact
      path="/record/:uifId/:recordType(support_plan)/:year?/:month?"
      component={
        user.facility_type !== FacilityType.A
          ? SupportPlanList
          : SupportPlanAList
      }
    />
    <AdminRoute
      exact
      path="/record/users_summary"
      component={RecordUsersSummary}
    />
    <AdminRoute exact path="/record/offsite-work" component={OffsiteWork} />
    <AdminRoute
      exact
      path="/record/offsite-work/workplace_company/new"
      component={WorkplaceCompanyEdit}
    />
    <AdminRoute
      exact
      path="/record/offsite-work/workplace_company/:id"
      component={WorkplaceCompanyEdit}
    />
    <AdminRoute
      exact
      path="/record/print/offsite-work/:year/:month"
      component={OffsiteWorkPrint}
    />
    {/* 旧パス(v1受付用) */}
    <AdminRoute
      exact
      path="/download/preview/offsite-work/:year/:month"
      component={OffsiteWorkPreview}
    />
    {/* default path */}
    <Route path="/">
      <Redirect
        to={user.role === "mgruser" ? "/attendance" : "/report/daily"}
      />
    </Route>
  </Switch>
);

export default IABRoutes;
