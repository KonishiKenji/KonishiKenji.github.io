/**
 * 利用者情報: 基本情報
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import {
  InputValue,
  SelectValue,
  CheckBoxValue,
  RadioButtonValue,
  SelectDateValue
} from "@interfaces/ui/form";

interface Base<T> {
  basic: T;
}

interface Fields {
  nameSei: InputValue;
  nameMei: InputValue;
  nameSeiKana: InputValue;
  nameMeiKana: InputValue;
  recipientNumber: InputValue;
  noneRecipientNumberFlag: CheckBoxValue;
  gender: RadioButtonValue;
  classifyPhysicalFlag: CheckBoxValue;
  classifyIntelligenceFlag: CheckBoxValue;
  classifyMindFlag: CheckBoxValue;
  classifyGrowthFlag: CheckBoxValue;
  classifyBrainFlag: CheckBoxValue;
  classifyIncurableFlag: CheckBoxValue;
  dateOfBirth: SelectDateValue;
  postalCode: InputValue;
  prefectureId: SelectValue;
  cityId: SelectValue;
  restAddress: InputValue;
  tel: InputValue;
  email: InputValue;
  guardianName: InputValue;
  guardianRelation: InputValue;
  guardianTel: InputValue;
  memo: InputValue;
}

type Errors = ValidationErrors<Fields>;

export type BasicValues = Base<Fields>;
export type BasicErrors = Base<Errors>;
