import * as types from "./types";

export const setResponseError = (error: types.ResponseErrorState) =>
  ({ type: types.SET_RESPONSE_ERROR, payload: error } as const);
export const resetResponseError = () =>
  ({ type: types.RESET_RESPONSE_ERROR } as const);

export type ActionTypes =
  | ReturnType<typeof setResponseError>
  | ReturnType<typeof resetResponseError>;
