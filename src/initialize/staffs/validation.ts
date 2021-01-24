import { StaffValues } from "./initialValues";
import validator, { validateSwitcher } from "@validator";
import ValidationErrors from "@interfaces/ui/validationErrors";

interface StaffFields {
  staffs: {
    roleName: string;
    workName: string;
    delete: boolean;
  }[];
}

const validation = (values: StaffValues): ValidationErrors<StaffFields> => {
  return {
    staffs: values.staffs.map((staff) => {
      return {
        roleName: validateSwitcher(
          !staff.delete && (!!staff.staffItemId || !!staff.staffName),
          validator(staff.roleName, "required")
        ),
        staffName: validateSwitcher(
          !staff.delete && !!staff.roleName,
          validator(staff.staffName, "required")
        )
      };
    })
  };
};

export default validation;
