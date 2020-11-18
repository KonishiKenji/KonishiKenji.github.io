import { BasicValues } from "@interfaces/mgr/IAB/facility/basic";
import { WorkingTimeValues } from "@interfaces/mgr/IAB/facility/workingtime";
import { SubtractionItemValues } from "@interfaces/mgr/IAB/facility/subtractionItem";
import { AdditionalItemValues } from "@interfaces/mgr/IAB/facility/additionItem";
import { AdministrationValues } from "@interfaces/mgr/IAB/facility/administration";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";
import { dateToSelectDateValueYYYYM, dateToSelectDateValue } from "@utils/date";
import {
  dowMappingSchedule,
  DowType
} from "@utils/domain/facility/dowMappingAdministration";

export type FacilityValues = BasicValues &
  WorkingTimeValues &
  AdministrationValues &
  SubtractionItemValues &
  AdditionalItemValues;

const initialValues = (state?: FacilityState): FacilityValues => {
  // 営業スケジュール
  const administration = {
    mondaySchedule: state ? state.mondaySchedule : false,
    mondayStartTime: state ? state.mondayStartTime : "",
    mondayEndTime: state ? state.mondayEndTime : "",
    tuesdaySchedule: state ? state.tuesdaySchedule : false,
    tuesdayStartTime: state ? state.tuesdayStartTime : "",
    tuesdayEndTime: state ? state.tuesdayEndTime : "",
    wednesdaySchedule: state ? state.wednesdaySchedule : false,
    wednesdayStartTime: state ? state.wednesdayStartTime : "",
    wednesdayEndTime: state ? state.wednesdayEndTime : "",
    thursdaySchedule: state ? state.thursdaySchedule : false,
    thursdayStartTime: state ? state.thursdayStartTime : "",
    thursdayEndTime: state ? state.thursdayEndTime : "",
    fridaySchedule: state ? state.fridaySchedule : false,
    fridayStartTime: state ? state.fridayStartTime : "",
    fridayEndTime: state ? state.fridayEndTime : "",
    saturdaySchedule: state ? state.saturdaySchedule : false,
    saturdayStartTime: state ? state.saturdayStartTime : "",
    saturdayEndTime: state ? state.saturdayEndTime : "",
    sundaySchedule: state ? state.sundaySchedule : false,
    sundayStartTime: state ? state.sundayStartTime : "",
    sundayEndTime: state ? state.sundayEndTime : ""
  };

  // 作業時間の設定
  const startHor = state ? state.startHor : "";
  const startMin = state ? state.startMin : "";
  const endHor = state ? state.endHor : "";
  const endMin = state ? state.endMin : "";

  // 休憩時間
  const workBreakTimes = state
    ? state.workBreakTimes.map((workBreakTime, index) => {
        const startTime = workBreakTime.start_time.split(":");
        const endTime = workBreakTime.end_time.split(":");
        return {
          index: index + 1,
          id: workBreakTime.id,
          startTimeHour: startTime[0] || "",
          startTimeMinute: startTime[1] || "",
          endTimeHour: endTime[0] || "",
          endTimeMinute: endTime[1] || "",
          isDeleted: false
        };
      })
    : [];

  // 曜日ごとに作業時間と休憩時間を設定するフラグ
  let dayOfWeekFlag = false;

  // 曜日ごとの作業時間
  let workTimeItems: FacilityValues["workingTime"]["workTimeItems"] = [];
  if (state && state.workTimeItems.length > 0) {
    state.workTimeItems.forEach((workTimeItem) => {
      const startTime = workTimeItem.start_time
        ? workTimeItem.start_time.split(":")
        : ["", ""];
      const endTime = workTimeItem.end_time
        ? workTimeItem.end_time.split(":")
        : ["", ""];
      // この曜日の休憩時間設定 ※復元用に保持する
      const workBreakTimeMaster = state.workBreakTimeItems.filter(
        (v) => v.work_time_item_id === workTimeItem.id
      );
      // 曜日ごとの休憩時間(applied === 1のid)
      const workBreakTimeItems = workBreakTimeMaster
        .filter((v) => v.applied)
        .map((v) => v.work_break_time_id);

      // 曜日
      const { day_of_the_week } = workTimeItem;
      // 営業日
      const isBusinessDay = administration[dowMappingSchedule[day_of_the_week]];

      // 営業日の曜日ごとの設定が全て作業時間と休憩時間がマスターの設定と同じであれば、変更設定をしていると見なす
      // 休憩時間の一致は全ての作業時間を設定しているかと等しいので、lengthの比較で出来る
      if (
        !dayOfWeekFlag &&
        isBusinessDay &&
        (startHor !== startTime[0] ||
          startMin !== startTime[1] ||
          endHor !== endTime[0] ||
          endMin !== endTime[1] ||
          workBreakTimes.length !== workBreakTimeItems.length)
      ) {
        dayOfWeekFlag = true;
      }

      workTimeItems.push({
        day_of_the_week,
        workBreakTimeMaster,
        workBreakTimeItems,
        id: workTimeItem.id,
        startTimeHour: startTime[0],
        startTimeMinute: startTime[1],
        endTimeHour: endTime[0],
        endTimeMinute: endTime[1]
      });
    });
  } else {
    // 初回時などのworkTimeItemsがない時に初期値を生成する
    workTimeItems = Object.keys(dowMappingSchedule).map((dow, i) => {
      return {
        id: `new#${i}`,
        day_of_the_week: dow as DowType,
        startTimeHour: startHor,
        startTimeMinute: startMin,
        endTimeHour: endHor,
        endTimeMinute: endMin,
        workBreakTimeItems: []
      };
    });
  }

  return {
    administration,
    basic: {
      corporationName: state ? state.corporationName : "",
      officeNumber: state ? state.officeNumber : "",
      officeName: state ? state.officeName : "",
      serviceType: state ? state.serviceType : "",
      representativeName: state ? state.representativeName : "",
      capacity: state ? state.capacity : "",
      masterSubordinateFlg: state ? state.masterSubordinateFlg : false,
      masterFlg: state ? state.masterFlg : "1",
      multiFunctionOfficeFlag: state ? state.multiFunctionOfficeFlag : false,
      allCapacity: state ? state.allCapacity : "",
      postalCode: state ? state.postalCode : "",
      prefectureId: state ? state.selectedPrefectureName : "",
      cityId: state ? state.selectedCityCode : "",
      restAddress: state ? state.restAddress : "",
      tel: state ? state.tel : "",
      aExecuteMeasuresForLoadReductionFlag: state
        ? state.aExecuteMeasuresForLoadReductionFlag
        : false,
      percentOfLoadReduction: state ? state.percentOfLoadReduction : "",
      yenOfLoadReduction: state ? state.yenOfLoadReduction : "",
      loadReductionType: state ? state.loadReductionType : "1",
      mealSaservedServiceFlag: state ? state.mealSaservedServiceFlag : false,
      transferServiceFlag: state ? state.transferServiceFlag : false,
      transferServiceType: state ? state.transferServiceType : "1"
    },
    workingTime: {
      startHor,
      startMin,
      endHor,
      endMin,
      dayOfWeekFlag,
      workBreakTimes,
      workTimeItems,
      // 刻み時間
      unitEngrave: state ? state.unitEngrave : "",
      // 利用者（作業時間の自動入力対象）
      users: state ? state.users : []
    },
    subtractionItem: {
      establishedByLocalGovernmentsFlag: state
        ? state.establishedByLocalGovernmentsFlag
        : false,
      lackFlag: state
        ? state.lackOfLifeSupportMemberFlag || state.lackOfResponsiblePersonFlag
        : false,
      lackOfLifeSupportMemberFlag: state
        ? state.lackOfLifeSupportMemberFlag
        : false,
      lackOfLifeSupportMemberStartDate:
        state && state.lackOfLifeSupportMemberStartDate
          ? dateToSelectDateValueYYYYM(state.lackOfLifeSupportMemberStartDate)
          : { year: "NOT_SELECTED", month: "", day: "1" }, // APIの仕様上dayは1固定
      lackOfResponsiblePersonFlag: state
        ? state.lackOfResponsiblePersonFlag
        : false,
      lackOfResponsiblePersonStartDate:
        state && state.lackOfResponsiblePersonStartDate
          ? dateToSelectDateValueYYYYM(state.lackOfResponsiblePersonStartDate)
          : { year: "NOT_SELECTED", month: "", day: "1" } // APIの仕様上dayは1固定
    },
    additionalItem: {
      staffPlacementType: state ? state.staffPlacementType : "1",
      welfareSpecialistPlacementType: state
        ? state.welfareSpecialistPlacementType
        : "1",
      staffTreatmentSystemType: state ? state.staffTreatmentSystemType : "1",
      staffTreatmentSpecificSystemType: state
        ? state.staffTreatmentSpecificSystemType
        : "1",
      commuterLifeSupportFlag: state ? state.commuterLifeSupportFlag : false,
      visualAuditoryLanguageDisabledPeopleSupportSystemFlag: state
        ? state.visualAuditoryLanguageDisabledPeopleSupportSystemFlag
        : false,
      employmentTransitionSupportFlag: state
        ? state.employmentTransitionSupportFlag
        : false,
      continuationPersonLaseYear: state
        ? state.continuationPersonLaseYear
        : "1",
      postEmploymentRetentionRateType: state
        ? state.postEmploymentRetentionRateType
        : "1",
      averageDailyWorkingHoursOfUsersType: state
        ? state.averageDailyWorkingHoursOfUsersType
        : "1",
      monthlyAverageWageType: state ? state.monthlyAverageWageType : "1",
      employmentSupportTrainingCompletionFlag: state
        ? state.employmentSupportTrainingCompletionFlag
        : false,
      severeSupportType: state ? state.severeSupportType : "1",
      dischargeSupportFacilityType: state
        ? state.dischargeSupportFacilityType
        : "1",
      // (A型のみ)賃金向上達成指導員配置加算
      wageUpStartDate:
        state && state.wageUpStartDate && state.wageUpStartDate !== "0000-00-00"
          ? dateToSelectDateValue(state.wageUpStartDate)
          : { year: "NOT_SELECTED", month: "", day: "" },
      wageUpEndDate:
        state && state.wageUpEndDate && state.wageUpEndDate !== "0000-00-00"
          ? dateToSelectDateValue(state.wageUpEndDate)
          : { year: "NOT_SELECTED", month: "", day: "" },

      // (B型のみ)目標工賃達成指導員配置加算
      targetWageTeacherStartDate:
        state &&
        state.targetWageTeacherStartDate &&
        state.targetWageTeacherStartDate !== "0000-00-00"
          ? dateToSelectDateValue(state.targetWageTeacherStartDate)
          : { year: "NOT_SELECTED", month: "", day: "" },
      targetWageTeacherEndDate:
        state &&
        state.targetWageTeacherEndDate &&
        state.targetWageTeacherEndDate !== "0000-00-00"
          ? dateToSelectDateValue(state.targetWageTeacherEndDate)
          : { year: "NOT_SELECTED", month: "", day: "" },

      numberOfContinuations: state ? state.numberOfContinuations : ""
    }
  };
};

export default initialValues;
