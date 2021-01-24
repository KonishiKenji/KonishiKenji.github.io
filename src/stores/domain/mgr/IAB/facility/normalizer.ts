import { FacilityState } from "./types";
import { GetFacilityResponse } from "@api/requests/facility/getFacility";
import { PostFacilityParams } from "@api/requests/facility/postFacility";
import { FacilityValues } from "@initialize/mgr/IAB/facility/initialValues";
import {
  STRING_FALSE_FROM_API,
  STRING_TRUE_FROM_API,
  DEFAULT_RADIO_VALUE,
  ENABLE_SPECIFIC_BETTER_SUPPORTER_CONDITION_VALUES
} from "@constants/variables";
import castString from "@utils/dataNormalizer/castString";
import { selectDateValueToDate } from "@utils/date";

/**
 * パラメータの親子関係マッピング表
 */
const parentParamsMap = {
  facility: {
    master_subordinate_flg: {
      key: "master_subordinate_flg",
      childKeys: ["master_flg"]
    },
    ab_support_ikou_flg: {
      key: "ab_support_ikou_flg",
      childKeys: ["ab_support_ikou_result", "ab_support_ikou_result_number"]
    },
    ab_support_ikou_result: {
      key: "ab_support_ikou_result",
      childKeys: ["ab_support_ikou_result_number"]
    },
    available_pickup: {
      key: "available_pickup",
      childKeys: ["available_pickup_kind"]
    },
    mon_active_flg: {
      key: "mon_active_flg",
      childKeys: ["mon_open", "mon_close"]
    },
    mon_open: {
      key: "mon_open",
      childKeys: ["mon_close"]
    },
    mon_close: {
      key: "mon_close",
      childKeys: ["mon_open"]
    },
    tue_active_flg: {
      key: "tue_active_flg",
      childKeys: ["tue_open", "tue_close"]
    },
    tue_open: {
      key: "tue_open",
      childKeys: ["tue_close"]
    },
    tue_close: {
      key: "tue_close",
      childKeys: ["tue_open"]
    },
    wed_active_flg: {
      key: "wed_active_flg",
      childKeys: ["wed_open", "wed_close"]
    },
    wed_open: {
      key: "wed_open",
      childKeys: ["wed_close"]
    },
    wed_close: {
      key: "wed_close",
      childKeys: ["wed_open"]
    },
    thu_active_flg: {
      key: "thu_active_flg",
      childKeys: ["thu_open", "thu_close"]
    },
    thu_open: {
      key: "thu_open",
      childKeys: ["thu_close"]
    },
    thu_close: {
      key: "thu_close",
      childKeys: ["thu_open"]
    },
    fri_active_flg: {
      key: "fri_active_flg",
      childKeys: ["fri_open", "fri_close"]
    },
    fri_open: {
      key: "fri_open",
      childKeys: ["fri_close"]
    },
    fri_close: {
      key: "fri_close",
      childKeys: ["fri_open"]
    },
    sat_active_flg: {
      key: "sat_active_flg",
      childKeys: ["sat_open", "sat_close"]
    },
    sat_open: {
      key: "sat_open",
      childKeys: ["sat_close"]
    },
    sat_close: {
      key: "sat_close",
      childKeys: ["sat_open"]
    },
    sun_active_flg: {
      key: "sun_active_flg",
      childKeys: ["sun_open", "sun_close"]
    },
    sun_open: {
      key: "sun_open",
      childKeys: ["sun_close"]
    },
    sun_close: {
      key: "sun_close",
      childKeys: ["sun_open"]
    },
    better_supporter_condition: {
      key: "better_supporter_condition",
      childKeys: ["specific_better_supporter_condition"]
    }
  }
};

/**
 * Getの結果をstoreのデータに整形する
 */
