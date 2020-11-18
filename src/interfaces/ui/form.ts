export type InputValue = string;

export type SelectValue = string;

export type RadioButtonValue = string;

export type CheckBoxValue = boolean;

export type SwitchValue = boolean;

export type MultipleSelectValue = string[];

export type ShotMultipleSelectValue = {
  category_id: number;
  id: string | number;
  label: string;
  is_delete: number | null;
}[];

export interface SelectDateValue {
  year: string;
  month: string;
  day: string;
}

export interface FieldItem {
  label: string;
  value: string | number;
  disabled?: boolean;
  deleteFlg?: boolean;
}

export interface CategorizedFieldItem {
  categoryId?: number;
  categoryName: string;
  items: FieldItem[];
}
