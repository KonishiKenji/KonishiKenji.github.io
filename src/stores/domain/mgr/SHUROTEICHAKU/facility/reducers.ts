import * as types from "./types";
import * as actions from "./actions";
import { DEFAULT_CHECKBOX_VALUE } from "@constants/variables";

const initialState: types.FacilityState = {
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
  cityId: "",
  numberOfUsers: "",
  multiFunctionOfficeFlag: DEFAULT_CHECKBOX_VALUE,
  masterSubordinateFlg: DEFAULT_CHECKBOX_VALUE,
  masterFlg: "1",
  allCapacity: "",

  rateGetJob: "",
  lackOfLifeSupportMemberFlag: DEFAULT_CHECKBOX_VALUE,
  lackOfLifeSupportMemberStartDate: "",
  lackOfResponsiblePersonFlag: DEFAULT_CHECKBOX_VALUE,
  lackOfResponsiblePersonStartDate: "",

  workHardenesResultFlag: DEFAULT_CHECKBOX_VALUE,
  workPlaceAdaptationAssistantFlag: DEFAULT_CHECKBOX_VALUE
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
