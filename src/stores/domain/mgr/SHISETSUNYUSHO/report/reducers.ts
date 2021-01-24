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
    usagePerformanceSHISETSUNYUSHO: {
      before: {},
      after: {}
    }
  },
  reportUsers: {
    usagePerformance: {
      before: {},
      after: {}
    },
    usagePerformanceSHISETSUNYUSHO: {
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
    // 日ごと用のreducers
    case types.FETCH_SHISETSUNYUSHO_DAILY_STARTED:
      return { ...state };
    case types.FETCH_SHISETSUNYUSHO_DAILY_SUCCESS:
      return {
        ...state,
        reportDaily: action.payload
      };
    case types.FETCH_SHISETSUNYUSHO_DAILY_FAILED:
      return { ...state };
    case types.UPDATE_SHISETSUNYUSHO_ALL_STATUS_TYPE_DAILY:
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
    case types.POST_SHISETSUNYUSHO_REPORT_DAILY_STARTED:
      return { ...state };
    case types.POST_SHISETSUNYUSHO_REPORT_DAILY_SUCCESS:
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
          usagePerformanceSHISETSUNYUSHO: {
            ...state.reportDaily.usagePerformanceSHISETSUNYUSHO,
            before: {
              ...state.reportDaily.usagePerformanceSHISETSUNYUSHO.before,
              [action.meta]: action.payload.res2
            },
            after: {
              ...state.reportDaily.usagePerformanceSHISETSUNYUSHO.after,
              [action.meta]: action.payload.res2
            }
          }
        }
      };
    case types.POST_SHISETSUNYUSHO_REPORT_DAILY_FAILED:
      return { ...state };
    case types.UPDATE_SHISETSUNYUSHO_USAGE_PERFORMANCE_PARAMS_DAILY:
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
    case types.UPDATE_SHISETSUNYUSHO_USAGE_PERFORMANCE_SHISETSUNYUSHO_DAILY:
      return {
        ...state,
        reportDaily: {
          ...state.reportDaily,
          usagePerformanceSHISETSUNYUSHO: {
            ...state.reportDaily.usagePerformanceSHISETSUNYUSHO,
            after: action.payload
          }
        }
      };
    case types.UPDATE_SHISETSUNYUSHO_USAGE_PERFORMANCE_DAILY:
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
    case types.POST_SHISETSUNYUSHO_BULK_REGISTRATION_DAILY_STARTED:
      return { ...state };
    case types.POST_SHISETSUNYUSHO_BULK_REGISTRATION_DAILY_SUCCESS:
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
          usagePerformanceSHISETSUNYUSHO: {
            ...action.payload.usagePerformanceSHISETSUNYUSHO,
            before: cloneDeep(
              action.payload.usagePerformanceSHISETSUNYUSHO.after
            )
          }
        }
      };
    case types.POST_SHISETSUNYUSHO_BULK_REGISTRATION_DAILY_FAILED:
      return { ...state };
    // 利用者ごと用のreducers
    case types.FETCH_SHISETSUNYUSHO_USERS_STARTED:
      return { ...state };
    case types.FETCH_SHISETSUNYUSHO_USERS_SUCCESS:
      return {
        ...state,
        reportUsers: action.payload
      };
    case types.FETCH_SHISETSUNYUSHO_USERS_FAILED:
      return { ...state };
    case types.UPDATE_SHISETSUNYUSHO_ALL_STATUS_TYPE_USERS:
      return {
        ...state,
        reportUsers: {
          ...state.reportUsers,
          usagePerformance: {
            ...state.reportUsers.usagePerformance,
            after: action.payload
          }
        }
      };
    case types.POST_SHISETSUNYUSHO_REPORT_USERS_STARTED:
      return { ...state };
    case types.POST_SHISETSUNYUSHO_REPORT_USERS_SUCCESS:
      return {
        ...state,
        reportUsers: {
          ...state.reportUsers,
          usagePerformance: {
            ...state.reportUsers.usagePerformance,
            before: {
              ...state.reportUsers.usagePerformance.before,
              [action.meta]: action.payload.res
            },
            after: {
              ...state.reportUsers.usagePerformance.after,
              [action.meta]: action.payload.res
            }
          },
          usagePerformanceSHISETSUNYUSHO: {
            ...state.reportUsers.usagePerformanceSHISETSUNYUSHO,
            before: {
              ...state.reportUsers.usagePerformanceSHISETSUNYUSHO.before,
              [action.meta]: action.payload.res2
            },
            after: {
              ...state.reportUsers.usagePerformanceSHISETSUNYUSHO.after,
              [action.meta]: action.payload.res2
            }
          }
        }
      };
    case types.POST_SHISETSUNYUSHO_REPORT_USERS_FAILED:
      return { ...state };

    case types.UPDATE_SHISETSUNYUSHO_USAGE_PERFORMANCE_PARAMS_USERS:
      return {
        ...state,
        reportUsers: {
          ...state.reportUsers,
          usagePerformance: {
            ...state.reportUsers.usagePerformance,
            after: action.payload
          }
        }
      };
    case types.UPDATE_SHISETSUNYUSHO_USAGE_PERFORMANCE_SHISETSUNYUSHO_USERS:
      return {
        ...state,
        reportUsers: {
          ...state.reportUsers,
          usagePerformanceSHISETSUNYUSHO: {
            ...state.reportUsers.usagePerformanceSHISETSUNYUSHO,
            after: action.payload
          }
        }
      };
    case types.POST_SHISETSUNYUSHO_BULK_REGISTRATION_USERS_STARTED:
      return { ...state };
    case types.POST_SHISETSUNYUSHO_BULK_REGISTRATION_USERS_SUCCESS:
      return {
        ...state,
        reportUsers: {
          usagePerformance: {
            ...action.payload.usagePerformance,
            before: cloneDeep(action.payload.usagePerformance.after)
          },
          usagePerformanceSHISETSUNYUSHO: {
            ...action.payload.usagePerformanceSHISETSUNYUSHO,
            before: cloneDeep(
              action.payload.usagePerformanceSHISETSUNYUSHO.after
            )
          }
        }
      };
    case types.POST_SHISETSUNYUSHO_BULK_REGISTRATION_USERS_FAILED:
      return { ...state };
    // 共通用のreducers
    case types.RESET_SHISETSUNYUSHO_USAGE_PERFORMANCE:
      return {
        ...state,
        reportDaily: {
          usagePerformanceDaily: {
            ...action.payload.reportDaily.usagePerformanceDaily,
            after: cloneDeep(
              action.payload.reportDaily.usagePerformanceDaily.before
            )
          },
          usagePerformance: {
            ...action.payload.reportDaily.usagePerformance,
            after: cloneDeep(action.payload.reportDaily.usagePerformance.before)
          },
          usagePerformanceSHISETSUNYUSHO: {
            ...action.payload.reportDaily.usagePerformanceSHISETSUNYUSHO,
            after: cloneDeep(
              action.payload.reportDaily.usagePerformanceSHISETSUNYUSHO.before
            )
          }
        },
        reportUsers: {
          usagePerformance: {
            ...action.payload.reportUsers.usagePerformance,
            after: cloneDeep(action.payload.reportUsers.usagePerformance.before)
          },
          usagePerformanceSHISETSUNYUSHO: {
            ...action.payload.reportUsers.usagePerformanceSHISETSUNYUSHO,
            after: cloneDeep(
              action.payload.reportUsers.usagePerformanceSHISETSUNYUSHO.before
            )
          }
        }
      };
    default:
      return state;
  }
};
export default reducer;
