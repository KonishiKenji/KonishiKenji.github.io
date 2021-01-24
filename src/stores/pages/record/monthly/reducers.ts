import * as types from "./types";
import * as actions from "./actions";

const initialState: types.RecordMonthlyState = {
  isEditing: false,
  targetDate: ""
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.RecordMonthlyState => {
  switch (action.type) {
    case types.SET_EDIT:
      return {
        ...state,
        isEditing: true,
        targetDate: action.payload
      };
    case types.UNSET_EDIT:
      return { ...state, isEditing: false, targetDate: "" };
    default:
      return state;
  }
};

export default reducer;
