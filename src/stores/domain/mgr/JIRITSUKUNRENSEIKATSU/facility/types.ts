/**
 * ActionNames
 */

export const FETCH_STARTED = "JIRITSUKUNRENSEIKATSU/FACILITY/FETCH_STARTED";
export const FETCH_SUCCESS = "JIRITSUKUNRENSEIKATSU/FACILITY/FETCH_SUCCESS";
export const FETCH_FAILED = "JIRITSUKUNRENSEIKATSU/FACILITY/FETCH_FAILED";
export const POST_STARTED = "JIRITSUKUNRENSEIKATSU/FACILITY/POST_STARTED";
export const POST_SUCCESS = "JIRITSUKUNRENSEIKATSU/FACILITY/POST_SUCCESS";
export const POST_FAILED = "JIRITSUKUNRENSEIKATSU/FACILITY/POST_FAILED";

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

  // AdministrationSchedule
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
  standardOverUseFlag: boolean;
  lackOfLifeSupportMemberFlag: boolean;
  lackOfLifeSupportMemberStartDate: string;
  lackOfResponsiblePersonFlag: boolean;
  lackOfResponsiblePersonStartDate: string;

  // FacilityAdditionItemSection
  welfareSpecialistPlacementType: string;
  nursingSupporterFlag: boolean;
  staffTreatmentSystemType: string;
  staffTreatmentSpecificSystemType: string;
  commuterLifeSupportFlag: boolean;
  employmentTransitionSupportFlag: boolean;
  continuationPersonLastYear: string;
  numberOfContinuators: string;
  visualAuditoryLanguageDisabledPeopleSupportSystemFlag: boolean;
  shortStayType: string;
  supportForMentallyIllDisChargeSystemType: string;
}
