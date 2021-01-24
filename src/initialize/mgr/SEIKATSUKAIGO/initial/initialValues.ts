import { InitialState } from "@stores/domain/mgr/SEIKATSUKAIGO/initial/types";
import { dateToSelectDateValue } from "@utils/date";
import { InitialDataValues } from "@interfaces/mgr/SEIKATSUKAIGO/initial/initialData";
import { SelectDateValue } from "@interfaces/ui/form";

const initialValues = (state?: InitialState): InitialDataValues => {
  const facility = state && state.facility ? state.facility : {};
  const users = state && state.users ? state.users : [{}];
  const initializedUsers = users.map(user => {
    const uifSEIKATSUKAIGO = user.users_in_facility_seikatsukaigo
      ? user.users_in_facility_seikatsukaigo
      : {};
    return {
      users_in_facility_seikatsukaigo: {
        severe_disability_support_start_date: emptyToNotSelected(
          dateToSelectDateValue(
            undefinedStringReturnValue(
              uifSEIKATSUKAIGO.severe_disability_support_start_date,
              ""
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
            undefinedStringReturnValue(facility.first_time_bill_date, "")
          )
        ),
        total_number_of_users_1_month_before: undefinedNumberReturnValue(
          facility.total_number_of_users_1_month_before,
          ""
        ),
        total_number_of_users_2_month_before: undefinedNumberReturnValue(
          facility.total_number_of_users_2_month_before,
          ""
        ),
        total_number_of_users_3_month_before: undefinedNumberReturnValue(
          facility.total_number_of_users_3_month_before,
          ""
        )
      },
      users: initializedUsers
    }
  };
};

// ""を"NOT_SELECTED"に変換
const emptyToNotSelected = (value: SelectDateValue): SelectDateValue => {
  const date = {
    year: value.year === "" ? "NOT_SELECTED" : value.year,
    month: value.month,
    day: value.day
  };
  return date;
};

const undefinedStringReturnValue = (
  value: string | null | undefined,
  returnValue: string
) => {
  if (value === null || value === undefined) {
    return returnValue;
  }
  return value;
};

const undefinedNumberReturnValue = (
  value: number | null | undefined,
  returnValue: string
) => {
  if (value === null || value === undefined) {
    return returnValue;
  }
  return `${value}`;
};

export default initialValues;
