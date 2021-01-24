import { Dispatch } from "redux";
import * as actions from "./actions";
import * as loadingActions from "@stores/loading/actions";
import {
  normalizeGetInitialResult,
  normalizeFormValue,
  normalizePostInitialParams
} from "./normalizer";
import { InitialDataValues } from "@interfaces/mgr/SEIKATSUKAIGO/initial/initialData";
import { InitialState } from "@stores/domain/mgr/SEIKATSUKAIGO/initial/types";
import initialApi from "@api/requests/initial";
import dispatches from "@stores/dispatches";

export const fetch = (dispatch: Dispatch) => async (): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchStarted());
  await initialApi
    .getInitial()
    .then(res => {
      const normalizedData = normalizeGetInitialResult(res.data);
      dispatch(actions.fetchSuccess(normalizedData));
    })
    .catch(e => {
      dispatch(actions.fetchFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー", // TODO fix
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export const post = (dispatch: Dispatch) => async (
  values: InitialDataValues,
  initialState: InitialState
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.postStarted());
  const params = normalizeFormValue(values, initialState);
  await initialApi
    .postInitial(params)
    .then(res => {
      const postParams = normalizePostInitialParams(params, initialState);
      dispatch(actions.postSuccess(postParams));
      dispatches.uiDispatch(dispatch).stopHistory(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "保存が完了しました",
        variant: "success"
      });
    })
    .catch(e => {
      dispatch(actions.postFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー", // TODO fix
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export default (dispatch: Dispatch) => ({
  fetch: fetch(dispatch),
  post: post(dispatch)
});
