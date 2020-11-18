import * as types from "./types";

// 日ごと用のaction
export const fetchSHISETSUNYUSHODailyStarted = () =>
  ({ type: types.FETCH_SHISETSUNYUSHO_DAILY_STARTED } as const);
export const fetchSHISETSUNYUSHODailySuccess = (
  res: types.ReportState["reportDaily"]
) =>
  ({ type: types.FETCH_SHISETSUNYUSHO_DAILY_SUCCESS, payload: res } as const);
export const fetchSHISETSUNYUSHODailyFailed = (err: any) =>
  ({ type: types.FETCH_SHISETSUNYUSHO_DAILY_FAILED, error: err } as const);

export const updateSHISETSUNYUSHOAllStatusTypeDaily = (
  res: types.ReportState["reportDaily"]["usagePerformance"]["after"]
) =>
  ({
    type: types.UPDATE_SHISETSUNYUSHO_ALL_STATUS_TYPE_DAILY,
    payload: res
  } as const);

export const postSHISETSUNYUSHOReportDailyStarted = () =>
  ({ type: types.POST_SHISETSUNYUSHO_REPORT_DAILY_STARTED } as const);
export const postSHISETSUNYUSHOReportDailySuccess = (
  res: types.UsagePerformanceType,
  res2: types.UsagePerformanceSHISETSUNYUSHOType,
  key: string
) =>
  ({
    type: types.POST_SHISETSUNYUSHO_REPORT_DAILY_SUCCESS,
    payload: { res, res2 },
    meta: key
  } as const);
export const postSHISETSUNYUSHOReportDailyFailed = (err: any) =>
  ({
    type: types.POST_SHISETSUNYUSHO_REPORT_DAILY_FAILED,
    error: err
  } as const);

export const updateSHISETSUNYUSHOUsagePerformanceParamsDaily = (
  res: types.ReportState["reportDaily"]["usagePerformance"]["after"]
) =>
  ({
    type: types.UPDATE_SHISETSUNYUSHO_USAGE_PERFORMANCE_PARAMS_DAILY,
    payload: res
  } as const);

export const updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHODaily = (
  res: types.ReportState["reportDaily"]["usagePerformanceSHISETSUNYUSHO"]["after"]
) =>
  ({
    type: types.UPDATE_SHISETSUNYUSHO_USAGE_PERFORMANCE_SHISETSUNYUSHO_DAILY,
    payload: res
  } as const);

export const updateSHISETSUNYUSHOUsagePerformanceDaily = (
  res: types.ReportState["reportDaily"]["usagePerformanceDaily"]["after"]
) =>
  ({
    type: types.UPDATE_SHISETSUNYUSHO_USAGE_PERFORMANCE_DAILY,
    payload: res
  } as const);

export const postSHISETSUNYUSHOBulkRegistrationDailyStarted = () =>
  ({
    type: types.POST_SHISETSUNYUSHO_BULK_REGISTRATION_DAILY_STARTED
  } as const);
export const postSHISETSUNYUSHOBulkRegistrationDailySuccess = (
  res: types.ReportState["reportDaily"]
) =>
  ({
    type: types.POST_SHISETSUNYUSHO_BULK_REGISTRATION_DAILY_SUCCESS,
    payload: res
  } as const);
export const postSHISETSUNYUSHOBulkRegistrationDailyFailed = (err: any) =>
  ({
    type: types.POST_SHISETSUNYUSHO_BULK_REGISTRATION_DAILY_FAILED,
    error: err
  } as const);

// 利用者ごと用のaction
export const fetchSHISETSUNYUSHOUsersStarted = () =>
  ({ type: types.FETCH_SHISETSUNYUSHO_USERS_STARTED } as const);
export const fetchSHISETSUNYUSHOUsersSuccess = (
  res: types.ReportState["reportUsers"]
) =>
  ({ type: types.FETCH_SHISETSUNYUSHO_USERS_SUCCESS, payload: res } as const);
export const fetchSHISETSUNYUSHOUsersFailed = (err: any) =>
  ({ type: types.FETCH_SHISETSUNYUSHO_USERS_FAILED, error: err } as const);

export const updateSHISETSUNYUSHOAllStatusTypeUsers = (
  res: types.ReportState["reportUsers"]["usagePerformance"]["after"]
) =>
  ({
    type: types.UPDATE_SHISETSUNYUSHO_ALL_STATUS_TYPE_USERS,
    payload: res
  } as const);

export const updateSHISETSUNYUSHOUsagePerformanceParamsUsers = (
  res: types.ReportState["reportUsers"]["usagePerformance"]["after"]
) =>
  ({
    type: types.UPDATE_SHISETSUNYUSHO_USAGE_PERFORMANCE_PARAMS_USERS,
    payload: res
  } as const);