export const normalizeGetFacilityResult = (
  result: GetFacilityResponse
): FacilityState => {
  const { facility } = result.data;
  const workStartTime = facility.work_start_time
    ? facility.work_start_time.split(":")
    : ["", ""];
  const workEndTime = facility.work_end_time
    ? facility.work_end_time.split(":")
    : ["", ""];
  return {
    id: facility.id,
    corporationName: facility.gov_business_owner,
    officeNumber: facility.gov_facility_number,
    officeName: facility.name,
    serviceType: facility.type_service,
    representativeName: facility.responsible_person,
    capacity: facility.capacity !== null ? `${facility.capacity}` : "",
    postalCode: facility.postal_code !== null ? facility.postal_code : "",
    selectedPrefectureName: facility.prefecture_name
      ? facility.prefecture_name
      : "NOT_SELECTED",
    selectedCityCode:
      facility.city_id !== null ? `${facility.city_id}` : "NOT_SELECTED",
    restAddress: facility.address !== null ? facility.address : "",
    tel: facility.tel,
    cityId: facility.city_id !== null ? `${facility.city_id}` : "",
    multiFunctionOfficeFlag:
      facility.multiple_facility_flg === STRING_TRUE_FROM_API,
    masterSubordinateFlg:
      facility.master_subordinate_flg === STRING_TRUE_FROM_API,
    masterFlg: facility.master_flg ? facility.master_flg : "1",
    allCapacity: castString(facility.total_capacity),
    aExecuteMeasuresForLoadReductionFlag:
      facility.a_execute_measures_for_load_reduction_flg ===
      STRING_TRUE_FROM_API,
    percentOfLoadReduction:
      facility.a_percent_of_load_reduction &&
      facility.a_percent_of_load_reduction !== null
        ? facility.a_percent_of_load_reduction.toString()
        : "",
    yenOfLoadReduction:
      facility.a_yen_of_load_reduction &&
      facility.a_yen_of_load_reduction !== null
        ? `${facility.a_yen_of_load_reduction}`
        : "",
    loadReductionType: facility.a_execute_measures_for_load_reduction_unit_flg
      ? facility.a_execute_measures_for_load_reduction_unit_flg
      : "1",
    mealSaservedServiceFlag: facility.available_food === STRING_TRUE_FROM_API,
    transferServiceFlag: facility.available_pickup === STRING_TRUE_FROM_API,
    transferServiceType: facility.available_pickup_kind
      ? facility.available_pickup_kind
      : "1",
    mondaySchedule: facility.mon_active_flg === STRING_TRUE_FROM_API,
    mondayStartTime: facility.mon_open
      ? `${facility.mon_open}`.substring(0, 5)
      : "",
    mondayEndTime: facility.mon_close
      ? `${facility.mon_close}`.substring(0, 5)
      : "",
    tuesdaySchedule: facility.tue_active_flg === STRING_TRUE_FROM_API,
    tuesdayStartTime: facility.tue_open
      ? `${facility.tue_open}`.substring(0, 5)
      : "",
    tuesdayEndTime: facility.tue_close
      ? `${facility.tue_close}`.substring(0, 5)
      : "",
    wednesdaySchedule: facility.wed_active_flg === STRING_TRUE_FROM_API,
    wednesdayStartTime: facility.wed_open
      ? `${facility.wed_open}`.substring(0, 5)
      : "",
    wednesdayEndTime: facility.wed_close
      ? `${facility.wed_close}`.substring(0, 5)
      : "",
    thursdaySchedule: facility.thu_active_flg === STRING_TRUE_FROM_API,
    thursdayStartTime: facility.thu_open
      ? `${facility.thu_open}`.substring(0, 5)
      : "",
    thursdayEndTime: facility.thu_close
      ? `${facility.thu_close}`.substring(0, 5)
      : "",
    fridaySchedule: facility.fri_active_flg === STRING_TRUE_FROM_API,
    fridayStartTime: facility.fri_open
      ? `${facility.fri_open}`.substring(0, 5)
      : "",
    fridayEndTime: facility.fri_close
      ? `${facility.fri_close}`.substring(0, 5)
      : "",
    saturdaySchedule: facility.sat_active_flg === STRING_TRUE_FROM_API,
    saturdayStartTime: facility.sat_open
      ? `${facility.sat_open}`.substring(0, 5)
      : "",
    saturdayEndTime: facility.sat_close
      ? `${facility.sat_close}`.substring(0, 5)
      : "",
    sundaySchedule: facility.sun_active_flg === STRING_TRUE_FROM_API,
    sundayStartTime: facility.sun_open
      ? `${facility.sun_open}`.substring(0, 5)
      : "",
    sundayEndTime: facility.sun_close
      ? `${facility.sun_close}`.substring(0, 5)
      : "",
    lackOfLifeSupportMemberFlag:
      facility.lack_of_supporter_flg === STRING_TRUE_FROM_API,
    lackOfLifeSupportMemberStartDate:
      facility.date_start_lack_of_supporter !== null
        ? facility.date_start_lack_of_supporter
        : "",
    lackOfResponsiblePersonFlag:
      facility.lack_of_service_admin_flg === STRING_TRUE_FROM_API,
    lackOfResponsiblePersonStartDate:
      facility.date_start_lack_of_service_admin !== null
        ? facility.date_start_lack_of_service_admin
        : "",
    establishedByLocalGovernmentsFlag:
      facility.origin_local_gov_flg === STRING_TRUE_FROM_API,
    welfareSpecialistPlacementType: facility.welfare_condition
      ? facility.welfare_condition
      : DEFAULT_RADIO_VALUE,
    staffTreatmentSystemType: facility.better_supporter_condition
      ? facility.better_supporter_condition
      : DEFAULT_RADIO_VALUE,
    staffTreatmentSpecificSystemType: facility.specific_better_supporter_condition
      ? facility.specific_better_supporter_condition
      : DEFAULT_RADIO_VALUE,
    commuterLifeSupportFlag:
      facility.execute_kaizen_flg === STRING_TRUE_FROM_API,
    visualAuditoryLanguageDisabledPeopleSupportSystemFlag: facility.see_hear_team_flg
      ? facility.see_hear_team_flg === STRING_TRUE_FROM_API
      : false,
    employmentTransitionSupportFlag:
      facility.ab_support_ikou_flg === STRING_TRUE_FROM_API,
    continuationPersonLaseYear: facility.ab_support_ikou_result
      ? `${facility.ab_support_ikou_result}`
      : "1",
    numberOfContinuations: castString(facility.ab_support_ikou_result_number),
    staffPlacementType: facility.users_vs_supporter_grade
      ? `${facility.users_vs_supporter_grade}`
      : "1",
    postEmploymentRetentionRateType: facility.i_fix_rate_get_job
      ? `${facility.i_fix_rate_get_job}`
      : "1",
    averageDailyWorkingHoursOfUsersType: facility.a_average_work_duration
      ? `${facility.a_average_work_duration}`
      : "1",
    monthlyAverageWageType: facility.b_average_monthly_wage
      ? `${facility.b_average_monthly_wage}`
      : "1",
    employmentSupportTrainingCompletionFlag: facility.i_train_finished_flg
      ? facility.i_train_finished_flg === STRING_TRUE_FROM_API
      : false,
    severeSupportType: facility.ab_support_serious
      ? `${facility.ab_support_serious}`
      : "1",
    dischargeSupportFacilityType: facility.mental_disorder_leave_support
      ? `${facility.mental_disorder_leave_support}`
      : "1",
    wageUpStartDate:
      facility.a_wage_up_date_start !== null
        ? facility.a_wage_up_date_start
        : "",
    wageUpEndDate:
      facility.a_wage_up_date_end !== null ? facility.a_wage_up_date_end : "",
    targetWageTeacherStartDate:
      facility.b_target_kouchin_teacher_date_start !== null
        ? facility.b_target_kouchin_teacher_date_start
        : "",
    targetWageTeacherEndDate:
      facility.b_target_kouchin_teacher_date_end !== null
        ? facility.b_target_kouchin_teacher_date_end
        : "",
    unitEngrave: facility.work_truncate_minutes
      ? `${facility.work_truncate_minutes}`
      : "0",
    startHor: workStartTime[0],
    startMin: workStartTime[1],
    endHor: workEndTime[0],
    endMin: workEndTime[1],
    users: result.data.users || [],
    workBreakTimes: result.data.workBreakTimes || [],
    workBreakTimeItems: result.data.workBreakTimeItems || [],
    workTimeItems: result.data.workTimeItems || []
  };
};

