import { FacilityState } from "./types";
import { GetFacilityResponse } from "@api/requests/facility/getFacility";
import { PostFacilityParams } from "@api/requests/facility/postFacility";
import { FacilityValues } from "@initialize/mgr/GroupHome/facility/initialValues";
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

/**
 * GetFacilityResponse === PostFacilityParams前提の共通化
 */
const normalizeApiParams = (
  result: GetFacilityResponse["data"] | PostFacilityParams
): FacilityState => {
  const facility = result.facility;
  const facilityGroup = result.facility_group_home || {
    facility_type: 0,
    night_shift_supporter_flg: 0,
    nursing_supporter_flg: 1,
    commuter_support_flg: 0,
    subtraction_of_large_scale_housing: 0,
    def_night_support_flg: 0,
    ave_users_last_fiscal_year: "",
    night_support_type: ""
  };
  const units = result.units
    ? result.units.map(unit => ({
        id: unit.id,
        unit_name: `${unit.unit_name || ""}`,
        night_support_type: `${unit.night_support_type || 1}`,
        ave_users_last_fiscal_year:
          typeof unit.ave_users_last_fiscal_year === "number"
            ? `${unit.ave_users_last_fiscal_year}`
            : "0",
        is_deleted: unit.is_deleted === INT_TRUE_FROM_API
      }))
    : [];

  return {
    units,
    corporationName: facility.gov_business_owner,
    officeNumber: facility.gov_facility_number,
    officeName: facility.name,
    serviceType: facility.type_service,
    groupHomeType: facilityGroup.facility_type,
    representativeName: facility.responsible_person,
    capacity: facility.capacity !== null ? facility.capacity.toString() : "",
    postalCode: facility.postal_code,
    selectedPrefectureName: facility.prefecture_name,
    selectedCityCode:
      facility.city_id !== null ? facility.city_id.toString() : "",
    restAddress: facility.address,
    tel: facility.tel,
    multiFunctionOfficeFlag:
      facility.multiple_facility_flg === STRING_TRUE_FROM_API,
    operatingUnitFlag: facility.operating_unit_flg === INT_TRUE_FROM_API,
    lackOfLifeSupportMemberFlag:
      facility.lack_of_supporter_flg !== STRING_FALSE_FROM_API,
    lackOfLifeSupportMemberStartDate:
      facility.date_start_lack_of_supporter !== null
        ? facility.date_start_lack_of_supporter
        : "",
    lackOfResponsiblePersonFlag:
      facility.lack_of_service_admin_flg !== STRING_FALSE_FROM_API,
    lackOfResponsiblePersonStartDate:
      facility.date_start_lack_of_service_admin !== null
        ? facility.date_start_lack_of_service_admin
        : "",
    establishedByLocalGovernmentsFlag:
      facility.origin_local_gov_flg === STRING_TRUE_FROM_API,
    staffPlacementType: facility.users_vs_supporter_grade
      ? facility.users_vs_supporter_grade
      : DEFAULT_RADIO_VALUE,
    welfareSpecialistPlacementType: facility.welfare_condition
      ? facility.welfare_condition
      : DEFAULT_RADIO_VALUE,
    staffTreatmentSystemType: facility.better_supporter_condition
      ? facility.better_supporter_condition
      : DEFAULT_RADIO_VALUE,
    staffTreatmentSpecificSystemType: facility.specific_better_supporter_condition
      ? facility.specific_better_supporter_condition
      : DEFAULT_RADIO_VALUE,
    nightSupportFlag:
      facilityGroup.def_night_support_flg !== INT_FALSE_FROM_API,
    nightSupportType: `${facilityGroup.night_support_type || ""}`,
    averageUsersLastYear: facilityGroup.ave_users_last_fiscal_year.toString(),
    nightStaffAllocationSystemFlag:
      facilityGroup.night_shift_supporter_flg === INT_TRUE_FROM_API,
    nursingStaffPlacementSystemFlag: facilityGroup.nursing_supporter_flg
      ? facilityGroup.nursing_supporter_flg.toString()
      : DEFAULT_RADIO_VALUE,
    visualAuditoryLanguageDisabledPeopleSupportSystemFlag: facility.see_hear_team_flg
      ? facility.see_hear_team_flg === STRING_TRUE_FROM_API
      : false,
    commuterLifeSupportFlag:
      facilityGroup.commuter_support_flg === INT_TRUE_FROM_API,
    subtractionOfLargeScaleHousing: facilityGroup.subtraction_of_large_scale_housing
      ? facilityGroup.subtraction_of_large_scale_housing.toString()
      : "0"
  };
};

/**
 * フラグがOFFの時、関連する値を消す
 */
