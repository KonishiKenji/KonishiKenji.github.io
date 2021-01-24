import { RecordSupportPlanValues } from "./initialValues";
import ValidationErrors from "@interfaces/ui/validationErrors";
import validator, {
  dateValidator,
  ErrorMessage,
  Rule,
  validateSwitcher
} from "@validator";

type SupportPlanGoalErrorMessage = {
  sprint_goal: ErrorMessage;
  adopt_info: ErrorMessage;
  support_info: ErrorMessage;
  sprint_review: ErrorMessage;
  sprint_user_review: ErrorMessage;
  sprint_staff_review: ErrorMessage;
};

type SupportPlanProgramErrorMessage = {
  scheduled_time: ErrorMessage;
  service_content: ErrorMessage;
};

const validation = (
  values: RecordSupportPlanValues
): ValidationErrors<RecordSupportPlanValues> => {
  const lengthRule = (length: number): Rule => ({
    type: "checkCharacterLength",
    length
  });
  const validateSupportPlanGoal = (
    goal: RecordSupportPlanValues["support_plan_goal"]
  ): SupportPlanGoalErrorMessage[] => {
    return goal.map((g) => {
      return {
        sprint_goal: validator(g.sprint_goal, lengthRule(2500)),
        adopt_info: validator(g.adopt_info, lengthRule(2500)),
        support_info: validator(g.support_info, lengthRule(2500)),
        sprint_review: validator(g.sprint_review, lengthRule(2500)),
        sprint_user_review: validator(g.sprint_user_review, lengthRule(2500)),
        sprint_staff_review: validator(g.sprint_staff_review, lengthRule(2500))
      };
    });
  };
  const validateSupportPlanProgram = (
    program: RecordSupportPlanValues["support_plan_program"]
  ): SupportPlanProgramErrorMessage[] => {
    return program.map((p) => {
      return {
        scheduled_time: validator(p.scheduled_time, lengthRule(250)),
        service_content: validator(p.service_content, lengthRule(2500))
      };
    });
  };
  return {
    creation_date: dateValidator(values.creation_date, "required"),
    support_begin_date: dateValidator(values.support_begin_date, "required"),
    support_end_date: dateValidator(values.support_end_date, "required", {
      type: "future",
      startDate: values.support_begin_date
    }),
    details: validator(values.details, lengthRule(2500)),
    user_request_text: validator(values.user_request_text, lengthRule(2500)),
    income_status: validator(values.income_status, lengthRule(2500)),
    user_issue: validator(values.user_issue, lengthRule(2500)),
    physical_condition: validator(values.physical_condition, lengthRule(2500)),
    risk_factor: validator(values.risk_factor, lengthRule(2500)),
    after_summary: validator(values.after_summary, lengthRule(2500)),
    current_status: validator(values.current_status, lengthRule(2500)),
    support_plan_goal: validateSupportPlanGoal(values.support_plan_goal),
    support_plan_program: validateSupportPlanProgram(
      values.support_plan_program
    ),
    remarks: validator(values.remarks, lengthRule(2500)),
    staff_comment: validator(values.staff_comment, lengthRule(2500)),
    minutes: validator(values.minutes, lengthRule(2500)),
    evaluation_minutes: validator(values.evaluation_minutes, lengthRule(2500)),
    authorizer: validateSwitcher(
      values.status_type === "1",
      validator(values.authorizer, "required")
    )
  };
};

export default validation;
