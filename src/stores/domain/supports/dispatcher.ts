import { Dispatch } from "redux";
import * as actions from "./actions";
import * as loadingActions from "@stores/loading/actions";
import * as snackbarActions from "@stores/ui/snackbar/actions";
import * as responseErrorActions from "@stores/ui/responseError/actions";
import supportsApi from "@api/requests/supports";
import reportApi from "@api/requests/report";

export const fetchSupportsRecord = (dispatch: Dispatch) => async (
  uifId: string,
  year: string,
  month: string,
  target?: "work" | "interview"
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchSupportsRecordStarted());
  await supportsApi
    .getSupportsRecord(uifId, year, month, target)
    .then(res => {
      dispatch(actions.fetchSupportsRecordSuccess(res.data.data));
    })
    .catch(e => {
      dispatch(actions.fetchSupportsRecordFailed({ error: e.response }));
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export const fetchReportMonths = (dispatch: Dispatch) => async (
  target: string
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  await reportApi
    .getMonths(target)
    .then(res => {
      dispatch(actions.fetchReportMonthsSuccess(res.data.months || []));
    })
    .catch(e => {
      dispatch(actions.fetchReportMonthsFailed({ error: e.response }));
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export const fetchReportUsers = (dispatch: Dispatch) => async (
  target: string,
  month: string
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  await reportApi
    .getUsers(target, month)
    .then(res => {
      dispatch(
        actions.fetchReportUsersSuccess({
          facility: res.data.facility,
          users: res.data.users
        })
      );
    })
    .catch(e => {
      dispatch(actions.fetchReportUsersFailed({ error: e.response }));
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export default (dispatch: Dispatch) => ({
  fetchSupportsRecord: fetchSupportsRecord(dispatch),
  fetchReportMonths: fetchReportMonths(dispatch),
  fetchReportUsers: fetchReportUsers(dispatch)
});
