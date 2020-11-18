import * as types from "./types";
import { GetWorkRecordsResponse } from "@api/requests/workRecords/getWorkRecords";
import { GetWorkRecordsMonthListResponse } from "@api/requests/workRecords/getWortRecordsMonthList";

export const fetchWorkRecordsStarted = () =>
  ({ type: types.FETCH_WORK_RECORDS_STARTED } as const);
export const fetchWorkRecordsSuccess = (res: GetWorkRecordsResponse) =>
  ({ type: types.FETCH_WORK_RECORDS_SUCCESS, payload: res } as const);
export const fetchWorkRecordsFailed = (err: any) =>
  ({ type: types.FETCH_WORK_RECORDS_FAILED, error: err } as const);

export const fetchWorkRecordsMonthListStarted = () =>
  ({ type: types.FETCH_WORK_RECORDS_MONTH_LIST_STARTED } as const);
export const fetchWorkRecordsMonthListSuccess = (
  res: GetWorkRecordsMonthListResponse
) =>
  ({
    type: types.FETCH_WORK_RECORDS_MONTH_LIST_SUCCESS,
    payload: res
  } as const);
export const fetchWorkRecordsMonthListFailed = (err: any) =>
  ({ type: types.FETCH_WORK_RECORDS_MONTH_LIST_FAILED, error: err } as const);

export type ActionTypes =
  | ReturnType<typeof fetchWorkRecordsStarted>
  | ReturnType<typeof fetchWorkRecordsSuccess>
  | ReturnType<typeof fetchWorkRecordsFailed>
  | ReturnType<typeof fetchWorkRecordsMonthListStarted>
  | ReturnType<typeof fetchWorkRecordsMonthListSuccess>
  | ReturnType<typeof fetchWorkRecordsMonthListFailed>;
