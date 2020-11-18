import * as types from "./types";

export const fetchJIRITSUKUNRENSEIKATSUDailyStarted = () =>
  ({ type: types.FETCH_JIRITSUKUNRENSEIKATSU_DAILY_STARTED } as const);
export const fetchJIRITSUKUNRENSEIKATSUDaily = (
  res: types.InOutReportState["reports"]
) => ({ type: types.FETCH_JIRITSUKUNRENSEIKATSU_DAILY, payload: res } as const);
export const fetchJIRITSUKUNRENSEIKATSUDailyFailed = (err: any) =>
  ({
    type: types.FETCH_JIRITSUKUNRENSEIKATSU_DAILY_FAILED,
    error: err
  } as const);

export const fetchJIRITSUKUNRENSEIKATSUUserStarted = () =>
  ({ type: types.FETCH_JIRITSUKUNRENSEIKATSU_USER_STARTED } as const);
export const fetchJIRITSUKUNRENSEIKATSUUser = (
  res: types.InOutReportState["reports"]["reportUser"]
) => ({ type: types.FETCH_JIRITSUKUNRENSEIKATSU_USER, payload: res } as const);
export const fetchJIRITSUKUNRENSEIKATSUUserFailed = (err: any) =>
  ({
    type: types.FETCH_JIRITSUKUNRENSEIKATSU_USER_FAILED,
    error: err
  } as const);

export const fetchJIRITSUKUNRENSEIKATSUDailySummaryStarted = () =>
  ({ type: types.FETCH_JIRITSUKUNRENSEIKATSU_DAILY_SUMMARY_STARTED } as const);
export const fetchJIRITSUKUNRENSEIKATSUDailySummary = (
  res: types.InOutReportState["summary"]
) =>
  ({
    type: types.FETCH_JIRITSUKUNRENSEIKATSU_DAILY_SUMMARY,
    payload: res
  } as const);
export const fetchJIRITSUKUNRENSEIKATSUDailySummaryFailed = (err: any) =>
  ({
    type: types.FETCH_JIRITSUKUNRENSEIKATSU_DAILY_SUMMARY_FAILED,
    error: err
  } as const);

export const fetchJIRITSUKUNRENSEIKATSUUserSummaryStarted = () =>
  ({ type: types.FETCH_JIRITSUKUNRENSEIKATSU_USER_SUMMARY_STARTED } as const);
export const fetchJIRITSUKUNRENSEIKATSUUserSummary = (
  res: types.InOutReportState["summary"]
) =>
  ({
    type: types.FETCH_JIRITSUKUNRENSEIKATSU_USER_SUMMARY,
    payload: res
  } as const);
export const fetchJIRITSUKUNRENSEIKATSUUserSummaryFailed = (err: any) =>
  ({
    type: types.FETCH_JIRITSUKUNRENSEIKATSU_USER_SUMMARY_FAILED,
    error: err
  } as const);

export const putJIRITSUKUNRENSEIKATSUReportStarted = () =>
  ({ type: types.PUT_JIRITSUKUNRENSEIKATSU_REPORT_STARTED } as const);
export const putJIRITSUKUNRENSEIKATSUReportDaily = (
  req: types.InOutReportState["reports"]["reportDaily"]["reportList"]
) =>
  ({
    type: types.PUT_JIRITSUKUNRENSEIKATSU_REPORT_DAILY,
    payload: req
  } as const);
export const putJIRITSUKUNRENSEIKATSUReportUser = (
  req: types.InOutReportState["reports"]["reportUser"]["reportList"]
) =>
  ({
    type: types.PUT_JIRITSUKUNRENSEIKATSU_REPORT_USER,
    payload: req
  } as const);
export const putJIRITSUKUNRENSEIKATSUReportFailed = (err: any) =>
  ({
    type: types.PUT_JIRITSUKUNRENSEIKATSU_REPORT_FAILED,
    error: err
  } as const);

export const postJIRITSUKUNRENSEIKATSUInOutAllRecordStarted = () =>
  ({
    type: types.POST_JIRITSUKUNRENSEIKATSU_IN_OUT_ALL_REPORT_STARTED
  } as const);
export const postJIRITSUKUNRENSEIKATSUInOutAllRecord = (
  req: types.InOutReportState["reports"]["additionsDaily"]
) =>
  ({
    type: types.POST_JIRITSUKUNRENSEIKATSU_IN_OUT_ALL_REPORT,
    payload: req
  } as const);
export const postJIRITSUKUNRENSEIKATSUInOutAllRecordFailed = (err: any) =>
  ({
    type: types.POST_JIRITSUKUNRENSEIKATSU_IN_OUT_ALL_REPORT_FAILED,
    error: err
  } as const);

export type ActionTypes =
  | ReturnType<typeof fetchJIRITSUKUNRENSEIKATSUDailyStarted>
  | ReturnType<typeof fetchJIRITSUKUNRENSEIKATSUDaily>
  | ReturnType<typeof fetchJIRITSUKUNRENSEIKATSUDailyFailed>
  | ReturnType<typeof fetchJIRITSUKUNRENSEIKATSUUserStarted>
  | ReturnType<typeof fetchJIRITSUKUNRENSEIKATSUUser>
  | ReturnType<typeof fetchJIRITSUKUNRENSEIKATSUUserFailed>
  | ReturnType<typeof fetchJIRITSUKUNRENSEIKATSUDailySummaryStarted>
  | ReturnType<typeof fetchJIRITSUKUNRENSEIKATSUDailySummary>
  | ReturnType<typeof fetchJIRITSUKUNRENSEIKATSUDailySummaryFailed>
  | ReturnType<typeof fetchJIRITSUKUNRENSEIKATSUUserSummaryStarted>
  | ReturnType<typeof fetchJIRITSUKUNRENSEIKATSUUserSummary>
  | ReturnType<typeof fetchJIRITSUKUNRENSEIKATSUUserSummaryFailed>
  | ReturnType<typeof putJIRITSUKUNRENSEIKATSUReportStarted>
  | ReturnType<typeof putJIRITSUKUNRENSEIKATSUReportDaily>
  | ReturnType<typeof putJIRITSUKUNRENSEIKATSUReportFailed>
  | ReturnType<typeof putJIRITSUKUNRENSEIKATSUReportUser>
  | ReturnType<typeof postJIRITSUKUNRENSEIKATSUInOutAllRecordStarted>
  | ReturnType<typeof postJIRITSUKUNRENSEIKATSUInOutAllRecord>
  | ReturnType<typeof postJIRITSUKUNRENSEIKATSUInOutAllRecordFailed>;
