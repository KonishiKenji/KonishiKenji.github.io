// TODO: uiではなくstores直下に配置する予定
export const SET_RESPONSE_ERROR = "SET_RESPONSE_ERROR";
export const RESET_RESPONSE_ERROR = "RESET_RESPONSE_ERROR";

export interface ResponseErrorState {
  config: object;
  data: object;
  headers: object;
  request: object;
  status: number;
  statusText: string;
}
