import * as types from "./types";

export const fetchIABDailyStarted = () =>
  ({ type: types.FETCH_IAB_DAILY_STARTED } as const);
export const fetchIABDaily = (res: types.IABReportState) =>
  ({ type: types.FETCH_IAB_DAILY, payload: res } as const);
export const fetchIABDailyFailed = (err: any) =>
  ({ type: types.FETCH_IAB_DAILY_FAILED, error: err } as const);

export const fetchIABUserStarted = () =>
  ({ type: types.FETCH_IAB_USER_STARTED } as const);
export const fetchIABUser = (res: types.IABReportState["reportUser"]) =>
  ({ type: types.FETCH_IAB_USER, payload: res } as const);
export const fetchIABUserFailed = (err: any) =>
  ({ type: types.FETCH_IAB_USER_FAILED, error: err } as const);

export const fetchDailySummaryStarted = () =>
  ({ type: types.FETCH_IAB_DAILY_SUMMARY_STARTED } as const);
export const fetchDailySummary = (res: types.IABSummary) =>
  ({ type: types.FETCH_IAB_DAILY_SUMMARY, payload: res } as const);
export const fetchDailySummaryFailed = (err: any) =>
  ({
    type: types.FETCH_IAB_DAILY_SUMMARY_FAILED,
    error: err
  } as const);
export const unsetIABDailySummary = () =>
  ({ type: types.UNSET_IAB_DAILY_SUMMARY } as const);

export const fetchIABUserSummaryStarted = () =>
  ({ type: types.FETCH_IAB_USER_SUMMARY_STARTED } as const);
export const fetchIABUserSummary = (res: types.IABSummary) =>
  ({ type: types.FETCH_IAB_USER_SUMMARY, payload: res } as const);
export const fetchIABUserSummaryFailed = (err: any) =>
  ({
    type: types.FETCH_IAB_USER_SUMMARY_FAILED,
    error: err
  } as const);

export const putIABReportStarted = () =>
  ({ type: types.PUT_IAB_REPORT_STARTED } as const);
export const putIABReportDaily = (req: types.IABReport[]) =>
  ({ type: types.PUT_IAB_REPORT_DAILY, payload: req } as const);
export const putIABReportUser = (req: types.IABReport[]) =>
  ({ type: types.PUT_IAB_REPORT_USER, payload: req } as const);
export const putIABReportFailed = (err: any) =>
  ({ type: types.PUT_IAB_REPORT_FAILED, error: err } as const);

export const postIABInOutAllRecordStarted = () =>
  ({
    type: types.POST_IAB_IN_OUT_ALL_REPORT_STARTED
  } as const);
export const postIABInOutAllRecord = (req: types.IABReportAdditionsDaily) =>
  ({
    type: types.POST_IAB_IN_OUT_ALL_REPORT,
    payload: req
  } as const);
export const postIABInOutAllRecordFailed = (err: any) =>
  ({
    type: types.POST_IAB_IN_OUT_ALL_REPORT_FAILED,
    error: err
  } as const);

export type ActionTypes =
  | ReturnType<typeof fetchIABDailyStarted>
  | ReturnType<typeof fetchIABDaily>
  | ReturnType<typeof fetchIABDailyFailed>
  | ReturnType<typeof fetchIABUserStarted>
  | ReturnType<typeof fetchIABUser>
  | ReturnType<typeof fetchIABUserFailed>
  | ReturnType<typeof fetchDailySummaryStarted>
  | ReturnType<typeof fetchDailySummary>
  | ReturnType<typeof fetchDailySummaryFailed>
  | ReturnType<typeof fetchIABUserSummaryStarted>
  | ReturnType<typeof fetchIABUserSummary>
  | ReturnType<typeof fetchIABUserSummaryFailed>
  | ReturnType<typeof putIABReportStarted>
  | ReturnType<typeof putIABReportDaily>
  | ReturnType<typeof putIABReportFailed>
  | ReturnType<typeof putIABReportUser>
  | ReturnType<typeof postIABInOutAllRecordStarted>
  | ReturnType<typeof postIABInOutAllRecord>
  | ReturnType<typeof postIABInOutAllRecordFailed>
  | ReturnType<typeof unsetIABDailySummary>;
