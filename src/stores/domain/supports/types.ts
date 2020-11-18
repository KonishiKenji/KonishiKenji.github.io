import { GetSupportsRecordResponse } from "@api/requests/supports/getSupportsRecord";
import { GetReportMonthsResponse } from "@api/requests/report/getMonths";
import { GetReportUsersResponse } from "@api/requests/report/getUsers";

/**
 * ActionNames
 */
export const FETCH_SUPPORTS_RECORD_STARTED =
  "SUPPORTS/FETCH_SUPPORTS_RECORD_STARTED";
export const FETCH_SUPPORTS_RECORD_SUCCESS =
  "SUPPORTS/FETCH_SUPPORTS_RECORD_SUCCESS";
export const FETCH_SUPPORTS_RECORD_FAILED =
  "SUPPORTS/FETCH_SUPPORTS_RECORD_FAILED";
export const POST_SUPPORTS_RECORD_STARTED =
  "SUPPORTS/POST_SUPPORTS_RECORD_STARTED";
export const POST_SUPPORTS_RECORD_SUCCESS =
  "SUPPORTS/POST_SUPPORTS_RECORD_SUCCESS";
export const POST_SUPPORTS_RECORD_FAILED =
  "SUPPORTS/POST_SUPPORTS_RECORD_FAILED";
export const FETCH_REPORT_MONTHS_STARTED =
  "SUPPORTS/FETCH_REPORT_MONTHS_STARTED";
export const FETCH_REPORT_MONTHS_SUCCESS =
  "SUPPORTS/FETCH_REPORT_MONTHS_SUCCESS";
export const FETCH_REPORT_MONTHS_FAILED = "SUPPORTS/FETCH_REPORT_MONTHS_FAILED";
export const FETCH_REPORT_USERS_STARTED = "SUPPORTS/FETCH_REPORT_USERS_STARTED";
export const FETCH_REPORT_USERS_SUCCESS = "SUPPORTS/FETCH_REPORT_USERS_SUCCESS";
export const FETCH_REPORT_USERS_FAILED = "SUPPORTS/FETCH_REPORT_USERS_FAILED";

/**
 * State
 */
export interface SupportsState {
  supportsRecord: GetSupportsRecordResponse["data"];
  report: {
    months: GetReportMonthsResponse["months"];
    users: GetReportUsersResponse["users"];
    facility: GetReportUsersResponse["facility"];
  };
}
