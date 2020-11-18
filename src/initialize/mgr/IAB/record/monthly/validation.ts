import { RecordMonthlyValues } from "@initialize/mgr/IAB/record/monthly/initialValues";
import ValidationErrors from "@interfaces/ui/validationErrors";
import validator, { validateSwitcher } from "@validator";

interface RecordMonthlyErrors {
  operation: ValidationErrors<RecordMonthlyValues["operation"]>;
}
const Validation = (values: RecordMonthlyValues): RecordMonthlyErrors => {
  return {
    operation: [
      {
        workplace_company: values.operation[0].workplace_company
          ? values.operation[0].workplace_company.map((workplaceCompany) => ({
              staffs: workplaceCompany.staffs
                ? workplaceCompany.staffs.map((staff) => {
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
                : []
            }))
          : []
      }
    ]
  };
};

export default Validation;
