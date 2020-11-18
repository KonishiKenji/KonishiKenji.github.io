import * as types from "./types";

export const setEdit = () => ({ type: types.SET_EDIT } as const);
export const unsetEdit = () => ({ type: types.UNSET_EDIT } as const);

export type ActionTypes =
  | ReturnType<typeof setEdit>
  | ReturnType<typeof unsetEdit>;
