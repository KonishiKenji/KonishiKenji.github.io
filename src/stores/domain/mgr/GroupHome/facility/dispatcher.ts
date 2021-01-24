import { Dispatch } from "redux";
import * as actions from "./actions";
import * as loadingActions from "@stores/loading/actions";
import {
  normalizeGetFacilityResult,
  normalizePostFacilityParams,
  normalizeFormValue
} from "./normalizer";
import { FacilityValues } from "@initialize/mgr/GroupHome/facility/initialValues";
import facilityApi from "@api/requests/facility";
import dispatches from "@stores/dispatches";

export const fetch = (dispatch: Dispatch) => async (): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchStarted());
  await facilityApi
    .getFacility()
    .then(res => {
      const normalizedData = normalizeGetFacilityResult(res.data);
      dispatch(actions.fetchSuccess(normalizedData));
    })
    .catch(e => {
      dispatch(actions.fetchFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー", // TODO fix
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export const post = (dispatch: Dispatch) => async (values: FacilityValues) => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.postStarted());
  const params = normalizeFormValue(values);

  await facilityApi
    .postFacility(params)
    .then(async res => {
      const normalizedData = normalizePostFacilityParams(params);
      dispatch(actions.postSuccess(normalizedData));
      dispatches
        .userDispatch(dispatch)
        .setFacilityValuesToUser(
          values.basic.officeName,
          values.basic.corporationName
        );
      dispatches.uiDispatch(dispatch).stopHistory(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "保存が完了しました",
        variant: "success"
      });
      await fetch(dispatch)();
    })
    .catch(e => {
      dispatch(actions.postFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー", // TODO fix
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export default (dispatch: Dispatch) => ({
  fetch: fetch(dispatch),
  post: post(dispatch)
});
