import * as types from "./types";
import * as actions from "./actions";

const initialState: types.SupportsState = {
  supportsRecord: {
    counts: {
      numberOfAbsence: 0,
      numberOfHavingInterview: 0,
      numberOfServiceUsage: 0,
      numberOfSupportIkou1: 0,
      numberOfSupportOutOfFacility: 0,
      supportDays: 0,
      totalInterviewMinutes: 0
    },
    support: [],
    work_summary: [],
    created_at: null,
    updated_at: null
  },
  report: {
    months: [],
    facility: {
      typeService: ""
    },
    users: []
  }
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.SupportsState => {
  switch (action.type) {
    case types.FETCH_SUPPORTS_RECORD_SUCCESS:
      return { ...state, supportsRecord: action.payload };
    case types.FETCH_SUPPORTS_RECORD_FAILED:
      return { ...state };
    case types.FETCH_REPORT_MONTHS_SUCCESS:
      return {
        ...state,
        report: {
          ...state.report,
          months: action.payload
        }
      };
    case types.FETCH_REPORT_MONTHS_FAILED:
      return { ...state };
    case types.FETCH_REPORT_USERS_SUCCESS:
      return {
        ...state,
        report: {
          ...state.report,
          ...action.payload
        }
      };
    case types.FETCH_REPORT_USERS_FAILED:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
