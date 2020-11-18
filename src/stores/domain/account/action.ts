import typescriptFsa from "typescript-fsa";
import {
  GetTargetFacilityUserResult,
  ActivateResult,
  UpdatePasswordFailed,
  GetURLValidityResult
} from "@stores/domain/account/type";

const actionCreator = typescriptFsa("ACCOUNT");

// 遷移してきたリンクが有効かどうかを確認
export const getURLValidity = actionCreator.async<{}, GetURLValidityResult>(
  "GET_URL_VALIDITY"
);

// 更新できるユーザーの取得
export const getTargetFacilityUser = actionCreator.async<
  {},
  GetTargetFacilityUserResult
>("GET_TARGET_FACILITY_USER");

// パスワードの更新
export const updatePassword = actionCreator.async<
  { formName: string },
  {},
  UpdatePasswordFailed
>("UPDATE_PASSWORD");

// アカウントの登録失敗
export const activateFailed = actionCreator<ActivateResult>(
  "NEW_ACCOUNT_FAILED"
);

// アカウント登録時にサーバーサイドで起きたエラーを全てクリア
export const refreshActivateErrorMessage = actionCreator(
  "REFRESH_ACTIVATE_ERROR_MESSAGE"
);

// アカウント登録時にmgradminのpasswordで起きたサーバーサイドのエラーをクリア
export const refreshActivateErrorMessageMgrAdminPassword = actionCreator(
  "REFRESH_ACTIVATE_ERROR_MESSAGE_MGR_ADMIN_PASSWORD"
);

// アカウント登録時にmgruserのaccountIdで起きたサーバーサイドのエラーをクリア
export const refreshActivateErrorMessageMgrUserAccountId = actionCreator(
  "REFRESH_ACTIVATE_ERROR_MESSAGE_MGR_USER_ACCOUNT_ID"
);

// アカウント登録時にmgruserのpasswordで起きたサーバーサイドのエラーをクリア
export const refreshActivateErrorMessageMgrUserPassword = actionCreator(
  "REFRESH_ACTIVATE_ERROR_MESSAGE_MGR_USER_PASSWORD"
);
