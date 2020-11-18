import * as types from "./types";
import * as actions from "./actions";

const initialState: types.ResponseErrorState = {} as types.ResponseErrorState;

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.ResponseErrorState => {
  switch (action.type) {
    case types.SET_RESPONSE_ERROR:
      return { ...action.payload };
    case types.RESET_RESPONSE_ERROR:
      return { ...({} as types.ResponseErrorState) };
    default:
      return state;
  }
};

export default reducer;
