/**
 * ActionNames
 */

export const FETCH_STARTED = "SEIKATSUKAIGO/FACILITY/FETCH_STARTED";
export const FETCH_SUCCESS = "SEIKATSUKAIGO/FACILITY/FETCH_SUCCESS";
export const FETCH_FAILED = "SEIKATSUKAIGO/FACILITY/FETCH_FAILED";
export const POST_STARTED = "SEIKATSUKAIGO/FACILITY/POST_STARTED";
export const POST_SUCCESS = "SEIKATSUKAIGO/FACILITY/POST_SUCCESS";
export const POST_FAILED = "SEIKATSUKAIGO/FACILITY/POST_FAILED";

/**
 * Basic
 */
export interface FacilityState {
  corporationName: string;
  officeNumber: string;
  officeName: string;
  serviceType: string;
  facilityType: number;
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
  masterFlg: string;
  allCapacity: string;
  mealSaservedServiceFlag: boolean;
  transferServiceFlag: boolean;
  transferServiceType: string;
  seriousSupporterFlg: boolean;

  /**
   * AdministrationSchedule
   */
  mondaySchedule: boolean;
  mondayStartTime: string;
  mondayEndTime: string;
  tuesdaySchedule: boolean;
  tuesdayStartTime: string;
  tuesdayEndTime: string;
  wednesdaySchedule: boolean;
  wednesdayStartTime: string;
  wednesdayEndTime: string;
  thursdaySchedule: boolean;
  thursdayStartTime: string;
  thursdayEndTime: string;
  fridaySchedule: boolean;
  fridayStartTime: string;
  fridayEndTime: string;
  saturdaySchedule: boolean;
  saturdayStartTime: string;
  saturdayEndTime: string;
  sundaySchedule: boolean;
  sundayStartTime: string;
  sundayEndTime: string;

  // SubtractionItemSection
  establishedByLocalGovernmentsFlag: boolean;
  lackOfLifeSupportMemberFlag: boolean;
  lackOfLifeSupportMemberStartDate: string;
  lackOfResponsiblePersonFlag: boolean;
  lackOfResponsiblePersonStartDate: string;
  openedOrShortTimeFlag: boolean;
  doctorInstallationFlag: boolean;

  // FacilityAdditionItemSection
  staffPlacementType: string;
  welfareSpecialistPlacementType: string;
  fullTimeNursePlacementType: string;
  staffTreatmentSystemType: string;
  staffTreatmentSpecificSystemType: string;
  commuterLifeSupportFlag: boolean;
  severeFailureSupportFlag: boolean;
  visualAuditoryLanguageDisabledPeopleSupportSystemFlag: boolean;
  employmentTransitionSupportFlag: boolean;
  continuationPersonLaseYear: string;
  numberOfContinuations: string;
}
