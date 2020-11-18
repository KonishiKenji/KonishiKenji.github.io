import * as types from "./types";

export const waitNavigationTransition = () =>
  ({ type: types.WAIT_NAVIGATION_TRANSITION } as const);
export const cancelNavigationTransition = () =>
  ({ type: types.CANCEL_NAVIGATION_TRANSITION } as const);

export type ActionTypes =
  | ReturnType<typeof waitNavigationTransition>
  | ReturnType<typeof cancelNavigationTransition>;
