import * as types from "./types";

export const fetchStarted = () => ({ type: types.FETCH_STARTED } as const);
export const fetch = (res: types.UsageResult[]) =>
  ({ type: types.FETCH, payload: res } as const);
export const fetchFailed = (err: any) =>
  ({ type: types.FETCH_FAILED, error: err } as const);

export const postStarted = () => ({ type: types.POST_STARTED } as const);
export const post = (res: types.UsageResult[]) =>
  ({ type: types.POST, payload: res } as const);
export const postFailed = (err: any) =>
  ({ type: types.POST_FAILED, error: err } as const);

export type ActionTypes =
  | ReturnType<typeof fetchStarted>
  | ReturnType<typeof fetch>
  | ReturnType<typeof fetchFailed>
  | ReturnType<typeof postStarted>
  | ReturnType<typeof post>
  | ReturnType<typeof postFailed>;
