import * as types from "./types";

export const setOffsiteWorkMonth = (date: string) =>
  ({ date, type: types.SET_OFFICE_WORK_MONTH_DATE } as const);

export type ActionTypes = ReturnType<typeof setOffsiteWorkMonth>;
