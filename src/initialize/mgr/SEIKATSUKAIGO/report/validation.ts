import { InitialDataValues } from "./initialValues";
import validator from "@validator";
import { InitialErrors } from "@interfaces/mgr/SEIKATSUKAIGO/report/initial";

type InitialDataErrors = InitialErrors;

export const submitValidation = (
  status: string,
  validationResult?: InitialDataErrors
): boolean => {
  if (validationResult !== undefined) {
    return !(
      validationResult.initial.memo === undefined &&
      validationResult.initial.inTime === undefined &&
      validationResult.initial.outTime === undefined &&
      validationResult.initial.travelTime === undefined
    );
  }
  return false;
};

const initialValidation = (values: InitialDataValues): InitialErrors => {
  return {
    initial: {
      trialUsageKind: validator(values.initial.trialUsageKind, "required"),
      memo: validator(values.initial.memo, {
        type: "checkCharacterLength",
        length: 50
      })
    }
  };
};

const validationIncludedTime = (values: InitialDataValues): InitialErrors => {
  return {
    initial: {
      trialUsageKind: validator(values.initial.trialUsageKind, "required"),
      inTime: validator(values.initial.inTime, "required", "checkTime"),
      outTime: validator(values.initial.outTime, "checkTime", {
        type: "checkTimeFuture",
        startTime: values.initial.inTime
      }),
      memo: validator(values.initial.memo, {
        type: "checkCharacterLength",
        length: 50
      })
    }
  };
};

const validation = (values: InitialDataValues): InitialDataErrors => {
  let initialErrors;

  // 通所、訪問の場合、時間チェック
  if (values.initial.status === "2" || values.initial.status === "6") {
    initialErrors = validationIncludedTime(values);
  } else {
    initialErrors = initialValidation(values);
  }

  return { ...initialErrors };
};

export default validation;
