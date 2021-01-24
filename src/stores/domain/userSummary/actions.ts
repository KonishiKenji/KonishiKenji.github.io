import * as types from "./types";
import { GetUserSummarySupportReports } from "@api/requests/userSummary/getUserSummarySupportReports";

export const fetchUserSummarySupportReportsStarted = () =>
  ({ type: types.FETCH_USER_SUMMARY_SUPPORT_REPORTS_STARTED } as const);
export const fetchUserSummarySupportReportsSuccess = (
  res: GetUserSummarySupportReports["supportRecords"]
) =>
  ({
    type: types.FETCH_USER_SUMMARY_SUPPORT_REPORTS_SUCCESS,
    payload: res
  } as const);
export const fetchUserSummarySupportReportsFailed = (err: any) =>
  ({
    type: types.FETCH_USER_SUMMARY_SUPPORT_REPORTS_FAILED,
    error: err
  } as const);

export type ActionTypes =
  | ReturnType<typeof fetchUserSummarySupportReportsStarted>
  | ReturnType<typeof fetchUserSummarySupportReportsSuccess>
  | ReturnType<typeof fetchUserSummarySupportReportsFailed>;
