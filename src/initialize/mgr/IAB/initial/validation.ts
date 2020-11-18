import {
  InitialDataValues,
  InitialDataErrors
} from "@interfaces/mgr/IAB/initial/initialData";
import validator, { dateValidator } from "@validator";
import { SelectDateValue } from "@interfaces/ui/form";

// "NOT_SELECTED"がrequiredバリデーションにかからないため""に変換
const notSelectedDateToEmpty = (value: SelectDateValue): SelectDateValue => {
  const date = {
    year: value.year === "NOT_SELECTED" ? "" : value.year,
    month: value.month,
    day: value.day
  };
  return date;
};

const initialDataValidation = (
  values: InitialDataValues
): InitialDataErrors => {
  // first_time_bill_dateのフォーム値は日にちの情報を持たない為
  // 1日をdefaultで設定する
  values.initialData.facility.first_time_bill_date.day = "1";
  const validatedUsers = values.initialData.users.map(user => {
    return {
      id: validator(user.id, "required", "naturalNumber"),
      name_sei: validator(user.name_sei, "required"),
      name_mei: validator(user.name_mei, "required"),
      total_days_in_fiscal_year: validator(
        user.total_days_in_fiscal_year,
        "required",
        "naturalNumber",
        {
          type: "upperLimit",
          upperLimit: 180
        }
      )
    };
  });

  return {
    initialData: {
      facility: {
        first_time_bill_date: dateValidator(
          notSelectedDateToEmpty(
            values.initialData.facility.first_time_bill_date
          ),
          "required"
        ),
        total_number_of_users_1_month_before: validator(
          values.initialData.facility.total_number_of_users_1_month_before,
          "required",
          "naturalNumber"
        ),
        total_number_of_users_2_month_before: validator(
          values.initialData.facility.total_number_of_users_2_month_before,
          "required",
          "naturalNumber"
        ),
        total_number_of_users_3_month_before: validator(
          values.initialData.facility.total_number_of_users_3_month_before,
          "required",
          "naturalNumber"
        )
      },
      users: validatedUsers
    }
  };
};
export default initialDataValidation;
