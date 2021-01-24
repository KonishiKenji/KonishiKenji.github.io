import * as action from "@stores/auth/action";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import {
  AuthState,
  CheckParams,
  LoginDone,
  LoginDoneWishChangePassword,
  LoginDoneTemporaryPassword,
  LoginFailed,
  LoginFailedAccountLockout,
  ChangePasswordResult
} from "./type";

const initialState: AuthState = {
  token: "",
  refreshToken: "",
  temporaryToken: "",
  temporaryEmail: "",
  isLoggedIn: false,
  isTemporary: false,
  isChecked: false,
  isAdmin: false,
  isSupport: false,
  hasError: false,
  wishChangePasswordUsers: [],
  lockout: null,
  unlock: null,
  changePasswordRes: [],
  redirectOldVersion: false
};

const logout = () => initialState;

const check = (state: AuthState, data: CheckParams) => ({
  ...state,
  isChecked: true,
  isLoggedIn: data.token !== "" && data.token !== null
});

const loginStarted = (state: AuthState) => ({
  ...state,
  hasError: false
});

const loginDone = (state: AuthState, result: LoginDone) => ({
  ...state,
  ...result,
  isChecked: true,
  isLoggedIn: result.token !== "" && result.token !== null
});

const loginDoneWishChangePassword = (
  state: AuthState,
  result: LoginDoneWishChangePassword
) => ({
  ...state,
  wishChangePasswordUsers: result.users
});

const loginDoneTemporaryPassword = (
  state: AuthState,
  result: LoginDoneTemporaryPassword
) => ({
  ...state,
  isTemporary: true,
  temporaryToken: result.users.token,
  temporaryEmail: result.users.email
});

const loginFailed = (state: AuthState, error: LoginFailed) => ({
  ...state,
  lockout: error.lockout || null,
  hasError: true
});

const loginFailedAccountLockout = (
  state: AuthState,
  error: LoginFailedAccountLockout
) => ({
  ...state,
  lockout: {
    count: error.limit,
    limit: error.limit
  },
  unlock: {
    time: error.time
  },
  hasError: true
});

const passwordChangeSuccess = (state: AuthState) => {
  return {
    ...state,
    temporaryToken: "",
    temporaryEmail: "",
    wishChangePasswordUsers: [],
    changePasswordRes: []
  };
};

const passwordChangeError = (state: AuthState, data: ChangePasswordResult) => {
  return {
    ...state,
    changePasswordRes: data
  };
};

const refreshTemporary = (state: AuthState) => {
  return {
    ...state,
    isTemporary: false
  };
};

const refreshPasswordChangeErrorAdminMessage = (state: AuthState) => {
  const res = state.changePasswordRes.filter((target) => {
    return target.role === "mgruser";
  });
  return {
    ...state,
    changePasswordRes: res
  };
};

const refreshPasswordChangeErrorUserMessage = (state: AuthState) => {
  const res = state.changePasswordRes.filter((target) => {
    return target.role === "mgradmin";
  });
  return {
    ...state,
    changePasswordRes: res
  };
};

const redirectOldVersion = (state: AuthState) => {
  return { ...state, redirectOldVersion: true };
};

export default reducerWithInitialState(initialState)
  .case(action.logout, logout)
  .case(action.check, check)
  .case(action.loginStarted, loginStarted)
  .case(action.loginDone, loginDone)
  .case(action.loginDoneWishChangePassword, loginDoneWishChangePassword)
  .case(action.loginDoneTemporaryPassword, loginDoneTemporaryPassword)
  .case(action.loginFailed, loginFailed)
  .case(action.loginFailedAccountLockout, loginFailedAccountLockout)
  .case(action.passwordChangeSuccess, passwordChangeSuccess)
  .case(action.passwordChangeError, passwordChangeError)
  .case(action.refreshTemporary, refreshTemporary)
  .case(
    action.refreshPasswordChangeErrorAdminMessage,
    refreshPasswordChangeErrorAdminMessage
  )
  .case(
    action.refreshPasswordChangeErrorUserMessage,
    refreshPasswordChangeErrorUserMessage
  )
  .case(action.redirectOldVersion, redirectOldVersion);
