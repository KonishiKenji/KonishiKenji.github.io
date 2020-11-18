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
  facilityType: InputValue;
  representativeName: InputValue;
  capacity: InputValue;
  masterSubordinateFlg: CheckBoxValue;
  masterFlg: RadioButtonValue;
  multiFunctionOfficeFlag: CheckBoxValue;
  allCapacity: InputValue;
  postalCode: InputValue;
  prefectureId: SelectValue;
  cityId: SelectValue;
  restAddress: InputValue;
  tel: InputValue;
  mealSaservedServiceFlag: CheckBoxValue;
  transferServiceFlag: SwitchValue;
  transferServiceType: SelectValue;
}

type Errors = ValidationErrors<Fields>;

export type BasicValues = Base<Fields>;
export type BasicErrors = Base<Errors>;
