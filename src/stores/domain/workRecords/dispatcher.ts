import { Dispatch } from "redux";
import * as actions from "./actions";
import * as loadingActions from "@stores/loading/actions";
import workRecordsApi from "@api/requests/workRecords";
import dispatches from "@stores/dispatches";

export const fetchWorkRecords = (dispatch: Dispatch) => async (
  startDate: string,
  endDate: string
) => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchWorkRecordsStarted());
  await workRecordsApi
    .getWorkRecords(startDate, endDate)
    .then(res => {
      dispatch(actions.fetchWorkRecordsSuccess(res.data));
    })
    .catch(e => {
      dispatch(actions.fetchWorkRecordsFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export const fetchWorkRecordsMonthList = (dispatch: Dispatch) => async () => {
  dispatch(actions.fetchWorkRecordsMonthListStarted());
  await workRecordsApi
    .getWortRecordsMonthList()
    .then(res => {
      dispatch(actions.fetchWorkRecordsMonthListSuccess(res.data));
    })
    .catch(e => {
      dispatch(actions.fetchWorkRecordsMonthListFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
    });
};

export default (dispatch: Dispatch) => ({
  fetchWorkRecords: fetchWorkRecords(dispatch),
  fetchWorkRecordsMonthList: fetchWorkRecordsMonthList(dispatch)
});
