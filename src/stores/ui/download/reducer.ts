import * as action from "@stores/ui/download/action";
import { AppDownloadState, DownloadFileType } from "@stores/ui/download/type";
import { reducerWithInitialState } from "typescript-fsa-reducers";

const targetYearMonth = (
  state: AppDownloadState,
  payload: AppDownloadState["targetYearMonth"]
) => {
  const months = payload.split("-");
  const { year, month } = {
    year: months[0],
    month: months[1]
  };
  return {
    ...state,
    targetYearMonth: payload,
    targetYear: year,
    targetMonth: month
  };
};

const isDisableDownloadButton = (
  state: AppDownloadState,
  payload: AppDownloadState["isDisableDownloadButton"]
) => ({
  ...state,
  isDisableDownloadButton: payload
});

const isDisableExcludedUsersButton = (
  state: AppDownloadState,
  payload: AppDownloadState["isDisableExcludedUsersButton"]
) => ({
  ...state,
  isDisableExcludedUsersButton: payload
});

const downloadReadyFileType = (
  state: AppDownloadState,
  payload: AppDownloadState["downloadReadyFileType"]
) => ({
  ...state,
  downloadReadyFileType: payload
});

const isOpenUserModal = (
  state: AppDownloadState,
  payload: AppDownloadState["isOpenUserModal"]
) => ({
  ...state,
  isOpenUserModal: payload
});

const excludedUserIds = (
  state: AppDownloadState,
  payload: AppDownloadState["excludedUserIds"]
) => {
  return {
    ...state,
    excludedUserIds: payload
  };
};

const tmpExcludedUserIds = (
  state: AppDownloadState,
  payload: AppDownloadState["tmpExcludedUserIds"]
) => {
  return {
    ...state,
    tmpExcludedUserIds: payload
  };
};

const clearExcludedUserIds = (state: AppDownloadState) => {
  return {
    ...state,
    excludedUserIds: [],
    tmpExcludedUserIds: []
  };
};

const initialState = {
  targetYearMonth: "",
  targetYear: "",
  targetMonth: "",
  isDisableDownloadButton: true,
  isDisableExcludedUsersButton: true,
  downloadReadyFileType: DownloadFileType.NONE,
  isOpenUserModal: false,
  excludedUserIds: [] as number[],
  tmpExcludedUserIds: [] as number[]
};

export default reducerWithInitialState(initialState)
  .case(action.targetYearMonth, targetYearMonth)
  .case(action.isDisableDownloadButton, isDisableDownloadButton)
  .case(action.isDisableExcludedUsersButton, isDisableExcludedUsersButton)
  .case(action.downloadReadyFileType, downloadReadyFileType)
  .case(action.isOpenUserModal, isOpenUserModal)
  .case(action.excludedUserIds, excludedUserIds)
  .case(action.clearExcludedUserIds, clearExcludedUserIds)
  .case(action.tmpExcludedUserIds, tmpExcludedUserIds);
