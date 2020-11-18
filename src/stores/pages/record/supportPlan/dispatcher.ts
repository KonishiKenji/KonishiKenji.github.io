import { Dispatch } from "redux";
import * as actions from "./actions";
import * as loadingActions from "@stores/loading/actions";
import * as snackbarActions from "@stores/ui/snackbar/actions";
import * as responseErrorActions from "@stores/ui/responseError/actions";
import * as navigationTransitionActions from "@stores/ui/navigationTransition/actions";
import * as staffActions from "@stores/domain/staff/actions";
import * as supportPlanActions from "@stores/domain/supportPlan/actions";
import supportPlanDispatcher from "@stores/domain/supportPlan/dispatcher";
import supportPlanApi from "@api/requests/supportPlan";
import staffApi from "@api/requests/staff";
import facilityApi from "@api/requests/facility";
import {
  getFacilityActions,
  getUserInFacilityActions
} from "@stores/domain/mgr/common/actions";
import {
  getNormalizeGetFacilityResult,
  getNormalizedGetFacilityUserTargetIdResponse
} from "@stores/domain/mgr/common/normalizer";
import {
  normalizeFormValuesToPostSupportPlanParams,
  normalizeFormValuesToPostSupportPlanUpdateParams
} from "./normalizer";
import { FacilityType } from "@constants/variables";

import { RecordSupportPlanValues } from "@initialize/record/supportPlan/initialValues";
import * as H from "history";
import get from "lodash-es/get";

/**
 * 個別支援計画画面（閲覧・更新）で必要になるAPI
 */
