import * as types from "./types";
import * as actions from "./actions";
import orderBy from "lodash-es/orderBy";

const initialState: types.StaffState = {
  staffItems: []
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.StaffState => {
  switch (action.type) {
    case types.FETCH_STARTED:
      return { ...state };
    case types.FETCH_SUCCESS:
      const staffItems = [] as types.StaffData[];
      for (const { id, name, role } of action.payload.data) {
        staffItems.push({
          staffItemId: id,
          roleName: role,
          staffName: name
        });
      }
      return {
        ...state,
        staffItems: orderBy(staffItems, ["staffItemId"], ["asc"])
      };
    case types.FETCH_FAILED:
      return { ...state };
    case types.POST_STARTED:
      return { ...state };
    case types.POST_SUCCESS:
      return { ...state };
    case types.POST_FAILED:
      return { ...state };
    case types.DELETE_STARTED:
      return { ...state };
    case types.DELETE_SUCCESS:
      return { ...state };
    case types.DELETE_FAILED:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
