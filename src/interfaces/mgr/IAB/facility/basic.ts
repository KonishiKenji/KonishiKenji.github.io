/**
 * 事業所情報: 基本情報
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import {
  InputValue,
  SelectValue,
  CheckBoxValue,
  SwitchValue,
  RadioButtonValue
} from "@interfaces/ui/form";

interface Base<T> {
  basic: T;
}

interface Fields {
  corporationName: InputValue;
  officeNumber: InputValue;
  officeName: InputValue;
  serviceType: InputValue;
  representativeName: InputValue;
  capacity: InputValue;
  masterSubordinateFlg: SwitchValue;
  masterFlg: RadioButtonValue;
  multiFunctionOfficeFlag: SwitchValue;
  allCapacity: InputValue;
  postalCode: InputValue;
  prefectureId: SelectValue;
  cityId: SelectValue;
  restAddress: InputValue;
  tel: InputValue;
  aExecuteMeasuresForLoadReductionFlag: SwitchValue;
  yenOfLoadReduction: InputValue;
  percentOfLoadReduction: InputValue;
  loadReductionType: SelectValue;
  mealSaservedServiceFlag: CheckBoxValue;
  transferServiceFlag: SwitchValue;
  transferServiceType: SelectValue;
}

type Errors = ValidationErrors<Fields>;

export type BasicValues = Base<Fields>;
export type BasicErrors = Base<Errors>;