/**
 * FacilityValues => PostFacilityParams
 */
const normalizeFormValue = (
  state: FacilityValues,
  facility: FacilityState
): PostFacilityParams => {
  const facilityId = facility.id;

  // 作業開始・終了時間をhh:mm:ss形式に戻す
  const { startHor, startMin, endHor, endMin } = state.workingTime;
  // バリデーションで絶対設定されているはずだが、一応空文字は00で潰しておく
  const work_start_time = `${startHor || "00"}:${startMin || "00"}:00`;
  const work_end_time = `${endHor || "00"}:${endMin || "00"}:00`;

  // 削除されていない休憩時間
  const workBreakTimes = state.workingTime.workBreakTimes
    .filter((v) => !v.isDeleted)
    .map((workBreakTime) => ({
      id: workBreakTime.id,
      facility_id: facilityId,
      start_time: `${workBreakTime.startTimeHour}:${workBreakTime.startTimeMinute}`,
      end_time: `${workBreakTime.endTimeHour}:${workBreakTime.endTimeMinute}`
    }));

  // 曜日ごとの作業時間/休憩時間
  const workTimeItems: PostFacilityParams["workTimeItems"] = [];
  const workBreakTimeItems: PostFacilityParams["workBreakTimeItems"] = [];
  if (state.workingTime.dayOfWeekFlag) {
    state.workingTime.workTimeItems.forEach((wtItem) => {
      workTimeItems.push({
        id: wtItem.id,
        facility_id: facilityId,
        start_time: `${wtItem.startTimeHour}:${wtItem.startTimeMinute}`,
        end_time: `${wtItem.endTimeHour}:${wtItem.endTimeMinute}`,
        day_of_the_week: wtItem.day_of_the_week
      });
      // 曜日ごとの休憩時間: 曜日ごとにworkBreakTimesと同じ数の配列を持つ
      workBreakTimes.forEach((wbItem) => {
        // 休憩時間idと同じidを曜日ごとの休憩時間設定が持っていればappliedとして扱う
        const appliedFlg = wtItem.workBreakTimeItems.find(
          (id) => id === wbItem.id
        );
        // idを新規発行するか判断するために前データの存在をチェックする
        const beforeWbItem = wtItem.workBreakTimeMaster
          ? wtItem.workBreakTimeMaster.find(
              (v) =>
                v.work_break_time_id === wbItem.id &&
                v.work_time_item_id === wtItem.id
            )
          : undefined;
        workBreakTimeItems.push({
          ...wbItem,
          id: beforeWbItem ? beforeWbItem.id : null,
          applied: appliedFlg ? 1 : 0,
          work_break_time_id: wbItem.id,
          work_time_item_id: wtItem.id
        });
      });
    });
  } else {
    // 曜日ごとの設定をしないとき
    state.workingTime.workTimeItems.forEach((wtItem) => {
      // 曜日ごとの作業時間をマスターとしての作業時間で全上書き
      workTimeItems.push({
        id: wtItem.id,
        facility_id: facilityId,
        start_time: `${state.workingTime.startHor}:${state.workingTime.startMin}`,
        end_time: `${state.workingTime.endHor}:${state.workingTime.endMin}`,
        day_of_the_week: wtItem.day_of_the_week
      });
      // 曜日ごとの休憩時間に有効な休憩時間を全部セットする
      workBreakTimes.forEach((wbItem) => {
        // idを新規発行するか判断するために前データの存在をチェックする
        const beforeWbItem = wtItem.workBreakTimeMaster
          ? wtItem.workBreakTimeMaster.find(
              (v) =>
                v.work_break_time_id === wbItem.id &&
                v.work_time_item_id === wtItem.id
            )
          : undefined;
        workBreakTimeItems.push({
          ...wbItem,
          id: beforeWbItem ? beforeWbItem.id : null,
          applied: 1,
          work_break_time_id: wbItem.id,
          work_time_item_id: wtItem.id
        });
      });
    });
  }

  return {
    workBreakTimes,
    workTimeItems,
    workBreakTimeItems,
    users: state.workingTime.users,
    facility: {
      work_start_time,
      work_end_time,
      gov_business_owner: state.basic.corporationName,
      gov_facility_number: state.basic.officeNumber,
      name: state.basic.officeName,
      type_service: state.basic.serviceType,
      responsible_person: state.basic.representativeName,
      capacity:
        state.basic.capacity !== "" ? parseInt(state.basic.capacity, 10) : null,
      postal_code: state.basic.postalCode,
      prefecture_name: state.basic.prefectureId,
      city_id: parseInt(state.basic.cityId, 10),
      address: state.basic.restAddress,
      tel: state.basic.tel,
      multiple_facility_flg: state.basic.multiFunctionOfficeFlag
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      master_subordinate_flg: state.basic.masterSubordinateFlg
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      master_flg: state.basic.masterFlg,
      users_vs_supporter_grade: state.additionalItem.staffPlacementType,
      welfare_condition: state.additionalItem.welfareSpecialistPlacementType,
      better_supporter_condition: state.additionalItem.staffTreatmentSystemType,
      lack_of_supporter_flg: state.subtractionItem.lackOfLifeSupportMemberFlag
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      date_start_lack_of_supporter: state.subtractionItem
        .lackOfLifeSupportMemberFlag
        ? selectDateValueToDate(
            state.subtractionItem.lackOfLifeSupportMemberStartDate
          )
        : null,
      lack_of_service_admin_flg: state.subtractionItem
        .lackOfResponsiblePersonFlag
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      date_start_lack_of_service_admin: state.subtractionItem
        .lackOfResponsiblePersonFlag
        ? selectDateValueToDate(
            state.subtractionItem.lackOfResponsiblePersonStartDate
          )
        : null,
      origin_local_gov_flg: state.subtractionItem
        .establishedByLocalGovernmentsFlag
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      see_hear_team_flg: state.additionalItem
        .visualAuditoryLanguageDisabledPeopleSupportSystemFlag
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      total_capacity:
        state.basic.multiFunctionOfficeFlag && state.basic.allCapacity !== ""
          ? parseInt(state.basic.allCapacity, 10)
          : null,
      available_food: state.basic.mealSaservedServiceFlag
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      available_pickup: state.basic.transferServiceFlag
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      available_pickup_kind: state.basic.transferServiceFlag
        ? state.basic.transferServiceType
        : null,

      a_execute_measures_for_load_reduction_flg: state.basic
        .aExecuteMeasuresForLoadReductionFlag
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      a_percent_of_load_reduction:
        state.basic.aExecuteMeasuresForLoadReductionFlag &&
        state.basic.percentOfLoadReduction
          ? parseInt(state.basic.percentOfLoadReduction, 10)
          : null,
      a_yen_of_load_reduction:
        state.basic.aExecuteMeasuresForLoadReductionFlag &&
        state.basic.yenOfLoadReduction
          ? parseInt(state.basic.yenOfLoadReduction, 10)
          : null,
      a_execute_measures_for_load_reduction_unit_flg: state.basic
        .aExecuteMeasuresForLoadReductionFlag
        ? state.basic.loadReductionType
        : null,
      mon_active_flg: state.administration.mondaySchedule
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      tue_active_flg: state.administration.tuesdaySchedule
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      wed_active_flg: state.administration.wednesdaySchedule
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      thu_active_flg: state.administration.thursdaySchedule
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      fri_active_flg: state.administration.fridaySchedule
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      sat_active_flg: state.administration.saturdaySchedule
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      sun_active_flg: state.administration.sundaySchedule
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      mon_open: state.administration.mondaySchedule
        ? state.administration.mondayStartTime
        : null,
      tue_open: state.administration.tuesdaySchedule
        ? state.administration.tuesdayStartTime
        : null,
      wed_open: state.administration.wednesdaySchedule
        ? state.administration.wednesdayStartTime
        : null,
      thu_open: state.administration.thursdaySchedule
        ? state.administration.thursdayStartTime
        : null,
      fri_open: state.administration.fridaySchedule
        ? state.administration.fridayStartTime
        : null,
      sat_open: state.administration.saturdaySchedule
        ? state.administration.saturdayStartTime
        : null,
      sun_open: state.administration.sundaySchedule
        ? state.administration.sundayStartTime
        : null,
      mon_close: state.administration.mondaySchedule
        ? state.administration.mondayEndTime
        : null,
      tue_close: state.administration.tuesdaySchedule
        ? state.administration.tuesdayEndTime
        : null,
      wed_close: state.administration.wednesdaySchedule
        ? state.administration.wednesdayEndTime
        : null,
      thu_close: state.administration.thursdaySchedule
        ? state.administration.thursdayEndTime
        : null,
      fri_close: state.administration.fridaySchedule
        ? state.administration.fridayEndTime
        : null,
      sat_close: state.administration.saturdaySchedule
        ? state.administration.saturdayEndTime
        : null,
      sun_close: state.administration.sundaySchedule
        ? state.administration.sundayEndTime
        : null,
      execute_kaizen_flg: state.additionalItem.commuterLifeSupportFlag
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      specific_better_supporter_condition: !["2", "3", "4"].includes(
        state.additionalItem.staffTreatmentSystemType
      )
        ? "1"
        : state.additionalItem.staffTreatmentSpecificSystemType,
      ab_support_ikou_flg: state.additionalItem.employmentTransitionSupportFlag
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      ab_support_ikou_result: state.additionalItem
        .employmentTransitionSupportFlag
        ? state.additionalItem.continuationPersonLaseYear
        : null,
      i_fix_rate_get_job: state.additionalItem.postEmploymentRetentionRateType,
      a_average_work_duration:
        state.additionalItem.averageDailyWorkingHoursOfUsersType,
      b_average_monthly_wage: state.additionalItem.monthlyAverageWageType,
      i_train_finished_flg: state.additionalItem
        .employmentSupportTrainingCompletionFlag
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      ab_support_serious: state.additionalItem.severeSupportType,
      mental_disorder_leave_support:
        state.additionalItem.dischargeSupportFacilityType,
      a_wage_up_date_start:
        state.additionalItem.wageUpStartDate &&
        selectDateValueToDate(state.additionalItem.wageUpStartDate) !== ""
          ? selectDateValueToDate(state.additionalItem.wageUpStartDate)
          : null,
      a_wage_up_date_end:
        state.additionalItem.wageUpEndDate &&
        selectDateValueToDate(state.additionalItem.wageUpEndDate) !== ""
          ? selectDateValueToDate(state.additionalItem.wageUpEndDate)
          : null,
      b_target_kouchin_teacher_date_start:
        state.additionalItem.targetWageTeacherStartDate &&
        selectDateValueToDate(state.additionalItem.targetWageTeacherStartDate)
          ? selectDateValueToDate(
              state.additionalItem.targetWageTeacherStartDate
            )
          : null,
      b_target_kouchin_teacher_date_end:
        state.additionalItem.targetWageTeacherEndDate &&
        selectDateValueToDate(state.additionalItem.targetWageTeacherEndDate)
          ? selectDateValueToDate(state.additionalItem.targetWageTeacherEndDate)
          : null,
      ab_support_ikou_result_number:
        state.additionalItem.employmentTransitionSupportFlag &&
        state.additionalItem.numberOfContinuations !== ""
          ? parseInt(state.additionalItem.numberOfContinuations, 10)
          : null,
      work_truncate_minutes: state.workingTime.unitEngrave
        ? parseInt(state.workingTime.unitEngrave, 10)
        : null
    }
  };
};

