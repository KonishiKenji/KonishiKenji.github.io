import * as types from "./types";
import * as actions from "./actions";

const initialState: types.ErrorsDialogState = {
  show: false
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.ErrorsDialogState => {
  switch (action.type) {
    case types.SHOW_ERRORS_DIALOG:
      return { show: true };
    case types.HIDE_ERRORS_DIALOG:
      return { show: false };
    default:
      return state;
  }
};

export default reducer;
