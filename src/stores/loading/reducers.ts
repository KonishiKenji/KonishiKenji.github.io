import * as types from "./types";
import * as actions from "./actions";

const initialState: types.LoadingState = false;

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.LoadingState => {
  switch (action.type) {
    case types.LOAD_STARTED:
      return true;
    case types.LOAD_DONE:
      return false;
    default:
      return state;
  }
};

export default reducer;
