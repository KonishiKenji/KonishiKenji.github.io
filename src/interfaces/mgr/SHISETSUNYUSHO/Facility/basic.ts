/**
 * 事業所情報: 基本情報
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import {
  InputValue,
  SelectValue,
  SwitchValue,
  RadioButtonValue,
  CheckBoxValue
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
  masterSubordinateFlg: CheckBoxValue;
  isMasterRadioValue: RadioButtonValue;
  multiFunctionOfficeFlg: CheckBoxValue;
  allCapacity: InputValue;
  postalCode: InputValue;
  prefectureId: SelectValue;
  cityId: SelectValue;
  restAddress: InputValue;
  tel: InputValue;
  availableFood: SwitchValue;
  foodExpenses: RadioButtonValue;
  foodExpensesBreakfast: InputValue;
  foodExpensesLunch: InputValue;
  foodExpensesSupper: InputValue;
  foodExpensesDay: InputValue;
  utility: RadioButtonValue;
  utilityCosts: InputValue;
}

type Errors = ValidationErrors<Fields>;

export type BasicValues = Base<Fields>;
export type BasicErrors = Base<Errors>;
