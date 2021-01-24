import { FacilityState } from "./types";
import { GetFacilityResponse } from "@api/requests/facility/getFacility";
import { PostFacilityParams } from "@api/requests/facility/postFacility";
import { FacilityValues } from "@initialize/mgr/JIRITSUKUNRENSEIKATSU/facility/initialValues";
import {
  INT_FALSE_FROM_API,
  INT_TRUE_FROM_API,
  STRING_FALSE_FROM_API,
  STRING_TRUE_FROM_API,
  DEFAULT_RADIO_VALUE,
  ENABLE_SPECIFIC_BETTER_SUPPORTER_CONDITION_VALUES
} from "@constants/variables";
import { selectDateValueToDate } from "@utils/date";

// , formatTime
/**
 * Normalized Type
 */
export type NormalizedGetFacilityResponse = FacilityState;
export type NormalizedPostFacilityParams = FacilityState;

const castString = (value?: number | null | undefined) => {
  if (value === undefined || value === null) {
    return "";
  }
  return value.toString();
};

/**
 * GetFacilityResponse === PostFacilityParams前提の共通化
 */
const normalizeApiParams = (
  result: GetFacilityResponse["data"] | PostFacilityParams
): FacilityState => {
  const facility = result.facility;
  const facilityJIRITSUKUNREN = result.facility_jiritsukunren_seikatsu || {
    facility_type: 0,
    standard_overuse_flg: 0,
    nursing_supporter_flg: 0,
    short_stay: 0,
    support_for_mentally_ill_discharge: 0
  };
  return {
    corporationName: facility.gov_business_owner,
    officeNumber: facility.gov_facility_number,
    officeName: facility.name,
    serviceType: facility.type_service,
    facilityType: facilityJIRITSUKUNREN.facility_type
      ? facilityJIRITSUKUNREN.facility_type
      : 0,
    representativeName: facility.responsible_person,
    capacity: facility.capacity !== null ? facility.capacity.toString() : "",
    postalCode: facility.postal_code !== null ? facility.postal_code : "",
    selectedPrefectureName: facility.prefecture_name
      ? facility.prefecture_name
      : "NOT_SELECTED",
    selectedCityCode:
      facility.city_id !== null ? facility.city_id.toString() : "NOT_SELECTED",
    restAddress: facility.address,
    tel: facility.tel,
    cityId: facility.city_id !== null ? facility.city_id.toString() : "",
    multiFunctionOfficeFlag:
      facility.multiple_facility_flg === STRING_TRUE_FROM_API,
    masterSubordinateFlg:
      facility.master_subordinate_flg === STRING_TRUE_FROM_API,
    masterFlg: facility.master_flg ? facility.master_flg : "1",
    allCapacity: castString(facility.total_capacity),
    mealSaservedServiceFlag: facility.available_food === STRING_TRUE_FROM_API,
    transferServiceFlag: facility.available_pickup === STRING_TRUE_FROM_API,
    transferServiceType: facility.available_pickup_kind
      ? facility.available_pickup_kind
      : "1",
    mondaySchedule: facility.mon_active_flg === STRING_TRUE_FROM_API,
    mondayStartTime: facility.mon_open
      ? facility.mon_open.toString().substring(0, 5)
      : "",
    mondayEndTime: facility.mon_close
      ? facility.mon_close.toString().substring(0, 5)
      : "",
    tuesdaySchedule: facility.tue_active_flg === STRING_TRUE_FROM_API,
    tuesdayStartTime: facility.tue_open
      ? facility.tue_open.toString().substring(0, 5)
      : "",
    tuesdayEndTime: facility.tue_close
      ? facility.tue_close.toString().substring(0, 5)
      : "",
    wednesdaySchedule: facility.wed_active_flg === STRING_TRUE_FROM_API,
    wednesdayStartTime: facility.wed_open
      ? facility.wed_open.toString().substring(0, 5)
      : "",
    wednesdayEndTime: facility.wed_close
      ? facility.wed_close.toString().substring(0, 5)
      : "",
    thursdaySchedule: facility.thu_active_flg === STRING_TRUE_FROM_API,
    thursdayStartTime: facility.thu_open
      ? facility.thu_open.toString().substring(0, 5)
      : "",
    thursdayEndTime: facility.thu_close
      ? facility.thu_close.toString().substring(0, 5)
      : "",
    fridaySchedule: facility.fri_active_flg === STRING_TRUE_FROM_API,
    fridayStartTime: facility.fri_open
      ? facility.fri_open.toString().substring(0, 5)
      : "",
    fridayEndTime: facility.fri_close
      ? facility.fri_close.toString().substring(0, 5)
      : "",
    saturdaySchedule: facility.sat_active_flg === STRING_TRUE_FROM_API,
    saturdayStartTime: facility.sat_open
      ? facility.sat_open.toString().substring(0, 5)
      : "",
    saturdayEndTime: facility.sat_close
      ? facility.sat_close.toString().substring(0, 5)
      : "",
    sundaySchedule: facility.sun_active_flg === STRING_TRUE_FROM_API,
    sundayStartTime: facility.sun_open
      ? facility.sun_open.toString().substring(0, 5)
      : "",
    sundayEndTime: facility.sun_close
      ? facility.sun_close.toString().substring(0, 5)
      : "",
    standardOverUseFlag:
      facilityJIRITSUKUNREN.standard_overuse_flg === INT_TRUE_FROM_API,
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
    nursingSupporterFlag:
      facilityJIRITSUKUNREN.nursing_supporter_flg === INT_TRUE_FROM_API,
    staffTreatmentSystemType: facility.better_supporter_condition
      ? facility.better_supporter_condition
      : DEFAULT_RADIO_VALUE,
    staffTreatmentSpecificSystemType: facility.specific_better_supporter_condition
      ? facility.specific_better_supporter_condition
      : DEFAULT_RADIO_VALUE,
    commuterLifeSupportFlag:
      facility.execute_kaizen_flg === STRING_TRUE_FROM_API,
    employmentTransitionSupportFlag:
      facility.ab_support_ikou_flg === STRING_TRUE_FROM_API,
    continuationPersonLastYear: facility.ab_support_ikou_result
      ? facility.ab_support_ikou_result.toString()
      : "1",
    numberOfContinuators: castString(facility.ab_support_ikou_result_number),
    visualAuditoryLanguageDisabledPeopleSupportSystemFlag: facility.see_hear_team_flg
      ? facility.see_hear_team_flg === STRING_TRUE_FROM_API
      : false,
    shortStayType: facilityJIRITSUKUNREN.short_stay
      ? facilityJIRITSUKUNREN.short_stay.toString()
      : "0",
    supportForMentallyIllDisChargeSystemType: facilityJIRITSUKUNREN.support_for_mentally_ill_discharge
      ? facilityJIRITSUKUNREN.support_for_mentally_ill_discharge.toString()
      : "0"
  };
};