export const fetchInitialSupportPlan = (dispatch: Dispatch) => async (
  uifId: string,
  supportPlanId: string,
  history: H.History
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
  const userInFacilityActions = getUserInFacilityActions(typeService);
  const normalizeGetFacilityResult = getNormalizeGetFacilityResult(typeService);
  const normalizedGetFacilityUserTargetIdResponse = getNormalizedGetFacilityUserTargetIdResponse(
    typeService
  );

  dispatch(staffActions.fetchStarted());
  dispatch(facilityActions.fetchStarted());
  dispatch(userInFacilityActions.fetchOneStarted());
  dispatch(supportPlanActions.fetchPrivateSupportPlanStarted());
  dispatch(supportPlanActions.fetchSupportPlanStarted());

  Promise.all([
    staffApi.getStaff(),
    facilityApi.getFacilityUserTargetId(uifId),
    supportPlanApi.getSupportPlanOnce(uifId, supportPlanId),
    supportPlanApi.getSupportPlan(uifId)
  ])
    .then((results) => {
      dispatch(staffActions.fetchSuccess(results[0].data));
      const facilityData = normalizeGetFacilityResult(facility.data);
      dispatch(facilityActions.fetchSuccess(facilityData as any));
      const getFacilityUserData = normalizedGetFacilityUserTargetIdResponse(
        results[1].data.data
      );
      dispatch(userInFacilityActions.fetchOneSuccess(getFacilityUserData));
      dispatch(
        supportPlanActions.fetchPrivateSupportPlanSuccess(results[2].data.data)
      );
      dispatch(
        supportPlanActions.fetchSupportPlanSuccess(results[3].data.data)
      );
    })
    .catch((e) => {
      dispatch(staffActions.fetchFailed({ error: e.response }));
      dispatch(facilityActions.fetchFailed({ error: e.response }));
      dispatch(userInFacilityActions.fetchOneFailed({ error: e.response }));
      dispatch(
        supportPlanActions.fetchPrivateSupportPlanFailed({ error: e.response })
      );
      dispatch(
        supportPlanActions.fetchSupportPlanFailed({ error: e.response })
      );
      dispatch(responseErrorActions.setResponseError(e.response));
      const errorUrl = get(e.response, "config.url") || "";
      if (errorUrl.indexOf(`mgr/support_plan/${uifId}/${supportPlanId}`) > -1) {
        dispatch(
          snackbarActions.showSnackbar(
            "個別支援計画が見つかりませんでした",
            "error"
          )
        );
        // 削除した時にブラウザバックで辿り着けるので一覧に戻す（但し存在しない/削除は現状見分けられない）
        history.push(`/record/${uifId}/support_plan`);
      } else {
        dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
      }
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

/**
 * 個別支援計画画面（新規作成）で必要になるAPI
 */
export const fetchInitialSupportPlanNew = (dispatch: Dispatch) => async (
  uifId: string
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
  const userInFacilityActions = getUserInFacilityActions(typeService);
  const normalizeGetFacilityResult = getNormalizeGetFacilityResult(typeService);
  const normalizedGetFacilityUserTargetIdResponse = getNormalizedGetFacilityUserTargetIdResponse(
    typeService
  );

  dispatch(staffActions.fetchStarted());
  dispatch(facilityActions.fetchStarted());
  dispatch(userInFacilityActions.fetchOneStarted());

  Promise.all([staffApi.getStaff(), facilityApi.getFacilityUserTargetId(uifId)])
    .then((results) => {
      dispatch(staffActions.fetchSuccess(results[0].data));
      const getFacilityData = normalizeGetFacilityResult(facility.data);
      dispatch(facilityActions.fetchSuccess(getFacilityData as any));
      const getFacilityUserData = normalizedGetFacilityUserTargetIdResponse(
        results[1].data.data
      );
      dispatch(userInFacilityActions.fetchOneSuccess(getFacilityUserData));
    })
    .catch((e) => {
      dispatch(staffActions.fetchFailed({ error: e.response }));
      dispatch(facilityActions.fetchFailed({ error: e.response }));
      dispatch(userInFacilityActions.fetchOneFailed({ error: e.response }));
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

/**
 * 個別支援計画更新
 */
export const postSupportPlanUpdate = (dispatch: Dispatch) => async (
  supportPlanId: string,
  uifId: string,
  values: RecordSupportPlanValues,
  initialValues: RecordSupportPlanValues
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(supportPlanActions.postUpdateSupportPlanStarted());
  const normalizedParams = normalizeFormValuesToPostSupportPlanUpdateParams(
    values,
    initialValues,
    supportPlanId
  );
  await supportPlanApi
    .postSupportPlanUpdate(uifId, normalizedParams)
    .then(async () => {
      dispatch(supportPlanActions.postUpdateSupportPlanSuccess());
      dispatch(navigationTransitionActions.cancelNavigationTransition());
      dispatch(snackbarActions.showSnackbar("内容を保存しました。", "success"));
      // 再取得
      await supportPlanDispatcher(dispatch).fetchPrivateSupportPlan(
        uifId,
        supportPlanId
      );
      await supportPlanDispatcher(dispatch).fetchSupportPlan(uifId);
      dispatch(actions.unsetEdit());
    })
    .catch((e) => {
      dispatch(
        supportPlanActions.postUpdateSupportPlanFailed({ error: e.response })
      );
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

/**
 * 個別支援計画新規作成
 */
export const postSupportPlan = (dispatch: Dispatch) => async (
  uifId: string,
  values: RecordSupportPlanValues,
  history: H.History
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(supportPlanActions.postNewSupportPlanStarted());
  const normalizedParams = normalizeFormValuesToPostSupportPlanParams(values);
  await supportPlanApi
    .postSupportPlan(uifId, normalizedParams)
    .then(() => {
      dispatch(supportPlanActions.postNewSupportPlanSuccess());
      dispatch(navigationTransitionActions.cancelNavigationTransition());
      dispatch(snackbarActions.showSnackbar("内容を保存しました。", "success"));
      history.push(`/record/${uifId}/support_plan`);
    })
    .catch((e) => {
      dispatch(
        supportPlanActions.postNewSupportPlanFailed({ error: e.response })
      );
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

/**
 *
 */
export const deleteSupportPlan = (dispatch: Dispatch) => async (
  uifId: string,
  supportPlanId: string,
  history: H.History
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(supportPlanActions.deleteSupportPlanStarted());
  await supportPlanApi
    .deleteSupportPlan(uifId, supportPlanId)
    .then(() => {
      dispatch(supportPlanActions.deleteSupportPlanSuccess());
      dispatch(navigationTransitionActions.cancelNavigationTransition());
      dispatch(snackbarActions.showSnackbar("削除が完了しました", "success"));
      history.push(`/record/${uifId}/support_plan`);
    })
    .catch((e) => {
      dispatch(
        supportPlanActions.deleteSupportPlanFailed({ error: e.response })
      );
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

type Dispatcher = {
  fetchInitialSupportPlan: (
    uifId: string,
    supportPlanId: string,
    history: H.History
  ) => Promise<void>;
  fetchInitialSupportPlanNew: (uifId: string) => Promise<void>;
  postSupportPlanUpdate: (
    supportPlanId: string,
    uifId: string,
    values: RecordSupportPlanValues,
    initialValues: RecordSupportPlanValues
  ) => Promise<void>;
  postSupportPlan: (
    uifId: string,
    values: RecordSupportPlanValues,
    history: H.History
  ) => Promise<void>;
  deleteSupportPlan: (
    uifId: string,
    supportPlanId: string,
    history: H.History
  ) => Promise<void>;
};

export default (dispatch: Dispatch): Dispatcher => ({
  fetchInitialSupportPlan: fetchInitialSupportPlan(dispatch),
  fetchInitialSupportPlanNew: fetchInitialSupportPlanNew(dispatch),
  postSupportPlanUpdate: postSupportPlanUpdate(dispatch),
  postSupportPlan: postSupportPlan(dispatch),
  deleteSupportPlan: deleteSupportPlan(dispatch)
});
