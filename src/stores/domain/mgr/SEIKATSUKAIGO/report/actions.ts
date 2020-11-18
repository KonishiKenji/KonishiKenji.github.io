import * as types from "./types";

export const fetchSEIKATSUKAIGODailyStarted = () =>
  ({ type: types.FETCH_SEIKATSUKAIGO_DAILY_STARTED } as const);
export const fetchSEIKATSUKAIGODaily = (res: types.SEIKATSUKAIGOReportState) =>
  ({ type: types.FETCH_SEIKATSUKAIGO_DAILY, payload: res } as const);
export const fetchSEIKATSUKAIGODailyFailed = (err: any) =>
  ({ type: types.FETCH_SEIKATSUKAIGO_DAILY_FAILED, error: err } as const);

export const fetchSEIKATSUKAIGOUserStarted = () =>
  ({ type: types.FETCH_SEIKATSUKAIGO_USER_STARTED } as const);
export const fetchSEIKATSUKAIGOUser = (
  res: types.SEIKATSUKAIGOReportState["reportUser"]
) => ({ type: types.FETCH_SEIKATSUKAIGO_USER, payload: res } as const);
export const fetchSEIKATSUKAIGOUserFailed = (err: any) =>
  ({ type: types.FETCH_SEIKATSUKAIGO_USER_FAILED, error: err } as const);

export const fetchDailySummaryStarted = () =>
  ({ type: types.FETCH_SEIKATSUKAIGO_DAILY_SUMMARY_STARTED } as const);
export const fetchDailySummary = (res: types.SEIKATSUKAIGOSummary) =>
  ({ type: types.FETCH_SEIKATSUKAIGO_DAILY_SUMMARY, payload: res } as const);
export const fetchDailySummaryFailed = (err: any) =>
  ({
    type: types.FETCH_SEIKATSUKAIGO_DAILY_SUMMARY_FAILED,
    error: err
  } as const);
export const unsetSEIKATSUKAIGODailySummary = () =>
  ({ type: types.UNSET_SEIKATSUKAIGO_DAILY_SUMMARY } as const);

export const fetchSEIKATSUKAIGOUserSummaryStarted = () =>
  ({ type: types.FETCH_SEIKATSUKAIGO_USER_SUMMARY_STARTED } as const);
export const fetchSEIKATSUKAIGOUserSummary = (
  res: types.SEIKATSUKAIGOSummary
) => ({ type: types.FETCH_SEIKATSUKAIGO_USER_SUMMARY, payload: res } as const);
export const fetchSEIKATSUKAIGOUserSummaryFailed = (err: any) =>
  ({
    type: types.FETCH_SEIKATSUKAIGO_USER_SUMMARY_FAILED,
    error: err
  } as const);

export const putSEIKATSUKAIGOReportStarted = () =>
  ({ type: types.PUT_SEIKATSUKAIGO_REPORT_STARTED } as const);
export const putSEIKATSUKAIGOReportDaily = (req: types.SEIKATSUKAIGOReport[]) =>
  ({ type: types.PUT_SEIKATSUKAIGO_REPORT_DAILY, payload: req } as const);
export const putSEIKATSUKAIGOReportUser = (req: types.SEIKATSUKAIGOReport[]) =>
  ({ type: types.PUT_SEIKATSUKAIGO_REPORT_USER, payload: req } as const);
export const putSEIKATSUKAIGOReportFailed = (err: any) =>
  ({ type: types.PUT_SEIKATSUKAIGO_REPORT_FAILED, error: err } as const);

export const postSEIKATSUKAIGOInOutAllRecordStarted = () =>
  ({
    type: types.POST_SEIKATSUKAIGO_IN_OUT_ALL_REPORT_STARTED
  } as const);
export const postSEIKATSUKAIGOInOutAllRecord = (
  req: types.SEIKATSUKAIGOReportAdditionsDaily
) =>
  ({
    type: types.POST_SEIKATSUKAIGO_IN_OUT_ALL_REPORT,
    payload: req
  } as const);
export const postSEIKATSUKAIGOInOutAllRecordFailed = (err: any) =>
  ({
    type: types.POST_SEIKATSUKAIGO_IN_OUT_ALL_REPORT_FAILED,
    error: err
  } as const);

export type ActionTypes =
  | ReturnType<typeof fetchSEIKATSUKAIGODailyStarted>
  | ReturnType<typeof fetchSEIKATSUKAIGODaily>
  | ReturnType<typeof fetchSEIKATSUKAIGODailyFailed>
  | ReturnType<typeof fetchSEIKATSUKAIGOUserStarted>
  | ReturnType<typeof fetchSEIKATSUKAIGOUser>
  | ReturnType<typeof fetchSEIKATSUKAIGOUserFailed>
  | ReturnType<typeof fetchDailySummaryStarted>
  | ReturnType<typeof fetchDailySummary>
  | ReturnType<typeof fetchDailySummaryFailed>
  | ReturnType<typeof fetchSEIKATSUKAIGOUserSummaryStarted>
  | ReturnType<typeof fetchSEIKATSUKAIGOUserSummary>
  | ReturnType<typeof fetchSEIKATSUKAIGOUserSummaryFailed>
  | ReturnType<typeof putSEIKATSUKAIGOReportStarted>
  | ReturnType<typeof putSEIKATSUKAIGOReportDaily>
  | ReturnType<typeof putSEIKATSUKAIGOReportFailed>
  | ReturnType<typeof putSEIKATSUKAIGOReportUser>
  | ReturnType<typeof postSEIKATSUKAIGOInOutAllRecordStarted>
  | ReturnType<typeof postSEIKATSUKAIGOInOutAllRecord>
  | ReturnType<typeof postSEIKATSUKAIGOInOutAllRecordFailed>
  | ReturnType<typeof unsetSEIKATSUKAIGODailySummary>;
