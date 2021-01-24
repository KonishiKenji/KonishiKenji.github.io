import { FacilityState } from "./types";
import { GetFacilityResponse } from "@api/requests/facility/getFacility";
import { PostFacilityParams } from "@api/requests/facility/postFacility";
import { FacilityValues } from "@initialize/mgr/TANKINYUSHO/facility/initialValues";
import {
  INT_FALSE_FROM_API,
  INT_TRUE_FROM_API,
  STRING_FALSE_FROM_API,
  STRING_TRUE_FROM_API,
  DEFAULT_RADIO_VALUE,
  ENABLE_SPECIFIC_BETTER_SUPPORTER_CONDITION_VALUES
} from "@constants/variables";
import { selectDateValueToDate } from "@utils/date";

/**
 * Normalized Type
 */
export type NormalizedGetFacilityResponse = FacilityState;
export type NormalizedPostFacilityParams = FacilityState;

const castString = (value: number | null | undefined) => {
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
  const facilityTANKINYUSHO = result.facility_tankinyusho || {
    facility_type: 0,
    medical_type: 0,
    fulltime_nursing_staff: 0,
    serious_disability_flg: 0,
    facility_combi_status: 0,
    large_scale_flg: 0,
    medical_support_flg: 0,
    dietician: 0
  };
  return {
    corporationName: facility.gov_business_owner,
    officeNumber: facility.gov_facility_number,
    officeName: facility.name,
    serviceType: facility.type_service,
    facilityType: facilityTANKINYUSHO.facility_type
      ? facilityTANKINYUSHO.facility_type
      : 0,
    medicalType: facilityTANKINYUSHO.medical_type
      ? facilityTANKINYUSHO.medical_type
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
    isMasterRadioValue: facility.master_flg ? facility.master_flg : "1",
    allCapacity: castString(facility.total_capacity),
    facilityCombiStatus: facilityTANKINYUSHO.facility_combi_status
      ? facilityTANKINYUSHO.facility_combi_status
      : 0,
    largeScaleFlg: facilityTANKINYUSHO.large_scale_flg === INT_TRUE_FROM_API,
    lackOfLifeSupportMemberFlag:
      facility.lack_of_supporter_flg === STRING_TRUE_FROM_API,
    lackOfLifeSupportMemberStartDate:
      facility.date_start_lack_of_supporter !== null
        ? facility.date_start_lack_of_supporter
        : "",

    welfareSpecialistPlacementType: facility.welfare_condition
      ? facility.welfare_condition
      : DEFAULT_RADIO_VALUE,
    fulltimeNursingStaff: facilityTANKINYUSHO.fulltime_nursing_staff
      ? facilityTANKINYUSHO.fulltime_nursing_staff
      : 0,
    staffTreatmentSystemType: facility.better_supporter_condition
      ? facility.better_supporter_condition
      : DEFAULT_RADIO_VALUE,
    staffTreatmentSpecificSystemType: facility.specific_better_supporter_condition
      ? facility.specific_better_supporter_condition
      : DEFAULT_RADIO_VALUE,
    medicalSupportFlg:
      facilityTANKINYUSHO.medical_support_flg === INT_TRUE_FROM_API,
    dietician: facilityTANKINYUSHO.dietician
      ? facilityTANKINYUSHO.dietician
      : 0,
    seriousDisabilityFlg:
      facilityTANKINYUSHO.serious_disability_flg === INT_TRUE_FROM_API
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
    facility_tankinyusho: target.facility_tankinyusho
      ? { ...target.facility_tankinyusho }
      : undefined
  };
  if (result.facility_tankinyusho) {
    if (
      result.facility_tankinyusho.facility_type !== 1 &&
      result.facility_tankinyusho.facility_type !== 2
    ) {
      result.facility_tankinyusho.medical_type = 0;
    }
    if (result.facility_tankinyusho.facility_combi_status !== 0) {
      result.facility_tankinyusho.large_scale_flg = 0;
    }
    if (result.facility_tankinyusho.facility_type !== 3) {
      result.facility.welfare_condition = "1";
    }
  }
  if (result.facility.lack_of_supporter_flg === STRING_FALSE_FROM_API) {
    result.facility.date_start_lack_of_supporter = null;
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
      specific_better_supporter_condition: undefined,
      master_subordinate_flg: undefined,
      // multiple_facility_flgを毎回送信しているため
      // 関係のあるmaster_flgとtotal_capacityも毎回送信する
      master_flg: after.facility.master_flg,
      total_capacity: after.facility.total_capacity
    },
    facility_tankinyusho: {
      facility_type: after.facility_tankinyusho
        ? after.facility_tankinyusho.facility_type
        : undefined,
      medical_type: undefined,
      fulltime_nursing_staff: undefined,
      serious_disability_flg: undefined,
      facility_combi_status: undefined,
      large_scale_flg: undefined,
      medical_support_flg: undefined,
      dietician: undefined
    }
  };

  Object.keys(target).forEach(key => {
    Object.keys(target[key]).forEach(param => {
      if (target[key][param] === undefined) {
        before[key][param] !== after[key][param]
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
    facility_tankinyusho: {}
  };
  // 引数のデータからfacilityとfacility_tankinyushoを取得
  Object.keys(data).forEach(key => {
    // facilityとfacility_tankinyushoからparamを取得
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
      master_flg: state.basic.isMasterRadioValue,
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
      lack_of_service_admin_flg: "",
      date_start_lack_of_service_admin: null,
      origin_local_gov_flg: "",
      see_hear_team_flg: null,
      total_capacity: state.basic.multiFunctionOfficeFlag
        ? state.basic.allCapacity !== ""
          ? parseInt(state.basic.allCapacity, 10)
          : null
        : null,
      specific_better_supporter_condition:
        state.additionalItem.staffTreatmentSpecificSystemType
    },
    facility_tankinyusho: {
      facility_type:
        state.basic.facilityType !== ""
          ? parseInt(state.basic.facilityType, 10)
          : 0,
      medical_type:
        state.basic.medicalType !== ""
          ? parseInt(state.basic.medicalType, 10)
          : 0,
      fulltime_nursing_staff:
        state.additionalItem.fulltimeNursingStaffFlg &&
        state.additionalItem.fulltimeNursingStaff !== ""
          ? parseInt(state.additionalItem.fulltimeNursingStaff, 10)
          : 0,
      serious_disability_flg: state.additionalItem.seriousDisabilityFlg
        ? INT_TRUE_FROM_API
        : INT_FALSE_FROM_API,
      facility_combi_status:
        state.subtractionItem.facilityCombiStatus !== ""
          ? parseInt(state.subtractionItem.facilityCombiStatus, 10)
          : 0,
      large_scale_flg: state.subtractionItem.largeScaleFlg
        ? INT_TRUE_FROM_API
        : INT_FALSE_FROM_API,
      medical_support_flg: state.additionalItem.medicalSupportFlg
        ? INT_TRUE_FROM_API
        : INT_FALSE_FROM_API,
      dietician:
        state.additionalItem.dieticianFlg &&
        state.additionalItem.dietician !== ""
          ? parseInt(state.additionalItem.dietician, 10)
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
    better_supporter_condition: {
      key: "better_supporter_condition",
      childKeys: ["specific_better_supporter_condition"]
    },
    specific_better_supporter_condition: {
      key: "specific_better_supporter_condition",
      childKeys: ["better_supporter_condition"]
    }
  },
  facility_tankinyusho: {
    facility_type: {
      key: "facility_type",
      childKeys: ["medical_type"]
    },
    medical_type: {
      key: "medical_type",
      childKeys: ["facility_type"]
    },
    facility_combi_status: {
      key: "facility_combi_status",
      childKeys: ["large_scale_flg"]
    },
    large_scale_flg: {
      key: "large_scale_flg",
      childKeys: ["facility_combi_status"]
    }
  }
};
