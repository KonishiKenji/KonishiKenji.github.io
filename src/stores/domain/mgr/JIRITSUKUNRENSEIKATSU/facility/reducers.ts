import * as types from "./types";
import * as actions from "./actions";
import {
  DEFAULT_CHECKBOX_VALUE,
  STRING_TRUE_FROM_API
} from "@constants/variables";

const initialState: types.FacilityState = {
  corporationName: "",
  officeNumber: "",
  officeName: "",
  serviceType: "",
  facilityType: 0,
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

  cityId: "",
  allCapacity: "",
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
  standardOverUseFlag: DEFAULT_CHECKBOX_VALUE,
  lackOfLifeSupportMemberFlag: DEFAULT_CHECKBOX_VALUE,
  lackOfLifeSupportMemberStartDate: "",
  lackOfResponsiblePersonFlag: DEFAULT_CHECKBOX_VALUE,
  lackOfResponsiblePersonStartDate: "",

  welfareSpecialistPlacementType: "",
  nursingSupporterFlag: DEFAULT_CHECKBOX_VALUE,
  staffTreatmentSystemType: "",
  staffTreatmentSpecificSystemType: "",
  commuterLifeSupportFlag: DEFAULT_CHECKBOX_VALUE,
  employmentTransitionSupportFlag: DEFAULT_CHECKBOX_VALUE,
  continuationPersonLastYear: STRING_TRUE_FROM_API,
  numberOfContinuators: "",
  visualAuditoryLanguageDisabledPeopleSupportSystemFlag: DEFAULT_CHECKBOX_VALUE,
  shortStayType: "",
  supportForMentallyIllDisChargeSystemType: ""
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.FacilityState => {
  switch (action.type) {
    case types.FETCH_STARTED:
      return { ...state };
    case types.FETCH_SUCCESS:
      return { ...state, ...action.payload };
    case types.FETCH_FAILED:
      return { ...state };
    case types.POST_STARTED:
      return { ...state };
    case types.POST_SUCCESS:
      return { ...state, ...action.payload };
    case types.POST_FAILED:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
