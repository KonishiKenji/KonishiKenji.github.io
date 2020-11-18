export const SET_EDIT = "PAGES/RECORD/USER_DETAIL/SET_EDIT";
export const UNSET_EDIT = "PAGES/RECORD/USER_DETAIL/UNSET_EDIT";
export const SET_CALENDAR_DATE = "PAGES/RECORD/USER_DETAIL/SET_CALENDAR_DATE";
export const UNSET_CALENDAR_DATE =
  "PAGES/RECORD/USER_DETAIL/UNSET_CALENDAR_DATE";

export interface RecordUserDetailState {
  isEditing: boolean;
  isEditingInoutId: number | null; // 個別編集時の判定用
  calendarDate: Date | null;
}
