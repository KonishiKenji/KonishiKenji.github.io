import * as types from "./types";
import * as actions from "./actions";

const initialState: types.WorkRecordsState = {
  data: {
    dateFrom: "",
    dateTo: "",
    summary: [],
    details: [],
    warnings: []
  },
  dateList: []
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.WorkRecordsState => {
  switch (action.type) {
    case types.FETCH_WORK_RECORDS_STARTED:
      return { ...state };
    case types.FETCH_WORK_RECORDS_SUCCESS:
      return { ...state, data: action.payload.data };
    case types.FETCH_WORK_RECORDS_FAILED:
      return { ...state };
    case types.FETCH_WORK_RECORDS_MONTH_LIST_STARTED:
      return { ...state };
    case types.FETCH_WORK_RECORDS_MONTH_LIST_SUCCESS:
      return { ...state, dateList: action.payload.data };
    case types.FETCH_WORK_RECORDS_MONTH_LIST_FAILED:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
