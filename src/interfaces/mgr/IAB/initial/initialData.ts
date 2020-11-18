/**
 * 初期設定情報
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import { InputValue, SelectDateValue } from "@interfaces/ui/form";

interface Base<T> {
  initialData: T;
}

interface Fields {
  facility: {
    first_time_bill_date: SelectDateValue;
    total_number_of_users_1_month_before: InputValue;
    total_number_of_users_2_month_before: InputValue;
    total_number_of_users_3_month_before: InputValue;
  };
  users: {
    id: InputValue;
    name_sei: InputValue;
    name_mei: InputValue;
    total_days_in_fiscal_year: InputValue;
  }[];
}

type Errors = ValidationErrors<Fields>;

export type InitialDataValues = Base<Fields>;
export type InitialDataErrors = Base<Errors>;
