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
  multiFunctionOfficeFlg: DEFAULT_CHECKBOX_VALUE,
  masterSubordinateFlg: DEFAULT_CHECKBOX_VALUE,
  isMasterRadioValue: "1",
  allCapacity: "",
  postalCode: "",
  selectedPrefectureName: "",
  selectedCityCode: "",
  restAddress: "",
  tel: "",
  cityId: "",
  availableFood: DEFAULT_CHECKBOX_VALUE,
  foodExpenses: 0,
  foodExpensesBreakfast: 0,
  foodExpensesLunch: 0,
  foodExpensesSupper: 0,
  foodExpensesDay: 0,
  utility: 0,
  utilityCosts: 0,

  originLocalGovFlg: DEFAULT_CHECKBOX_VALUE,
  nutritionistPlacement: 0,
  lackOfSupporterFlg: DEFAULT_CHECKBOX_VALUE,
  dateStartLackOfSupporter: "",

  nighttimePlacement: 0,
  seeHearTeamFlg: DEFAULT_CHECKBOX_VALUE,
  regionalLifeTransition: DEFAULT_CHECKBOX_VALUE,
  nutritionManagementFlg: DEFAULT_CHECKBOX_VALUE,
  staffTreatmentSystemType: "",
  staffTreatmentSpecificSystemType: "",
  seriousDisability: 0
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
