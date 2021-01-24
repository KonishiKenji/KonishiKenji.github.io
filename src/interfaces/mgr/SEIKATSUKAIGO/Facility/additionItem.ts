/**
 * 事業者情報: 加算対象項目
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import {
  RadioButtonValue,
  CheckBoxValue,
  SwitchValue,
  SelectValue,
  InputValue
} from "@interfaces/ui/form";

interface Base<T> {
  additionalItem: T;
}

interface Fields {
  staffPlacementType: RadioButtonValue;
  welfareSpecialistPlacementType: RadioButtonValue;
  fullTimeNursePlacementType: RadioButtonValue;
  staffTreatmentSystemType: RadioButtonValue;
  staffTreatmentSpecificSystemType: RadioButtonValue;
  commuterLifeSupportFlag: CheckBoxValue;
  visualAuditoryLanguageDisabledPeopleSupportSystemFlag: CheckBoxValue;
  severeFailureSupportFlag: CheckBoxValue;
  employmentTransitionSupportFlag: SwitchValue;
  continuationPersonLaseYear: SelectValue;
  numberOfContinuations: InputValue;
}

type Errors = ValidationErrors<Fields>;

export type AdditionalItemValues = Base<Fields>;
export type AdditionalItemErrors = Base<Errors>;
