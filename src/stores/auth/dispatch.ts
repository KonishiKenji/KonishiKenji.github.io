import * as action from "./action";
import {
  LoginErrorCode,
  LoginParams,
  ChangePassword,
  LoginDone,
  LoginDoneWishChangePassword,
  LoginDoneTemporaryPassword
} from "./type";
import { Dispatch } from "redux";
import * as H from "history";
import dispatches from "@stores/dispatches";
import {
  clear,
  getToken,
  setRefreshToken,
  setToken,
  setRemainedUser,
  getRemainedUser
} from "@utils/localStorage";
import { REMINDER_COMPLETE } from "@constants/url";

import authApi from "@api/requests/auth/";
import passwordApi from "@api/requests/password/";

const checkLogin = (dispatch: Dispatch) => (): void => {
  const token = getToken();
  dispatch(action.check({ token }));
};

const logout = (dispatch: Dispatch) => (): void => {
  const remainedUser = getRemainedUser();
  clear();
  dispatch(action.logout());
  setRemainedUser(remainedUser);
};

/**
 * APIの返り値の型がLoginDoneかを確認
 * @param data
 */
const isLoginDone = (data: any): data is LoginDone => {
  return data.token !== undefined && data.refreshToken !== undefined;
};

/**
 * APIの返り値の型がLoginDoneWishChangePasswordかを確認
 * @param data
 */
const isLoginDoneWishChangePassword = (
  data: any
): data is LoginDoneWishChangePassword => {
  return data.code !== undefined;
};

/**
 * APIの返り値の型がisLoginDoneTemporaryPasswordかを確認
 * @param data
 */
const isLoginDoneTemporaryPassword = (
  data: any
): data is LoginDoneTemporaryPassword => {
  return data.code !== undefined;
};

const login = (dispatch: Dispatch) => async (
  params: LoginParams
): Promise<void> => {
  const uiDispatches = dispatches.uiDispatch(dispatch);
  uiDispatches.loading(true);
  dispatch(action.loginStarted());
  await authApi
    .postLogin(params)
    .then(async ({ data }) => {
      if (isLoginDone(data)) {
        setToken(data.token);
        setRefreshToken(data.refreshToken);
        await dispatches.userDispatch(dispatch).me();
        // 設定に応じてログイン時だけ旧バージョンに飛ばす
        if (process.env.REACT_APP_IAB_VERSION === "1") {
          dispatch(action.redirectOldVersion());
        }
        dispatch(action.loginDone(data));
      } else if (
        isLoginDoneWishChangePassword(data) &&
        data.code === LoginErrorCode.WishChangePassword
      ) {
        dispatch(action.loginDoneWishChangePassword(data));
      } else if (
        isLoginDoneTemporaryPassword(data) &&
        data.code === LoginErrorCode.TemporaryPassword
      ) {
        dispatch(action.loginDoneTemporaryPassword(data));
      }
    })
    .catch(({ response }) => {
      if (
        response.data &&
        response.data.code === LoginErrorCode.AccountLockout
      ) {
        dispatch(action.loginFailedAccountLockout(response.data));
      } else {
        dispatch(action.loginFailed(response.data));
      }
    });
  uiDispatches.loading(false);
};

const postReminder = (dispatch: Dispatch) => async (
  value: string,
  history: H.History
) => {
  dispatches.uiDispatch(dispatch).loading(true);
  passwordApi
    .postTemporaryPassword(value)
    .then(success(dispatch, history, "送信が完了しました", REMINDER_COMPLETE))
    .catch(error(dispatch));
};

const postChangePassword = (dispatch: Dispatch) => async (
  value: ChangePassword
) => {
  dispatches.uiDispatch(dispatch).loading(true);
  await passwordApi
    .postPasswordChange(value)
    .then((res) => {
      dispatch(action.passwordChangeSuccess());
      login(dispatch)({ email: value.email, password: value.password });
    })
    .catch((res) => {
      dispatch(action.passwordChangeError(res.response.data));
      dispatches.uiDispatch(dispatch).loading(false);
    });
};

const passwordChangeSuccess = (dispatch: Dispatch) => () => {
  dispatch(action.loginStarted());
};

const refreshTemporary = (dispatch: Dispatch) => () => {
  dispatch(action.refreshTemporary());
};

const refreshPasswordChangeErrorMessage = (dispatch: Dispatch) => (
  type: "mgradmin" | "mgruser"
) => {
  if (type === "mgradmin") {
    dispatch(action.refreshPasswordChangeErrorAdminMessage());
  } else {
    dispatch(action.refreshPasswordChangeErrorUserMessage());
  }
};

const success = (
  dispatch: Dispatch,
  history: H.History,
  message: string,
  href?: string
) => () => {
  dispatches.uiDispatch(dispatch).loading(false);
  dispatches.uiDispatch(dispatch).snackbar({
    message,
    open: true,
    variant: "success"
  });
  if (href) {
    history.push(href);
  }
};

const error = (dispatch: Dispatch) => (e: any) => {
  dispatches.uiDispatch(dispatch).responseError(e.response);
  dispatches.uiDispatch(dispatch).loading(false);
  dispatches.uiDispatch(dispatch).snackbar({
    open: true,
    message: "通信エラー",
    variant: "error"
  });
};

export default function (dispatch: Dispatch) {
  return {
    checkLogin: checkLogin(dispatch),
    logout: logout(dispatch),
    login: login(dispatch),
    postReminder: postReminder(dispatch),
    postChangePassword: postChangePassword(dispatch),
    passwordChangeSuccess: passwordChangeSuccess(dispatch),
    refreshTemporary: refreshTemporary(dispatch),
    refreshPasswordChangeErrorMessage: refreshPasswordChangeErrorMessage(
      dispatch
    )
  };
}
