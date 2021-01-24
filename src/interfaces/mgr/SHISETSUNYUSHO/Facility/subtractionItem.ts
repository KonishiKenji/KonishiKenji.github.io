/**
 * 事業者情報: 減算対象項目
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import {
  SwitchValue,
  SelectDateValue,
  RadioButtonValue,
  CheckBoxValue
} from "@interfaces/ui/form";

interface Base<T> {
  subtractionItem: T;
}

interface Fields {
  originLocalGovFlg: CheckBoxValue;
  nutritionistPlacement: RadioButtonValue;
  lackOfSupporterFlg: SwitchValue;
  dateStartLackOfSupporter: SelectDateValue;
}

type Errors = ValidationErrors<Fields>;

export type SubtractionItemValues = Base<Fields>;
export type SubtractionItemErrors = Base<Errors>;
