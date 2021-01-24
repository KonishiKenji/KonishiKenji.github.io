import * as types from "./types";

export const setEdit = (inoutId?: number) =>
  ({ type: types.SET_EDIT, payload: inoutId || null } as const);
export const unsetEdit = () => ({ type: types.UNSET_EDIT } as const);
export const setCalendarDate = (date: Date) =>
  ({ type: types.SET_CALENDAR_DATE, payload: date } as const);
export const unsetCalendarDate = () =>
  ({ type: types.UNSET_CALENDAR_DATE } as const);

export type ActionTypes =
  | ReturnType<typeof setEdit>
  | ReturnType<typeof unsetEdit>
  | ReturnType<typeof setCalendarDate>
  | ReturnType<typeof unsetCalendarDate>;
