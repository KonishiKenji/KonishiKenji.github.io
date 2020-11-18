export const SET_EDIT = "PAGES/RECORD/MONTHLY/SET_EDIT";
export const UNSET_EDIT = "PAGES/RECORD/MONTHLY/UNSET_EDIT";

export interface RecordMonthlyState {
  isEditing: boolean;
  targetDate: string;
}
