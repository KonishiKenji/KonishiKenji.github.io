import { WorkplaceCompanyValues } from "@initialize/record/workplaceCompany/initialValues";
import ValidationErrors from "@interfaces/ui/validationErrors";
import validator, { dateValidator } from "@validator";
import { DEFAULT_SELECT_VALUE } from "@constants/variables";
import { SelectDateValue } from "@interfaces/ui/form";

// "NOT_SELECTED"がrequiredバリデーションにかからないため""に変換
const notSelectedToEmpty = (value: SelectDateValue): SelectDateValue => {
  const date = {
    year: value.year === "NOT_SELECTED" ? "" : value.year,
    month: value.month,
    day: value.day
  };
  return date;
};

const validation = (
  values: WorkplaceCompanyValues
): ValidationErrors<WorkplaceCompanyValues> => {
  return {
    name: validator(values.name, "required"),
    postal_code: validator(values.postal_code, "required", "postalCode"),
    address: validator(values.address, "required"),
    prefecture_name: validator(values.prefecture_name, {
      type: "selectRequired",
      value: DEFAULT_SELECT_VALUE
    }),
    city_id: validator(values.city_id, {
      type: "selectRequired",
      value: DEFAULT_SELECT_VALUE
    }),
    tel: validator(values.tel, "required", "naturalNumber"),
    contract_begin_date: dateValidator(
      notSelectedToEmpty(values.contract_begin_date),
      "required"
    ),
    contract_end_date: dateValidator(
      notSelectedToEmpty(values.contract_end_date),
      {
        type: "future",
        startDate: values.contract_begin_date,
        options: {
          startLabel: "契約開始日",
          endLabel: "契約終了日"
        }
      }
    ),
    working_day: validator(values.working_day, "required"),
    working_time: validator(values.working_time, "required"),
    working_description: validator(values.working_description, "required")
  };
};

export default validation;
