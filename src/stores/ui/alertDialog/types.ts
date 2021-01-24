export const SHOW_ALERT_DIALOG = "UI/SHOW_ALERT_DIALOG";
export const HIDE_ALERT_DIALOG = "UI/HIDE_ALERT_DIALOG";

export interface AlertDialogState {
  show: boolean;
  title: string;
  message: string;
}
