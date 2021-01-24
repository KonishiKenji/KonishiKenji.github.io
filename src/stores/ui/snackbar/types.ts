export const SHOW_SNACKBAR = "UI/SHOW_SNACKBAR";
export const HIDE_SNACKBAR = "UI/HIDE_SNACKBAR";

export interface SnackbarState {
  show: boolean;
  message: string;
  variant: "success" | "warning" | "error" | "info";
}
