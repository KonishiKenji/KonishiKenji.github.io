import * as types from "./types";
import * as actions from "./actions";

const initialState: types.InitialState = {
  facility: {
    first_time_bill_date: "",
    total_number_of_users_1_month_before: 0,
    total_number_of_users_2_month_before: 0,
    total_number_of_users_3_month_before: 0
  },
  users: [
    {
      id: 0,
      name_sei: "",
      name_mei: "",
      total_days_in_fiscal_year: 0
    }
  ]
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.InitialState => {
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
