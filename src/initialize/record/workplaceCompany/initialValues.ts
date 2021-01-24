import { dateToSelectDateValue } from "@utils/date";
import {
  InputValue,
  MultipleSelectValue,
  SelectDateValue
} from "@interfaces/ui/form";
import { DEFAULT_SELECT_VALUE } from "@constants/variables";

import { GetWorkplaceCompanyResponse } from "@api/requests/offsiteWork/getWorkplaceCompany";

export interface WorkplaceCompanyValues {
  id: InputValue;
  name: InputValue;
  address: InputValue;
  postal_code: InputValue;
  prefecture_name: InputValue;
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

const initialValues = (
  values: GetWorkplaceCompanyResponse["data"]
): WorkplaceCompanyValues => {
  const init = {
    id: "",
    name: "",
    address: "",
    postal_code: "",
    prefecture_name: DEFAULT_SELECT_VALUE,
    city_id: DEFAULT_SELECT_VALUE,
    tel: "",
    contract_begin_date: { year: "", month: "", day: "" },
    contract_end_date: { year: "", month: "", day: "" },
    working_day: "",
    working_time: "",
    working_description: "",
    other: "",
    remarks:
      "※ 本報告書は、就労先企業と市区町村ごとに作成するものとし、施設外就労を行った翌月に、該当市区町村の指定通りに提出または保管を行ってください。なお、新たに施設外就労を開始した利用者の場合は、該当市区町村に必要書類や申請フロー等をお問い合わせください。",
    users_in_facility_workplace_company: values.users_in_facility
      .filter((u) => u.is_checked)
      .map((u) => `${u.users_in_facility_id}`)
  };
  const newValues = {
    ...values.workplace_company,
    ...{
      city_id: values.workplace_company.city_id
        ? `${values.workplace_company.city_id}`
        : DEFAULT_SELECT_VALUE,
      contract_begin_date: dateToSelectDateValue(
        values.workplace_company.contract_begin_date || ""
      ),
      contract_end_date: dateToSelectDateValue(
        values.workplace_company.contract_end_date || ""
      )
    }
  };
  return {
    ...init,
    ...newValues,
    ...{ id: `${values.workplace_company.id || ""}` }
  };
};

export default initialValues;
