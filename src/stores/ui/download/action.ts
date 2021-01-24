import typescriptFsa from "typescript-fsa";

import { AppDownloadState } from "@stores/ui/download/type";

const actionCreator = typescriptFsa("STATE/DOWNLOAD");

// 月日の選択肢
export const targetYearMonth = actionCreator<
  AppDownloadState["targetYearMonth"]
>("TARGET_YEAR_MONTH");

export const isDisableDownloadButton = actionCreator<
  AppDownloadState["isDisableDownloadButton"]
>("IS_DISABLED_DOWNLOAD_BUTTON");

export const isDisableExcludedUsersButton = actionCreator<
  AppDownloadState["isDisableExcludedUsersButton"]
>("IS_DISABLED_EXCLUDED_USERS_BUTTON");

export const downloadReadyFileType = actionCreator<
  AppDownloadState["downloadReadyFileType"]
>("DOWNLOAD_READY_FILE_TYPE");

export const isOpenUserModal = actionCreator<
  AppDownloadState["isOpenUserModal"]
>("IS_OPEN_USER_MODAL");

export const excludedUserIds = actionCreator<
  AppDownloadState["excludedUserIds"]
>("EXCLUDED_USER_IDS");

export const tmpExcludedUserIds = actionCreator<
  AppDownloadState["tmpExcludedUserIds"]
>("TMP_EXCLUDED_USER_IDS");

export const clearExcludedUserIds = actionCreator("CLEAR_EXCLUDED_USER_IDS");
