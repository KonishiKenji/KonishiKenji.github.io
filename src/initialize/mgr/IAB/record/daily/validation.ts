import { RecordDailyValues } from "./initialValues";
import ValidationErrors from "@interfaces/ui/validationErrors";
import validator, { validateSwitcher } from "@validator";

interface RecordDailyErrors {
  operation: ValidationErrors<RecordDailyValues["operation"]>;
  support: ValidationErrors<RecordDailyValues["support"]>;
}

const validation = (values: RecordDailyValues): RecordDailyErrors => {
  return {
    operation: {
      workplace_company: values.operation.workplace_company.map((company) => ({
        staffs: company.staffs.map((staff) => {
          return {
            working_hours: validateSwitcher(
              !!staff.staffs_in_facility_id,
              validator(
                `${staff.working_hours}`,
                "required",
                "decimal",
                {
                  type: "upperLimitDecimal",
                  upperLimitDecimal: 24.0
                },
                {
                  type: "lowerLimitDecimal",
                  lowerLimitDecimal: 0.1
                }
              )
            )
          };
        })
      }))
    },
    support: values.support
      ? values.support.map((sup) => ({
          interview_start_time: validateSwitcher(
            `${sup.interview_flg}` === "1",
            validator(sup.interview_start_time || "", "checkTime")
          ),
          interview_end_time: validateSwitcher(
            `${sup.interview_flg}` === "1",
            validator(sup.interview_end_time || "", "checkTime", {
              type: "checkTimeFuture",
              startTime: sup.interview_start_time,
              options: { firstLabel: "終了", secondLabel: "開始" }
            })
          )
        }))
      : []
  };
};

export default validation;
