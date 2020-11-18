import { BasicErrors } from "@interfaces/mgr/SEIKATSUKAIGO/Facility/basic";
import { SubtractionItemErrors } from "@interfaces/mgr/SEIKATSUKAIGO/Facility/subtractionItem";
import { AdministrationErrors } from "@interfaces/mgr/SEIKATSUKAIGO/Facility/administration";
import { AdditionalItemErrors } from "@interfaces/mgr/SEIKATSUKAIGO/Facility/additionItem";
import { FacilityValues } from "@initialize/mgr/SEIKATSUKAIGO/facility/initialValues";
import validator, { validateSwitcher } from "@validator";
import { DEFAULT_SELECT_VALUE } from "@constants/variables";

type FacilityErrors = BasicErrors &
  AdministrationErrors &
  SubtractionItemErrors &
  AdditionalItemErrors;

const basicValidation = (values: FacilityValues): BasicErrors => {
  return {
    basic: {
      corporationName: validator(values.basic.corporationName, "required"),
      officeNumber: validator(
        values.basic.officeNumber,
        "required",
        "naturalNumber",
        { type: "checkDigits", digits: 10 }
      ),
      officeName: validator(values.basic.officeName, "required"),
      representativeName: validator(
        values.basic.representativeName,
        "required"
      ),
      capacity: validator(
        values.basic.capacity,
        "required",
        "naturalNumberNonZero",
        {
          type: "upperLimit",
          upperLimit: 999
        }
      ),
      allCapacity: validateSwitcher(
        values.basic.multiFunctionOfficeFlag,
        validator(
          values.basic.allCapacity,
          "required",
          "naturalNumberNonZero",
          {
            type: "upperLimit",
            upperLimit: 999
          }
        )
      ),
      postalCode: validator(values.basic.postalCode, "required", "postalCode"),
      prefectureId: validator(values.basic.prefectureId, {
        type: "selectRequired",
        value: DEFAULT_SELECT_VALUE
      }),
      cityId: validator(values.basic.cityId, {
        type: "selectRequired",
        value: DEFAULT_SELECT_VALUE
      }),
      restAddress: validator(values.basic.restAddress, "required"),
      tel: validator(values.basic.tel, "required", "naturalNumber"),

      transferServiceType: validateSwitcher(
        values.basic.transferServiceFlag,
        validator(values.basic.transferServiceType, {
          type: "selectRequired",
          value: DEFAULT_SELECT_VALUE
        })
      )
    }
  };
};

const administrationItemValidation = (
  values: FacilityValues
): AdministrationErrors => {
  return {
    administration: {
      mondayStartTime: validateSwitcher(
        values.administration.mondaySchedule,
        validator(
          values.administration.mondayStartTime,
          "required",
          "checkTime"
        )
      ),
      mondayEndTime: validateSwitcher(
        values.administration.mondaySchedule,
        validator(
          values.administration.mondayEndTime,
          "required",
          "checkTime",
          {
            type: "checkTimeFuture",
            startTime: values.administration.mondayStartTime,
            options: { firstLabel: "終業時間", secondLabel: "始業時間" }
          }
        )
      ),
      tuesdayStartTime: validateSwitcher(
        values.administration.tuesdaySchedule,
        validator(
          values.administration.tuesdayStartTime,
          "required",
          "checkTime"
        )
      ),
      tuesdayEndTime: validateSwitcher(
        values.administration.tuesdaySchedule,
        validator(
          values.administration.tuesdayEndTime,
          "required",
          "checkTime",
          {
            type: "checkTimeFuture",
            startTime: values.administration.tuesdayStartTime,
            options: { firstLabel: "終業時間", secondLabel: "始業時間" }
          }
        )
      ),
      wednesdayStartTime: validateSwitcher(
        values.administration.wednesdaySchedule,
        validator(
          values.administration.wednesdayStartTime,
          "required",
          "checkTime"
        )
      ),
      wednesdayEndTime: validateSwitcher(
        values.administration.wednesdaySchedule,
        validator(
          values.administration.wednesdayEndTime,
          "required",
          "checkTime",
          {
            type: "checkTimeFuture",
            startTime: values.administration.wednesdayStartTime,
            options: { firstLabel: "終業時間", secondLabel: "始業時間" }
          }
        )
      ),
      thursdayStartTime: validateSwitcher(
        values.administration.thursdaySchedule,
        validator(
          values.administration.thursdayStartTime,
          "required",
          "checkTime"
        )
      ),
      thursdayEndTime: validateSwitcher(
        values.administration.thursdaySchedule,
        validator(
          values.administration.thursdayEndTime,
          "required",
          "checkTime",
          {
            type: "checkTimeFuture",
            startTime: values.administration.thursdayStartTime,
            options: { firstLabel: "終業時間", secondLabel: "始業時間" }
          }
        )
      ),
      fridayStartTime: validateSwitcher(
        values.administration.fridaySchedule,
        validator(
          values.administration.fridayStartTime,
          "required",
          "checkTime"
        )
      ),
      fridayEndTime: validateSwitcher(
        values.administration.fridaySchedule,
        validator(
          values.administration.fridayEndTime,
          "required",
          "checkTime",
          {
            type: "checkTimeFuture",
            startTime: values.administration.fridayStartTime,
            options: { firstLabel: "終業時間", secondLabel: "始業時間" }
          }
        )
      ),
      saturdayStartTime: validateSwitcher(
        values.administration.saturdaySchedule,
        validator(
          values.administration.saturdayStartTime,
          "required",
          "checkTime"
        )
      ),
      saturdayEndTime: validateSwitcher(
        values.administration.saturdaySchedule,
        validator(
          values.administration.saturdayEndTime,
          "required",
          "checkTime",
          {
            type: "checkTimeFuture",
            startTime: values.administration.saturdayStartTime,
            options: { firstLabel: "終業時間", secondLabel: "始業時間" }
          }
        )
      ),
      sundayStartTime: validateSwitcher(
        values.administration.sundaySchedule,
        validator(
          values.administration.sundayStartTime,
          "required",
          "checkTime"
        )
      ),
      sundayEndTime: validateSwitcher(
        values.administration.sundaySchedule,
        validator(
          values.administration.sundayEndTime,
          "required",
          "checkTime",
          {
            type: "checkTimeFuture",
            startTime: values.administration.sundayStartTime,
            options: { firstLabel: "終業時間", secondLabel: "始業時間" }
          }
        )
      )
    }
  };
};

