import * as React from "react";
import AdminRoute from "@app/Auth/AdminRoute";

import Works from "@components/pages/works/Works";
import Staffs from "@components/pages/staffs/Staffs";
import DailyRecordPrint from "@components/pages/record/print/DailyPrint";
import OperationsRecordPrint from "@components/pages/record/print/OperationsPrint";
import RecordUsersSummaryInterviewPrint from "@components/pages/record/print/UsersSummaryInterviewPrint";
import RecordUsersSummarySupportPrint from "@components/pages/record/print/UsersSummarySupportPrint";
import RecordUsersSummaryWorkPrint from "@components/pages/record/print/UsersSummaryWorkPrint";
import SupportPlanRecordPrint from "@components/pages/record/print/SupportPlanPrint";
import SupportRecordPrint from "@components/pages/record/print/SupportPrint";
import WorkRecordPrint from "@components/pages/record/print/WorkPrint";
import InterviewRecordPrint from "@components/pages/record/print/InterviewPrint";
import EvaluationPrint from "@components/pages/record/print/EvaluationPrint";

/**
 * 記録機能
 */
const RecordRoutes = [
  /* 作業情報 */
  <AdminRoute key="Works" path="/works" exact component={Works} />,
  /* 職員情報 */
  <AdminRoute key="Staffs" path="/staffs" exact component={Staffs} />,
  /* 印刷・日々の記録 */
  <AdminRoute
    key="DailyRecordPrint"
    exact
    path="/record/print/daily/:yyyymmdd"
    component={DailyRecordPrint}
  />,
  /* 印刷・業務日誌 */
  <AdminRoute
    key="OperationsRecordPrint"
    exact
    path="/record/print/operations/:year/:month"
    component={OperationsRecordPrint}
  />,
  /* 利用者ごと > 一括印刷・支援記録 */
  <AdminRoute
    key="RecordUsersSummarySupportPrint"
    exact
    path="/record/print/users_summary_support/:year/:month"
    component={RecordUsersSummarySupportPrint}
  />,
  /* 利用者ごと > 一括印刷・作業記録 */
  <AdminRoute
    key="RecordUsersSummaryWorkPrint"
    exact
    path="/record/print/users_summary_work/:year/:month"
    component={RecordUsersSummaryWorkPrint}
  />,
  /* 利用者ごと > 一括印刷・面談記録 */
  <AdminRoute
    key="RecordUsersSummaryInterviewPrint"
    exact
    path="/record/print/users_summary_interview/:year/:month"
    component={RecordUsersSummaryInterviewPrint}
  />,
  /* 印刷・個別支援計画 */
  <AdminRoute
    key="SupportPlanRecordPrint"
    exact
    path="/record/print/:uifId/support_plan/:supportPlanId"
    component={SupportPlanRecordPrint}
  />,
  /* 印刷・評価振り返り */
  <AdminRoute
    key="EvaluationPrint"
    exact
    path="/record/print/:uifId/support_plan/evaluation/:supportPlanId"
    component={EvaluationPrint}
  />,
  /* 印刷・支援記録 */
  <AdminRoute
    key="SupportRecordPrint"
    exact
    path="/record/print/:uifId/support/:year/:month"
    component={SupportRecordPrint}
  />,
  /* 印刷・作業記録 */
  <AdminRoute
    key="WorkRecordPrint"
    exact
    path="/record/print/:uifId/work/:year/:month"
    component={WorkRecordPrint}
  />,
  /* 印刷・面談記録 */
  <AdminRoute
    key="InterviewRecordPrint"
    exact
    path="/record/print/:uifId/interview/:year/:month"
    component={InterviewRecordPrint}
  />,
  <AdminRoute
    key="InterviewRecordPrint2"
    exact
    path="/record/print/:uifId/interview"
    component={InterviewRecordPrint}
  />
];

export default RecordRoutes;
