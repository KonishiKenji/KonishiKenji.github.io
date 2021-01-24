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
    users_in_facility_tankinyusho: {
      short_term_usage_addition_start_date: SelectDateValue;
      short_term_usage_addition_count: InputValue;
    };
  }[];
}

type Errors = ValidationErrors<Fields>;

export type InitialDataValues = Base<Fields>;
export type InitialDataErrors = Base<Errors>;
