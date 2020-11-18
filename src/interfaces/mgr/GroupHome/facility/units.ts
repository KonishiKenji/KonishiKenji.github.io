/**
 * ユニット対応:
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import { InputValue, SelectValue, CheckBoxValue } from "@interfaces/ui/form";

interface Base<T> {
  units: T;
}

type Fields = {
  id: number | null; // 運営ユニットID(編集不可)
  unit_name: InputValue; // 運営ユニット名
  night_support_type: SelectValue; // 夜間支援体制加算（設定値）
  ave_users_last_fiscal_year: InputValue; // 前年度の平均実績
  is_deleted: CheckBoxValue; // 削除フラグ
}[];

type Errors = ValidationErrors<Fields[0]>[];

export type UnitsValues = Base<Fields>;
export type UnitsErrors = Base<Errors>;
