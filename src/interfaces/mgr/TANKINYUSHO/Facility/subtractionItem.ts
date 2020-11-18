/**
 * 事業者情報: 減算対象項目
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import {
  CheckBoxValue,
  SelectDateValue,
  RadioButtonValue,
  SwitchValue
} from "@interfaces/ui/form";

interface Base<T> {
  subtractionItem: T;
}

interface Fields {
  facilityCombiStatus: RadioButtonValue;
  largeScaleFlg: CheckBoxValue;
  lackOfLifeSupportMemberFlag: SwitchValue;
  lackOfLifeSupportMemberStartDate: SelectDateValue;
}

type Errors = ValidationErrors<Fields>;

export type SubtractionItemValues = Base<Fields>;
export type SubtractionItemErrors = Base<Errors>;
