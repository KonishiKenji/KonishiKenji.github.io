import * as actions from "./actions";
import * as types from "./types";

const initialState: types.IABInOutReportState = {
  IABReports: {
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
  IABSummary: {
    serviceCounts: {
      oneWayCount: 0,
      pickupCount: 0,
      foodCount: 0,
      medicalSupportCount: 0,
      transitionPreparationSupportCount: 0,
      offsiteSupportCount: 0
    },
    countsPerStatus: [],
    inoutRecords: []
  }
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.IABInOutReportState => {
  switch (action.type) {
    case types.FETCH_IAB_DAILY_STARTED:
      return { ...state };
    case types.FETCH_IAB_DAILY:
      return {
        ...state,
        IABReports: action.payload
      };
    case types.FETCH_IAB_DAILY_FAILED:
      return { ...state };
    case types.FETCH_IAB_USER_STARTED:
      return { ...state };
    case types.FETCH_IAB_USER:
      return {
        ...state,
        IABReports: {
          ...state.IABReports,
          reportUser: action.payload
        }
      };
    case types.FETCH_IAB_USER_FAILED:
      return {
        ...state
      };
    case types.FETCH_IAB_DAILY_SUMMARY_STARTED:
      return { ...state };
    case types.FETCH_IAB_DAILY_SUMMARY:
      return { ...state, IABSummary: action.payload };
    case types.FETCH_IAB_DAILY_SUMMARY_FAILED:
      return { ...state };
    case types.UNSET_IAB_DAILY_SUMMARY:
      return {
        ...state,
        IABSummary: initialState.IABSummary
      };
    case types.FETCH_IAB_USER_SUMMARY_STARTED:
      return { ...state };
    case types.FETCH_IAB_USER_SUMMARY:
      return { ...state, IABSummary: action.payload };
    case types.FETCH_IAB_USER_SUMMARY_FAILED:
      return { ...state };
    case types.PUT_IAB_REPORT_STARTED:
      return { ...state };
    case types.PUT_IAB_REPORT_DAILY:
      state.IABReports.reportDaily.reportList = JSON.parse(
        JSON.stringify(action.payload)
      );
      return {
        ...state
      };
    case types.PUT_IAB_REPORT_USER:
      state.IABReports.reportUser.reportList = JSON.parse(
        JSON.stringify(action.payload)
      );
      return {
        ...state
      };
    case types.PUT_IAB_REPORT_FAILED:
      return { ...state };
    case types.POST_IAB_IN_OUT_ALL_REPORT_STARTED:
      return { ...state };
    case types.POST_IAB_IN_OUT_ALL_REPORT:
      state.IABReports.additionsDaily = action.payload;
      return {
        ...state
      };
    case types.POST_IAB_IN_OUT_ALL_REPORT_FAILED:
      return { ...state };
    default:
      return state;
  }
};
export default reducer;
