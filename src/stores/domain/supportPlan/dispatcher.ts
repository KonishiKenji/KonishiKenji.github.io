import { Dispatch } from "redux";
import * as actions from "./actions";
import * as loadingActions from "@stores/loading/actions";
import * as snackbarActions from "@stores/ui/snackbar/actions";
import * as responseErrorActions from "@stores/ui/responseError/actions";
import supportPlanApi from "@api/requests/supportPlan";

export const fetchPrivateSupportPlan = (dispatch: Dispatch) => async (
  uifId: string,
  supportPlanId: string
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchPrivateSupportPlanStarted());
  await supportPlanApi
    .getSupportPlanOnce(uifId, supportPlanId)
    .then(res => {
      dispatch(actions.fetchPrivateSupportPlanSuccess(res.data.data));
    })
    .catch(e => {
      dispatch(actions.fetchPrivateSupportPlanFailed({ error: e.response }));
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export const fetchSupportPlan = (dispatch: Dispatch) => async (
  uifId: string
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchSupportPlanStarted());
  await supportPlanApi
    .getSupportPlan(uifId)
    .then(res => {
      dispatch(actions.fetchSupportPlanSuccess(res.data.data));
    })
    .catch(e => {
      dispatch(actions.fetchSupportPlanFailed({ error: e.response }));
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export default (dispatch: Dispatch) => ({
  fetchPrivateSupportPlan: fetchPrivateSupportPlan(dispatch),
  fetchSupportPlan: fetchSupportPlan(dispatch)
});
