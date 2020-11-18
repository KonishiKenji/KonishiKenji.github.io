/**
 * ActionNames
 */

export const FETCH_STARTED = "TANKINYUSHO/FACILITY/FETCH_STARTED";
export const FETCH_SUCCESS = "TANKINYUSHO/FACILITY/FETCH_SUCCESS";
export const FETCH_FAILED = "TANKINYUSHO/FACILITY/FETCH_FAILED";
export const POST_STARTED = "TANKINYUSHO/FACILITY/POST_STARTED";
export const POST_SUCCESS = "TANKINYUSHO/FACILITY/POST_SUCCESS";
export const POST_FAILED = "TANKINYUSHO/FACILITY/POST_FAILED";

/**
 * Basic
 */
export interface FacilityState {
  corporationName: string;
  officeNumber: string;
  officeName: string;
  serviceType: string;
  facilityType: number;
  medicalType: number;
  representativeName: string;
  capacity: string;
  postalCode: string;
  selectedPrefectureName: string;
  selectedCityCode: string;
  restAddress: string;
  tel: string;
  cityId: string;
  multiFunctionOfficeFlag: boolean;
  masterSubordinateFlg: boolean;
  isMasterRadioValue: string;
  allCapacity: string;

  // SubtractionItemSection
  facilityCombiStatus: number;
  largeScaleFlg: boolean;
  lackOfLifeSupportMemberFlag: boolean;
  lackOfLifeSupportMemberStartDate: string;

  // AdditionItemSection
  welfareSpecialistPlacementType: string;
  fulltimeNursingStaff: number;
  staffTreatmentSystemType: string;
  staffTreatmentSpecificSystemType: string;
  medicalSupportFlg: boolean;
  dietician: number;
  seriousDisabilityFlg: boolean;
}
