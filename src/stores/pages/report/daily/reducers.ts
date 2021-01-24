import * as types from "./types";
import * as actions from "./actions";

const initialState: types.ReportDailyState = {
  errorsDateList: []
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.ReportDailyState => {
  switch (action.type) {
    case types.FETCH_LATEST_INOUT_ERRORS_STARTED:
      return { ...state, errorsDateList: [] };
    case types.FETCH_LATEST_INOUT_ERRORS_SUCCESS:
      return { ...state, errorsDateList: action.payload };
    case types.FETCH_LATEST_INOUT_ERRORS_FAILED:
    default:
      return state;
  }
};

export default reducer;
