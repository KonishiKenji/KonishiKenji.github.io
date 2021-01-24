/**
 * 事業者情報: 加算対象項目
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import { RadioButtonValue, CheckBoxValue } from "@interfaces/ui/form";

interface Base<T> {
  additionalItem: T;
}

interface Fields {
  nighttimePlacement: RadioButtonValue;
  seeHearTeamFlg: CheckBoxValue;
  regionalLifeTransition: CheckBoxValue;
  nutritionManagementFlg: CheckBoxValue;
  staffTreatmentSystemType: RadioButtonValue;
  staffTreatmentSpecificSystemType: RadioButtonValue;
  seriousDisability: RadioButtonValue;
}

type Errors = ValidationErrors<Fields>;

export type AdditionalItemValues = Base<Fields>;
export type AdditionalItemErrors = Base<Errors>;
