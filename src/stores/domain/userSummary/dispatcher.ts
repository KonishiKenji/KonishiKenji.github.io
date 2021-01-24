import { Dispatch } from "redux";
import * as actions from "./actions";
import * as loadingActions from "@stores/loading/actions";
import * as snackbarActions from "@stores/ui/snackbar/actions";
import * as responseErrorActions from "@stores/ui/responseError/actions";
import userSummaryApi from "@api/requests/userSummary";

/**
 * 選択された利用者ごとの支援記録を取得
 */
export const fetchUserSummarySupportReports = (dispatch: Dispatch) => async (
  year: string,
  month: string,
  excludedUserIds?: string
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchUserSummarySupportReportsStarted());
  await userSummaryApi
    .getUserSummarySupportReports(year, month, excludedUserIds)
    .then(res => {
      dispatch(
        actions.fetchUserSummarySupportReportsSuccess(res.data.supportRecords)
      );
    })
    .catch(e => {
      dispatch(
        actions.fetchUserSummarySupportReportsFailed({ error: e.response })
      );
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export default (dispatch: Dispatch) => ({
  fetchUserSummarySupportReports: fetchUserSummarySupportReports(dispatch)
});
