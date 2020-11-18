/**
 * Admin / User
 */
export interface FacilityUser {
  email: string;
  role: string;
}

export interface GetURLValidityResult {
  status: number;
}

/**
 * 更新対象のユーザー取得API
 */
export type GetTargetFacilityUserResult = FacilityUser[];

/**
 *
 */
export interface UpdatePasswordFailed {
  [key: number]: {
    email: string;
    error: {
      target: "password" | "new_password" | "com_new_password";
      message: string;
    };
  };
}

/**
 * パスワード変更API（ログイン後用）
 */
export interface UpdatePasswordParams {
  email: string;
  password: string;
  new_password: string;
  com_new_password: string;
}

/**
 * 新規アカウント発行API
 */
export interface NewAccountParams {
  email: string;
  password: string;
  mgruser_email: string | null;
  mgruser_password: string | null;
}

/**
 * 新規アカウント発行API失敗
 */
export type ActivateResult = ResponseError[];

interface ResponseError {
  role: string;
  error: {
    target: string;
    message: string;
  };
}

/**
 * State
 */
export interface AccountState {
  errorType: string;
  admin: FacilityUser;
  user: FacilityUser;
  errors?: {
    [formName: string]: UpdatePasswordFailed;
  };
  activateRes: ActivateResult;
}
