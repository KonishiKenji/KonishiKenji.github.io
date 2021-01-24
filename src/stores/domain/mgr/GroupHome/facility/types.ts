/**
 * ActionNames
 */
export const FETCH_STARTED = "GROUP_HOME/FACILITY/FETCH_STARTED";
export const FETCH_SUCCESS = "GROUP_HOME/FACILITY/FETCH_SUCCESS";
export const FETCH_FAILED = "GROUP_HOME/FACILITY/FETCH_FAILED";
export const POST_STARTED = "GROUP_HOME/FACILITY/POST_STARTED";
export const POST_SUCCESS = "GROUP_HOME/FACILITY/POST_SUCCESS";
export const POST_FAILED = "GROUP_HOME/FACILITY/POST_FAILED";

/**
 * State
 */
export interface FacilityState {
  corporationName: string;
  officeNumber: string;
  officeName: string;
  serviceType: string;
  groupHomeType: number;
  representativeName: string;
  capacity: string;
  postalCode: string;
  selectedPrefectureName: string;
  selectedCityCode: string;
  restAddress: string;
  tel: string;
  multiFunctionOfficeFlag: boolean;
  operatingUnitFlag: boolean;

  // FacilitySubtractionItemSection
  lackOfLifeSupportMemberFlag: boolean;
  lackOfLifeSupportMemberStartDate: string;
  lackOfResponsiblePersonFlag: boolean;
  lackOfResponsiblePersonStartDate: string;
  establishedByLocalGovernmentsFlag: boolean;

  // FacilityAdditionItemSection
  staffPlacementType: string;
  welfareSpecialistPlacementType: string;
  staffTreatmentSystemType: string;
  staffTreatmentSpecificSystemType: string;
  nightSupportFlag: boolean;
  nightSupportType: string;
  averageUsersLastYear: string;
  nightStaffAllocationSystemFlag: boolean;
  nursingStaffPlacementSystemFlag: string;
  visualAuditoryLanguageDisabledPeopleSupportSystemFlag: boolean;
  commuterLifeSupportFlag: boolean;
  subtractionOfLargeScaleHousing: string;

  // units
  units: {
    id: number | null;
    unit_name: string;
    night_support_type: string;
    ave_users_last_fiscal_year: string;
    is_deleted: boolean;
  }[];
}
