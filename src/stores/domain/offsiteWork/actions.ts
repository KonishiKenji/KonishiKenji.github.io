import * as types from "./types";

export const fetchDownloadStarted = (res: any) =>
  ({ type: types.FETCH_DOWNLOAD_STARTED, payload: res } as const);

export const fetchDownloadSuccess = (res: any) =>
  ({ type: types.FETCH_DOWNLOAD_SUCCESS, payload: res } as const);

export const fetchDownloadFailed = (res: any) =>
  ({ type: types.FETCH_DOWNLOAD_FAILED, payload: res } as const);

export const fetchWorkplaceCompanyListStarted = () =>
  ({ type: types.FETCH_WORKPLACE_COMPANY_LIST_STARTED } as const);
export const fetchWorkplaceCompanyListSuccess = (res: any) =>
  ({ type: types.FETCH_WORKPLACE_COMPANY_LIST_SUCCESS, payload: res } as const);
export const fetchWorkplaceCompanyListFailed = () =>
  ({ type: types.FETCH_WORKPLACE_COMPANY_LIST_FAILED } as const);

export const fetchWorkplaceCompanyStarted = () =>
  ({ type: types.FETCH_WORKPLACE_COMPANY_STARTED } as const);
export const fetchWorkplaceCompanySuccess = (res: any) =>
  ({ type: types.FETCH_WORKPLACE_COMPANY_SUCCESS, payload: res } as const);
export const fetchWorkplaceCompanyFailed = () =>
  ({ type: types.FETCH_WORKPLACE_COMPANY_FAILED } as const);

export const clearWorkplaceCompany = () =>
  ({ type: types.CLEAR_WORKPLACE_COMPANY } as const);

export const postWorkplaceCompanyStarted = () =>
  ({ type: types.POST_WORKPLACE_COMPANY_STARTED } as const);
export const postWorkplaceCompanySuccess = (res: any) =>
  ({ type: types.POST_WORKPLACE_COMPANY_SUCCESS, payload: res } as const);
export const postWorkplaceCompanyFailed = () =>
  ({ type: types.POST_WORKPLACE_COMPANY_FAILED } as const);

export const deleteWorkplaceCompanyStarted = () =>
  ({ type: types.DELETE_WORKPLACE_COMPANY_STARTED } as const);
export const deleteWorkplaceCompanySuccess = (res: any) =>
  ({ type: types.DELETE_WORKPLACE_COMPANY_SUCCESS } as const);
export const deleteWorkplaceCompanyFailed = () =>
  ({ type: types.DELETE_WORKPLACE_COMPANY_FAILED } as const);

export const fetchDownloadablesStarted = () =>
  ({ type: types.FETCH_DOWNLOADABLE_STARTED } as const);
export const fetchDownloadablesSuccess = (
  res: types.InitialState["downloadables"]
) => ({ type: types.FETCH_DOWNLOADABLE_SUCCESS, payload: res } as const);
export const fetchDownloadablesFailed = () =>
  ({ type: types.FETCH_DOWNLOADABLE_STARTED } as const);

export type ActionTypes =
  | ReturnType<typeof fetchDownloadStarted>
  | ReturnType<typeof fetchDownloadSuccess>
  | ReturnType<typeof fetchDownloadFailed>
  | ReturnType<typeof fetchWorkplaceCompanyListStarted>
  | ReturnType<typeof fetchWorkplaceCompanyListSuccess>
  | ReturnType<typeof fetchWorkplaceCompanyListFailed>
  | ReturnType<typeof fetchWorkplaceCompanyStarted>
  | ReturnType<typeof fetchWorkplaceCompanySuccess>
  | ReturnType<typeof fetchWorkplaceCompanyFailed>
  | ReturnType<typeof deleteWorkplaceCompanyStarted>
  | ReturnType<typeof deleteWorkplaceCompanySuccess>
  | ReturnType<typeof deleteWorkplaceCompanyFailed>
  | ReturnType<typeof clearWorkplaceCompany>
  | ReturnType<typeof fetchDownloadablesStarted>
  | ReturnType<typeof fetchDownloadablesSuccess>
  | ReturnType<typeof fetchDownloadablesFailed>;
