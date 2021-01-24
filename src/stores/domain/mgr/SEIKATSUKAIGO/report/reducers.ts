import * as actions from "./actions";
import * as types from "./types";

const initialState: types.SEIKATSUKAIGOInOutReportState = {
  SEIKATSUKAIGOReports: {
    additionsDaily: {
      bodyRestrictedStillFlg: false,
      openShortTime: 0,
      targetDate: ""
    },
    reportDaily: {
      reportList: []
    },
    reportUser: {
      reportList: [],
      numberOfAbsence: 0
    }
  },
  SEIKATSUKAIGOSummary: {
    serviceCounts: {
      oneWayCount: 0,
      pickupCount: 0,
      foodCount: 0
    },
    countsPerStatus: [],
    inoutRecords: []
  }
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.SEIKATSUKAIGOInOutReportState => {
  switch (action.type) {
    case types.FETCH_SEIKATSUKAIGO_DAILY_STARTED:
      return { ...state };
    case types.FETCH_SEIKATSUKAIGO_DAILY:
      return {
        ...state,
        SEIKATSUKAIGOReports: action.payload
      };
    case types.FETCH_SEIKATSUKAIGO_DAILY_FAILED:
      return { ...state };
    case types.FETCH_SEIKATSUKAIGO_USER_STARTED:
      return { ...state };
    case types.FETCH_SEIKATSUKAIGO_USER:
      return {
        ...state,
        SEIKATSUKAIGOReports: {
          ...state.SEIKATSUKAIGOReports,
          reportUser: action.payload
        }
      };
    case types.FETCH_SEIKATSUKAIGO_USER_FAILED:
      return {
        ...state
      };
    case types.FETCH_SEIKATSUKAIGO_DAILY_SUMMARY_STARTED:
      return { ...state };
    case types.FETCH_SEIKATSUKAIGO_DAILY_SUMMARY:
      return { ...state, SEIKATSUKAIGOSummary: action.payload };
    case types.FETCH_SEIKATSUKAIGO_DAILY_SUMMARY_FAILED:
      return { ...state };
    case types.UNSET_SEIKATSUKAIGO_DAILY_SUMMARY:
      return {
        ...state,
        SEIKATSUKAIGOSummary: initialState.SEIKATSUKAIGOSummary
      };
    case types.FETCH_SEIKATSUKAIGO_USER_SUMMARY_STARTED:
      return { ...state };
    case types.FETCH_SEIKATSUKAIGO_USER_SUMMARY:
      return { ...state, SEIKATSUKAIGOSummary: action.payload };
    case types.FETCH_SEIKATSUKAIGO_USER_SUMMARY_FAILED:
      return { ...state };
    case types.PUT_SEIKATSUKAIGO_REPORT_STARTED:
      return { ...state };
    case types.PUT_SEIKATSUKAIGO_REPORT_DAILY:
      state.SEIKATSUKAIGOReports.reportDaily.reportList = JSON.parse(
        JSON.stringify(action.payload)
      );
      return {
        ...state
      };
    case types.PUT_SEIKATSUKAIGO_REPORT_USER:
      state.SEIKATSUKAIGOReports.reportUser.reportList = JSON.parse(
        JSON.stringify(action.payload)
      );
      return {
        ...state
      };
    case types.PUT_SEIKATSUKAIGO_REPORT_FAILED:
      return { ...state };
    case types.POST_SEIKATSUKAIGO_IN_OUT_ALL_REPORT_STARTED:
      return { ...state };
    case types.POST_SEIKATSUKAIGO_IN_OUT_ALL_REPORT:
      state.SEIKATSUKAIGOReports.additionsDaily = action.payload;
      return {
        ...state
      };
    case types.POST_SEIKATSUKAIGO_IN_OUT_ALL_REPORT_FAILED:
      return { ...state };
    default:
      return state;
  }
};
export default reducer;
