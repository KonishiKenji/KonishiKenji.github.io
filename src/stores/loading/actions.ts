import * as types from "./types";

export const loadStarted = () => ({ type: types.LOAD_STARTED } as const);
export const loadDone = () => ({ type: types.LOAD_DONE } as const);

export type ActionTypes =
  | ReturnType<typeof loadStarted>
  | ReturnType<typeof loadDone>;
