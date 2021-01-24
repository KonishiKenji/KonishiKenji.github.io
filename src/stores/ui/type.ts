import { ResponseErrorState } from "./responseError/types";

/**
 * 新規で作る際は`./snackbar/types`を使うこと
 */
export interface SnackbarParams {
  open: boolean;
  message: string;
  variant: "success" | "warning" | "error" | "info";
}

export type ResponseError = ResponseErrorState;
