import { Dispatch } from "redux";
import * as actions from "./actions";
import * as loadingActions from "@stores/loading/actions";
import { normalizeGetInitialResult, normalizeFormValue } from "./normalizer";
import { InitialDataValues } from "@interfaces/mgr/TANKINYUSHO/initial/initialData";
import { InitialState } from "@stores/domain/mgr/TANKINYUSHO/initial/types";
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
        message: "通信エラー",
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
    .then(async res => {
      dispatch(actions.postSuccess());
      dispatches.uiDispatch(dispatch).stopHistory(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "保存が完了しました",
        variant: "success"
      });
      // 再取得
      await fetch(dispatch)();
    })
    .catch(e => {
      dispatch(actions.postFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー",
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export default (dispatch: Dispatch) => ({
  fetch: fetch(dispatch),
  post: post(dispatch)
});
