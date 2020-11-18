/**
 * 事業者情報: 減算対象項目
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import {
  CheckBoxValue,
  SwitchValue,
  SelectDateValue
} from "@interfaces/ui/form";

interface Base<T> {
  subtractionItem: T;
}

interface Fields {
  establishedByLocalGovernmentsFlag: CheckBoxValue;
  openedOrShortTimeFlag: CheckBoxValue;
  lackFlag: SwitchValue;
  lackOfLifeSupportMemberFlag: CheckBoxValue;
  lackOfLifeSupportMemberStartDate: SelectDateValue;
  lackOfResponsiblePersonFlag: SwitchValue;
  lackOfResponsiblePersonStartDate: SelectDateValue;
  doctorInstallationFlag: CheckBoxValue;
}

type Errors = ValidationErrors<Fields>;

export type SubtractionItemValues = Base<Fields>;
export type SubtractionItemErrors = Base<Errors>;
