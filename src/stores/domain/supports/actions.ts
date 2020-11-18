import * as types from "./types";
import { GetSupportsRecordResponse } from "@api/requests/supports/getSupportsRecord";
import { GetReportMonthsResponse } from "@api/requests/report/getMonths";
import { GetReportUsersResponse } from "@api/requests/report/getUsers";

export const fetchSupportsRecordStarted = () =>
  ({ type: types.FETCH_SUPPORTS_RECORD_STARTED } as const);
export const fetchSupportsRecordSuccess = (
  res: GetSupportsRecordResponse["data"]
) => ({ type: types.FETCH_SUPPORTS_RECORD_SUCCESS, payload: res } as const);
export const fetchSupportsRecordFailed = (err: any) =>
  ({ type: types.FETCH_SUPPORTS_RECORD_FAILED, error: err } as const);
export const postSupportsRecordStarted = () =>
  ({ type: types.POST_SUPPORTS_RECORD_STARTED } as const);
export const postSupportsRecordSuccess = () =>
  ({ type: types.POST_SUPPORTS_RECORD_SUCCESS } as const);
export const postSupportsRecordFailed = (err: any) =>
  ({ type: types.POST_SUPPORTS_RECORD_FAILED, error: err } as const);

export const fetchReportMonthsStarted = () =>
  ({ type: types.FETCH_REPORT_MONTHS_STARTED } as const);
export const fetchReportMonthsSuccess = (
  res: GetReportMonthsResponse["months"]
) => ({ type: types.FETCH_REPORT_MONTHS_SUCCESS, payload: res } as const);
export const fetchReportMonthsFailed = (err: any) =>
  ({ type: types.FETCH_REPORT_MONTHS_FAILED, error: err } as const);
export const fetchReportUsersStarted = () =>
  ({ type: types.FETCH_REPORT_USERS_STARTED } as const);
export const fetchReportUsersSuccess = (res: {
  facility: GetReportUsersResponse["facility"];
  users: GetReportUsersResponse["users"];
}) => ({ type: types.FETCH_REPORT_USERS_SUCCESS, payload: res } as const);
export const fetchReportUsersFailed = (err: any) =>
  ({ type: types.FETCH_REPORT_USERS_FAILED, error: err } as const);

export type ActionTypes =
  | ReturnType<typeof fetchSupportsRecordStarted>
  | ReturnType<typeof fetchSupportsRecordSuccess>
  | ReturnType<typeof fetchSupportsRecordFailed>
  | ReturnType<typeof postSupportsRecordStarted>
  | ReturnType<typeof postSupportsRecordSuccess>
  | ReturnType<typeof postSupportsRecordFailed>
  | ReturnType<typeof fetchReportMonthsStarted>
  | ReturnType<typeof fetchReportMonthsSuccess>
  | ReturnType<typeof fetchReportMonthsFailed>
  | ReturnType<typeof fetchReportUsersStarted>
  | ReturnType<typeof fetchReportUsersSuccess>
  | ReturnType<typeof fetchReportUsersFailed>;
