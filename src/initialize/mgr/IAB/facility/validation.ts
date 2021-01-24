import { BasicErrors } from "@interfaces/mgr/IAB/facility/basic";
import { WorkingTimeErrors } from "@interfaces/mgr/IAB/facility/workingtime";
import { SubtractionItemErrors } from "@interfaces/mgr/IAB/facility/subtractionItem";
import { AdministrationErrors } from "@interfaces/mgr/IAB/facility/administration";
import { AdditionalItemErrors } from "@interfaces/mgr/IAB/facility/additionItem";
import { FacilityValues } from "@initialize/mgr/IAB/facility/initialValues";
import validator, { dateValidator, validateSwitcher } from "@validator";
import { DEFAULT_SELECT_VALUE, FacilityType } from "@constants/variables";
import { SelectDateValue } from "@interfaces/ui/form";
import { UserState } from "@stores/domain/user/type";
import createMinutesArray from "@utils/date/createMinutesArray";
import { dowMappingSchedule } from "@utils/domain/facility/dowMappingAdministration";

type FacilityErrors = BasicErrors &
  AdministrationErrors &
  WorkingTimeErrors &
  SubtractionItemErrors &
  AdditionalItemErrors;

// "NOT_SELECTED"がrequiredバリデーションにかからないため""に変換
const notSelectedToEmpty = (value: SelectDateValue): SelectDateValue => {
  const date = {
    year: value.year === "NOT_SELECTED" ? "" : value.year,
    month: value.month,
    day: value.day
  };
  return date;
};

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
      yenOfLoadReduction: validateSwitcher(
        values.basic.aExecuteMeasuresForLoadReductionFlag &&
          values.basic.loadReductionType === "2",
        validator(values.basic.yenOfLoadReduction, "required", "naturalNumber")
      ),
      percentOfLoadReduction: validateSwitcher(
        values.basic.aExecuteMeasuresForLoadReductionFlag &&
          values.basic.loadReductionType === "1",
        validator(
          values.basic.percentOfLoadReduction,
          "required",
          "naturalNumber",
          {
            type: "upperLimit",
            upperLimit: 100
          }
        )
      ),
      loadReductionType: validateSwitcher(
        values.basic.aExecuteMeasuresForLoadReductionFlag,
        validator(values.basic.loadReductionType, "required")
      ),
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
      ),

      wageUpEndDate: validateSwitcher(
        values.basic.serviceType === FacilityType.A,
        dateValidator(notSelectedToEmpty(values.additionalItem.wageUpEndDate), {
          type: "future",
          startDate: values.additionalItem.wageUpStartDate,
          options: {
            startLabel: "開始年月日",
            endLabel: "終了年月日"
          }
        })
      ),
      targetWageTeacherEndDate: validateSwitcher(
        values.basic.serviceType === FacilityType.B,
        dateValidator(
          notSelectedToEmpty(values.additionalItem.targetWageTeacherEndDate),
          {
            type: "future",
            startDate: values.additionalItem.targetWageTeacherStartDate,
            options: {
              startLabel: "開始年月日",
              endLabel: "終了年月日"
            }
          }
        )
      )
    }
  };
};

const workingTimeValidation = (values: FacilityValues): WorkingTimeErrors => {
  const { workingTime } = values;
  const baseStartTime = `${workingTime.startHor}:${workingTime.startMin}`;
  const baseEndTime = `${workingTime.endHor}:${workingTime.endMin}`;
  const minOptions = createMinutesArray(Number(workingTime.unitEngrave));
  const selectReenterRule = {
    type: "selectReenter",
    options: minOptions
  } as const;
  return {
    workingTime: {
      unitEngrave: validator(workingTime.unitEngrave, {
        type: "selectRequired",
        value: "0"
      }),
      startHor: validator(workingTime.startHor, "required"),
      startMin: validator(workingTime.startMin, "required", selectReenterRule),
      endHor:
        validator(workingTime.endHor, "required") ||
        validator(baseEndTime, {
          type: "checkTimeFuture",
          startTime: baseStartTime,
          options: { firstLabel: "作業終了時間", secondLabel: "作業開始時間" }
        }),
      endMin: validator(workingTime.endMin, "required", selectReenterRule),
      workBreakTimes: workingTime.workBreakTimes.map((workBreakTime) => {
        const breakStartTime = `${workBreakTime.startTimeHour}:${workBreakTime.startTimeMinute}`;
        const breakEndTime = `${workBreakTime.endTimeHour}:${workBreakTime.endTimeMinute}`;
        const endTimeHourRes = validateSwitcher(
          !!(
            workBreakTime.startTimeHour &&
            workBreakTime.startTimeMinute &&
            workBreakTime.endTimeHour &&
            workBreakTime.endTimeMinute
          ),
          validator(breakEndTime, {
            type: "checkTimeFuture",
            startTime: breakStartTime,
            options: {
              firstLabel: "休憩終了時間",
              secondLabel: "休憩開始時間"
            }
          })
        );
        return !workBreakTime.isDeleted
          ? {
              startTimeHour: validator(workBreakTime.startTimeHour, "required"),
              startTimeMinute: validator(
                workBreakTime.startTimeMinute,
                "required",
                selectReenterRule
              ),
              endTimeHour:
                validator(workBreakTime.endTimeHour, "required") ||
                endTimeHourRes,
              endTimeMinute: validator(
                workBreakTime.endTimeMinute,
                "required",
                selectReenterRule
              )
            }
          : undefined;
      }),
      workTimeItems: workingTime.dayOfWeekFlag
        ? workingTime.workTimeItems.map((workTimeItem) => {
            const workStartTime = `${workTimeItem.startTimeHour}:${workTimeItem.startTimeMinute}`;
            const workEndTime = `${workTimeItem.endTimeHour}:${workTimeItem.endTimeMinute}`;
            const scheduleKey =
              dowMappingSchedule[workTimeItem.day_of_the_week];
            const isBusinessDay = values.administration[scheduleKey];
            return isBusinessDay
              ? {
                  startTimeHour: validator(
                    workTimeItem.startTimeHour,
                    "required"
                  ),
                  startTimeMinute: validator(
                    workTimeItem.startTimeMinute,
                    "required",
                    selectReenterRule
                  ),
                  endTimeHour:
                    validator(workTimeItem.endTimeHour, "required") ||
                    validator(workEndTime, {
                      type: "checkTimeFuture",
                      startTime: workStartTime,
                      options: {
                        firstLabel: "作業終了時間",
                        secondLabel: "作業開始時間"
                      }
                    }),
                  endTimeMinute: validator(
                    workTimeItem.endTimeMinute,
                    "required",
                    selectReenterRule
                  )
                }
              : undefined;
          })
        : undefined
    }
  };
};

const validation = (
  values: FacilityValues,
  featureGroup: UserState["featureGroup"]
): FacilityErrors => {
  const basicErrors = basicValidation(values);
  const administrationErrors = administrationItemValidation(values);
  const subtractionItemErrors = subtractionItemValidation(values);
  const additionalItemErrors = AdditionalValidation(values);
  const workingTimeErrors =
    featureGroup.group_labor_charge === 1
      ? workingTimeValidation(values)
      : { workingTime: {} };
  return {
    ...basicErrors,
    ...administrationErrors,
    ...subtractionItemErrors,
    ...additionalItemErrors,
    ...workingTimeErrors
  };
};

export default validation;
