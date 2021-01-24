import * as types from "./types";
import * as actions from "./actions";

const initialState: types.SupportPlanAState = {
  privateSupportPlan: {
    id: 0,
    support_begin_date: null,
    support_end_date: null,
    status_type: 0,
    evaluation_status: 0,
    evaluation_minutes_status: 0,
    user_request_type: 0,
    details: "",
    user_request_text: "",
    income_status: "",
    user_issue: "",
    physical_condition: "",
    risk_factor: "",
    after_summary: "",
    current_status: "",
    other_comment: null,
    staff_comment: null,
    minutes: null,
    minutes_date: null,
    evaluation_minutes: null,
    evaluation_date: null,
    participant: [],
    participant_history: [],
    participant_name: null,
    remarks: null,
    author: 0,
    authorizer: 0,
    revaluation_date: "",
    evaluation_authorizer: 0,
    creation_date: null,
    previous_creation_date: null,
    created_at: null,
    updated_at: null,
    support_plan_goal: [],
    support_plan_program: [],
    pickup: 0
    // archive: true
  },
  supportPlan: [
    {
      id: 0,
      support_begin_date: null,
      support_end_date: null,
      status_type: 0,
      evaluation_status: 0,
      user_request_type: 0,
      details: "",
      user_request_text: "",
      income_status: "",
      user_issue: "",
      physical_condition: "",
      risk_factor: "",
      current_status: "",
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
      support_plan_program: [],
      pickup: 0,
      archive: true
    }
  ]
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.SupportPlanAState => {
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
