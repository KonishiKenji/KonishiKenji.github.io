/**
 * 事業者情報: 加算対象項目
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import {
  InputValue,
  RadioButtonValue,
  CheckBoxValue,
  SwitchValue,
  SelectValue
} from "@interfaces/ui/form";

interface Base<T> {
  additionalItem: T;
}

interface Fields {
  staffPlacementType: RadioButtonValue;
  welfareSpecialistPlacementType: RadioButtonValue;
  staffTreatmentSystemType: RadioButtonValue;
  staffTreatmentSpecificSystemType: RadioButtonValue;
  nursingStaffPlacementSystemFlag: RadioButtonValue;
  nightSupportFlag: SwitchValue;
  averageUsersLastYear: InputValue;
  nightStaffAllocationSystemFlag: CheckBoxValue;
  commuterLifeSupportFlag: CheckBoxValue;
  visualAuditoryLanguageDisabledPeopleSupportSystemFlag: CheckBoxValue;
  nightSupportType: SelectValue;
}

type Errors = ValidationErrors<Fields>;

export type AdditionalItemValues = Base<Fields>;
export type AdditionalItemErrors = Base<Errors>;
