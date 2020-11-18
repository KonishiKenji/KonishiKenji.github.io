import { BasicValues } from "@interfaces/mgr/GroupHome/facility/basic";
import { SubtractionItemValues } from "@interfaces/mgr/GroupHome/facility/subtractionItem";
import { AdditionalItemValues } from "@interfaces/mgr/GroupHome/facility/additionItem";
import { UnitsValues } from "@interfaces/mgr/GroupHome/facility/units";
import { FacilityState } from "@stores/domain/mgr/GroupHome/facility/types";
import { dateToSelectDateValueYYYYM } from "@utils/date";
import get from "lodash-es/get";

export type FacilityValues = BasicValues &
  SubtractionItemValues &
  AdditionalItemValues &
  UnitsValues;

// ユニットの初期値
export const unitInitialValue = {
  id: null,
  unit_name: "",
  night_support_type: "1",
  ave_users_last_fiscal_year: "0",
  is_deleted: false
};

const initialValues = (state?: FacilityState): FacilityValues => {
  // ユニットは複数 ≒ 必ず2件以上
  const unitsValue =
    state && state.units.length > 0
      ? state.units
      : [unitInitialValue, unitInitialValue];

  return {
    basic: {
      corporationName: get(state, "corporationName") || "",
      officeNumber: get(state, "officeNumber") || "",
      officeName: get(state, "officeName") || "",
      serviceType: get(state, "serviceType") || "",
      groupHomeType: `${get(state, "groupHomeType") || ""}`,
      representativeName: get(state, "representativeName") || "",
      capacity: get(state, "capacity") || "",
      multiFunctionOfficeFlag: get(state, "multiFunctionOfficeFlag") || false,
      postalCode: get(state, "postalCode") || "",
      prefectureId: get(state, "selectedPrefectureName") || "",
      cityId: get(state, "selectedCityCode") || "",
      restAddress: get(state, "restAddress") || "",
      tel: get(state, "tel") || "",
      operatingUnitFlag: get(state, "operatingUnitFlag") || false
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
      lackOfLifeSupportMemberStartDate: state
        ? dateToSelectDateValueYYYYM(state.lackOfLifeSupportMemberStartDate)
        : { year: "", month: "", day: "1" }, // APIの仕様上dayは1固定
      lackOfResponsiblePersonFlag: state
        ? state.lackOfResponsiblePersonFlag
        : false,
      lackOfResponsiblePersonStartDate: state
        ? dateToSelectDateValueYYYYM(state.lackOfResponsiblePersonStartDate)
        : { year: "", month: "", day: "1" }, // APIの仕様上dayは1固定
      subtractionOfLargeScaleHousingFlag:
        state && state.subtractionOfLargeScaleHousing !== "0" ? true : false,
      subtractionOfLargeScaleHousing:
        state && state.subtractionOfLargeScaleHousing !== "0"
          ? state.subtractionOfLargeScaleHousing
          : "1"
    },
    additionalItem: {
      staffPlacementType: state ? state.staffPlacementType : "",
      welfareSpecialistPlacementType: state
        ? state.welfareSpecialistPlacementType
        : "",
      staffTreatmentSystemType: state ? state.staffTreatmentSystemType : "",
      staffTreatmentSpecificSystemType: state
        ? state.staffTreatmentSpecificSystemType
        : "",
      nursingStaffPlacementSystemFlag: state
        ? state.nursingStaffPlacementSystemFlag
        : "",
      nightStaffAllocationSystemFlag: state
        ? state.nightStaffAllocationSystemFlag
        : false,
      commuterLifeSupportFlag: state ? state.commuterLifeSupportFlag : false,
      visualAuditoryLanguageDisabledPeopleSupportSystemFlag: state
        ? state.visualAuditoryLanguageDisabledPeopleSupportSystemFlag
        : false,
      nightSupportFlag: get(state, "nightSupportFlag") || false,
      nightSupportType: get(state, "nightSupportType") || "",
      averageUsersLastYear: get(state, "averageUsersLastYear") || "0"
    },
    units: unitsValue
  };
};

export default initialValues;
