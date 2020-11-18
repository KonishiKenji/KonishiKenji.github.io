import { GetOperations } from "@api/requests/operations/getOperations";
import { GetOperationsAndSupports } from "@api/requests/operations/getOperationsAndSupports";
import { GetOperationsDateList } from "@api/requests/operations/getOperationsDateList";
import { GetOperationsUserSummaryList } from "@api/requests/operations/getOperationsUserSummaryList";

/**
 * ActionNames
 */
export const FETCH_DAILY_RECORD_STARTED =
  "OPERATIONS/FETCH_DAILY_RECORD_STARTED";
export const FETCH_DAILY_RECORD_SUCCESS =
  "OPERATIONS/FETCH_DAILY_RECORD_SUCCESS";
export const FETCH_DAILY_RECORD_FAILED = "OPERATIONS/FETCH_DAILY_RECORD_FAILED";
export const FETCH_MONTHLY_RECORD_STARTED =
  "OPERATIONS/FETCH_MONTHLY_RECORD_STARTED";
export const FETCH_MONTHLY_RECORD_SUCCESS =
  "OPERATIONS/FETCH_MONTHLY_RECORD_SUCCESS";
export const FETCH_MONTHLY_RECORD_FAILED =
  "OPERATIONS/FETCH_MONTHLY_RECORD_FAILED";
export const FETCH_DATE_LIST_STARTED = "OPERATIONS/FETCH_DATE_LIST_STARTED";
export const FETCH_DATE_LIST_SUCCESS = "OPERATIONS/FETCH_DATE_LIST_SUCCESS";
export const FETCH_DATE_LIST_FAILED = "OPERATIONS/FETCH_DATE_LIST_FAILED";
export const FETCH_USER_SUMMARY_LIST_STARTED =
  "OPERATIONS/FETCH_USER_SUMMARY_LIST_STARTED";
export const FETCH_USER_SUMMARY_LIST_SUCCESS =
  "OPERATIONS/FETCH_USER_SUMMARY_LIST_SUCCESS";
export const FETCH_USER_SUMMARY_LIST_FAILED =
  "OPERATIONS/FETCH_USER_SUMMARY_LIST_FAILED";
export const POST_DAILY_RECORD_STARTED = "OPERATIONS/POST_DAILY_RECORD_STARTED";
export const POST_DAILY_RECORD_SUCCESS = "OPERATIONS/POST_DAILY_RECORD_SUCCESS";
export const POST_DAILY_RECORD_FAILED = "OPERATIONS/POST_DAILY_RECORD_FAILED";
export const POST_MONTHLY_RECORD_STARTED =
  "OPERATIONS/POST_MONTHLY_RECORD_STARTED";
export const POST_MONTHLY_RECORD_SUCCESS =
  "OPERATIONS/POST_MONTHLY_RECORD_SUCCESS";
export const POST_MONTHLY_RECORD_FAILED =
  "OPERATIONS/POST_MONTHLY_RECORD_FAILED";

/**
 * State
 */
export interface OperationsState {
  dailyRecord: GetOperationsAndSupports["data"];
  monthlyRecord: GetOperations["data"];
  dateList: GetOperationsDateList["data"];
  userSummaryList: GetOperationsUserSummaryList["data"] | null;
}
