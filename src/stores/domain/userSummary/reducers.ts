import * as types from "./types";
import * as actions from "./actions";

const initialState: types.UserSummaryState = {
  supportRecords: []
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.UserSummaryState => {
  switch (action.type) {
    case types.FETCH_USER_SUMMARY_SUPPORT_REPORTS_SUCCESS:
      return { ...state, supportRecords: action.payload };
    case types.FETCH_USER_SUMMARY_SUPPORT_REPORTS_FAILED:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
