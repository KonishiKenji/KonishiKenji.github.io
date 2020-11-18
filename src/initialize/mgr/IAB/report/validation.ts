import { InitialDataValues } from "./initialValues";
import validator, { validateSwitcher } from "@validator";
import { InitialErrors } from "@interfaces/mgr/IAB/report/initial";
import { WorkRecordErrors } from "@interfaces/mgr/IAB/report/workRecord";
import { UserState } from "@stores/domain/user/type";
import { SERVICE_STATUS } from "@constants/variables";

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

const validationIncludedTime = (
  values: InitialDataValues,
  containsWorkRecord: boolean
): InitialErrors & WorkRecordErrors => {
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
    },
    workRecord: {
      startTime: validateSwitcher(
        containsWorkRecord && values.workRecord.worked,
        validator(values.workRecord.startTime, "required", "checkTime")
      ),
      endTime: validateSwitcher(
        containsWorkRecord && values.workRecord.worked,
        validator(values.workRecord.endTime, "checkTime", {
          type: "checkTimeFuture",
          startTime: values.workRecord.startTime
        })
      ),
      breakTime: validateSwitcher(
        containsWorkRecord && values.workRecord.worked,
        validator(
          values.workRecord.breakTime,
          { type: "upperLimit", upperLimit: 1440 },
          "naturalNumberNonZero"
        )
      )
    }
  };
};

const validationConditionalIncludedTime = (
  values: InitialDataValues,
  containsWorkRecord: boolean
): InitialErrors & WorkRecordErrors => {
  return {
    initial: {
      trialUsageKind: validator(values.initial.trialUsageKind, "required"),
      inTime: values.initial.outTime
        ? validator(values.initial.inTime, "required", "checkTime")
        : validator(values.initial.inTime, "checkTime"),
      outTime: validator(values.initial.outTime, "checkTime", {
        type: "checkTimeFuture",
        startTime: values.initial.inTime
      }),
      memo: validator(values.initial.memo, {
        type: "checkCharacterLength",
        length: 50
      })
    },
    workRecord: {
      startTime: validateSwitcher(
        containsWorkRecord && values.workRecord.worked,
        values.workRecord.endTime
          ? validator(values.workRecord.startTime, "required", "checkTime")
          : validator(values.workRecord.startTime, "checkTime")
      ),
      endTime: validateSwitcher(
        containsWorkRecord && values.workRecord.worked,
        validator(values.workRecord.endTime, "checkTime", {
          type: "checkTimeFuture",
          startTime: values.workRecord.startTime
        })
      ),
      breakTime: validateSwitcher(
        containsWorkRecord && values.workRecord.worked,
        validator(
          values.workRecord.breakTime,
          { type: "upperLimit", upperLimit: 1440 },
          "naturalNumberNonZero"
        )
      )
    }
  };
};

const validation = (
  values: InitialDataValues,
  featureGroup: UserState["featureGroup"]
): InitialDataErrors => {
  let initialErrors;

  // 通所、施設外就労、訪問の場合、時間チェック
  const checkTimeStatus = [
    SERVICE_STATUS[1].value,
    SERVICE_STATUS[2].value,
    SERVICE_STATUS[5].value
  ];
  // 施設外支援、移行準備支援Ⅰ、移行準備支援Ⅱの場合、
  const conditionalCheckTimeStatus = [
    SERVICE_STATUS[3].value,
    SERVICE_STATUS[7].value,
    SERVICE_STATUS[8].value
  ];

  // 作業記録は権限があるときだけ
  const containsWorkRecord = featureGroup.group_labor_charge === 1;

  if (checkTimeStatus.find((value) => `${value}` === values.initial.status)) {
    initialErrors = validationIncludedTime(values, containsWorkRecord);
  } else if (
    conditionalCheckTimeStatus.find(
      (value) => `${value}` === values.initial.status
    )
  ) {
    initialErrors = validationConditionalIncludedTime(
      values,
      containsWorkRecord
    );
  } else {
    initialErrors = initialValidation(values);
  }

  return { ...initialErrors };
};

export default validation;
