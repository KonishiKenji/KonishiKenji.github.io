import { Dispatch } from "redux";
import * as actions from "./actions";
import * as loadingActions from "@stores/loading/actions";
import {
  normalizeGetFacilityResult,
  normalizeFormValueToPostFacilityParams
} from "./normalizer";
import { FacilityValues } from "@initialize/mgr/IAB/facility/initialValues";
import facilityApi from "@api/requests/facility";
import dispatches from "@stores/dispatches";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";

export const fetch = (dispatch: Dispatch) => async (): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchStarted());
  await facilityApi
    .getFacility()
    .then((res) => {
      const normalizedData = normalizeGetFacilityResult(res.data);
      dispatch(actions.fetchSuccess(normalizedData));
    })
    .catch((e) => {
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
  values: FacilityValues,
  beforeValue: FacilityValues,
  facility: FacilityState
) => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.postStarted());
  const normalizedData = normalizeFormValueToPostFacilityParams(
    values,
    beforeValue,
    facility
  );
  await facilityApi
    .postFacility(normalizedData)
    .then(() => {
      dispatch(actions.postSuccess());
      dispatches
        .userDispatch(dispatch)
        .setFacilityValuesToUser(
          values.basic.officeName,
          values.basic.corporationName,
          values.basic.multiFunctionOfficeFlag,
          values.basic.masterSubordinateFlg
        );
      dispatches.uiDispatch(dispatch).stopHistory(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "保存が完了しました",
        variant: "success"
      });
    })
    .catch((e) => {
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
