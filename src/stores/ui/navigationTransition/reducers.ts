import * as types from "./types";
import * as actions from "./actions";

const initialState: types.NavigationTransitionState = false;

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.NavigationTransitionState => {
  switch (action.type) {
    case types.WAIT_NAVIGATION_TRANSITION:
      return true;
    case types.CANCEL_NAVIGATION_TRANSITION:
      return false;
    default:
      return state;
  }
};

export default reducer;
