import { Dispatch } from "redux";
import * as actions from "./actions";
import * as loadingActions from "@stores/loading/actions";
import errorsApi from "@api/requests/errors";
import { dateInYYYYFormat, dateInMMFormat } from "@utils/date";
import dispatches from "@stores/dispatches";
import aggregateErrorCount from "@utils/domain/errors/aggregateErrorCount";

const invoice = (dispatch: Dispatch) => async (
  year: string,
  month: string,
  excluded_user_ids: number[] = []
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchInvoiceStarted());
  await errorsApi
    .getInvoiceErrors(year, month, excluded_user_ids)
    .then((res) => {
      const errorCount = aggregateErrorCount(res.data.data);
      const hasError = errorCount > 0;
      dispatch(actions.fetchInvoiceSuccess(res.data, { hasError, errorCount }));
    })
    .catch((e) => {
      dispatch(actions.fetchInvoiceFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

const users = (dispatch: Dispatch) => async (): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchUserStarted());
  await errorsApi
    .getUserErrors()
    .then((res) => {
      const errorCount = aggregateErrorCount(res.data.data);
      const hasError = errorCount > 0;
      dispatch(actions.fetchUserSuccess(res.data, { hasError, errorCount }));
    })
    .catch((e) => {
      dispatch(actions.fetchUserFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

const inout = (dispatch: Dispatch) => async (date: Date): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchInoutStarted());
  const targetDate = {
    year: dateInYYYYFormat(date),
    month: dateInMMFormat(date)
  };
  await errorsApi
    .getInOutErrors(targetDate.year, targetDate.month)
    .then((res) => {
      const errorCount = aggregateErrorCount(res.data.data);
      const hasError = errorCount > 0;
      dispatch(actions.fetchInoutSuccess(res.data, { hasError, errorCount }));
    })
    .catch((e) => {
      dispatch(actions.fetchInoutFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

const summary = (dispatch: Dispatch) => async (): Promise<void> => {
  dispatch(actions.fetchSummaryStarted());
  await errorsApi
    .getSummaryErrors()
    .then((res) => {
      dispatch(actions.fetchSummarySuccess(res.data));
    })
    .catch((e) => {
      dispatch(actions.fetchSummaryFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
    });
};

const plan = (dispatch: Dispatch) => async (uifId: string): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchPlanStarted());
  await errorsApi
    .getPlanErrors(uifId)
    .then((res) => {
      const errorCount = aggregateErrorCount(res.data.data);
      const hasError = errorCount > 0;
      dispatch(actions.fetchPlanSuccess(res.data, { hasError, errorCount }));
    })
    .catch((e) => {
      dispatch(actions.fetchPlanFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

const goal = (dispatch: Dispatch) => async (uifId: string): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchGoalStarted());
  await errorsApi
    .getGoalErrors(uifId)
    .then((res) => {
      const errorCount = aggregateErrorCount(res.data.data);
      const hasError = errorCount > 0;
      dispatch(actions.fetchGoalSuccess(res.data, { hasError, errorCount }));
    })
    .catch((e) => {
      dispatch(actions.fetchGoalFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

const records = (dispatch: Dispatch) => async (): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchRecordStarted());
  await errorsApi
    .getRecordErrors()
    .then((res) => {
      const errorCount = aggregateErrorCount(res.data.data);
      const hasError = errorCount > 0;
      dispatch(actions.fetchRecordSuccess(res.data, { hasError, errorCount }));
    })
    .catch((e) => {
      dispatch(actions.fetchRecordFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

const offsiteWork = (dispatch: Dispatch) => async (
  date: Date
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchOffsiteWorkStarted());
  const targetDate = {
    year: dateInYYYYFormat(date),
    month: dateInMMFormat(date)
  };
  await errorsApi
    .getOffsiteWorkErrors(targetDate.year, targetDate.month)
    .then((res) => {
      const errorCount = aggregateErrorCount(res.data.data);
      const hasError = errorCount > 0;
      dispatch(
        actions.fetchOffsiteWorkSuccess(res.data, { hasError, errorCount })
      );
    })
    .catch((e) => {
      dispatch(actions.fetchOffsiteWorkFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export default (dispatch: Dispatch) => ({
  invoice: invoice(dispatch),
  users: users(dispatch),
  inout: inout(dispatch),
  summary: summary(dispatch),
  plan: plan(dispatch),
  goal: goal(dispatch),
  records: records(dispatch),
  offsiteWork: offsiteWork(dispatch)
});
