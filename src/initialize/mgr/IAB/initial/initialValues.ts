import { InitialState } from "@stores/domain/mgr/IAB/initial/types";
import { dateToSelectDateValue } from "@utils/date";
import { InitialDataValues } from "@interfaces/mgr/IAB/initial/initialData";
import { SelectDateValue } from "@interfaces/ui/form";
import get from "lodash-es/get";

const initialValues = (state?: InitialState): InitialDataValues => {
  const facility = state && state.facility ? state.facility : {};
  const users = state && state.users ? state.users : [];
  const initializedUsers = users.map(user => {
    const fiscalYear = user.total_days_in_fiscal_year;
    return {
      id: `${get(user, "id")}` || "",
      name_sei: get(user, "name_sei") || "",
      name_mei: get(user, "name_mei") || "",
      total_days_in_fiscal_year:
        typeof fiscalYear === "number" ? `${fiscalYear}` : "0"
    };
  });

  const oneMonthBefore = facility.total_number_of_users_1_month_before;
  const twoMonthBefore = facility.total_number_of_users_2_month_before;
  const threeMonthBefore = facility.total_number_of_users_3_month_before;
  return {
    initialData: {
      facility: {
        first_time_bill_date: emptyToNotSelected(
          dateToSelectDateValue(get(facility, "first_time_bill_date") || "")
        ),
        total_number_of_users_1_month_before:
          typeof oneMonthBefore === "number" ? `${oneMonthBefore}` : "",
        total_number_of_users_2_month_before:
          typeof twoMonthBefore === "number" ? `${twoMonthBefore}` : "",
        total_number_of_users_3_month_before:
          typeof threeMonthBefore === "number" ? `${threeMonthBefore}` : ""
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

export default initialValues;
