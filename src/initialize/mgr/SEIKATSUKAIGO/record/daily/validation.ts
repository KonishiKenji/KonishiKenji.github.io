import { RecordDailyValues } from "./initialValues";
import ValidationErrors from "@interfaces/ui/validationErrors";
import validator, { validateSwitcher } from "@validator";

interface RecordDailyErrors {
  support: ValidationErrors<RecordDailyValues["support"]>;
}

const validation = (values: RecordDailyValues): RecordDailyErrors => {
  return {
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
