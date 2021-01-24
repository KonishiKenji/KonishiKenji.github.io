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
  welfareSpecialistPlacementType: RadioButtonValue;
  nursingSupporterFlag: CheckBoxValue;
  staffTreatmentSystemType: RadioButtonValue;
  staffTreatmentSpecificSystemType: RadioButtonValue;
  commuterLifeSupportFlag: CheckBoxValue;
  employmentTransitionSupportFlag: SwitchValue;
  continuationPersonLastYear: SelectValue;
  numberOfContinuators: InputValue;
  visualAuditoryLanguageDisabledPeopleSupportSystemFlag: CheckBoxValue;
  shortStayType: RadioButtonValue;
  supportForMentallyIllDisChargeSystemType: RadioButtonValue;
}

type Errors = ValidationErrors<Fields>;

export type AdditionalItemValues = Base<Fields>;
export type AdditionalItemErrors = Base<Errors>;
