import { InitialState } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/initial/types";
import { dateToSelectDateValue } from "@utils/date";
import { InitialDataValues } from "@interfaces/mgr/JIRITSUKUNRENSEIKATSU/initial/initialData";
import { SelectDateValue } from "@interfaces/ui/form";

const initialValues = (state?: InitialState): InitialDataValues => {
  const facility = state && state.facility ? state.facility : {};
  const users = state && state.users ? state.users : [{}];
  const initializedUsers = users.map(user => {
    const uifJIRITSUKUNRENSEIKATSU = user.users_in_facility_jiritsukunren_seikatsu
      ? user.users_in_facility_jiritsukunren_seikatsu
      : {};
    return {
      users_in_facility_jiritsukunren_seikatsu: {
        social_life_support_start_date: emptyToNotSelected(
          dateToSelectDateValue(
            undefinedStringReturnValue(
              uifJIRITSUKUNRENSEIKATSU.social_life_support_start_date,
              ""
            )
          )
        ),
        visit_start_date: emptyToNotSelected(
          dateToSelectDateValue(
            undefinedStringReturnValue(
              uifJIRITSUKUNRENSEIKATSU.visit_start_date,
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
