import * as types from "./types";
import * as actions from "./actions";
import { DEFAULT_CHECKBOX_VALUE } from "@constants/variables";

const initialState: types.FacilityState = {
  corporationName: "",
  officeNumber: "",
  officeName: "",
  serviceType: "",
  groupHomeType: 0,
  representativeName: "",
  capacity: "",
  postalCode: "",
  selectedPrefectureName: "",
  selectedCityCode: "",
  restAddress: "",
  tel: "",
  multiFunctionOfficeFlag: DEFAULT_CHECKBOX_VALUE,
  operatingUnitFlag: DEFAULT_CHECKBOX_VALUE,
  lackOfLifeSupportMemberFlag: DEFAULT_CHECKBOX_VALUE,
  lackOfLifeSupportMemberStartDate: "",
  lackOfResponsiblePersonFlag: DEFAULT_CHECKBOX_VALUE,
  lackOfResponsiblePersonStartDate: "",
  establishedByLocalGovernmentsFlag: DEFAULT_CHECKBOX_VALUE,
  staffPlacementType: "",
  welfareSpecialistPlacementType: "",
  staffTreatmentSystemType: "",
  staffTreatmentSpecificSystemType: "",
  nightSupportFlag: DEFAULT_CHECKBOX_VALUE,
  nightSupportType: "",
  averageUsersLastYear: "",
  nightStaffAllocationSystemFlag: DEFAULT_CHECKBOX_VALUE,
  nursingStaffPlacementSystemFlag: "",
  visualAuditoryLanguageDisabledPeopleSupportSystemFlag: DEFAULT_CHECKBOX_VALUE,
  commuterLifeSupportFlag: DEFAULT_CHECKBOX_VALUE,
  subtractionOfLargeScaleHousing: "",
  units: []
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
