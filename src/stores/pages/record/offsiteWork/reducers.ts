import * as types from "./types";
import * as actions from "./actions";

const initialState: types.State = {
  offsiteWorkMonthDate: ""
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.State => {
  switch (action.type) {
    case types.SET_OFFICE_WORK_MONTH_DATE:
      return { ...state, offsiteWorkMonthDate: action.date };
    default:
      return state;
  }
};

export default reducer;
