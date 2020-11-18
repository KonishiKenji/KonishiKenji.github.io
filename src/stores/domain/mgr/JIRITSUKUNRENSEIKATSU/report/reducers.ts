import * as actions from "./actions";
import * as types from "./types";

const initialState: types.InOutReportState = {
  reports: {
    additionsDaily: {
      bodyRestrictedStillFlg: false,
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
  summary: {
    serviceCounts: {
      oneWayCount: 0,
      pickupCount: 0,
      foodCount: 0,
      shortStayCount: 0
    },
    countsPerStatus: [],
    inoutRecords: {
      dailyInOutRecords: [],
      userInOutRecords: []
    }
  }
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.InOutReportState => {
  switch (action.type) {
    case types.FETCH_JIRITSUKUNRENSEIKATSU_DAILY_STARTED:
      return { ...state };
    case types.FETCH_JIRITSUKUNRENSEIKATSU_DAILY:
      return {
        ...state,
        reports: action.payload
      };
    case types.FETCH_JIRITSUKUNRENSEIKATSU_DAILY_FAILED:
      return { ...state };
    case types.FETCH_JIRITSUKUNRENSEIKATSU_USER_STARTED:
      return { ...state };
    case types.FETCH_JIRITSUKUNRENSEIKATSU_USER:
      return {
        ...state,
        reports: {
          ...state.reports,
          reportUser: action.payload
        }
      };
    case types.FETCH_JIRITSUKUNRENSEIKATSU_USER_FAILED:
      return {
        ...state
      };
    case types.FETCH_JIRITSUKUNRENSEIKATSU_DAILY_SUMMARY_STARTED:
      return { ...state };
    case types.FETCH_JIRITSUKUNRENSEIKATSU_DAILY_SUMMARY:
      return { ...state, summary: action.payload };
    case types.FETCH_JIRITSUKUNRENSEIKATSU_DAILY_SUMMARY_FAILED:
      return { ...state };
    case types.FETCH_JIRITSUKUNRENSEIKATSU_USER_SUMMARY_STARTED:
      return { ...state };
    case types.FETCH_JIRITSUKUNRENSEIKATSU_USER_SUMMARY:
      return { ...state, summary: action.payload };
    case types.FETCH_JIRITSUKUNRENSEIKATSU_USER_SUMMARY_FAILED:
      return { ...state };
    case types.PUT_JIRITSUKUNRENSEIKATSU_REPORT_STARTED:
      return { ...state };
    case types.PUT_JIRITSUKUNRENSEIKATSU_REPORT_DAILY:
      state.reports.reportDaily.reportList = JSON.parse(
        JSON.stringify(action.payload)
      );
      return {
        ...state
      };
    case types.PUT_JIRITSUKUNRENSEIKATSU_REPORT_USER:
      state.reports.reportUser.reportList = JSON.parse(
        JSON.stringify(action.payload)
      );
      return {
        ...state
      };
    case types.PUT_JIRITSUKUNRENSEIKATSU_REPORT_FAILED:
      return { ...state };
    case types.POST_JIRITSUKUNRENSEIKATSU_IN_OUT_ALL_REPORT_STARTED:
      return { ...state };
    case types.POST_JIRITSUKUNRENSEIKATSU_IN_OUT_ALL_REPORT:
      state.reports.additionsDaily = action.payload;
      return {
        ...state
      };
    case types.POST_JIRITSUKUNRENSEIKATSU_IN_OUT_ALL_REPORT_FAILED:
      return { ...state };
    default:
      return state;
  }
};
export default reducer;
