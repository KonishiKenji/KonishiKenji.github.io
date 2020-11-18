import { Dispatch } from "redux";
import * as actions from "./actions";
import * as H from "history";
import * as URL from "@constants/url";

import * as loadingActions from "@stores/loading/actions";
import dispatches from "@stores/dispatches";
import { PostWorkplaceCompanyBody } from "@api/requests/offsiteWork/postWorkplaceCompany";

import offsiteWorkApi from "@api/requests/offsiteWork";

/**
 * 施設外就労実施報告書の印刷用情報の取得
 * @param dispatch
 */
export const fetchDownload = (dispatch: Dispatch) => async (
  year: string,
  month: string
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  await offsiteWorkApi
    .getDownload(year, month)
    .then(res => {
      dispatch(actions.fetchDownloadSuccess(res.data.data));
    })
    .catch(e => {
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー", // TODO fix
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

/**
 * 施設外就労の就労先企業情報一覧取得
 * @param dispatch
 */
export const fetchWorkplaceCompanyList = (
  dispatch: Dispatch
) => async (): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  await offsiteWorkApi
    .getWorkplaceCompanyList()
    .then(res => {
      dispatch(
        actions.fetchWorkplaceCompanyListSuccess(
          res.data.data.workplace_company
        )
      );
    })
    .catch(e => {
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "エラーが発生しました",
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

/**
 * 施設外就労の就労先企業 情報取得
 * idが空文字でもデータは取れる
 * @param dispatch
 */
export const fetchWorkplaceCompany = (dispatch: Dispatch) => async (
  id: string
): Promise<void> => {
  dispatch(actions.fetchWorkplaceCompanyStarted());
  dispatch(loadingActions.loadStarted());
  await offsiteWorkApi
    .getWorkplaceCompany(id)
    .then(res => {
      dispatch(actions.fetchWorkplaceCompanySuccess(res.data.data));
    })
    .catch(e => {
      dispatch(actions.fetchWorkplaceCompanyFailed());
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "エラーが発生しました",
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

/**
 * 施設外就労の就労先企業 情報storeのリセット
 * @param dispatch
 */
export const clearWorkplaceCompany = (dispatch: Dispatch) => async (): Promise<
  void
> => {
  dispatch(actions.clearWorkplaceCompany());
};

/**
 * 施設外就労の就労先企業情報 更新
 * idが空文字の場合、新規。ある場合は更新
 * @param dispatch
 */
export const postWorkplaceCompany = (dispatch: Dispatch) => async (
  payload: PostWorkplaceCompanyBody,
  history: H.History
): Promise<void> => {
  dispatch(actions.postWorkplaceCompanyStarted());
  dispatch(loadingActions.loadStarted());
  await offsiteWorkApi
    .postWorkplaceCompany(payload)
    .then(res => {
      dispatches.uiDispatch(dispatch).stopHistory(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "保存が完了しました",
        variant: "success"
      });
      history.push(URL.OFFSITE_WORK);
    })
    .catch(e => {
      dispatch(actions.postWorkplaceCompanyFailed());
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "エラーが発生しました",
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

/**
 * 施設外就労の就労先企業情報 削除
 * @param dispatch
 */
export const deleteWorkplaceCompany = (dispatch: Dispatch) => async (
  id: string,
  history: H.History
): Promise<void> => {
  dispatch(actions.deleteWorkplaceCompanyStarted());
  dispatch(loadingActions.loadStarted());
  await offsiteWorkApi
    .deleteWorkplaceCompany(id)
    .then(res => {
      dispatches.uiDispatch(dispatch).stopHistory(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "削除が完了しました",
        variant: "success"
      });
      history.push(URL.OFFSITE_WORK);
    })
    .catch(e => {
      dispatch(actions.deleteWorkplaceCompanyFailed());
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "エラーが発生しました",
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

/**
 * 施設外就労実施報告書を出力できる年月を取得
 * @param dispatch
 */
export const fetchDownloadables = (dispatch: Dispatch) => async (): Promise<
  void
> => {
  dispatch(loadingActions.loadStarted());
  await offsiteWorkApi
    .getDownloadables()
    .then(res => {
      dispatch(actions.fetchDownloadablesSuccess(res.data));
    })
    .catch(e => {
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "エラーが発生しました",
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export default (dispatch: Dispatch) => ({
  fetchDownload: fetchDownload(dispatch),
  fetchWorkplaceCompanyList: fetchWorkplaceCompanyList(dispatch),
  fetchWorkplaceCompany: fetchWorkplaceCompany(dispatch),
  clearWorkplaceCompany: clearWorkplaceCompany(dispatch),
  fetchDownloadable: fetchDownloadables(dispatch),
  deleteWorkplaceCompany: deleteWorkplaceCompany(dispatch),
  postWorkplaceCompany: postWorkplaceCompany(dispatch)
});
