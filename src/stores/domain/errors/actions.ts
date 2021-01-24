import * as types from "./types";
import { GetInvoiceErrorsResponse } from "@api/requests/errors/getInvoiceErrors";
import { GetUserErrorsResponse } from "@api/requests/errors/getUserErrors";
import { GetInOutErrorsResponse } from "@api/requests/errors/getInOutErrors";
import { GetSummaryErrorsResponse } from "@api/requests/errors/getSummaryErrors";
import { GetPlanErrorsResponse } from "@api/requests/errors/getPlanErrors";
import { GetGoalErrorsResponse } from "@api/requests/errors/getGoalErrors";
import { GetRecordErrorsResponse } from "@api/requests/errors/getRecordErrors";
import { GetOffsiteWorkErrorsResponse } from "@api/requests/errors/getOffsiteWorkErrors";

export const fetchInvoiceStarted = () =>
  ({ type: types.FETCH_INVOICE_STARTED } as const);
export const fetchInvoiceSuccess = (
  res: GetInvoiceErrorsResponse,
  meta: { hasError: boolean; errorCount: number }
) => ({ meta, type: types.FETCH_INVOICE_SUCCESS, payload: res } as const);
export const fetchInvoiceFailed = (err: {
  error: GetInvoiceErrorsResponse["response"];
}) => ({ type: types.FETCH_INVOICE_FAILED, error: err } as const);

export const fetchUserStarted = () =>
  ({ type: types.FETCH_USER_STARTED } as const);
export const fetchUserSuccess = (
  res: GetUserErrorsResponse,
  meta: { hasError: boolean; errorCount: number }
) => ({ meta, type: types.FETCH_USER_SUCCESS, payload: res } as const);
export const fetchUserFailed = (err: {
  error: GetUserErrorsResponse["response"];
}) => ({ type: types.FETCH_USER_FAILED, error: err } as const);

export const fetchInoutStarted = () =>
  ({ type: types.FETCH_INOUT_STARTED } as const);
export const fetchInoutSuccess = (
  res: GetInOutErrorsResponse,
  meta: { hasError: boolean; errorCount: number }
) => ({ meta, type: types.FETCH_INOUT_SUCCESS, payload: res } as const);
export const fetchInoutFailed = (err: {
  error: GetInOutErrorsResponse["response"];
}) => ({ type: types.FETCH_INOUT_FAILED, error: err } as const);

export const fetchSummaryStarted = () =>
  ({ type: types.FETCH_SUMMARY_STARTED } as const);
export const fetchSummarySuccess = (res: GetSummaryErrorsResponse) =>
  ({ type: types.FETCH_SUMMARY_SUCCESS, payload: res } as const);
export const fetchSummaryFailed = (err: {
  error: GetSummaryErrorsResponse["response"];
}) => ({ type: types.FETCH_SUMMARY_FAILED, error: err } as const);

export const fetchPlanStarted = () =>
  ({ type: types.FETCH_PLAN_STARTED } as const);
export const fetchPlanSuccess = (
  res: GetPlanErrorsResponse,
  meta: { hasError: boolean; errorCount: number }
) => ({ meta, type: types.FETCH_PLAN_SUCCESS, payload: res } as const);
export const fetchPlanFailed = (err: {
  error: GetPlanErrorsResponse["response"];
}) => ({ type: types.FETCH_PLAN_FAILED, error: err } as const);

export const fetchGoalStarted = () =>
  ({ type: types.FETCH_GOAL_STARTED } as const);
export const fetchGoalSuccess = (
  res: GetGoalErrorsResponse,
  meta: { hasError: boolean; errorCount: number }
) => ({ meta, type: types.FETCH_GOAL_SUCCESS, payload: res } as const);
export const fetchGoalFailed = (err: {
  error: GetGoalErrorsResponse["response"];
}) => ({ type: types.FETCH_GOAL_FAILED, error: err } as const);

export const fetchRecordStarted = () =>
  ({ type: types.FETCH_RECORD_STARTED } as const);
export const fetchRecordSuccess = (
  res: GetRecordErrorsResponse,
  meta: { hasError: boolean; errorCount: number }
) => ({ meta, type: types.FETCH_RECORD_SUCCESS, payload: res } as const);
export const fetchRecordFailed = (err: {
  error: GetRecordErrorsResponse["response"];
}) => ({ type: types.FETCH_RECORD_FAILED, error: err } as const);

export const fetchOffsiteWorkStarted = () =>
  ({ type: types.FETCH_OFFSITE_WORK_STARTED } as const);
export const fetchOffsiteWorkSuccess = (
  res: GetOffsiteWorkErrorsResponse,
  meta: { hasError: boolean; errorCount: number }
) => ({ meta, type: types.FETCH_OFFSITE_WORK_SUCCESS, payload: res } as const);
export const fetchOffsiteWorkFailed = (err: {
  error: GetOffsiteWorkErrorsResponse["response"];
}) => ({ type: types.FETCH_OFFSITE_WORK_FAILED, error: err } as const);

export type ActionTypes =
  | ReturnType<typeof fetchInvoiceStarted>
  | ReturnType<typeof fetchInvoiceSuccess>
  | ReturnType<typeof fetchInvoiceFailed>
  | ReturnType<typeof fetchUserStarted>
  | ReturnType<typeof fetchUserSuccess>
  | ReturnType<typeof fetchUserFailed>
  | ReturnType<typeof fetchInoutStarted>
  | ReturnType<typeof fetchInoutSuccess>
  | ReturnType<typeof fetchInoutFailed>
  | ReturnType<typeof fetchSummaryStarted>
  | ReturnType<typeof fetchSummarySuccess>
  | ReturnType<typeof fetchSummaryFailed>
  | ReturnType<typeof fetchPlanStarted>
  | ReturnType<typeof fetchPlanSuccess>
  | ReturnType<typeof fetchPlanFailed>
  | ReturnType<typeof fetchGoalStarted>
  | ReturnType<typeof fetchGoalSuccess>
  | ReturnType<typeof fetchGoalFailed>
  | ReturnType<typeof fetchRecordStarted>
  | ReturnType<typeof fetchRecordSuccess>
  | ReturnType<typeof fetchRecordFailed>
  | ReturnType<typeof fetchOffsiteWorkStarted>
  | ReturnType<typeof fetchOffsiteWorkSuccess>
  | ReturnType<typeof fetchOffsiteWorkFailed>;
