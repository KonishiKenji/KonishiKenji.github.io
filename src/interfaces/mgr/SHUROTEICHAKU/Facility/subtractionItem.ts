/**
 * 事業者情報: 減算対象項目
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import {
  SwitchValue,
  SelectDateValue,
  RadioButtonValue
} from "@interfaces/ui/form";

interface Base<T> {
  subtractionItem: T;
}

interface Fields {
  rateGetJob: RadioButtonValue;
  lackFlag: SwitchValue;
  lackOfLifeSupportMemberFlag: SwitchValue;
  lackOfLifeSupportMemberStartDate: SelectDateValue;
  lackOfResponsiblePersonFlag: SwitchValue;
  lackOfResponsiblePersonStartDate: SelectDateValue;
}

type Errors = ValidationErrors<Fields>;

export type SubtractionItemValues = Base<Fields>;
export type SubtractionItemErrors = Base<Errors>;
