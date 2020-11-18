import { GetWorkRecordsResponse } from "@api/requests/workRecords/getWorkRecords";
import { GetWorkRecordsMonthListResponse } from "@api/requests/workRecords/getWortRecordsMonthList";

/**
 * ActionNames
 */
export const FETCH_WORK_RECORDS_STARTED =
  "WORK_RECORDS/FETCH_WORK_RECORDS_STARTED";
export const FETCH_WORK_RECORDS_SUCCESS =
  "WORK_RECORDS/FETCH_WORK_RECORDS_SUCCESS";
export const FETCH_WORK_RECORDS_FAILED =
  "WORK_RECORDS/FETCH_WORK_RECORDS_FAILED";
export const FETCH_WORK_RECORDS_MONTH_LIST_STARTED =
  "WORK_RECORDS/FETCH_WORK_RECORDS_MONTH_LIST_STARTED";
export const FETCH_WORK_RECORDS_MONTH_LIST_SUCCESS =
  "WORK_RECORDS/FETCH_WORK_RECORDS_MONTH_LIST_SUCCESS";
export const FETCH_WORK_RECORDS_MONTH_LIST_FAILED =
  "WORK_RECORDS/FETCH_WORK_RECORDS_MONTH_LIST_FAILED";

/**
 * State
 */
export interface WorkRecordsState {
  data: GetWorkRecordsResponse["data"];
  dateList: GetWorkRecordsMonthListResponse["data"];
}
