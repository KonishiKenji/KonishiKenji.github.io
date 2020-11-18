import * as types from "./types";
import * as actions from "./actions";

const initialState: types.SnackbarState = {
  show: false,
  message: "",
  variant: "success"
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.SnackbarState => {
  switch (action.type) {
    case types.SHOW_SNACKBAR:
      return { ...action.payload, show: true };
    case types.HIDE_SNACKBAR:
      return { ...state, show: false };
    default:
      return state;
  }
};

export default reducer;
