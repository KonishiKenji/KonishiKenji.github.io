import * as actions from "./actions";
import * as types from "./types";

const initialState: types.UsageResultsState = {
  usageResults: []
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.UsageResultsState => {
  switch (action.type) {
    case types.FETCH_STARTED:
      return { ...state };
    case types.FETCH:
      return {
        usageResults: action.payload
      };
    case types.FETCH_FAILED:
      return { ...state };
    case types.POST_STARTED:
      return { ...state };
    case types.POST:
      return {
        usageResults: action.payload
      };
    case types.POST_FAILED:
      return { ...state };
    default:
      return state;
  }
};
export default reducer;
