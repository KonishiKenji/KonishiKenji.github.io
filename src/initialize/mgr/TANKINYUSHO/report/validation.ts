import { InitialDataValues } from "./initialValues";
import validator from "@validator";
import { InitialErrors } from "@interfaces/mgr/TANKINYUSHO/report/initial";

type InitialDataErrors = InitialErrors;

export const submitValidation = (
  validationResult?: InitialDataErrors
): boolean => {
  if (validationResult !== undefined) {
    return !(validationResult.initial.remarks === undefined);
  }
  return false;
};

const initialValidation = (values: InitialDataValues): InitialErrors => {
  return {
    initial: {
      remarks: validator(values.initial.remarks, {
        type: "checkCharacterLength",
        length: 50
      })
    }
  };
};

const validation = (values: InitialDataValues): InitialDataErrors => {
  return { ...initialValidation(values) };
};

export default validation;
