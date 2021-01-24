/**
 * 利用実績
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import { InputValue, CheckBoxValue } from "@interfaces/ui/form";

interface Base<T> {
  ReportData: T[];
}

interface Fields {
  // 対象年月日
  targetDate: string;
  // サービス提供の状況
  statusType: CheckBoxValue;
  // 特別地域加算
  specialAreaFlg: CheckBoxValue;
  // 備考
  remarks: InputValue;
}

type Errors = ValidationErrors<Fields>;

export type InitialDataValues = Base<Fields>;
export type InitialDataErrors = Base<Errors>;
