import * as types from "./types";

export const showAlertDialog = (title: string, message: string) =>
  ({ type: types.SHOW_ALERT_DIALOG, payload: { title, message } } as const);
export const hideAlertDialog = () =>
  ({ type: types.HIDE_ALERT_DIALOG } as const);

export type ActionTypes =
  | ReturnType<typeof showAlertDialog>
  | ReturnType<typeof hideAlertDialog>;
