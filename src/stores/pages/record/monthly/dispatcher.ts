import { Dispatch } from "redux";
import * as actions from "./actions";
import * as loadingActions from "@stores/loading/actions";
import * as snackbarActions from "@stores/ui/snackbar/actions";
import * as responseErrorActions from "@stores/ui/responseError/actions";
import * as operationsActions from "@stores/domain/operations/actions";
import * as workActions from "@stores/domain/work/actions";
import * as staffActions from "@stores/domain/staff/actions";
import operationsDispatcher from "@stores/domain/operations/dispatcher";
import operationsApi from "@api/requests/operations";
import workApi from "@api/requests/work";
import staffApi from "@api/requests/staff";
import { RecordMonthlyValues as SEIKATSUKAIGOFormValues } from "@initialize/mgr/SEIKATSUKAIGO/record/monthly/initialValues";
import { RecordMonthlyValues as IABFormValues } from "@initialize/mgr/IAB/record/monthly/initialValues";
import normalizeFormValuesToPostOperationsParams from "./normalizer";
import { WorkState } from "@stores/domain/work/types";
import { StaffState } from "@stores/domain/staff/types";

type RecordMonthlyValues = SEIKATSUKAIGOFormValues | IABFormValues;

/**
 * 日々の記録初回用、MonthlyRecord + work + staff全取得
 */
export const fetchInitialMonthlyRecord = (dispatch: Dispatch) => async (
  year: string,
  month: string
): Promise<void> => {
  dispatch(loadingActions.loadStarted());

  dispatch(operationsActions.fetchMonthlyRecordStarted());
  dispatch(workActions.fetchStarted());
  dispatch(staffActions.fetchStarted());
  Promise.all([
    operationsApi.getOperations(year, month),
    workApi.getWork(),
    staffApi.getStaff()
  ])
    .then((results) => {
      dispatch(
        operationsActions.fetchMonthlyRecordSuccess(results[0].data.data)
      );
      dispatch(workActions.fetchSuccess(results[1].data));
      dispatch(staffActions.fetchSuccess(results[2].data));
    })
    .catch((e) => {
      dispatch(
        operationsActions.fetchMonthlyRecordFailed({ error: e.response })
      );
      dispatch(workActions.fetchFailed({ error: e.response }));
      dispatch(staffActions.fetchFailed({ error: e.response }));
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

/**
 * 日々の記録更新
 */
export const postMonthlyRecord = (dispatch: Dispatch) => async (
  year: string,
  month: string,
  params: RecordMonthlyValues,
  initialValues: RecordMonthlyValues,
  state: {
    work: WorkState;
    staff: StaffState;
  }
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(operationsActions.postMonthlyRecordStarted());
  const normalizedParams = normalizeFormValuesToPostOperationsParams(
    params,
    initialValues,
    state.work,
    state.staff
  );

  await operationsApi
    .postOperations(normalizedParams)
    .then(async () => {
      dispatch(operationsActions.postMonthlyRecordSuccess());
      dispatch(snackbarActions.showSnackbar("内容を保存しました。", "success"));
      // 再取得
      await operationsDispatcher(dispatch).fetchMonthlyRecord(year, month);
      dispatch(actions.unsetEdit());
    })
    .catch((e) => {
      dispatch(
        operationsActions.postMonthlyRecordFailed({ error: e.response })
      );
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export default (dispatch: Dispatch) => ({
  fetchInitialMonthlyRecord: fetchInitialMonthlyRecord(dispatch),
  postMonthlyRecord: postMonthlyRecord(dispatch)
});
