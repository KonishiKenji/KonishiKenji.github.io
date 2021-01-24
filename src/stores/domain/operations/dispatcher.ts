import { Dispatch } from "redux";
import * as actions from "./actions";
import * as loadingActions from "@stores/loading/actions";
import * as snackbarActions from "@stores/ui/snackbar/actions";
import * as responseErrorActions from "@stores/ui/responseError/actions";
import operationsApi from "@api/requests/operations";
import { PostOperationsParams } from "@api/requests/operations/postOperations";

/**
 * 日々の記録取得
 */
export const fetchDailyRecord = (dispatch: Dispatch) => async (
  yyyymmdd: string
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchDailyRecordStarted());
  await operationsApi
    .getOperationsAndSupports(yyyymmdd)
    .then(res => {
      dispatch(actions.fetchDailyRecordSuccess(res.data.data));
    })
    .catch(e => {
      dispatch(actions.fetchDailyRecordFailed({ error: e.response }));
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export const fetchMonthlyRecord = (dispatch: Dispatch) => async (
  year: string,
  month: string
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchMonthlyRecordStarted());
  await operationsApi
    .getOperations(year, month)
    .then(res => {
      dispatch(actions.fetchMonthlyRecordSuccess(res.data.data));
    })
    .catch(e => {
      dispatch(actions.fetchMonthlyRecordFailed({ error: e.response }));
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export const postMonthlyRecord = (dispatch: Dispatch) => async (
  params: PostOperationsParams
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.postMonthlyRecordStarted());
  await operationsApi
    .postOperations(params)
    .then(res => {
      dispatch(actions.postMonthlyRecordSuccess());
    })
    .catch(e => {
      dispatch(actions.postMonthlyRecordFailed({ error: e.response }));
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export default (dispatch: Dispatch) => ({
  fetchDailyRecord: fetchDailyRecord(dispatch),
  fetchMonthlyRecord: fetchMonthlyRecord(dispatch),
  postMonthlyRecord: postMonthlyRecord(dispatch)
});
