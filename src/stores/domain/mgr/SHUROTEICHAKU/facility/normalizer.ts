import { FacilityState } from "./types";
import { GetFacilityResponse } from "@api/requests/facility/getFacility";
import { PostFacilityParams } from "@api/requests/facility/postFacility";
import { FacilityValues } from "@initialize/mgr/SHUROTEICHAKU/facility/initialValues";
import {
  INT_FALSE_FROM_API,
  INT_TRUE_FROM_API,
  STRING_FALSE_FROM_API,
  STRING_TRUE_FROM_API
} from "@constants/variables";
import { selectDateValueToDate } from "@utils/date";

// , formatTime
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
  const facilitySHUROTEICHAKU = result.facility_shuroteichaku || {
    number_of_users: 0,
    rate_get_job: 0,
    workhardenes_result_flg: 0,
    workplace_adaptation_assistant_flg: 0
  };
  return {
    corporationName: facility.gov_business_owner,
    officeNumber: facility.gov_facility_number,
    officeName: facility.name,
    serviceType: facility.type_service,
    representativeName: facility.responsible_person,
    postalCode: facility.postal_code !== null ? facility.postal_code : "",
    selectedPrefectureName: facility.prefecture_name
      ? facility.prefecture_name
      : "NOT_SELECTED",
    selectedCityCode:
      facility.city_id !== null ? facility.city_id.toString() : "NOT_SELECTED",
    restAddress: facility.address,
    tel: facility.tel,
    cityId: facility.city_id !== null ? facility.city_id.toString() : "",
    numberOfUsers: castString(facilitySHUROTEICHAKU.number_of_users),
    rateGetJob: facilitySHUROTEICHAKU.rate_get_job
      ? facilitySHUROTEICHAKU.rate_get_job.toString()
      : "1",
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
    workHardenesResultFlag: facilitySHUROTEICHAKU.workhardenes_result_flg
      ? facilitySHUROTEICHAKU.workhardenes_result_flg === INT_TRUE_FROM_API
      : false,
    workPlaceAdaptationAssistantFlag: facilitySHUROTEICHAKU.workplace_adaptation_assistant_flg
      ? facilitySHUROTEICHAKU.workplace_adaptation_assistant_flg ===
        INT_TRUE_FROM_API
      : false,
    capacity: "",
    multiFunctionOfficeFlag:
      facility.multiple_facility_flg === STRING_TRUE_FROM_API,
    masterSubordinateFlg:
      facility.master_subordinate_flg === STRING_TRUE_FROM_API,
    masterFlg: facility.master_flg ? facility.master_flg : "1",
    allCapacity: castString(facility.total_capacity)
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
    facility_shuroteichaku: { ...target.facility_shuroteichaku }
  };
  if (result.facility.lack_of_service_admin_flg === STRING_FALSE_FROM_API) {
    result.facility.date_start_lack_of_service_admin = null;
  }
  if (result.facility.lack_of_supporter_flg === STRING_FALSE_FROM_API) {
    result.facility.date_start_lack_of_supporter = null;
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

      master_subordinate_flg: undefined,
      // multiple_facility_flgを毎回送信しているため
      // 関係のあるmaster_flgとtotal_capacityも毎回送信する
      master_flg: after.facility.master_flg,
      total_capacity: after.facility.total_capacity
    },
    facility_shuroteichaku: {
      number_of_users: undefined,
      rate_get_job: undefined,
      workhardenes_result_flg: undefined,
      workplace_adaptation_assistant_flg: undefined
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

  return target;
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
      capacity: null,
      multiple_facility_flg: state.basic.multiFunctionOfficeFlag
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      master_subordinate_flg: state.basic.masterSubordinateFlg
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      master_flg: state.basic.masterFlg,
      total_capacity: state.basic.multiFunctionOfficeFlag
        ? state.basic.allCapacity !== ""
          ? parseInt(state.basic.allCapacity, 10)
          : null
        : null,
      postal_code: state.basic.postalCode,
      prefecture_name: state.basic.prefectureId,
      city_id: parseInt(state.basic.cityId, 10),
      address: state.basic.restAddress,
      tel: state.basic.tel,
      users_vs_supporter_grade: "",
      welfare_condition: "",
      better_supporter_condition: "",
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
      origin_local_gov_flg: "",
      see_hear_team_flg: ""
    },
    facility_shuroteichaku: {
      number_of_users:
        state.basic.numberOfUsers !== ""
          ? parseInt(state.basic.numberOfUsers, 10)
          : 0,
      rate_get_job:
        state.subtractionItem.rateGetJob !== ""
          ? parseInt(state.subtractionItem.rateGetJob, 10)
          : 0,
      workhardenes_result_flg: state.additionalItem.workHardenesResultFlag
        ? INT_TRUE_FROM_API
        : INT_FALSE_FROM_API,
      workplace_adaptation_assistant_flg: state.additionalItem
        .workPlaceAdaptationAssistantFlag
        ? INT_TRUE_FROM_API
        : INT_FALSE_FROM_API
    }
  });
};
