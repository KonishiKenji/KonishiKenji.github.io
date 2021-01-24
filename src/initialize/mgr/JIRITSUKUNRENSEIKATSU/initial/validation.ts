import {
  InitialDataValues,
  InitialDataErrors
} from "@interfaces/mgr/JIRITSUKUNRENSEIKATSU/initial/initialData";
import validator, { dateValidator, validateSwitcher } from "@validator";
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

// 年月日が全て空文字かどうか判定する
const isAllEmptyDate = (value: SelectDateValue): boolean => {
  return value.year === "" && value.month === "" && value.day === "";
};

const initialDataValidation = (
  values: InitialDataValues
): InitialDataErrors => {
  // first_time_bill_dateのフォーム値は日にちの情報を持たない為
  // 1日をdefaultで設定する
  values.initialData.facility.first_time_bill_date.day = "1";
  const validatedUsers = values.initialData.users.map(user => {
    const socialdDate = notSelectedDateToEmpty(
      user.users_in_facility_jiritsukunren_seikatsu
        .social_life_support_start_date
    );
    const visitDate = notSelectedDateToEmpty(
      user.users_in_facility_jiritsukunren_seikatsu.visit_start_date
    );
    return {
      users_in_facility_jiritsukunren_seikatsu: {
        social_life_support_start_date: validateSwitcher(
          !isAllEmptyDate(socialdDate),
          dateValidator(socialdDate, "required")
        ),
        visit_start_date: validateSwitcher(
          !isAllEmptyDate(visitDate),
          dateValidator(visitDate, "required")
        )
      }
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
