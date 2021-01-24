import * as types from "./types";

export const fetchTANKINYUSHODailyStarted = () =>
  ({ type: types.FETCH_TANKINYUSHO_DAILY_STARTED } as const);
export const fetchTANKINYUSHODailySuccess = (
  res: types.ReportState["reportDaily"]
) => ({ type: types.FETCH_TANKINYUSHO_DAILY_SUCCESS, payload: res } as const);
export const fetchTANKINYUSHODailyFailed = (err: any) =>
  ({ type: types.FETCH_TANKINYUSHO_DAILY_FAILED, error: err } as const);

export const fetchTANKINYUSHOMonthlyStarted = () =>
  ({ type: types.FETCH_TANKINYUSHO_MONTHLY_STARTED } as const);
export const fetchTANKINYUSHOMonthlySuccess = (
  res: types.ReportState["reportMonthly"]
) => ({ type: types.FETCH_TANKINYUSHO_MONTHLY_SUCCESS, payload: res } as const);
export const fetchTANKINYUSHOMonthlyFailed = (err: any) =>
  ({ type: types.FETCH_TANKINYUSHO_MONTHLY_FAILED, error: err } as const);

export const updateTANKINYUSHOUsagePerformanceItemsDaily = (
  res: types.ReportState["reportDaily"]["usagePerformance"]["after"]
) =>
  ({
    type: types.UPDATE_TANKINYUSHO_DAILY_USAGE_PERFORMANCE,
    payload: res
  } as const);
export const updateTANKINYUSHOUsagePerformanceTANKINYUSHOItemsDaily = (
  res: types.ReportState["reportDaily"]["usagePerformanceTANKINYUSHO"]["after"]
) =>
  ({
    type: types.UPDATE_TANKINYUSHO_DAILY_USAGE_PERFORMANCE_TANKINYUSHO,
    payload: res
  } as const);
export const updateTANKINYUSHOUsagePerformanceDaily = (
  res: types.ReportState["reportDaily"]["usagePerformanceDaily"]["after"]
) =>
  ({
    type: types.UPDATE_TANKINYUSHO_USAGE_PERFORMANCE_DAILY,
    payload: res
  } as const);

export const updateTANKINYUSHOUsagePerformanceMonthly = (
  res: types.ReportState["reportMonthly"]["usagePerformance"]["after"]
) =>
  ({
    type: types.UPDATE_TANKINYUSHO_MONTHLY_USAGE_PERFORMANCE,
    payload: res
  } as const);
export const updateTANKINYUSHOUsagePerformanceTANKINYUSHOMonthly = (
  res: types.ReportState["reportMonthly"]["usagePerformanceTANKINYUSHO"]["after"]
) =>
  ({
    type: types.UPDATE_TANKINYUSHO_MONTHLY_USAGE_PERFORMANCE_TANKINYUSHO,
    payload: res
  } as const);

export const postTANKINYUSHOReportDailyStarted = () =>
  ({ type: types.POST_TANKINYUSHO_REPORT_DAILY_STARTED } as const);
export const postTANKINYUSHOReportDailySuccess = (
  res: types.UsagePerformanceType,
  res2: types.UsagePerformanceTANKINYUSHOType,
  key: string
) =>
  ({
    type: types.POST_TANKINYUSHO_REPORT_DAILY_SUCCESS,
    payload: { res, res2 },
    meta: key
  } as const);
export const postTANKINYUSHOReportDailyFailed = (err: any) =>
  ({ type: types.POST_TANKINYUSHO_REPORT_DAILY_FAILED, error: err } as const);

export const postTANKINYUSHOReportMonthlyStarted = () =>
  ({ type: types.POST_TANKINYUSHO_REPORT_MONTHLY_STARTED } as const);
export const postTANKINYUSHOReportMonthlySuccess = (
  res: types.UsagePerformanceType,
  res2: types.UsagePerformanceTANKINYUSHOType,
  key: string
) =>
  ({
    type: types.POST_TANKINYUSHO_REPORT_MONTHLY_SUCCESS,
    payload: { res, res2 },
    meta: key
  } as const);
export const postTANKINYUSHOReportMonthlyFailed = (err: any) =>
  ({ type: types.POST_TANKINYUSHO_REPORT_MONTHLY_FAILED, error: err } as const);

