import * as types from "./types";
import { GetSupportPlanOnceResponse } from "@api/requests/supportPlan/A/getSupportPlanOnce";
import { GetSupportPlanResponse } from "@api/requests/supportPlan/A/getSupportPlan";

type ErrorResponse = {
  error: {
    code: number;
    msg: string;
  };
};

export const fetchPrivateSupportPlanStarted = () =>
  ({ type: types.FETCH_PRIVATE_SUPPORT_PLAN_STARTED } as const);
export const fetchPrivateSupportPlanSuccess = (
  res: GetSupportPlanOnceResponse["data"]
) =>
  ({ type: types.FETCH_PRIVATE_SUPPORT_PLAN_SUCCESS, payload: res } as const);
export const fetchPrivateSupportPlanFailed = (err: ErrorResponse) =>
  ({ type: types.FETCH_PRIVATE_SUPPORT_PLAN_FAILED, error: err } as const);

export const fetchSupportPlanStarted = () =>
  ({ type: types.FETCH_SUPPORT_PLAN_STARTED } as const);
export const fetchSupportPlanSuccess = (res: GetSupportPlanResponse["data"]) =>
  ({ type: types.FETCH_SUPPORT_PLAN_SUCCESS, payload: res } as const);
export const fetchSupportPlanFailed = (err: ErrorResponse) =>
  ({ type: types.FETCH_SUPPORT_PLAN_FAILED, error: err } as const);

export const postNewSupportPlanStarted = () =>
  ({ type: types.POST_NEW_SUPPORT_PLAN_STARTED } as const);
export const postNewSupportPlanSuccess = () =>
  ({ type: types.POST_NEW_SUPPORT_PLAN_SUCCESS } as const);
export const postNewSupportPlanFailed = (err: ErrorResponse) =>
  ({ type: types.POST_NEW_SUPPORT_PLAN_FAILED, error: err } as const);

export const postUpdateSupportPlanStarted = () =>
  ({ type: types.POST_UPDATE_SUPPORT_PLAN_STARTED } as const);
export const postUpdateSupportPlanSuccess = () =>
  ({ type: types.POST_UPDATE_SUPPORT_PLAN_SUCCESS } as const);
export const postUpdateSupportPlanFailed = (err: ErrorResponse) =>
  ({ type: types.POST_UPDATE_SUPPORT_PLAN_FAILED, error: err } as const);

export const deleteSupportPlanStarted = () =>
  ({ type: types.DELETE_SUPPORT_PLAN_STARTED } as const);
export const deleteSupportPlanSuccess = () =>
  ({ type: types.DELETE_SUPPORT_PLAN_SUCCESS } as const);
export const deleteSupportPlanFailed = (err: ErrorResponse) =>
  ({ type: types.DELETE_SUPPORT_PLAN_FAILED, error: err } as const);

export type ActionTypes =
  | ReturnType<typeof fetchPrivateSupportPlanStarted>
  | ReturnType<typeof fetchPrivateSupportPlanSuccess>
  | ReturnType<typeof fetchPrivateSupportPlanFailed>
  | ReturnType<typeof fetchSupportPlanStarted>
  | ReturnType<typeof fetchSupportPlanSuccess>
  | ReturnType<typeof fetchSupportPlanFailed>
  | ReturnType<typeof postNewSupportPlanStarted>
  | ReturnType<typeof postNewSupportPlanSuccess>
  | ReturnType<typeof postNewSupportPlanFailed>
  | ReturnType<typeof postUpdateSupportPlanStarted>
  | ReturnType<typeof postUpdateSupportPlanSuccess>
  | ReturnType<typeof postUpdateSupportPlanFailed>
  | ReturnType<typeof deleteSupportPlanStarted>
  | ReturnType<typeof deleteSupportPlanSuccess>
  | ReturnType<typeof deleteSupportPlanFailed>;
