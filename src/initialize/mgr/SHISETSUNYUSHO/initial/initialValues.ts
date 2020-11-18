import { InitialState } from "@stores/domain/mgr/SHISETSUNYUSHO/initial/types";
import { dateToSelectDateValue } from "@utils/date";
import { InitialDataValues } from "@interfaces/mgr/SHISETSUNYUSHO/initial/initialData";
import { SelectDateValue } from "@interfaces/ui/form";

const initialValues = (state?: InitialState): InitialDataValues => {
  const facility = state && state.facility ? state.facility : {};
  const users = state && state.users ? state.users : [{}];
  const initializedUsers = users.map(user => {
    const uifSHISETSUNYUSHO = user.users_in_facility_shisetsunyusho
      ? user.users_in_facility_shisetsunyusho
      : {};
    return {
      users_in_facility_shisetsunyusho: {
        severe_disability_support2_start_date: emptyToNotSelected(
          dateToSelectDateValue(
            undefinedStringReturnValue(
              "",
              uifSHISETSUNYUSHO.severe_disability_support2_start_date
            )
          )
        )
      }
    };
  });

  return {
    initialData: {
      facility: {
        first_time_bill_date: emptyToNotSelected(
          dateToSelectDateValue(
            undefinedStringReturnValue("", facility.first_time_bill_date)
          )
        ),
        total_number_of_users_1_month_before: undefinedNumberReturnValue(
          "",
          facility.total_number_of_users_1_month_before
        ),
        total_number_of_users_2_month_before: undefinedNumberReturnValue(
          "",
          facility.total_number_of_users_2_month_before
        ),
        total_number_of_users_3_month_before: undefinedNumberReturnValue(
          "",
          facility.total_number_of_users_3_month_before
        )
      },
      users: initializedUsers
    }
  };
};

/**
 * ""を"NOT_SELECTED"に変換
 */
const emptyToNotSelected = (value: SelectDateValue): SelectDateValue => {
  const date = {
    year: value.year === "" ? "NOT_SELECTED" : value.year,
    month: value.month,
    day: value.day
  };
  return date;
};

/**
 * Undefinedを含むstringの値を指定した値へ変換
 */
const undefinedStringReturnValue = (
  returnValue: string,
  value?: string | null
) => {
  if (value === null || value === undefined) {
    return returnValue;
  }
  return value;
};

/**
 * Undefinedを含むnumberの値を指定した値へ変換
 */
const undefinedNumberReturnValue = (
  returnValue: string,
  value?: number | null
) => {
  if (value === null || value === undefined) {
    return returnValue;
  }
  return `${value}`;
};

export default initialValues;
