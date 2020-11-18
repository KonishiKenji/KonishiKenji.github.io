import * as types from "./types";

export const showSnackbar = (
  message: string,
  variant: "success" | "warning" | "error" | "info"
) => ({ type: types.SHOW_SNACKBAR, payload: { message, variant } } as const);
export const hideSnackbar = () => ({ type: types.HIDE_SNACKBAR } as const);

export type ActionTypes =
  | ReturnType<typeof showSnackbar>
  | ReturnType<typeof hideSnackbar>;
