import { Dispatch } from "redux";
import * as H from "history";
import * as actions from "./actions";
import * as loadingActions from "@stores/loading/actions";
import * as alertDialogActions from "@stores/ui/alertDialog/actions";
import {
  normalizedGetFacilityUserTargetIdResponse,
  normalizeFormValue
} from "./normalizer";
import { UsersInFacilityState } from "./types";
import { UsersValues } from "@initialize/mgr/GroupHome/users/initialValues";
import facilityApi from "@api/requests/facility";
import * as URL from "@constants/url";
import dispatches from "@stores/dispatches";

const fetch = (dispatch: Dispatch) => async (date?: Date): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchStarted());
  await facilityApi
    .getFacilityUsers(date)
    .then(res => {
      dispatch(actions.fetchSuccess(res.data));
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

const fetchOne = (dispatch: Dispatch) => async (id: string): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchOneStarted());
  await facilityApi
    .getFacilityUserTargetId(id)
    .then(res => {
      // TODO: 種別A/Bでレスポンスの形式が違う状態になっているらしい, GroupHomeがどうなのかが要確認
      const normalizedData = normalizedGetFacilityUserTargetIdResponse(
        res.data.data
      );
      dispatch(actions.fetchOneSuccess(normalizedData));
    })
    .catch(e => {
      dispatch(actions.fetchOneFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー", // TODO fix
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

const create = (dispatch: Dispatch) => async (
  formValues: UsersValues,
  history: H.History,
  operatingUnitFlg: boolean
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.createStarted());
  const requestData = normalizeFormValue(formValues, operatingUnitFlg);
  await facilityApi
    .postNewFacilityUser(requestData)
    .then(() => {
      dispatch(actions.createSuccess());
      dispatches.uiDispatch(dispatch).stopHistory(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "保存が完了しました",
        variant: "success"
      });

      // 成功したら画面を戻す
      history.push(URL.USERS);
    })
    .catch(e => {
      dispatch(actions.createFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー", // TODO fix
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

const update = (dispatch: Dispatch) => async (
  formValues: UsersValues,
  history: H.History,
  apiParams: UsersInFacilityState["user"],
  operatingUnitFlg: boolean
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.updateStarted());
  const id = apiParams.user_in_facility.id;
  const requestData = normalizeFormValue(
    formValues,
    operatingUnitFlg,
    apiParams
  );
  await facilityApi
    .postUpdateFacilityUser(id, requestData)
    .then(() => {
      dispatch(actions.updateSuccess());
      dispatches.uiDispatch(dispatch).stopHistory(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "保存が完了しました",
        variant: "success"
      });
      // 成功したら画面を戻す
      history.push(URL.USERS);
    })
    .catch(e => {
      dispatch(actions.updateFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー", // TODO fix
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

const deleteUser = (dispatch: Dispatch) => async (
  uifId: number,
  history: H.History
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.deleteStarted());
  await facilityApi
    .deleteFacilityUser(uifId)
    .then(() => {
      dispatch(actions.deleteSuccess(uifId));
      // 成功したら画面を戻す
      history.push(URL.USERS);
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

const clear = (dispatch: Dispatch) => (): void => {
  dispatch(actions.clear());
};

export default (dispatch: Dispatch) => ({
  fetch: fetch(dispatch),
  fetchOne: fetchOne(dispatch),
  create: create(dispatch),
  update: update(dispatch),
  deleteUser: deleteUser(dispatch),
  clear: clear(dispatch)
});
