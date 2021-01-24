import { Dispatch } from "redux";
import * as actions from "./actions";
import * as errorsActions from "@stores/domain/errors/actions";
import * as loadingActions from "@stores/loading/actions";
import * as snackbarActions from "@stores/ui/snackbar/actions";
import * as responseErrorActions from "@stores/ui/responseError/actions";
import supportPlanApi from "@api/requests/supportPlan/A";
import errorsApi from "@api/requests/errors";
import aggregateErrorCount from "@utils/domain/errors/aggregateErrorCount";

export const fetchPrivateSupportPlan = (dispatch: Dispatch) => async (
  uifId: string,
  supportPlanId: string
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchPrivateSupportPlanStarted());

  Promise.all([
    supportPlanApi.getSupportPlanOnce(uifId, supportPlanId),
    errorsApi.getPlanErrors(uifId),
    errorsApi.getGoalErrors(uifId)
  ])
    .then((results) => {
      dispatch(actions.fetchPrivateSupportPlanSuccess(results[0].data.data));
      const errorCount = aggregateErrorCount(results[1].data.data);
      const hasError = errorCount > 0;
      dispatch(
        errorsActions.fetchPlanSuccess(results[1].data, {
          hasError,
          errorCount
        })
      );
      const goalErrorCount = aggregateErrorCount(results[2].data.data);
      const hasGoalError = goalErrorCount > 0;
      dispatch(
        errorsActions.fetchGoalSuccess(results[2].data, {
          hasError: hasGoalError,
          errorCount: goalErrorCount
        })
      );
    })
    .catch((e) => {
      dispatch(actions.fetchPrivateSupportPlanFailed({ error: e.response }));
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
      dispatch(errorsActions.fetchPlanFailed({ error: e.response }));
      dispatch(errorsActions.fetchGoalFailed({ error: e.response }));
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
    .then((res) => {
      dispatch(actions.fetchSupportPlanSuccess(res.data.data));
    })
    .catch((e) => {
      dispatch(actions.fetchSupportPlanFailed({ error: e.response }));
      dispatch(responseErrorActions.setResponseError(e.response));
      dispatch(snackbarActions.showSnackbar("通信エラー", "error"));
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

type Dispatcher = {
  fetchPrivateSupportPlan: (
    uifId: string,
    supportPlanId: string
  ) => Promise<void>;
  fetchSupportPlan: (uifId: string) => Promise<void>;
};

export default (dispatch: Dispatch): Dispatcher => ({
  fetchPrivateSupportPlan: fetchPrivateSupportPlan(dispatch),
  fetchSupportPlan: fetchSupportPlan(dispatch)
});
