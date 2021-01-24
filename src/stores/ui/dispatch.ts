/**
 * 旧構成でのdispatch
 * 使用箇所が多かったため、少しずつ差し替えていく予定
 */
import { Dispatch } from "redux";
import * as loadingActions from "../loading/actions";
import * as navigationTransitionActions from "./navigationTransition/actions";
import * as responseErrorActions from "./responseError/actions";
import * as snackbarActions from "./snackbar/actions";
import { ResponseError, SnackbarParams } from "./type";

const loading = (dispatch: Dispatch) => (isLoading: boolean) => {
  if (isLoading) {
    dispatch(loadingActions.loadStarted());
  } else {
    dispatch(loadingActions.loadDone());
  }
};

/**
 * ブラウザ遷移時の監視の切り替え
 * @param dispatch
 */
const stopHistory = (dispatch: Dispatch) => async (
  needsStopHistory: boolean
) => {
  if (needsStopHistory) {
    dispatch(navigationTransitionActions.waitNavigationTransition());
  } else {
    dispatch(navigationTransitionActions.cancelNavigationTransition());
  }
};

const responseError = (dispatch: Dispatch) => (error: ResponseError) => {
  dispatch(responseErrorActions.setResponseError(error));
};

const responseErrorClear = (dispatch: Dispatch) => () => {
  dispatch(responseErrorActions.resetResponseError());
};

const snackbar = (dispatch: Dispatch) => (params: SnackbarParams) => {
  if (params.open) {
    dispatch(snackbarActions.showSnackbar(params.message, params.variant));
  } else {
    dispatch(snackbarActions.hideSnackbar());
  }
};

export default function(dispatch: Dispatch) {
  return {
    loading: loading(dispatch),
    stopHistory: stopHistory(dispatch),
    snackbar: snackbar(dispatch),
    responseError: responseError(dispatch),
    responseErrorClear: responseErrorClear(dispatch)
  };
}
