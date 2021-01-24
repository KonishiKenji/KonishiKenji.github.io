import * as types from "./types";
import { GetOperations } from "@api/requests/operations/getOperations";
import { GetOperationsAndSupports } from "@api/requests/operations/getOperationsAndSupports";
import { GetOperationsDateList } from "@api/requests/operations/getOperationsDateList";
import { GetOperationsUserSummaryList } from "@api/requests/operations/getOperationsUserSummaryList";

export const fetchDailyRecordStarted = () =>
  ({ type: types.FETCH_DAILY_RECORD_STARTED } as const);
export const fetchDailyRecordSuccess = (
  res: GetOperationsAndSupports["data"]
) => ({ type: types.FETCH_DAILY_RECORD_SUCCESS, payload: res } as const);
export const fetchDailyRecordFailed = (err: any) =>
  ({ type: types.FETCH_DAILY_RECORD_FAILED, error: err } as const);

export const fetchMonthlyRecordStarted = () =>
  ({ type: types.FETCH_MONTHLY_RECORD_STARTED } as const);
export const fetchMonthlyRecordSuccess = (res: GetOperations["data"]) =>
  ({ type: types.FETCH_MONTHLY_RECORD_SUCCESS, payload: res } as const);
export const fetchMonthlyRecordFailed = (err: any) =>
  ({ type: types.FETCH_MONTHLY_RECORD_FAILED, error: err } as const);

export const fetchDateListStarted = () =>
  ({ type: types.FETCH_DATE_LIST_STARTED } as const);
export const fetchDateListSuccess = (res: GetOperationsDateList["data"]) =>
  ({ type: types.FETCH_DATE_LIST_SUCCESS, payload: res } as const);
export const fetchDateListFailed = (err: any) =>
  ({ type: types.FETCH_DATE_LIST_FAILED, error: err } as const);

export const fetchUserSummaryListStarted = () =>
  ({ type: types.FETCH_USER_SUMMARY_LIST_STARTED } as const);
export const fetchUserSummaryListSuccess = (
  res: GetOperationsUserSummaryList["data"]
) => ({ type: types.FETCH_USER_SUMMARY_LIST_SUCCESS, payload: res } as const);
export const fetchUserSummaryListFailed = (err: any) =>
  ({ type: types.FETCH_USER_SUMMARY_LIST_FAILED, error: err } as const);

export const postDailyRecordStarted = () =>
  ({ type: types.POST_DAILY_RECORD_STARTED } as const);
export const postDailyRecordSuccess = () =>
  ({ type: types.POST_DAILY_RECORD_SUCCESS } as const);
export const postDailyRecordFailed = (err: any) =>
  ({ type: types.POST_DAILY_RECORD_FAILED, error: err } as const);

export const postMonthlyRecordStarted = () =>
  ({ type: types.POST_MONTHLY_RECORD_STARTED } as const);
export const postMonthlyRecordSuccess = () =>
  ({ type: types.POST_MONTHLY_RECORD_SUCCESS } as const);
export const postMonthlyRecordFailed = (err: any) =>
  ({ type: types.POST_MONTHLY_RECORD_FAILED, error: err } as const);

export type ActionTypes =
  | ReturnType<typeof fetchDailyRecordStarted>
  | ReturnType<typeof fetchDailyRecordSuccess>
  | ReturnType<typeof fetchDailyRecordFailed>
  | ReturnType<typeof fetchMonthlyRecordStarted>
  | ReturnType<typeof fetchMonthlyRecordSuccess>
  | ReturnType<typeof fetchMonthlyRecordFailed>
  | ReturnType<typeof fetchDateListStarted>
  | ReturnType<typeof fetchDateListSuccess>
  | ReturnType<typeof fetchDateListFailed>
  | ReturnType<typeof fetchUserSummaryListStarted>
  | ReturnType<typeof fetchUserSummaryListSuccess>
  | ReturnType<typeof fetchUserSummaryListFailed>
  | ReturnType<typeof postDailyRecordStarted>
  | ReturnType<typeof postDailyRecordSuccess>
  | ReturnType<typeof postDailyRecordFailed>
  | ReturnType<typeof postMonthlyRecordStarted>
  | ReturnType<typeof postMonthlyRecordSuccess>
  | ReturnType<typeof postMonthlyRecordFailed>;
