import * as types from "./types";

export const fetchStarted = () => ({ type: types.FETCH_STARTED } as const);
export const fetchSuccess = (res: types.InitialState) =>
  ({ type: types.FETCH_SUCCESS, payload: res } as const);
export const fetchFailed = (err: any) =>
  ({ type: types.FETCH_FAILED, error: err } as const);

export const postStarted = () => ({ type: types.POST_STARTED } as const);
export const postSuccess = () => ({ type: types.POST_SUCCESS } as const);
export const postFailed = (err: any) =>
  ({ type: types.POST_FAILED, error: err } as const);

export type ActionTypes =
  | ReturnType<typeof fetchStarted>
  | ReturnType<typeof fetchSuccess>
  | ReturnType<typeof fetchFailed>
  | ReturnType<typeof postStarted>
  | ReturnType<typeof postSuccess>
  | ReturnType<typeof postFailed>;
