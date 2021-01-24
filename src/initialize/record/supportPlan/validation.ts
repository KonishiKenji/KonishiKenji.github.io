import { RecordSupportPlanValues } from "./initialValues";
import ValidationErrors from "@interfaces/ui/validationErrors";
import validator, { dateValidator, validateSwitcher } from "@validator";

const validation = (
  values: RecordSupportPlanValues
): ValidationErrors<RecordSupportPlanValues> => {
  return {
    creation_date: dateValidator(values.creation_date, "required"),
    support_begin_date: dateValidator(values.support_begin_date, "required"),
    support_end_date: dateValidator(values.support_end_date, "required", {
      type: "future",
      startDate: values.support_begin_date
    }),
    authorizer: validateSwitcher(
      values.status_type === "1",
      validator(values.authorizer, "required")
    )
  };
};

export default validation;
