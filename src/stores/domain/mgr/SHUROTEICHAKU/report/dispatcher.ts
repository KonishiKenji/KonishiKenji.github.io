import { Dispatch } from "redux";
import * as actions from "./actions";
import dispatches from "@stores/dispatches";
import usageResultsAPI from "@api/requests/usageResults";
import { dateInYYYYMMFormat } from "@utils/date";
import {
  normalizeUsageResultFromAPI,
  normalizeFormValueToAPI,
  normalizeUsageResultFromForm
} from "./normalizer";
import * as loadingActions from "@stores/loading/actions";
import { InitialDataValues } from "@interfaces/mgr/SHUROTEICHAKU/report/initialData";
import { UsageResultsState } from "./types";
import { PostUsageResultsParam } from "@api/requests/usageResults/postUsageResultsMonthly";

/**
 * 利用実績一覧(日ごと)データ取得及びstore格納
 * @param dispatch
 */
const fetch = (dispatch: Dispatch) => async (
  uifId: string,
  date: Date
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchStarted());
  await usageResultsAPI
    .getUsageResultsMonthly(uifId, dateInYYYYMMFormat(date))
    .then(response => {
      dispatch(actions.fetch(normalizeUsageResultFromAPI(response.data.data)));
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch(e => {
      dispatch(actions.fetchFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).loading(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー",
        variant: "error"
      });
    })
    .finally(() => {
      dispatch(loadingActions.loadDone());
    });
};

/**
 * 対象利用者の対象月の利用実績情報（usage_results）を登録/更新する。
 * TODO 編集画面作成時に実装
 * @param dispatch
 */
const post = (dispatch: Dispatch) => async (
  formValue: InitialDataValues,
  storeValue: UsageResultsState["usageResults"],
  id: string,
  date: string
) => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.postStarted());
  const normalizedFormValue: UsageResultsState["usageResults"] = normalizeUsageResultFromForm(
    formValue,
    storeValue
  );
  const postData: PostUsageResultsParam = normalizeFormValueToAPI(
    normalizedFormValue,
    storeValue
  );

  await usageResultsAPI
    .postUsageResultsMonthly(postData, id, date)
    .then(() => {
      dispatch(actions.post(normalizedFormValue));
    })
    .catch(e => {
      dispatch(
        actions.postFailed({
          error: e.response
        })
      );
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー", // TODO fix
        variant: "error"
      });
    })
    .finally(() => {
      dispatch(loadingActions.loadDone());
    });
};

export default (dispatch: Dispatch) => ({
  fetch: fetch(dispatch),
  post: post(dispatch)
});
