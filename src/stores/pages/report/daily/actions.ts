import * as types from "./types";

export const fetchLatestInoutErrorsStarted = () =>
  ({ type: types.FETCH_LATEST_INOUT_ERRORS_STARTED } as const);
export const fetchLatestInoutErrorsSuccess = (res: string[]) =>
  ({ type: types.FETCH_LATEST_INOUT_ERRORS_SUCCESS, payload: res } as const);
export const fetchLatestInoutErrorsFailed = () =>
  ({ type: types.FETCH_LATEST_INOUT_ERRORS_FAILED } as const);

export type ActionTypes =
  | ReturnType<typeof fetchLatestInoutErrorsStarted>
  | ReturnType<typeof fetchLatestInoutErrorsSuccess>
  | ReturnType<typeof fetchLatestInoutErrorsFailed>;
