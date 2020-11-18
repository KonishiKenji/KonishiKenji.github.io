import { Dispatch } from "redux";
import * as actions from "./actions";
import * as loadingActions from "@stores/loading/actions";
import * as snackbarActions from "@stores/ui/snackbar/actions";
import * as responseErrorActions from "@stores/ui/responseError/actions";
import * as operationsActions from "@stores/domain/operations/actions";
import * as workActions from "@stores/domain/work/actions";
import * as staffActions from "@stores/domain/staff/actions";
import normalizeFormValuesToPostOperationsAndSupportsParams from "./normalizer";
import operationsDispatcher from "@stores/domain/operations/dispatcher";
import operationsApi from "@api/requests/operations";
import workApi from "@api/requests/work";
import staffApi from "@api/requests/staff";
import dailySummaryApi from "@api/requests/inOut";
import facilityApi from "@api/requests/facility";
import { RecordDailyValues as SEIKATSUKAIGOFormValues } from "@initialize/mgr/SEIKATSUKAIGO/record/daily/initialValues";
import { RecordDailyValues as IABFormValues } from "@initialize/mgr/IAB/record/daily/initialValues";
import { WorkState } from "@stores/domain/work/types";
import { StaffState } from "@stores/domain/staff/types";
import {
  getReportActions,
  getFacilityActions
} from "@stores/domain/mgr/common/actions";
import {
  getNormalizeGetFacilityResult,
  getNormalizeGetDailySummaryData
} from "@stores/domain/mgr/common/normalizer";
import { FacilityType } from "@constants/variables";
import { IABSummary } from "@stores/domain/mgr/IAB/report/types";

type RecordDailyValues = SEIKATSUKAIGOFormValues | IABFormValues;

/**
 * 日々の記録初回用、dailyRecord + work + staff全取得
 */
export const fetchInitialDailyRecord = (dispatch: Dispatch) => async (
  yyyymmdd: string
): Promise<void> => {
  dispatch(loadingActions.loadStarted());

  const facility = await facilityApi.getFacility().catch((e) => {
    dispatch(responseErrorActions.setResponseError(e.response));
    dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    dispatch(loadingActions.loadDone());
  });
  if (facility === undefined) {
    return;
  }
  const typeService = facility.data.data.facility.type_service as FacilityType;
  const facilityActions = getFacilityActions(typeService);
  const reportActions = getReportActions(typeService);
  const normalizedGetDailySummaryData = getNormalizeGetDailySummaryData(
    typeService
  );

  dispatch(operationsActions.fetchDailyRecordStarted());
  dispatch(workActions.fetchStarted());
  dispatch(staffActions.fetchStarted());
  dispatch(facilityActions.fetchStarted());
  dispatch(reportActions.fetchDailySummaryStarted());
  const getFacilityData = getNormalizeGetFacilityResult(typeService)(
    facility.data
  );
  dispatch(facilityActions.fetchSuccess(getFacilityData as any));

  Promise.all([
    operationsApi.getOperationsAndSupports(yyyymmdd),
    workApi.getWork(),
    staffApi.getStaff(),
    dailySummaryApi.getInOutSummary(yyyymmdd)
  ])
    .then((results) => {
      dispatch(operationsActions.fetchDailyRecordSuccess(results[0].data.data));
      dispatch(workActions.fetchSuccess(results[1].data));
      dispatch(staffActions.fetchSuccess(results[2].data));
      dispatch(
        reportActions.fetchDailySummary(
          normalizedGetDailySummaryData(results[3].data) as IABSummary
        )
      );
    })
    .catch((e) => {
      dispatch(operationsActions.fetchDailyRecordFailed({ error: e.response }));
      dispatch(workActions.fetchFailed({ error: e.response }));
      dispatch(staffActions.fetchFailed({ error: e.response }));
      dispatch(
        reportActions.fetchDailySummaryFailed({
          error: e.response
        })
      );
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

/**
 * 日々の記録更新
 */
export const postDailyRecord = (dispatch: Dispatch) => async (
  yyyymmdd: string,
  params: RecordDailyValues,
  initialValues: RecordDailyValues,
  state: {
    work: WorkState;
    staff: StaffState;
  }
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(operationsActions.postDailyRecordStarted());
  const normalizedParams = normalizeFormValuesToPostOperationsAndSupportsParams(
    params,
    initialValues,
    state.work,
    state.staff
  );
  await operationsApi
    .postOperationsAndSupports(yyyymmdd, normalizedParams)
    .then(async () => {
      dispatch(operationsActions.postDailyRecordSuccess());
      dispatch(snackbarActions.showSnackbar("内容を保存しました", "success"));
      // 再取得
      await operationsDispatcher(dispatch).fetchDailyRecord(yyyymmdd);
      dispatch(actions.unsetEdit());
    })
    .catch((e) => {
      dispatch(operationsActions.postDailyRecordFailed({ error: e.response }));
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export default (dispatch: Dispatch) => ({
  fetchInitialDailyRecord: fetchInitialDailyRecord(dispatch),
  postDailyRecord: postDailyRecord(dispatch)
});