/**
 * フラグがOFFの時、関連する値を消す
 * 入力後にdisabledとなったテキストエリアのテキストを消す
 */
const removeUnnecessaryValue = (
  target: PostFacilityParams
): PostFacilityParams => {
  const result = { ...target };
  if (result.facility.lack_of_service_admin_flg === STRING_FALSE_FROM_API) {
    result.facility.date_start_lack_of_service_admin = null;
  }
  if (result.facility.lack_of_supporter_flg === STRING_FALSE_FROM_API) {
    result.facility.date_start_lack_of_supporter = null;
  }
  if (result.facility.ab_support_ikou_result !== "2") {
    result.facility.ab_support_ikou_result_number = null;
  }
  if (
    !ENABLE_SPECIFIC_BETTER_SUPPORTER_CONDITION_VALUES.includes(
      result.facility.better_supporter_condition
    )
  ) {
    result.facility.specific_better_supporter_condition = DEFAULT_RADIO_VALUE;
  }
  if (result.facility.master_subordinate_flg === STRING_FALSE_FROM_API) {
    result.facility.master_flg = null;
  }
  if (result.facility.a_execute_measures_for_load_reduction_unit_flg === "1") {
    result.facility.a_yen_of_load_reduction = null;
  }
  if (result.facility.a_execute_measures_for_load_reduction_unit_flg === "2") {
    result.facility.a_percent_of_load_reduction = null;
  }
  return result;
};

