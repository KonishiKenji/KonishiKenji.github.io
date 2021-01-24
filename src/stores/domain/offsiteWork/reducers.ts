import * as types from "./types";
import * as actions from "./actions";

const initialState: types.InitialState = {
  download: {
    facility: {
      name: "",
      full_address: "",
      responsible_person: "",
      gov_facility_number: "",
      type_service: "",
      capacity: 0
    },
    report: []
  },
  workplaceCompanies: [],
  workplaceCompany: {
    workplace_company: {
      id: 0,
      facility_id: 0,
      name: "",
      address: "",
      postal_code: "",
      city_id: 0,
      tel: "",
      contract_begin_date: "",
      contract_end_date: "",
      working_day: "",
      working_time: "",
      working_description: "",
      other: "",
      remarks: "",
      prefecture_name: ""
    },
    users_in_facility: []
  },
  downloadables: { months: [] }
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.InitialState => {
  switch (action.type) {
    case types.FETCH_DOWNLOAD_SUCCESS:
      return { ...state, ...{ download: action.payload } };
    case types.FETCH_WORKPLACE_COMPANY_LIST_SUCCESS:
      return { ...state, workplaceCompanies: action.payload };
    case types.FETCH_WORKPLACE_COMPANY_SUCCESS:
      return { ...state, workplaceCompany: action.payload };
    case types.CLEAR_WORKPLACE_COMPANY:
      return { ...state, workplaceCompany: initialState.workplaceCompany };
    case types.FETCH_DOWNLOADABLE_SUCCESS:
      return { ...state, ...{ downloadables: action.payload } };
    default:
      return state;
  }
};

export default reducer;
