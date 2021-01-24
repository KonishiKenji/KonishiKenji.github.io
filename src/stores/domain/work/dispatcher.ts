import { Dispatch } from "redux";
import * as actions from "./actions";
import * as loadingActions from "@stores/loading/actions";
import * as alertDialogActions from "@stores/ui/alertDialog/actions";
import { WorkValues } from "@initialize/works/initialValues";
import workApi from "@api/requests/work";
import dispatches from "@stores/dispatches";

export const fetch = (dispatch: Dispatch) => async () => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchStarted());
  await workApi
    .getWork()
    .then(res => dispatch(actions.fetchSuccess(res.data)))
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

export const post = (dispatch: Dispatch) => async (
  values: WorkValues["works"]
) => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.postStarted());
  const params = values.map(value => ({
    id: value.workItemId || "new",
    category_id: parseInt(value.categoryId, 10),
    name: value.workName
  }));
  await workApi
    .postWorkList(params)
    .then(res => {
      dispatch(actions.postSuccess());
      dispatches.uiDispatch(dispatch).stopHistory(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "保存が完了しました",
        variant: "success"
      });
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

export const deleteWork = (dispatch: Dispatch) => async (id: number) => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.deleteStarted());
  await workApi
    .deleteWork(id)
    .then(res => {
      dispatch(actions.deleteSuccess());
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "削除が完了しました",
        variant: "success"
      });
    })
    .catch(e => {
      dispatch(actions.deleteFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatch(
        alertDialogActions.showAlertDialog(
          "削除を完了できませんでした",
          "何らかの問題が発生した為、データの削除が完了できませんでした。時間を置いてから再度データの削除を行ってください。"
        )
      );
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export default (dispatch: Dispatch) => ({
  fetch: fetch(dispatch),
  post: post(dispatch),
  deleteWork: deleteWork(dispatch)
});
