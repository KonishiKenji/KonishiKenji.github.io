import * as types from "./types";
import * as actions from "./actions";
import { Checkbox } from "@constants/variables";

// first or reset values
const userDefaultValues: types.UsersInFacilityState["user"] = {
  user_in_facility: {
    none_recipient_number_flg: Checkbox.OFF,
    gender: "1",
    income_kind: "1",
    subsidized_flg: Checkbox.OFF,
    subsidized_unit_flg: "1",
    uplimit_facility_flg: Checkbox.OFF,
    result_of_management: "1",
    create_support_plan_flg: Checkbox.ON,
    uplimit_controlled_by: "1"
  },
  user_in_facility_shuroteichaku: {
    income_kind: 1
  },
  companies: {},
  company_persons: []
};

const initialState: types.UsersInFacilityState = {
  users: [],
  user: userDefaultValues,
  doneUpsertUser: false,
  userValidation: {}
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.UsersInFacilityState => {
  switch (action.type) {
    case types.FETCH_STARTED:
      return { ...state };
    case types.FETCH_SUCCESS:
      return { ...state, users: action.payload.data };
    case types.FETCH_FAILED:
      return { ...state };
    case types.FETCH_ONE_STARTED:
      return { ...state };
    case types.FETCH_ONE_SUCCESS:
      return { ...state, user: action.payload };
    case types.FETCH_ONE_FAILED:
      return { ...state };
    case types.CREATE_STARTED:
      return { ...state };
    case types.CREATE_SUCCESS:
      return { ...state };
    case types.CREATE_FAILED:
      return { ...state };
    case types.UPDATE_STARTED:
      return { ...state };
    case types.UPDATE_SUCCESS:
      return { ...state };
    case types.UPDATE_FAILED:
      return { ...state };
    case types.CLEAR_STARTED:
      return { ...state };
    case types.CLEAR_SUCCESS:
      return { ...state };
    case types.CLEAR_FAILED:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
