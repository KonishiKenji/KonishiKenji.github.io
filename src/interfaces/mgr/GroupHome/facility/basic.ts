/**
 * 事業所情報: 基本情報
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import {
  InputValue,
  SelectValue,
  CheckBoxValue,
  SwitchValue
} from "@interfaces/ui/form";

interface Base<T> {
  basic: T;
}

interface Fields {
  corporationName: InputValue;
  officeNumber: InputValue;
  officeName: InputValue;
  serviceType: InputValue;
  groupHomeType: InputValue;
  representativeName: InputValue;
  capacity: InputValue;
  multiFunctionOfficeFlag: CheckBoxValue;
  postalCode: InputValue;
  prefectureId: SelectValue;
  cityId: SelectValue;
  restAddress: InputValue;
  tel: InputValue;
  operatingUnitFlag: SwitchValue;
}

type Errors = ValidationErrors<Fields>;

export type BasicValues = Base<Fields>;
export type BasicErrors = Base<Errors>;
