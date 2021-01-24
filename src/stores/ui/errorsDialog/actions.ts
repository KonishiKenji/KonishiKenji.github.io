import * as types from "./types";

export const showErrorsDialog = () =>
  ({ type: types.SHOW_ERRORS_DIALOG } as const);
export const hideErrorsDialog = () =>
  ({ type: types.HIDE_ERRORS_DIALOG } as const);

export type ActionTypes =
  | ReturnType<typeof showErrorsDialog>
  | ReturnType<typeof hideErrorsDialog>;
