import { Dispatch } from "redux";
import * as actions from "./actions";
import * as loadingActions from "@stores/loading/actions";
import * as snackbarActions from "@stores/ui/snackbar/actions";
import * as responseErrorActions from "@stores/ui/responseError/actions";
import * as supportsActions from "@stores/domain/supports/actions";
import * as supportPlanActions from "@stores/domain/supportPlan/actions";
import * as workActions from "@stores/domain/work/actions";
import * as staffActions from "@stores/domain/staff/actions";
import * as errorsActions from "@stores/domain/errors/actions";
import supportsDispatcher from "@stores/domain/supports/dispatcher";
import normalizeFormValuesToPostSupportsParams from "./normalizer";
import supportsApi from "@api/requests/supports";
import supportPlanApi from "@api/requests/supportPlan";
import workApi from "@api/requests/work";
import staffApi from "@api/requests/staff";
import facilityApi from "@api/requests/facility";
import errorsApi from "@api/requests/errors";
import { RecordUserDetailValues as SEIKATSUKAIGOFormValues } from "@initialize/mgr/SEIKATSUKAIGO/record/userDetail/initialValues";
import { RecordUserDetailValues as IABFormValues } from "@initialize/mgr/IAB/record/userDetail/initialValues";
import { WorkState } from "@stores/domain/work/types";
import { StaffState } from "@stores/domain/staff/types";
import aggregateErrorCount from "@utils/domain/errors/aggregateErrorCount";
import { FacilityType } from "@constants/variables";
import {
  getFacilityActions,
  getUserInFacilityActions
} from "@stores/domain/mgr/common/actions";
import {
  getNormalizeGetFacilityResult,
  getNormalizedGetFacilityUserTargetIdResponse
} from "@stores/domain/mgr/common/normalizer";

type RecordUserDetailValues = SEIKATSUKAIGOFormValues | IABFormValues;

/**
 * 利用者ごと初期取得
 */