/**
 * 子要素の差分判定 子要素に差分がある場合、親要素もパラメータに付与する
 * @param target
 * @param after
 */
const addParentValue = (
  target: PostFacilityParams,
  after: PostFacilityParams
): PostFacilityParams => {
  const result = target;
  Object.keys(parentParamsMap).forEach((facilityKey) => {
    Object.keys(parentParamsMap[facilityKey]).forEach((paramKey) => {
      const childKeys = parentParamsMap[facilityKey][paramKey].childKeys
        ? parentParamsMap[facilityKey][paramKey].childKeys
        : [];
      const isDiffChildren: boolean = childKeys.some((childKey: string) => {
        return result[facilityKey][childKey] !== undefined;
      });
      if (isDiffChildren) {
        result[facilityKey][parentParamsMap[facilityKey][paramKey].key] =
          after[facilityKey][parentParamsMap[facilityKey][paramKey].key];
      }
    });
  });
  return result;
};

const removeNoChangeData = (
  after: PostFacilityParams,
  before: PostFacilityParams
): PostFacilityParams => {
  const target: PostFacilityParams = {
    facility: {
      gov_business_owner: after.facility.gov_business_owner,
      gov_facility_number: after.facility.gov_facility_number,
      name: after.facility.name,
      type_service: after.facility.type_service,
      responsible_person: after.facility.responsible_person,
      capacity: after.facility.capacity,
      postal_code: after.facility.postal_code,
      prefecture_name: after.facility.prefecture_name,
      city_id: after.facility.city_id,
      address: after.facility.address,
      tel: after.facility.tel,
      multiple_facility_flg: after.facility.multiple_facility_flg,
      users_vs_supporter_grade: after.facility.users_vs_supporter_grade,
      welfare_condition: after.facility.welfare_condition,
      better_supporter_condition: after.facility.better_supporter_condition,
      lack_of_supporter_flg: after.facility.lack_of_supporter_flg,
      date_start_lack_of_supporter: after.facility.date_start_lack_of_supporter,
      lack_of_service_admin_flg: after.facility.lack_of_service_admin_flg,
      date_start_lack_of_service_admin:
        after.facility.date_start_lack_of_service_admin,
      origin_local_gov_flg: after.facility.origin_local_gov_flg,
      see_hear_team_flg: after.facility.see_hear_team_flg,

      master_subordinate_flg: undefined,
      // multiple_facility_flgを毎回送信しているため
      // 関係のあるmaster_flgとtotal_capacityも毎回送信する
      master_flg: after.facility.master_flg,
      total_capacity: after.facility.total_capacity,
      available_food: undefined,
      available_pickup: undefined,
      available_pickup_kind: undefined,
      a_execute_measures_for_load_reduction_flg:
        after.facility.a_execute_measures_for_load_reduction_flg,
      a_percent_of_load_reduction: after.facility.a_percent_of_load_reduction,
      a_yen_of_load_reduction: after.facility.a_yen_of_load_reduction,
      a_execute_measures_for_load_reduction_unit_flg:
        after.facility.a_execute_measures_for_load_reduction_unit_flg,
      mon_active_flg: undefined,
      tue_active_flg: undefined,
      wed_active_flg: undefined,
      thu_active_flg: undefined,
      fri_active_flg: undefined,
      sat_active_flg: undefined,
      sun_active_flg: undefined,
      mon_open: undefined,
      tue_open: undefined,
      wed_open: undefined,
      thu_open: undefined,
      fri_open: undefined,
      sat_open: undefined,
      sun_open: undefined,
      mon_close: undefined,
      tue_close: undefined,
      wed_close: undefined,
      thu_close: undefined,
      fri_close: undefined,
      sat_close: undefined,
      sun_close: undefined,
      execute_kaizen_flg: undefined,
      specific_better_supporter_condition: undefined,
      ab_support_ikou_flg: undefined,
      ab_support_ikou_result: undefined,
      ab_support_ikou_result_number: undefined,
      i_fix_rate_get_job: after.facility.i_fix_rate_get_job,
      a_average_work_duration: after.facility.a_average_work_duration,
      b_average_monthly_wage: after.facility.b_average_monthly_wage,
      i_train_finished_flg: after.facility.i_train_finished_flg,
      ab_support_serious: after.facility.ab_support_serious,
      mental_disorder_leave_support:
        after.facility.mental_disorder_leave_support,
      a_wage_up_date_start: after.facility.a_wage_up_date_start,
      a_wage_up_date_end: after.facility.a_wage_up_date_end,
      b_target_kouchin_teacher_date_start:
        after.facility.b_target_kouchin_teacher_date_start,
      b_target_kouchin_teacher_date_end:
        after.facility.b_target_kouchin_teacher_date_end,
      work_truncate_minutes: after.facility.work_truncate_minutes,
      work_start_time: after.facility.work_start_time,
      work_end_time: after.facility.work_end_time
    },
    users: after.users || [],
    workBreakTimes: after.workBreakTimes || [],
    workBreakTimeItems: after.workBreakTimeItems || [],
    workTimeItems: after.workTimeItems || []
  };

  Object.keys(target).forEach((key) => {
    Object.keys(target[key]).forEach((param) => {
      if (target[key][param] === undefined) {
        if (`${before[key][param]}` !== `${after[key][param]}`) {
          target[key][param] = after[key][param];
        } else {
          target[key][param] = undefined;
        }
      }
    });
  });

  return addParentValue(target, after);
};

/**
 * Formのvalueをpost出来る形式に整形する
 */
export const normalizeFormValueToPostFacilityParams = (
  value: FacilityValues,
  beforeValue: FacilityValues,
  facility: FacilityState
): PostFacilityParams => {
  const normalizedData = normalizeFormValue(value, facility);
  const normalizedBeforeData = normalizeFormValue(beforeValue, facility);
  const params = removeUnnecessaryValue(normalizedData);
  return removeNoChangeData(params, normalizedBeforeData);
};
