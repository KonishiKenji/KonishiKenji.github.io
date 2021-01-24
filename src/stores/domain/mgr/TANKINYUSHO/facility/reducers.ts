import * as types from "./types";
import * as actions from "./actions";
import { DEFAULT_CHECKBOX_VALUE } from "@constants/variables";

const initialState: types.FacilityState = {
  corporationName: "",
  officeNumber: "",
  officeName: "",
  serviceType: "",
  facilityType: 0,
  medicalType: 0,
  representativeName: "",
  capacity: "",
  postalCode: "",
  selectedPrefectureName: "",
  selectedCityCode: "",
  restAddress: "",
  tel: "",
  multiFunctionOfficeFlag: DEFAULT_CHECKBOX_VALUE,
  masterSubordinateFlg: DEFAULT_CHECKBOX_VALUE,
  isMasterRadioValue: "1",
  cityId: "",
  allCapacity: "",

  facilityCombiStatus: 0,
  largeScaleFlg: DEFAULT_CHECKBOX_VALUE,
  lackOfLifeSupportMemberFlag: DEFAULT_CHECKBOX_VALUE,
  lackOfLifeSupportMemberStartDate: "",

  welfareSpecialistPlacementType: "",
  fulltimeNursingStaff: 0,
  staffTreatmentSystemType: "",
  staffTreatmentSpecificSystemType: "",
  medicalSupportFlg: DEFAULT_CHECKBOX_VALUE,
  dietician: 0,
  seriousDisabilityFlg: DEFAULT_CHECKBOX_VALUE
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
