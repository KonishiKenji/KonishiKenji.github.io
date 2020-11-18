/**
 * 事業者情報: 加算対象項目
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import {
  RadioButtonValue,
  CheckBoxValue,
  SwitchValue
} from "@interfaces/ui/form";

interface Base<T> {
  additionalItem: T;
}

interface Fields {
  welfareSpecialistPlacementType: RadioButtonValue;
  fulltimeNursingStaffFlg: SwitchValue;
  fulltimeNursingStaff: RadioButtonValue;
  staffTreatmentSystemType: RadioButtonValue;
  staffTreatmentSpecificSystemType: RadioButtonValue;
  medicalSupportFlg: CheckBoxValue;
  dieticianFlg: SwitchValue;
  dietician: RadioButtonValue;
  seriousDisabilityFlg: CheckBoxValue;
}

type Errors = ValidationErrors<Fields>;

export type AdditionalItemValues = Base<Fields>;
export type AdditionalItemErrors = Base<Errors>;
