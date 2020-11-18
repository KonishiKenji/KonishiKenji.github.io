import * as types from "./types";
import { GetWorkResponse } from "@api/requests/work/getWork";

export const fetchStarted = () => ({ type: types.FETCH_STARTED } as const);
export const fetchSuccess = (res: GetWorkResponse) =>
  ({ type: types.FETCH_SUCCESS, payload: res } as const);
export const fetchFailed = (err: any) =>
  ({ type: types.FETCH_FAILED, error: err } as const);

export const postStarted = () => ({ type: types.POST_STARTED } as const);
export const postSuccess = () => ({ type: types.POST_SUCCESS } as const);
export const postFailed = (err: any) =>
  ({ type: types.POST_FAILED, error: err } as const);

export const deleteStarted = () => ({ type: types.DELETE_STARTED } as const);
export const deleteSuccess = () => ({ type: types.DELETE_SUCCESS } as const);
export const deleteFailed = (err: any) =>
  ({ type: types.DELETE_FAILED, error: err } as const);

export type ActionTypes =
  | ReturnType<typeof fetchStarted>
  | ReturnType<typeof fetchSuccess>
  | ReturnType<typeof fetchFailed>
  | ReturnType<typeof postStarted>
  | ReturnType<typeof postSuccess>
  | ReturnType<typeof postFailed>
  | ReturnType<typeof deleteStarted>
  | ReturnType<typeof deleteSuccess>
  | ReturnType<typeof deleteFailed>;
