import {
  InputValue,
  SelectDateValue,
  MultipleSelectValue
} from "@interfaces/ui/form";
import ValidationErrors from "@interfaces/ui/validationErrors";

interface Base<T> {
  initial: T;
}

interface Fields {
  id: InputValue;
  name: InputValue;
  address: InputValue;
  postal_code: InputValue;
  city_id: InputValue;
  tel: InputValue;
  contract_begin_date: SelectDateValue;
  contract_end_date: SelectDateValue;
  working_day: InputValue;
  working_time: InputValue;
  working_description: InputValue;
  other: InputValue;
  remarks: InputValue;
  users_in_facility_workplace_company: MultipleSelectValue;
}

type Errors = ValidationErrors<Fields>;

export type InitialValues = Base<Fields>;
export type InitialErrors = Base<Errors>;
