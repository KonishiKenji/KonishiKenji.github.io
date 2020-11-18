/**
 * 事業者情報: 加算対象項目
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import {
  RadioButtonValue,
  CheckBoxValue,
  SwitchValue,
  SelectValue,
  SelectDateValue,
  InputValue
} from "@interfaces/ui/form";

interface Base<T> {
  additionalItem: T;
}

interface Fields {
  staffPlacementType: RadioButtonValue;
  welfareSpecialistPlacementType: RadioButtonValue;
  staffTreatmentSystemType: RadioButtonValue;
  staffTreatmentSpecificSystemType: RadioButtonValue;
  commuterLifeSupportFlag: CheckBoxValue;
  visualAuditoryLanguageDisabledPeopleSupportSystemFlag: CheckBoxValue;
  employmentTransitionSupportFlag: SwitchValue;
  continuationPersonLaseYear: SelectValue;
  numberOfContinuations: InputValue;
  postEmploymentRetentionRateType: RadioButtonValue;
  averageDailyWorkingHoursOfUsersType: RadioButtonValue;
  monthlyAverageWageType: RadioButtonValue;
  employmentSupportTrainingCompletionFlag: CheckBoxValue;
  severeSupportType: RadioButtonValue;
  dischargeSupportFacilityType: RadioButtonValue;
  wageUpStartDate: SelectDateValue;
  wageUpEndDate: SelectDateValue;
  targetWageTeacherStartDate: SelectDateValue;
  targetWageTeacherEndDate: SelectDateValue;
}

type Errors = ValidationErrors<Fields>;

export type AdditionalItemValues = Base<Fields>;
export type AdditionalItemErrors = Base<Errors>;
