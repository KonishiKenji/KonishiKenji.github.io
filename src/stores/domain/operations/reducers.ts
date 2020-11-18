import * as types from "./types";
import * as actions from "./actions";

const initialState: types.OperationsState = {
  dailyRecord: {
    operation: {
      counts: {
        numberOfUsers: 0,
        numberOfUsingServiceUsers: 0,
        numberOfAbsence: 0,
        numberOfSupportIkou1: 0,
        numberOfSupportOutOfFacility: 0,
        numberOfHavingInterview: 0,
        totalInterviewMinutes: 0
      },
      record: null,
      operation_work_history: [],
      workplace_company: []
    },
    support: null,
    created_at: null,
    updated_at: null
  },
  monthlyRecord: {
    operation: [
      {
        date: "",
        counts: {
          numberOfUsers: 0,
          numberOfUsingServiceUsers: 0,
          numberOfAbsence: 0,
          numberOfSupportIkou1: 0,
          numberOfSupportOutOfFacility: 0,
          numberOfHavingInterview: 0,
          totalInterviewMinutes: 0
        },
        record: null,
        operation_work_history: [],
        workplace_company: [
          {
            operation_record_id: 0,
            workplace_company_id: 0,
            workplace_name: "",
            staffs: [
              {
                workplace_company_operation_id: 0,
                staffs_in_facility_id: 0,
                staff_name: "",
                working_hours: null,
                display_order: 0
              }
            ]
          }
        ],
        service_users: []
      }
    ],
    created_at: null,
    updated_at: null
  },
  dateList: [],
  userSummaryList: null
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.OperationsState => {
  switch (action.type) {
    case types.FETCH_DAILY_RECORD_SUCCESS:
      return { ...state, dailyRecord: action.payload };
    case types.FETCH_MONTHLY_RECORD_SUCCESS:
      return { ...state, monthlyRecord: action.payload };
    case types.FETCH_DATE_LIST_SUCCESS:
      return { ...state, dateList: action.payload };
    case types.FETCH_USER_SUMMARY_LIST_SUCCESS:
      return { ...state, userSummaryList: action.payload };
    case types.FETCH_DAILY_RECORD_FAILED:
    case types.FETCH_MONTHLY_RECORD_FAILED:
    case types.FETCH_DATE_LIST_FAILED:
    case types.FETCH_USER_SUMMARY_LIST_FAILED:
      return { ...state, ...action.error };
    default:
      return state;
  }
};

export default reducer;
