import * as actions from "./actions";
import * as types from "./types";
import cloneDeep from "lodash-es/cloneDeep";

const initialState: types.ReportState = {
  reportDaily: {
    usagePerformanceDaily: {
      before: {},
      after: {}
    },
    usagePerformance: {
      before: {},
      after: {}
    },
    usagePerformanceTANKINYUSHO: {
      before: {},
      after: {}
    }
  },
  reportMonthly: {
    usagePerformance: {
      before: {},
      after: {}
    },
    usagePerformanceTANKINYUSHO: {
      before: {},
      after: {}
    }
  }
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.ReportState => {
  switch (action.type) {
    case types.FETCH_TANKINYUSHO_DAILY_STARTED:
      return { ...state };
    case types.FETCH_TANKINYUSHO_DAILY_SUCCESS:
      return {
        ...state,
        reportDaily: action.payload
      };
    case types.FETCH_TANKINYUSHO_DAILY_FAILED:
      return { ...state };
    case types.FETCH_TANKINYUSHO_MONTHLY_STARTED:
      return { ...state };
    case types.FETCH_TANKINYUSHO_MONTHLY_SUCCESS:
      return {
        ...state,
        reportMonthly: action.payload
      };
    case types.FETCH_TANKINYUSHO_MONTHLY_FAILED:
      return { ...state };
    case types.UPDATE_TANKINYUSHO_DAILY_USAGE_PERFORMANCE:
      return {
        ...state,
        reportDaily: {
          ...state.reportDaily,
          usagePerformance: {
            ...state.reportDaily.usagePerformance,
            after: action.payload
          }
        }
      };
    case types.UPDATE_TANKINYUSHO_DAILY_USAGE_PERFORMANCE_TANKINYUSHO:
      return {
        ...state,
        reportDaily: {
          ...state.reportDaily,
          usagePerformanceTANKINYUSHO: {
            ...state.reportDaily.usagePerformanceTANKINYUSHO,
            after: action.payload
          }
        }
      };
    case types.UPDATE_TANKINYUSHO_USAGE_PERFORMANCE_DAILY:
      return {
        ...state,
        reportDaily: {
          ...state.reportDaily,
          usagePerformanceDaily: {
            ...state.reportDaily.usagePerformanceDaily,
            after: action.payload
          }
        }
      };
    case types.UPDATE_TANKINYUSHO_MONTHLY_USAGE_PERFORMANCE:
      return {
        ...state,
        reportMonthly: {
          ...state.reportMonthly,
          usagePerformance: {
            ...state.reportMonthly.usagePerformance,
            after: action.payload
          }
        }
      };
    case types.UPDATE_TANKINYUSHO_MONTHLY_USAGE_PERFORMANCE_TANKINYUSHO:
      return {
        ...state,
        reportMonthly: {
          ...state.reportMonthly,
          usagePerformanceTANKINYUSHO: {
            ...state.reportMonthly.usagePerformanceTANKINYUSHO,
            after: action.payload
          }
        }
      };
    case types.POST_TANKINYUSHO_REPORT_DAILY_STARTED:
      return { ...state };
    case types.POST_TANKINYUSHO_REPORT_DAILY_SUCCESS:
      return {
        ...state,
        reportDaily: {
          ...state.reportDaily,
          usagePerformance: {
            ...state.reportDaily.usagePerformance,
            before: {
              ...state.reportDaily.usagePerformance.before,
              [action.meta]: action.payload.res
            },
            after: {
              ...state.reportDaily.usagePerformance.after,
              [action.meta]: action.payload.res
            }
          },
          usagePerformanceTANKINYUSHO: {
            ...state.reportDaily.usagePerformanceTANKINYUSHO,
            before: {
              ...state.reportDaily.usagePerformanceTANKINYUSHO.before,
              [action.meta]: action.payload.res2
            },
            after: {
              ...state.reportDaily.usagePerformanceTANKINYUSHO.after,
              [action.meta]: action.payload.res2
            }
          }
        }
      };
    case types.POST_TANKINYUSHO_REPORT_DAILY_FAILED:
      return { ...state };
    case types.POST_TANKINYUSHO_REPORT_MONTHLY_STARTED:
      return { ...state };
    case types.POST_TANKINYUSHO_REPORT_MONTHLY_SUCCESS:
      return {
        ...state,
        reportMonthly: {
          usagePerformance: {
            ...state.reportMonthly.usagePerformance,
            before: {
              ...state.reportMonthly.usagePerformance.before,
              [action.meta]: action.payload.res
            },
            after: {
              ...state.reportMonthly.usagePerformance.after,
              [action.meta]: action.payload.res
            }
          },
          usagePerformanceTANKINYUSHO: {
            ...state.reportMonthly.usagePerformanceTANKINYUSHO,
            before: {
              ...state.reportMonthly.usagePerformanceTANKINYUSHO.before,
              [action.meta]: action.payload.res2
            },
            after: {
              ...state.reportMonthly.usagePerformanceTANKINYUSHO.after,
              [action.meta]: action.payload.res2
            }
          }
        }
      };
    case types.POST_TANKINYUSHO_REPORT_MONTHLY_FAILED:
      return { ...state };
    case types.POST_TANKINYUSHO_BULK_REGISTRATION_DAILY_STARTED:
      return { ...state };
    case types.POST_TANKINYUSHO_BULK_REGISTRATION_DAILY_SUCCESS:
      return {
        ...state,
        reportDaily: {
          usagePerformanceDaily: {
            ...action.payload.usagePerformanceDaily,
            before: cloneDeep(action.payload.usagePerformanceDaily.after)
          },
          usagePerformance: {
            ...action.payload.usagePerformance,
            before: cloneDeep(action.payload.usagePerformance.after)
          },
          usagePerformanceTANKINYUSHO: {
            ...action.payload.usagePerformanceTANKINYUSHO,
            before: cloneDeep(action.payload.usagePerformanceTANKINYUSHO.after)
          }
        }
      };
    case types.POST_TANKINYUSHO_BULK_REGISTRATION_DAILY_FAILED:
      return { ...state };
    case types.POST_TANKINYUSHO_BULK_REGISTRATION_MONTHLY_STARTED:
      return { ...state };
    case types.POST_TANKINYUSHO_BULK_REGISTRATION_MONTHLY_SUCCESS:
      return {
        ...state,
        reportMonthly: {
          usagePerformance: {
            ...action.payload.usagePerformance,
            before: cloneDeep(action.payload.usagePerformance.after)
          },
          usagePerformanceTANKINYUSHO: {
            ...action.payload.usagePerformanceTANKINYUSHO,
            before: cloneDeep(action.payload.usagePerformanceTANKINYUSHO.after)
          }
        }
      };
    case types.POST_TANKINYUSHO_BULK_REGISTRATION_MONTHLY_FAILED:
      return { ...state };
    case types.UPDATE_TANKINYUSHO_ALL_STATUS_TYPE:
      return {
        ...state,
        reportDaily: {
          ...state.reportDaily,
          usagePerformance: {
            ...state.reportDaily.usagePerformance,
            after: action.payload
          }
        }
      };
    case types.RESET_TANKINYUSHO_USAGE_PERFORMANCE:
      return {
        ...state,
        reportDaily: {
          usagePerformanceDaily: {
            ...action.payload.reportDaily.usagePerformanceDaily,
            after: action.payload.reportDaily.usagePerformanceDaily.before
          },
          usagePerformance: {
            ...action.payload.reportDaily.usagePerformance,
            after: action.payload.reportDaily.usagePerformance.before
          },
          usagePerformanceTANKINYUSHO: {
            ...action.payload.reportDaily.usagePerformanceTANKINYUSHO,
            after: action.payload.reportDaily.usagePerformanceTANKINYUSHO.before
          }
        },
        reportMonthly: {
          usagePerformance: {
            ...action.payload.reportMonthly.usagePerformance,
            after: action.payload.reportMonthly.usagePerformance.before
          },
          usagePerformanceTANKINYUSHO: {
            ...action.payload.reportMonthly.usagePerformanceTANKINYUSHO,
            after:
              action.payload.reportMonthly.usagePerformanceTANKINYUSHO.before
          }
        }
      };
    default:
      return state;
  }
};
export default reducer;