export const fetchInitialUserDetailRecord = (dispatch: Dispatch) => async (
  uifId: string,
  year: string,
  month: string,
  target: "interview" | "work" | undefined
): Promise<void> => {
  dispatch(loadingActions.loadStarted());

  const facility = await facilityApi.getFacility().catch((e) => {
    dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    dispatch(responseErrorActions.setResponseError(e.response));
    dispatch(loadingActions.loadDone());
  });
  if (facility === undefined) {
    return;
  }
  const typeService = facility.data.data.facility.type_service as FacilityType;
  const facilityActions = getFacilityActions(typeService);
  const userInFacilityActions = getUserInFacilityActions(typeService);

  dispatch(supportsActions.fetchSupportsRecordStarted());
  dispatch(workActions.fetchStarted());
  dispatch(staffActions.fetchStarted());
  dispatch(facilityActions.fetchStarted());
  dispatch(userInFacilityActions.fetchOneStarted());

  Promise.all([
    supportsApi.getSupportsRecord(uifId, year, month, target),
    workApi.getWork(),
    staffApi.getStaff(),
    facilityApi.getFacilityUserTargetId(uifId)
  ])
    .then((results) => {
      dispatch(
        supportsActions.fetchSupportsRecordSuccess(results[0].data.data)
      );
      dispatch(workActions.fetchSuccess(results[1].data));
      dispatch(staffActions.fetchSuccess(results[2].data));
      const getFacilityData = getNormalizeGetFacilityResult(typeService)(
        facility.data
      );
      dispatch(facilityActions.fetchSuccess(getFacilityData as any));
      const getFacilityUserData = getNormalizedGetFacilityUserTargetIdResponse(
        typeService
      )(results[3].data.data);
      dispatch(userInFacilityActions.fetchOneSuccess(getFacilityUserData));
    })
    .catch((e) => {
      dispatch(
        supportsActions.fetchSupportsRecordFailed({ error: e.response })
      );
      dispatch(workActions.fetchFailed({ error: e.response }));
      dispatch(staffActions.fetchFailed({ error: e.response }));
      dispatch(facilityActions.fetchFailed({ error: e.response }));
      dispatch(
        userInFacilityActions.fetchOneFailed({
          error: e.response
        })
      );
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

/**
 * 利用者ごと更新
 */
export const postUserDetailRecord = (dispatch: Dispatch) => async (
  uifId: string,
  params: RecordUserDetailValues,
  initialValues: RecordUserDetailValues,
  state: {
    work: WorkState;
    staff: StaffState;
  },
  fetchOptions: {
    year: string;
    month: string;
    target?: "work" | "interview";
  }
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(supportsActions.postSupportsRecordStarted());
  const normalizeParams = normalizeFormValuesToPostSupportsParams(
    params,
    initialValues,
    state.work,
    state.staff
  );
  await supportsApi
    .postSupports(uifId, normalizeParams)
    .then(async () => {
      dispatch(supportsActions.postSupportsRecordSuccess());
      dispatch(snackbarActions.showSnackbar("内容を保存しました。", "success"));
      // 再取得
      await supportsDispatcher(dispatch).fetchSupportsRecord(
        uifId,
        fetchOptions.year,
        fetchOptions.month,
        fetchOptions.target
      );
      dispatch(actions.unsetEdit());
    })
    .catch((e) => {
      dispatch(supportsActions.postSupportsRecordFailed({ error: e.response }));
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

/**
 * 利用者ごと（個別支援計画）
 * @param dispatch
 */
export const fetchInitialSupportPlan = (dispatch: Dispatch) => async (
  uifId: string
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(errorsActions.fetchPlanStarted());
  dispatch(errorsActions.fetchGoalStarted());

  const facility = await facilityApi.getFacility().catch((e) => {
    dispatch(errorsActions.fetchPlanFailed({ error: e.response }));
    dispatch(errorsActions.fetchGoalFailed({ error: e.response }));
    dispatch(responseErrorActions.setResponseError(e.response));
    dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    dispatch(loadingActions.loadDone());
  });
  if (facility === undefined) {
    return;
  }
  const typeService = facility.data.data.facility.type_service as FacilityType;
  const getFacilityData = getNormalizeGetFacilityResult(typeService)(
    facility.data
  );
  const facilityActions = getFacilityActions(typeService);
  const userInFacilityActions = getUserInFacilityActions(typeService);
  const normalizedGetFacilityUserTargetIdResponse = getNormalizedGetFacilityUserTargetIdResponse(
    typeService
  );

  dispatch(facilityActions.fetchStarted());
  dispatch(userInFacilityActions.fetchOneStarted());
  dispatch(supportPlanActions.fetchSupportPlanStarted());

  Promise.all([
    supportPlanApi.getSupportPlan(uifId),
    facilityApi.getFacilityUserTargetId(uifId),
    errorsApi.getPlanErrors(uifId),
    errorsApi.getGoalErrors(uifId)
  ])
    .then((results) => {
      dispatch(
        supportPlanActions.fetchSupportPlanSuccess(results[0].data.data)
      );
      dispatch(facilityActions.fetchSuccess(getFacilityData as any));
      const getFacilityUserData = normalizedGetFacilityUserTargetIdResponse(
        results[1].data.data
      );
      dispatch(userInFacilityActions.fetchOneSuccess(getFacilityUserData));
      const planErrorCount = aggregateErrorCount(results[2].data.data);
      const hasPlanError = planErrorCount > 0;
      dispatch(
        errorsActions.fetchPlanSuccess(results[2].data, {
          hasError: hasPlanError,
          errorCount: planErrorCount
        })
      );
      const goalErrorCount = aggregateErrorCount(results[3].data.data);
      const hasGoalError = goalErrorCount > 0;
      dispatch(
        errorsActions.fetchGoalSuccess(results[3].data, {
          hasError: hasGoalError,
          errorCount: goalErrorCount
        })
      );
    })
    .catch((e) => {
      dispatch(
        supportPlanActions.fetchSupportPlanFailed({ error: e.response })
      );
      dispatch(facilityActions.fetchFailed({ error: e.response }));
      dispatch(
        userInFacilityActions.fetchOneFailed({
          error: e.response
        })
      );
      dispatch(errorsActions.fetchPlanFailed({ error: e.response }));
      dispatch(errorsActions.fetchGoalFailed({ error: e.response }));
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

type Dispatcher = {
  fetchInitialUserDetailRecord: (
    uifId: string,
    year: string,
    month: string,
    target: "interview" | "work" | undefined
  ) => Promise<void>;
  fetchInitialSupportPlan: (uifId: string) => Promise<void>;
  postUserDetailRecord: (
    uifId: string,
    params: RecordUserDetailValues,
    initialValues: RecordUserDetailValues,
    state: {
      work: WorkState;
      staff: StaffState;
    },
    fetchOptions: {
      year: string;
      month: string;
      target?: "work" | "interview";
    }
  ) => Promise<void>;
};

export default (dispatch: Dispatch): Dispatcher => ({
  fetchInitialUserDetailRecord: fetchInitialUserDetailRecord(dispatch),
  fetchInitialSupportPlan: fetchInitialSupportPlan(dispatch),
  postUserDetailRecord: postUserDetailRecord(dispatch)
});
