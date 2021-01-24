import * as types from "./types";
import * as actions from "./actions";

const initialState: types.RecordDailyState = {
  isEditing: false
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.RecordDailyState => {
  switch (action.type) {
    case types.SET_EDIT:
      return { ...state, isEditing: true };
    case types.UNSET_EDIT:
      return { ...state, isEditing: false };
    default:
      return state;
  }
};

export default reducer;
