import * as types from "./types";
import * as actions from "./actions";

const initialState: types.AlertDialogState = {
  show: false,
  title: "",
  message: ""
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.AlertDialogState => {
  switch (action.type) {
    case types.SHOW_ALERT_DIALOG:
      return { ...action.payload, show: true };
    case types.HIDE_ALERT_DIALOG:
      return { ...state, show: false };
    default:
      return state;
  }
};

export default reducer;
