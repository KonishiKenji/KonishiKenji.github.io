import * as action from "@stores/ui/download/action";
import { Dispatch } from "redux";
import { DownloadFileType } from "./type";

const targetYearMonth = (dispatch: Dispatch) => (yearMonth: string): void => {
  dispatch(action.targetYearMonth(yearMonth));
};

const isDisableDownloadButton = (dispatch: Dispatch) => (
  isDisabled: boolean
): void => {
  dispatch(action.isDisableDownloadButton(isDisabled));
};

const isDisableExcludedUsersButton = (dispatch: Dispatch) => (
  isDisabled: boolean
): void => {
  dispatch(action.isDisableExcludedUsersButton(isDisabled));
};

const downloadReadyFileType = (dispatch: Dispatch) => (
  fileType: DownloadFileType
): void => {
  dispatch(action.downloadReadyFileType(fileType));
};

const isOpenUserModal = (dispatch: Dispatch) => (open: boolean): void => {
  dispatch(action.isOpenUserModal(open));
};

const excludedUserIds = (dispatch: Dispatch) => (userIds: number[]): void => {
  dispatch(action.excludedUserIds(userIds));
};

const tmpExcludedUserIds = (dispatch: Dispatch) => (
  userIds: number[]
): void => {
  dispatch(action.tmpExcludedUserIds(userIds));
};

// 請求対象除外ユーザーを初期化する
const clearExcludedUserIds = (dispatch: Dispatch) => (): void => {
  dispatch(action.clearExcludedUserIds());
};

export default function(dispatch: Dispatch) {
  return {
    targetYearMonth: targetYearMonth(dispatch),
    isDisableDownloadButton: isDisableDownloadButton(dispatch),
    isDisableExcludedUsersButton: isDisableExcludedUsersButton(dispatch),
    downloadReadyFileType: downloadReadyFileType(dispatch),
    isOpenUserModal: isOpenUserModal(dispatch),
    excludedUserIds: excludedUserIds(dispatch),
    tmpExcludedUserIds: tmpExcludedUserIds(dispatch),
    clearExcludedUserIds: clearExcludedUserIds(dispatch)
  };
}
