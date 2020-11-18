import * as types from "./types";
import * as actions from "./actions";

const initialState: types.SupportPlanState = {
  privateSupportPlan: {
    id: 0,
    support_begin_date: null,
    support_end_date: null,
    status_type: 0,
    user_request_type: 0,
    user_request_text: "",
    current_status: "",
    long_term_goal: "",
    other_comment: null,
    staff_comment: null,
    minutes: null,
    minutes_date: null,
    participant: [],
    remarks: null,
    author: 0,
    authorizer: 0,
    creation_date: null,
    created_at: null,
    updated_at: null,
    support_plan_goal: []
    // archive: true
  },
  supportPlan: [
    {
      id: 0,
      support_begin_date: null,
      support_end_date: null,
      status_type: 0,
      user_request_type: 0,
      user_request_text: "",
      current_status: "",
      long_term_goal: "",
      other_comment: null,
      staff_comment: null,
      minutes: null,
      minutes_date: null,
      participant: [],
      remarks: null,
      author: 0,
      authorizer: 0,
      creation_date: null,
      support_plan_goal: [],
      archive: true
    }
  ]
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.SupportPlanState => {
  switch (action.type) {
    case types.FETCH_PRIVATE_SUPPORT_PLAN_SUCCESS:
      return { ...state, privateSupportPlan: action.payload };
    case types.POST_NEW_SUPPORT_PLAN_FAILED:
    case types.POST_UPDATE_SUPPORT_PLAN_FAILED:
    case types.FETCH_PRIVATE_SUPPORT_PLAN_FAILED:
      return { ...state };
    case types.FETCH_SUPPORT_PLAN_SUCCESS:
      return { ...state, supportPlan: action.payload };
    case types.FETCH_SUPPORT_PLAN_FAILED:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
