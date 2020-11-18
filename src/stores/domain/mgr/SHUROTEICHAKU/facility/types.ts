/**
 * ActionNames
 */

export const FETCH_STARTED = "SHUROTEICHAKU/FACILITY/FETCH_STARTED";
export const FETCH_SUCCESS = "SHUROTEICHAKU/FACILITY/FETCH_SUCCESS";
export const FETCH_FAILED = "SHUROTEICHAKU/FACILITY/FETCH_FAILED";
export const POST_STARTED = "SHUROTEICHAKU/FACILITY/POST_STARTED";
export const POST_SUCCESS = "SHUROTEICHAKU/FACILITY/POST_SUCCESS";
export const POST_FAILED = "SHUROTEICHAKU/FACILITY/POST_FAILED";

/**
 * Basic
 */
export interface FacilityState {
  corporationName: string;
  officeNumber: string;
  officeName: string;
  serviceType: string;
  representativeName: string;
  capacity: string;
  postalCode: string;
  selectedPrefectureName: string;
  selectedCityCode: string;
  restAddress: string;
  tel: string;
  cityId: string;
  numberOfUsers: string;
  multiFunctionOfficeFlag: boolean;
  masterSubordinateFlg: boolean;
  masterFlg: string;
  allCapacity: string;

  // SubtractionItemSection
  rateGetJob: string;
  lackOfLifeSupportMemberFlag: boolean;
  lackOfLifeSupportMemberStartDate: string;
  lackOfResponsiblePersonFlag: boolean;
  lackOfResponsiblePersonStartDate: string;

  // FacilityAdditionItemSection
  workHardenesResultFlag: boolean;
  workPlaceAdaptationAssistantFlag: boolean;
}