export const postTANKINYUSHOBulkRegistrationDailyStarted = () =>
  ({ type: types.POST_TANKINYUSHO_BULK_REGISTRATION_DAILY_STARTED } as const);
export const postTANKINYUSHOBulkRegistrationDailySuccess = (
  res: types.ReportState["reportDaily"]
) =>
  ({
    type: types.POST_TANKINYUSHO_BULK_REGISTRATION_DAILY_SUCCESS,
    payload: res
  } as const);
export const postTANKINYUSHOBulkRegistrationDailyFailed = (err: any) =>
  ({
    type: types.POST_TANKINYUSHO_BULK_REGISTRATION_DAILY_FAILED,
    error: err
  } as const);

export const postTANKINYUSHOBulkRegistrationMonthlyStarted = () =>
  ({ type: types.POST_TANKINYUSHO_BULK_REGISTRATION_MONTHLY_STARTED } as const);
export const postTANKINYUSHOBulkRegistrationMonthlySuccess = (
  res: types.ReportState["reportMonthly"]
) =>
  ({
    type: types.POST_TANKINYUSHO_BULK_REGISTRATION_MONTHLY_SUCCESS,
    payload: res
  } as const);
export const postTANKINYUSHOBulkRegistrationMonthlyFailed = (err: any) =>
  ({
    type: types.POST_TANKINYUSHO_BULK_REGISTRATION_MONTHLY_FAILED,
    error: err
  } as const);

export const updateTANKINYUSHOAllStatusType = (
  res: types.ReportState["reportDaily"]["usagePerformance"]["after"]
) =>
  ({ type: types.UPDATE_TANKINYUSHO_ALL_STATUS_TYPE, payload: res } as const);

export const resetTANKINYUSHOUsagePerformance = (res: types.ReportState) =>
  ({
    type: types.RESET_TANKINYUSHO_USAGE_PERFORMANCE,
    payload: res
  } as const);

export type ActionTypes =
  | ReturnType<typeof fetchTANKINYUSHODailyStarted>
  | ReturnType<typeof fetchTANKINYUSHODailySuccess>
  | ReturnType<typeof fetchTANKINYUSHODailyFailed>
  | ReturnType<typeof fetchTANKINYUSHOMonthlyStarted>
  | ReturnType<typeof fetchTANKINYUSHOMonthlySuccess>
  | ReturnType<typeof fetchTANKINYUSHOMonthlyFailed>
  | ReturnType<typeof updateTANKINYUSHOUsagePerformanceItemsDaily>
  | ReturnType<typeof updateTANKINYUSHOUsagePerformanceTANKINYUSHOItemsDaily>
  | ReturnType<typeof updateTANKINYUSHOUsagePerformanceDaily>
  | ReturnType<typeof updateTANKINYUSHOUsagePerformanceMonthly>
  | ReturnType<typeof updateTANKINYUSHOUsagePerformanceTANKINYUSHOMonthly>
  | ReturnType<typeof postTANKINYUSHOReportDailyStarted>
  | ReturnType<typeof postTANKINYUSHOReportDailySuccess>
  | ReturnType<typeof postTANKINYUSHOReportDailyFailed>
  | ReturnType<typeof postTANKINYUSHOReportMonthlyStarted>
  | ReturnType<typeof postTANKINYUSHOReportMonthlySuccess>
  | ReturnType<typeof postTANKINYUSHOReportMonthlyFailed>
  | ReturnType<typeof postTANKINYUSHOBulkRegistrationDailyStarted>
  | ReturnType<typeof postTANKINYUSHOBulkRegistrationDailySuccess>
  | ReturnType<typeof postTANKINYUSHOBulkRegistrationDailyFailed>
  | ReturnType<typeof postTANKINYUSHOBulkRegistrationMonthlyStarted>
  | ReturnType<typeof postTANKINYUSHOBulkRegistrationMonthlySuccess>
  | ReturnType<typeof postTANKINYUSHOBulkRegistrationMonthlyFailed>
  | ReturnType<typeof updateTANKINYUSHOAllStatusType>
  | ReturnType<typeof resetTANKINYUSHOUsagePerformance>;
