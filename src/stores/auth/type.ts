import { FacilityType } from "@constants/variables";

/**
 * ログインAPIに渡す値
 */
export interface LoginParams {
  email: string;
  password: string;
}

/**
 * トークン確認用
 */
export interface CheckParams {
  token: string | null;
}

interface LoginResultFeatureGroup {
  group_invoice: number;
  group_operation_support: number;
  group_labor_charge: number;
}

interface LoginResultLabels {
  facility_user: string;
  punch_in: string;
  punch_out: string;
}

/**
 * パスワード変更・強制変更で必要になるユーザー情報
 */
export interface ChangePasswordUser {
  email: string;
  role: string;
  token: string;
}

/**
 * ロックアウトまでの情報
 */
export interface Lockout {
  limit: number;
  count: number;
}

/**
 * ロックアウト解除までの情報
 */
export interface UnLock {
  time: number;
}

export enum LoginErrorCode {
  WishChangePassword = 1,
  TemporaryPassword,
  AccountLockout
}

/**
 * ログイン成功
 */
export interface LoginDone {
  token: string;
  refreshToken: string;
  role: string;
  featureGroup: LoginResultFeatureGroup;
  isAdmin: boolean;
  isSupport: boolean;
  facility_type: FacilityType;
  labels: LoginResultLabels;
  isMultipleFacility: boolean;
}

/**
 * パスワード変更催促
 */
export interface LoginDoneWishChangePassword {
  error: "wish_change_password";
  code: LoginErrorCode.WishChangePassword;
  users: ChangePasswordUser[];
}

/**
 * 仮パスワードでログインした
 */
export interface LoginDoneTemporaryPassword {
  error: "temporary_password";
  code: LoginErrorCode.TemporaryPassword;
  users: ChangePasswordUser;
}

export type LoginSuccessInterFaceList =
  | LoginDone
  | LoginDoneWishChangePassword
  | LoginDoneTemporaryPassword;

/**
 * ログイン失敗
 */
export interface LoginFailed {
  error: "invalid_credentials";
  lockout?: Lockout;
}

/**
 * アカウントロック状態
 */
export interface LoginFailedAccountLockout {
  error: "account_lockout";
  code: LoginErrorCode.AccountLockout;
  users: ChangePasswordUser;
  time: number;
  limit: number;
}

/**
 * 管理する値
 */
export interface AuthState {
  token: string;
  refreshToken: string;
  temporaryToken: string;
  temporaryEmail: string;
  isLoggedIn: boolean;
  isTemporary: boolean;
  isChecked: boolean;
  isAdmin: boolean;
  isSupport: boolean;
  hasError: boolean;
  wishChangePasswordUsers: ChangePasswordUser[];
  lockout: Lockout | null;
  unlock: UnLock | null;
  changePasswordRes: ChangePasswordResult;
  redirectOldVersion: boolean;
}

/* API */

/**
 * パスワード変更APIに必要な情報
 */
export interface ChangePassword {
  email: string;
  remember_token: string;
  password: string;
  mgruser_password?: string;
}

/**
 * パスワード変更APIの返り値
 */
export type ChangePasswordResult = ResponseError[];

interface ResponseError {
  role: string;
  error: {
    target: string;
    message: string;
  };
}