/**
 * フラグがOFFの時、関連する値を消す
 * 入力後にdisabledとなったテキストエリアのテキストを消す
 */
const removeUnnecessaryValue = (
  target: PostFacilityParams
): PostFacilityParams => {
  const result = {
    facility: { ...target.facility },
    facility_jiritsukunren_seikatsu: target.facility_jiritsukunren_seikatsu
      ? { ...target.facility_jiritsukunren_seikatsu }
      : undefined
  };
  if (result.facility.lack_of_service_admin_flg === STRING_FALSE_FROM_API) {
    result.facility.date_start_lack_of_service_admin = null;
  }
  if (result.facility.lack_of_supporter_flg === STRING_FALSE_FROM_API) {
    result.facility.date_start_lack_of_supporter = null;
  }
  if (result.facility.ab_support_ikou_result !== "2") {
    result.facility.ab_support_ikou_result_number = null;
  }
  if (result.facility.master_subordinate_flg === STRING_FALSE_FROM_API) {
    result.facility.master_flg = null;
  }
  if (
    !ENABLE_SPECIFIC_BETTER_SUPPORTER_CONDITION_VALUES.includes(
      result.facility.better_supporter_condition
    )
  ) {
    result.facility.specific_better_supporter_condition = DEFAULT_RADIO_VALUE;
  }
  return result;
};

export const normalizeGetFacilityResult = (
  response: GetFacilityResponse
): NormalizedGetFacilityResponse => normalizeApiParams(response.data);

export const normalizePostFacilityParams = (
  params: PostFacilityParams
): NormalizedPostFacilityParams => normalizeApiParams(params);

export const normalizePostDifferenceParams = (
  params: PostFacilityParams,
  response: FacilityValues
) => {
  return removeNoChangeData(params, normalizeFormValue(response));
};

