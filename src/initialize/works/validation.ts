import { WorkValues } from "./initialValues";
import validator, { validateSwitcher } from "@validator";
import ValidationErrors from "@interfaces/ui/validationErrors";
import { DEFAULT_SELECT_VALUE } from "@constants/variables";

interface WorkFields {
  works: {
    categoryId: string;
    workName: string;
  }[];
}

const validation = (values: WorkValues): ValidationErrors<WorkFields> => {
  return {
    works: values.works.map((work) => {
      return {
        categoryId: validateSwitcher(
          !!work.workItemId || !!work.workName,
          validator(work.categoryId, {
            type: "selectRequired",
            value: DEFAULT_SELECT_VALUE
          })
        ),
        workName: validateSwitcher(
          work.categoryId !== DEFAULT_SELECT_VALUE,
          validator(work.workName, "required")
        )
      };
    })
  };
};

export default validation;
