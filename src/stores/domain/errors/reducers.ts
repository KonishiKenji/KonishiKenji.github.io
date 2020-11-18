import * as types from "./types";
import * as actions from "./actions";

const initialState: types.ErrorsState = {
  invoice: {
    data: [],
    loading: false,
    hasError: false,
    errorCount: 0
  },
  users: {
    data: [],
    hasError: false,
    errorCount: 0
  },
  inout: {
    data: [],
    hasError: false,
    errorCount: 0
  },
  summary: {
    facility: {
      hasError: false
    },
    users: {
      hasError: false
    },
    records: {
      hasError: false
    }
  },
  plan: {
    data: [],
    hasError: false,
    errorCount: 0
  },
  goal: {
    data: [],
    hasError: false,
    errorCount: 0
  },
  records: {
    data: [],
    hasError: false,
    errorCount: 0
  },
  offsiteWork: {
    data: [],
    hasError: false,
    errorCount: 0
  }
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.ErrorsState => {
  switch (action.type) {
    case types.FETCH_INVOICE_STARTED:
      return { ...state, invoice: { ...state.invoice, loading: true } };
    case types.FETCH_INVOICE_SUCCESS:
      return {
        ...state,
        invoice: { ...action.meta, data: action.payload.data, loading: false }
      };
    case types.FETCH_INVOICE_FAILED:
      return { ...state, invoice: { ...state.invoice, loading: false } };
    case types.FETCH_USER_STARTED:
      return { ...state };
    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        users: { ...action.meta, data: action.payload.data }
      };
    case types.FETCH_USER_FAILED:
      return { ...state };
    case types.FETCH_INOUT_STARTED:
      return { ...state };
    case types.FETCH_INOUT_SUCCESS:
      return {
        ...state,
        inout: { ...action.meta, data: action.payload.data }
      };
    case types.FETCH_INOUT_FAILED:
      return { ...state };
    case types.FETCH_SUMMARY_STARTED:
      return { ...state };
    case types.FETCH_SUMMARY_SUCCESS:
      return {
        ...state,
        summary: { ...action.payload.data }
      };
    case types.FETCH_SUMMARY_FAILED:
      return { ...state };
    case types.FETCH_PLAN_STARTED:
      return { ...state };
    case types.FETCH_PLAN_SUCCESS:
      return {
        ...state,
        plan: { ...action.meta, data: action.payload.data }
      };
    case types.FETCH_PLAN_FAILED:
      return { ...state };
    case types.FETCH_GOAL_STARTED:
      return { ...state };
    case types.FETCH_GOAL_SUCCESS:
      return {
        ...state,
        goal: { ...action.meta, data: action.payload.data }
      };
    case types.FETCH_GOAL_FAILED:
      return { ...state };

    case types.FETCH_RECORD_STARTED:
      return { ...state };
    case types.FETCH_RECORD_SUCCESS:
      return {
        ...state,
        records: { ...action.meta, data: action.payload.data }
      };
    case types.FETCH_RECORD_FAILED:
      return { ...state };

    case types.FETCH_OFFSITE_WORK_STARTED:
      return { ...state };
    case types.FETCH_OFFSITE_WORK_SUCCESS:
      return {
        ...state,
        offsiteWork: { ...action.meta, data: action.payload.data }
      };
    case types.FETCH_OFFSITE_WORK_FAILED:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
