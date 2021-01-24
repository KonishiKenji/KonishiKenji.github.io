import typescriptFsa from "typescript-fsa";
import {
  LoginDone,
  LoginDoneWishChangePassword,
  LoginDoneTemporaryPassword,
  LoginFailed,
  LoginFailedAccountLockout,
  CheckParams,
  ChangePasswordResult
} from "./type";

const actionCreator = typescriptFsa("AUTH");

export const logout = actionCreator("LOGOUT");
export const check = actionCreator<CheckParams>("CHECK");

export const loginStarted = actionCreator("LOGIN_STARTED");
export const loginDone = actionCreator<LoginDone>("LOGIN_DONE");
export const loginDoneWishChangePassword = actionCreator<
  LoginDoneWishChangePassword
>("LOGIN_DONE_WISH_CHANGE_PASSWORD");
export const loginDoneTemporaryPassword = actionCreator<
  LoginDoneTemporaryPassword
>("LOGIN_DONE_TEMPORARY_PASSWORD");
export const loginFailed = actionCreator<LoginFailed>("LOGIN_FAILED");
export const loginFailedAccountLockout = actionCreator<
  LoginFailedAccountLockout
>("LOGIN_FAILED_ACCOUNT_LOCKOUT");

export const passwordChangeSuccess = actionCreator("PASSWORD_CHANGE_SUCCESS");
export const passwordChangeError = actionCreator<ChangePasswordResult>(
  "PASSWORD_CHANGE_ERROR"
);
export const refreshTemporary = actionCreator("REFRESH_TEMPORARY");
export const refreshPasswordChangeErrorAdminMessage = actionCreator(
  "REFRESH_PASSWORD_CHANGE_ERROR_ADMIN_MESSAGE"
);
export const refreshPasswordChangeErrorUserMessage = actionCreator(
  "REFRESH_PASSWORD_CHANGE_ERROR_USER_MESSAGE"
);

export const redirectOldVersion = actionCreator("REDIRECT_OLD_VERSION");