export const updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOUsers = (
  res: types.ReportState["reportUsers"]["usagePerformanceSHISETSUNYUSHO"]["after"]
) =>
  ({
    type: types.UPDATE_SHISETSUNYUSHO_USAGE_PERFORMANCE_SHISETSUNYUSHO_USERS,
    payload: res
  } as const);

export const postSHISETSUNYUSHOBulkRegistrationUsersStarted = () =>
  ({
    type: types.POST_SHISETSUNYUSHO_BULK_REGISTRATION_USERS_STARTED
  } as const);
export const postSHISETSUNYUSHOBulkRegistrationUsersSuccess = (
  res: types.ReportState["reportUsers"]
) =>
  ({
    type: types.POST_SHISETSUNYUSHO_BULK_REGISTRATION_USERS_SUCCESS,
    payload: res
  } as const);
export const postSHISETSUNYUSHOBulkRegistrationUsersFailed = (err: any) =>
  ({
    type: types.POST_SHISETSUNYUSHO_BULK_REGISTRATION_USERS_FAILED,
    error: err
  } as const);

export const postSHISETSUNYUSHOReportUsersStarted = () =>
  ({ type: types.POST_SHISETSUNYUSHO_REPORT_USERS_STARTED } as const);
export const postSHISETSUNYUSHOReportUsersSuccess = (
  res: types.UsagePerformanceType,
  res2: types.UsagePerformanceSHISETSUNYUSHOType,
  key: string
) =>
  ({
    type: types.POST_SHISETSUNYUSHO_REPORT_USERS_SUCCESS,
    payload: { res, res2 },
    meta: key
  } as const);
export const postSHISETSUNYUSHOReportUsersFailed = (err: any) =>
  ({
    type: types.POST_SHISETSUNYUSHO_REPORT_USERS_FAILED,
    error: err
  } as const);

// 共通のstoreリセットaction
export const resetSHISETSUNYUSHOUsagePerformance = (res: types.ReportState) =>
  ({
    type: types.RESET_SHISETSUNYUSHO_USAGE_PERFORMANCE,
    payload: res
  } as const);

export type ActionTypes =
  // 日ごと用のaction
  | ReturnType<typeof fetchSHISETSUNYUSHODailyStarted>
  | ReturnType<typeof fetchSHISETSUNYUSHODailySuccess>
  | ReturnType<typeof fetchSHISETSUNYUSHODailyFailed>
  | ReturnType<typeof updateSHISETSUNYUSHOAllStatusTypeDaily>
  | ReturnType<typeof postSHISETSUNYUSHOReportDailyStarted>
  | ReturnType<typeof postSHISETSUNYUSHOReportDailySuccess>
  | ReturnType<typeof postSHISETSUNYUSHOReportDailyFailed>
  | ReturnType<typeof updateSHISETSUNYUSHOUsagePerformanceParamsDaily>
  | ReturnType<typeof updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHODaily>
  | ReturnType<typeof updateSHISETSUNYUSHOUsagePerformanceDaily>
  | ReturnType<typeof postSHISETSUNYUSHOBulkRegistrationDailyStarted>
  | ReturnType<typeof postSHISETSUNYUSHOBulkRegistrationDailySuccess>
  | ReturnType<typeof postSHISETSUNYUSHOBulkRegistrationDailyFailed>
  // 利用者ごと用のaction
  | ReturnType<typeof fetchSHISETSUNYUSHOUsersStarted>
  | ReturnType<typeof fetchSHISETSUNYUSHOUsersSuccess>
  | ReturnType<typeof fetchSHISETSUNYUSHOUsersFailed>
  | ReturnType<typeof updateSHISETSUNYUSHOAllStatusTypeUsers>
  | ReturnType<typeof updateSHISETSUNYUSHOUsagePerformanceParamsUsers>
  | ReturnType<typeof updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOUsers>
  | ReturnType<typeof postSHISETSUNYUSHOBulkRegistrationUsersStarted>
  | ReturnType<typeof postSHISETSUNYUSHOBulkRegistrationUsersSuccess>
  | ReturnType<typeof postSHISETSUNYUSHOBulkRegistrationUsersFailed>
  | ReturnType<typeof postSHISETSUNYUSHOReportUsersStarted>
  | ReturnType<typeof postSHISETSUNYUSHOReportUsersSuccess>
  | ReturnType<typeof postSHISETSUNYUSHOReportUsersFailed>
  | ReturnType<typeof resetSHISETSUNYUSHOUsagePerformance>;
