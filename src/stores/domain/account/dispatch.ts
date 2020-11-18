import { Dispatch } from "redux";
import get from "lodash-es/get";
import * as action from "@stores/domain/account/action";
import dispatches from "@stores/dispatches";
import {
  UpdatePasswordParams,
  NewAccountParams
} from "@stores/domain/account/type";
import * as H from "history";
import { ACCOUNT_ACTIVATE_COMPLETE } from "@constants/url";

import facilityApi from "@api/requests/facility";
import userApi from "@api/requests/user";
import authApi from "@api/requests/auth";

/**
 * Check parameter validity saga
 * This saga is using for before user activation
 */
const checkActivateValidity = (dispatch: Dispatch) => async (
  email: string,
  token: string
) => {
  dispatch(action.getURLValidity.started({}));
  const uiDispatch = dispatches.uiDispatch(dispatch);
  uiDispatch.loading(true);
  await authApi
    .getCheck(email, token)
    .then(res => {
      uiDispatch.loading(false);
      dispatch(action.getURLValidity.done({ params: {}, result: res.data }));
    })
    .catch(e => {
      uiDispatch.loading(false);
      dispatch(
        action.getURLValidity.failed({
          params: {},
          error: e.response
        })
      );
    });
};

/**
 * 更新対象のユーザーを取得する
 */
const getTargetFacilityUser = (dispatch: Dispatch) => async () => {
  dispatch(action.getTargetFacilityUser.started({}));
  const uiDispatch = dispatches.uiDispatch(dispatch);
  uiDispatch.loading(true);
  await facilityApi
    .getTargetFacilityUser()
    .then(res => {
      uiDispatch.loading(false);
      dispatch(
        action.getTargetFacilityUser.done({ params: {}, result: res.data })
      );
    })
    .catch(e => {
      uiDispatch.loading(false);
      dispatch(
        action.getTargetFacilityUser.failed({
          params: {},
          error: e.response
        })
      );
    });
};

/**
 * パスワードの更新を行う
 */
const updatePassword = (dispatch: Dispatch) => async (
  params: UpdatePasswordParams,
  formName: string
) => {
  dispatch(action.updatePassword.started({ formName }));
  const uiDispatch = dispatches.uiDispatch(dispatch);
  uiDispatch.loading(true);
  await userApi
    .postUpdateUserPassword(params)
    .then(() => {
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "パスワードの変更が完了しました",
        variant: "success"
      });
      dispatch(
        action.updatePassword.done({ params: { formName }, result: {} })
      );
    })
    .catch(e => {
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message:
          get(e.response, "data[0].error[0].message") ||
          "パスワードの変更に失敗しました",
        variant: "error"
      });
      dispatch(
        action.updatePassword.failed({
          params: { formName },
          error: e.response.data
        })
      );
    });
  uiDispatch.loading(false);
};

const activate = (dispatch: Dispatch) => async (
  params: NewAccountParams,
  token: string,
  history: H.History
) => {
  const uiDispatch = dispatches.uiDispatch(dispatch);
  uiDispatch.loading(true);
  await authApi
    .postActivate(params, token)
    .then(() => {
      uiDispatch.loading(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "アカウントの登録が完了しました",
        variant: "success"
      });
      dispatch(action.refreshActivateErrorMessage());
      history.push(ACCOUNT_ACTIVATE_COMPLETE);
    })
    .catch(e => {
      uiDispatch.loading(false);
      dispatch(action.activateFailed(e.response.data));
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "アカウントの登録に失敗しました",
        variant: "error"
      });
    });
};

const refreshActivateErrorMessage = (dispatch: Dispatch) => (
  role: string,
  target: string
) => {
  if (role === "mgradmin" && target === "password") {
    dispatch(action.refreshActivateErrorMessageMgrAdminPassword());
  } else if (role === "mgruser" && target === "accountId") {
    dispatch(action.refreshActivateErrorMessageMgrUserAccountId());
  } else if (role === "mgruser" && target === "password") {
    dispatch(action.refreshActivateErrorMessageMgrUserPassword());
  }
};

export default function(dispatch: Dispatch) {
  return {
    getTargetFacilityUser: getTargetFacilityUser(dispatch),
    updatePassword: updatePassword(dispatch),
    activate: activate(dispatch),
    refreshActivateErrorMessage: refreshActivateErrorMessage(dispatch),
    checkActivateValidity: checkActivateValidity(dispatch)
  };
}