const subtractionItemValidation = (
  values: FacilityValues
): SubtractionItemErrors => {
  // lackOfLifeSupportMemberStartDate,lackOfResponsiblePersonStartDateの
  // フォーム値は「年月」であるが、入力チェックを行うために「年月日」であることが必要なので、
  // 日にちとして「1日」をdefaultで設定する
  values.subtractionItem.lackOfLifeSupportMemberStartDate.day = "1";
  values.subtractionItem.lackOfResponsiblePersonStartDate.day = "1";
  const memberDate = values.subtractionItem.lackOfLifeSupportMemberStartDate;
  const personDate = values.subtractionItem.lackOfResponsiblePersonStartDate;
  const selectDateRules: { type: "selectRequired"; value: string } = {
    type: "selectRequired",
    value: DEFAULT_SELECT_VALUE
  };
  return {
    subtractionItem: {
      lackOfLifeSupportMemberStartDate: {
        year: validateSwitcher(
          values.subtractionItem.lackOfLifeSupportMemberFlag,
          validator(memberDate.year, selectDateRules)
        ),
        // 日付の初期値が空文字のため、validationの初期値に合わせる
        month: validateSwitcher(
          values.subtractionItem.lackOfLifeSupportMemberFlag,
          validator(
            memberDate.month === "" ? DEFAULT_SELECT_VALUE : memberDate.month,
            selectDateRules
          )
        ),
        day: validateSwitcher(
          values.subtractionItem.lackOfLifeSupportMemberFlag,
          validator(memberDate.day, selectDateRules)
        )
      },
      lackOfResponsiblePersonStartDate: {
        year: validateSwitcher(
          values.subtractionItem.lackOfResponsiblePersonFlag,
          validator(personDate.year, selectDateRules)
        ),
        month: validateSwitcher(
          values.subtractionItem.lackOfResponsiblePersonFlag,
          validator(
            personDate.month === "" ? DEFAULT_SELECT_VALUE : personDate.month,
            selectDateRules
          )
        ),
        day: validateSwitcher(
          values.subtractionItem.lackOfResponsiblePersonFlag,
          validator(personDate.day, selectDateRules)
        )
      }
    }
  };
};
const AdditionalValidation = (values: FacilityValues): AdditionalItemErrors => {
  return {
    additionalItem: {
      continuationPersonLaseYear: validateSwitcher(
        values.additionalItem.employmentTransitionSupportFlag,
        validator(values.additionalItem.continuationPersonLaseYear, {
          type: "selectRequired",
          value: DEFAULT_SELECT_VALUE
        })
      ),
      numberOfContinuations: validateSwitcher(
        values.additionalItem.employmentTransitionSupportFlag &&
          values.additionalItem.continuationPersonLaseYear === "2",
        validator(
          values.additionalItem.numberOfContinuations,
          "required",
          "naturalNumberNonZero",
          {
            type: "lowerLimit",
            lowerLimit: 1
          }
        )
      )
    }
  };
};

const validation = (values: FacilityValues): FacilityErrors => {
  const basicErrors = basicValidation(values);
  const administrationErrors = administrationItemValidation(values);
  const subtractionItemErrors = subtractionItemValidation(values);
  const additionalItemErrors = AdditionalValidation(values);
  return {
    ...basicErrors,
    ...administrationErrors,
    ...subtractionItemErrors,
    ...additionalItemErrors
  };
};

export default validation;
