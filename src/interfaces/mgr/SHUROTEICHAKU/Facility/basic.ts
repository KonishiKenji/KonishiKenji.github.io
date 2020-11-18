/**
 * 事業所情報: 基本情報
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import {
  InputValue,
  SelectValue,
  CheckBoxValue,
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
  postalCode: InputValue;
  prefectureId: SelectValue;
  cityId: SelectValue;
  restAddress: InputValue;
  tel: InputValue;
  numberOfUsers: InputValue;
  masterSubordinateFlg: CheckBoxValue;
  masterFlg: RadioButtonValue;
  multiFunctionOfficeFlag: CheckBoxValue;
  allCapacity: InputValue;
}

type Errors = ValidationErrors<Fields>;

export type BasicValues = Base<Fields>;
export type BasicErrors = Base<Errors>;
