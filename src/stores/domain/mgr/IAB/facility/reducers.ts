import * as types from "./types";
import * as actions from "./actions";
import {
  DEFAULT_CHECKBOX_VALUE,
  STRING_TRUE_FROM_API
} from "@constants/variables";

const initialState: types.FacilityState = {
  id: 0,
  corporationName: "",
  officeNumber: "",
  officeName: "",
  serviceType: "",
  representativeName: "",
  capacity: "",
  postalCode: "",
  selectedPrefectureName: "",
  selectedCityCode: "",
  restAddress: "",
  tel: "",
  multiFunctionOfficeFlag: DEFAULT_CHECKBOX_VALUE,
  masterSubordinateFlg: DEFAULT_CHECKBOX_VALUE,
  masterFlg: "1",

  unitEngrave: "",
  startHor: "",
  startMin: "",
  endHor: "",
  endMin: "",
  users: [],
  workBreakTimes: [],
  workBreakTimeItems: [],
  workTimeItems: [],

  cityId: "",
  allCapacity: "",
  aExecuteMeasuresForLoadReductionFlag: DEFAULT_CHECKBOX_VALUE,
  percentOfLoadReduction: "",
  yenOfLoadReduction: "",
  loadReductionType: STRING_TRUE_FROM_API,
  mealSaservedServiceFlag: DEFAULT_CHECKBOX_VALUE,
  transferServiceFlag: DEFAULT_CHECKBOX_VALUE,
  transferServiceType: STRING_TRUE_FROM_API,

  mondaySchedule: DEFAULT_CHECKBOX_VALUE,
  mondayStartTime: "",
  mondayEndTime: "",
  tuesdaySchedule: DEFAULT_CHECKBOX_VALUE,
  tuesdayStartTime: "",
  tuesdayEndTime: "",
  wednesdaySchedule: DEFAULT_CHECKBOX_VALUE,
  wednesdayStartTime: "",
  wednesdayEndTime: "",
  thursdaySchedule: DEFAULT_CHECKBOX_VALUE,
  thursdayStartTime: "",
  thursdayEndTime: "",
  fridaySchedule: DEFAULT_CHECKBOX_VALUE,
  fridayStartTime: "",
  fridayEndTime: "",
  saturdaySchedule: DEFAULT_CHECKBOX_VALUE,
  saturdayStartTime: "",
  saturdayEndTime: "",
  sundaySchedule: DEFAULT_CHECKBOX_VALUE,
  sundayStartTime: "",
  sundayEndTime: "",

  establishedByLocalGovernmentsFlag: DEFAULT_CHECKBOX_VALUE,
  lackOfLifeSupportMemberFlag: DEFAULT_CHECKBOX_VALUE,
  lackOfLifeSupportMemberStartDate: "",
  lackOfResponsiblePersonFlag: DEFAULT_CHECKBOX_VALUE,
  lackOfResponsiblePersonStartDate: "",

  staffPlacementType: "",
  welfareSpecialistPlacementType: "",
  staffTreatmentSystemType: "",
  staffTreatmentSpecificSystemType: "",
  commuterLifeSupportFlag: DEFAULT_CHECKBOX_VALUE,
  visualAuditoryLanguageDisabledPeopleSupportSystemFlag: DEFAULT_CHECKBOX_VALUE,
  employmentTransitionSupportFlag: DEFAULT_CHECKBOX_VALUE,
  continuationPersonLaseYear: STRING_TRUE_FROM_API,
  numberOfContinuations: "",
  postEmploymentRetentionRateType: "",
  averageDailyWorkingHoursOfUsersType: "",
  monthlyAverageWageType: "",
  employmentSupportTrainingCompletionFlag: DEFAULT_CHECKBOX_VALUE,
  severeSupportType: "",
  dischargeSupportFacilityType: "",
  wageUpStartDate: "",
  wageUpEndDate: "",
  targetWageTeacherStartDate: "",
  targetWageTeacherEndDate: ""
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.FacilityState => {
  switch (action.type) {
    case types.FETCH_SUCCESS:
      return { ...state, ...action.payload };
    case types.FETCH_STARTED:
    case types.FETCH_FAILED:
    case types.POST_STARTED:
    case types.POST_SUCCESS:
    case types.POST_FAILED:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
