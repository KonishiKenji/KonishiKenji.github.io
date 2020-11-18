import * as types from "./types";
import * as actions from "./actions";

const initialState: types.AssociatedFacilityListState = {
  data: []
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.AssociatedFacilityListState => {
  switch (action.type) {
    case types.FETCH_ASSOCIATED_FACILITY_STARTED:
      return { ...state };
    case types.FETCH_ASSOCIATED_FACILITY_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case types.FETCH_ASSOCIATED_FACILITY_FAILED:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