export const removeNoChangeData = (
  after: PostFacilityParams,
  before: PostFacilityParams
) => {
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
      ab_support_ikou_result_number: undefined
    },
    facility_jiritsukunren_seikatsu: {
      facility_type: undefined,
      standard_overuse_flg: undefined,
      nursing_supporter_flg: undefined,
      short_stay: undefined,
      support_for_mentally_ill_discharge: undefined
    }
  };

  Object.keys(target).forEach(key => {
    Object.keys(target[key]).forEach(param => {
      if (target[key][param] === undefined) {
        `${before[key][param]}` !== `${after[key][param]}`
          ? (target[key][param] = after[key][param])
          : (target[key][param] = undefined);
      }
    });
  });

  return addParentValue(target, after);
};

/**
 * 子要素の差分判定　子要素に差分がある場合、親要素もパラメータに付与する
 * @param target
 * @param after
 */
const addParentValue = (
  target: PostFacilityParams,
  after: PostFacilityParams
): PostFacilityParams => {
  Object.keys(parentParamsMap).forEach(facilityKey => {
    Object.keys(parentParamsMap[facilityKey]).forEach(paramKey => {
      const childKeys = parentParamsMap[facilityKey][paramKey].childKeys
        ? parentParamsMap[facilityKey][paramKey].childKeys
        : [];
      const isDiffChildren: boolean = childKeys.some((childKey: string) => {
        return target[facilityKey][childKey] !== undefined;
      });
      if (isDiffChildren) {
        target[facilityKey][parentParamsMap[facilityKey][paramKey].key] =
          after[facilityKey][parentParamsMap[facilityKey][paramKey].key];
      }
    });
  });
  return removeNullParam(target);
};

/**
 * パラメータ内のundefinedはパラメータから除外する
 * @param data
 */
const removeNullParam = (data: PostFacilityParams): PostFacilityParams => {
  const targetParm = {
    facility: {},
    facility_jiritsukunren_seikatsu: {}
  };
  // 引数のデータからfacilityとfacility_jiritsukunren_seikatsuを取得
  Object.keys(data).forEach(key => {
    // facilityとfacility_jiritsukunren_seikatsuからparamを取得
    Object.keys(data[key]).forEach(param => {
      if (data[key][param] !== undefined) {
        targetParm[key][param] = data[key][param];
      }
    });
  });

  return targetParm as PostFacilityParams;
};

export const normalizeFormValue = (
  state: FacilityValues
): PostFacilityParams => {
  return removeUnnecessaryValue({
    facility: {
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
      users_vs_supporter_grade: "",
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

      total_capacity: state.basic.multiFunctionOfficeFlag
        ? state.basic.allCapacity !== ""
          ? parseInt(state.basic.allCapacity, 10)
          : null
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
      specific_better_supporter_condition:
        state.additionalItem.staffTreatmentSpecificSystemType,
      ab_support_ikou_flg: state.additionalItem.employmentTransitionSupportFlag
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      ab_support_ikou_result: state.additionalItem
        .employmentTransitionSupportFlag
        ? state.additionalItem.continuationPersonLastYear
        : null,
      ab_support_ikou_result_number: state.additionalItem
        .employmentTransitionSupportFlag
        ? state.additionalItem.numberOfContinuators !== ""
          ? parseInt(state.additionalItem.numberOfContinuators, 10)
          : null
        : null
    },
    facility_jiritsukunren_seikatsu: {
      facility_type:
        state.basic.facilityType !== ""
          ? parseInt(state.basic.facilityType, 10)
          : 0,
      standard_overuse_flg: state.subtractionItem.standardOverUseFlag
        ? INT_TRUE_FROM_API
        : INT_FALSE_FROM_API,
      nursing_supporter_flg: state.additionalItem.nursingSupporterFlag
        ? INT_TRUE_FROM_API
        : INT_FALSE_FROM_API,
      short_stay:
        state.additionalItem.shortStayType !== ""
          ? parseInt(state.additionalItem.shortStayType, 10)
          : 0,
      support_for_mentally_ill_discharge:
        state.additionalItem.supportForMentallyIllDisChargeSystemType !== ""
          ? parseInt(
              state.additionalItem.supportForMentallyIllDisChargeSystemType,
              10
            )
          : 0
    }
  });
};

// パラメータの親子関係マッピング表
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
