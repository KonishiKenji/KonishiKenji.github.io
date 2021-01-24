import * as types from "./types";

export const setEdit = (targetDate: string) =>
  ({ type: types.SET_EDIT, payload: targetDate } as const);
export const unsetEdit = () => ({ type: types.UNSET_EDIT } as const);

export type ActionTypes =
  | ReturnType<typeof setEdit>
  | ReturnType<typeof unsetEdit>;
