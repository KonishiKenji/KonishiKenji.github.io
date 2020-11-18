import { GetUserSummarySupportReports } from "@api/requests/userSummary/getUserSummarySupportReports";

/**
 * ActionNames
 */
export const FETCH_USER_SUMMARY_SUPPORT_REPORTS_STARTED =
  "SUPPORTS/FETCH_USER_SUMMARY_SUPPORT_REPORTS_STARTED";
export const FETCH_USER_SUMMARY_SUPPORT_REPORTS_SUCCESS =
  "SUPPORTS/FETCH_USER_SUMMARY_SUPPORT_REPORTS_SUCCESS";
export const FETCH_USER_SUMMARY_SUPPORT_REPORTS_FAILED =
  "SUPPORTS/FETCH_USER_SUMMARY_SUPPORT_REPORTS_FAILED";

/**
 * State
 */
export interface UserSummaryState {
  supportRecords: GetUserSummarySupportReports["supportRecords"];
}
