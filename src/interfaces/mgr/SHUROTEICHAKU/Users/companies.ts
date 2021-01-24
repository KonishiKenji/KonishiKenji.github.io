/**
 * 利用者情報: 就職先情報
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import {
  InputValue,
  SelectDateValue,
  SelectValue,
  SwitchValue
} from "@interfaces/ui/form";

interface Base<T> {
  companies: T;
}

interface Fields {
  name: InputValue;
  overview: InputValue;
  address: InputValue;
  workingStartDate: SelectDateValue;
  department: InputValue;
  remarks: InputValue;
  companyPersons: {
    flg: SwitchValue;
    name: InputValue;
    position: InputValue;
    department: InputValue;
    relationship: SelectValue;
    tel: InputValue;
    email: InputValue;
  }[];
}

type Errors = ValidationErrors<Fields>;

export type CompaniesValues = Base<Fields>;
export type CompaniesErrors = Base<Errors>;
