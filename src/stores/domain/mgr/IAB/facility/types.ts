import { GetFacilityResponse } from "@api/requests/facility/getFacility";

/**
 * ActionNames
 */

export const FETCH_STARTED = "IAB/FACILITY/FETCH_STARTED";
export const FETCH_SUCCESS = "IAB/FACILITY/FETCH_SUCCESS";
export const FETCH_FAILED = "IAB/FACILITY/FETCH_FAILED";
export const POST_STARTED = "IAB/FACILITY/POST_STARTED";
export const POST_SUCCESS = "IAB/FACILITY/POST_SUCCESS";
export const POST_FAILED = "IAB/FACILITY/POST_FAILED";

/**
 * Basic
 */
export interface FacilityState {
  id: number;
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
  multiFunctionOfficeFlag: boolean;
  masterSubordinateFlg: boolean;
  masterFlg: string;
  allCapacity: string;
  aExecuteMeasuresForLoadReductionFlag: boolean;
  percentOfLoadReduction: string;
  yenOfLoadReduction: string;
  loadReductionType: string;
  mealSaservedServiceFlag: boolean;
  transferServiceFlag: boolean;
  transferServiceType: string;

  /**
   * WorkingTimeSection
   */
  unitEngrave: string;
  startHor: string;
  startMin: string;
  endHor: string;
  endMin: string;
  users: GetFacilityResponse["data"]["users"];
  workBreakTimes: GetFacilityResponse["data"]["workBreakTimes"];
  workBreakTimeItems: GetFacilityResponse["data"]["workBreakTimeItems"];
  workTimeItems: GetFacilityResponse["data"]["workTimeItems"];

  /**
   * AdministrationSection
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

  // FacilityAdditionItemSection
  staffPlacementType: string;
  welfareSpecialistPlacementType: string;
  staffTreatmentSystemType: string;
  staffTreatmentSpecificSystemType: string;
  commuterLifeSupportFlag: boolean;
  visualAuditoryLanguageDisabledPeopleSupportSystemFlag: boolean;
  employmentTransitionSupportFlag: boolean;
  continuationPersonLaseYear: string;
  numberOfContinuations: string;
  postEmploymentRetentionRateType: string;
  averageDailyWorkingHoursOfUsersType: string;
  monthlyAverageWageType: string;
  employmentSupportTrainingCompletionFlag: boolean;
  severeSupportType: string;
  dischargeSupportFacilityType: string;
  wageUpStartDate: string | undefined;
  wageUpEndDate: string | undefined;
  targetWageTeacherStartDate: string | undefined;
  targetWageTeacherEndDate: string | undefined;
}