const removeUnnecessaryValue = (
  target: PostFacilityParams
): PostFacilityParams => {
  const result = {
    facility: { ...target.facility },
    facility_group_home: target.facility_group_home
      ? { ...target.facility_group_home }
      : undefined,
    units: target.units
  };
  if (result.facility.lack_of_service_admin_flg === STRING_FALSE_FROM_API) {
    result.facility.date_start_lack_of_service_admin = null;
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
  // operating_unit_flgがなければ送らない
  if (!target.facility.operating_unit_flg) {
    delete result.units;
  }

  return result;
};

export const normalizeGetFacilityResult = (
  response: GetFacilityResponse
): NormalizedGetFacilityResponse => normalizeApiParams(response.data);

export const normalizePostFacilityParams = (
  params: PostFacilityParams
): NormalizedPostFacilityParams => normalizeApiParams(params);

export const normalizeFormValue = (
  state: FacilityValues
): PostFacilityParams => {
  // 新規(id:null)で削除フラグが立っているものは弾く
  const filteredUnits = state.units.filter(
    unit => !(unit.id === null && unit.is_deleted)
  );
  const units = filteredUnits.map(unit => ({
    id: unit.id,
    unit_name: unit.unit_name,
    // 夜間支援体制加算フラグをチェックする
    night_support_type:
      state.additionalItem.nightSupportFlag && unit.night_support_type
        ? +unit.night_support_type
        : 1,
    // フラグチェックに加えて、night_support_typeが「なし」なら0を送る
    ave_users_last_fiscal_year:
      state.additionalItem.nightSupportFlag &&
      unit.night_support_type !== "1" &&
      unit.ave_users_last_fiscal_year
        ? +unit.ave_users_last_fiscal_year
        : 0,
    is_deleted: unit.is_deleted ? INT_TRUE_FROM_API : INT_FALSE_FROM_API
  }));

  return removeUnnecessaryValue({
    units,
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
      operating_unit_flg: state.basic.operatingUnitFlag
        ? INT_TRUE_FROM_API
        : INT_FALSE_FROM_API,
      users_vs_supporter_grade: state.additionalItem.staffPlacementType,
      welfare_condition: state.additionalItem.welfareSpecialistPlacementType,
      better_supporter_condition: state.additionalItem.staffTreatmentSystemType,
      specific_better_supporter_condition:
        state.additionalItem.staffTreatmentSpecificSystemType,
      lack_of_supporter_flg: state.subtractionItem.lackOfLifeSupportMemberFlag
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      date_start_lack_of_supporter: state.subtractionItem
        .lackOfLifeSupportMemberFlag
        ? selectDateValueToDate(
            state.subtractionItem.lackOfLifeSupportMemberStartDate
          )
        : "",
      lack_of_service_admin_flg: state.subtractionItem
        .lackOfResponsiblePersonFlag
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      date_start_lack_of_service_admin: state.subtractionItem
        .lackOfResponsiblePersonFlag
        ? selectDateValueToDate(
            state.subtractionItem.lackOfResponsiblePersonStartDate
          )
        : "",
      origin_local_gov_flg: state.subtractionItem
        .establishedByLocalGovernmentsFlag
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      see_hear_team_flg: state.additionalItem
        .visualAuditoryLanguageDisabledPeopleSupportSystemFlag
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API
    },
    facility_group_home: {
      facility_type: parseInt(state.basic.groupHomeType, 10),
      night_shift_supporter_flg: state.additionalItem
        .nightStaffAllocationSystemFlag
        ? INT_TRUE_FROM_API
        : INT_FALSE_FROM_API,
      nursing_supporter_flg: parseInt(
        state.additionalItem.nursingStaffPlacementSystemFlag,
        10
      ),
      commuter_support_flg: state.additionalItem.commuterLifeSupportFlag
        ? INT_TRUE_FROM_API
        : INT_FALSE_FROM_API,
      subtraction_of_large_scale_housing:
        state.subtractionItem.subtractionOfLargeScaleHousing &&
        state.subtractionItem.subtractionOfLargeScaleHousingFlag
          ? parseInt(state.subtractionItem.subtractionOfLargeScaleHousing, 10)
          : 0,
      // 夜間支援体制加算
      def_night_support_flg: state.additionalItem.nightSupportFlag
        ? INT_TRUE_FROM_API
        : INT_FALSE_FROM_API,
      ave_users_last_fiscal_year:
        !state.basic.operatingUnitFlag && state.additionalItem.nightSupportFlag
          ? parseInt(state.additionalItem.averageUsersLastYear, 10)
          : 0,
      night_support_type:
        !state.basic.operatingUnitFlag && state.additionalItem.nightSupportFlag
          ? parseInt(state.additionalItem.nightSupportType, 10)
          : null
    }
  });
};
