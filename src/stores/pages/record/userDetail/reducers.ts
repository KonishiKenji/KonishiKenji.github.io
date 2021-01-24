import * as types from "./types";
import * as actions from "./actions";

const initialState: types.RecordUserDetailState = {
  isEditing: false,
  isEditingInoutId: null,
  calendarDate: null
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.RecordUserDetailState => {
  switch (action.type) {
    case types.SET_EDIT:
      return { ...state, isEditing: true, isEditingInoutId: action.payload };
    case types.UNSET_EDIT:
      return { ...state, isEditing: false, isEditingInoutId: null };
    case types.SET_CALENDAR_DATE:
      return { ...state, calendarDate: action.payload };
    case types.UNSET_CALENDAR_DATE:
      return { ...state, calendarDate: null };
    default:
      return state;
  }
};

export default reducer;
