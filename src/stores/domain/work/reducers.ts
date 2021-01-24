import * as types from "./types";
import * as actions from "./actions";
import orderBy from "lodash-es/orderBy";

const initialState: types.WorkState = {
  workData: [],
  workCategoryList: [],
  workItems: []
};

const reducer = (
  state = initialState,
  action: actions.ActionTypes
): types.WorkState => {
  switch (action.type) {
    case types.FETCH_STARTED:
      return { ...state };
    case types.FETCH_SUCCESS:
      const workCategoryList = [] as types.WorkCategories[];
      const workItems = [] as types.WorkData[];
      for (const { id, name, items } of action.payload.data) {
        workCategoryList.push({
          categoryId: id,
          categoryName: name
        });
        workItems.push(
          ...items.map(item => ({
            categoryId: id,
            workItemId: item.id,
            workName: item.name
          }))
        );
      }
      return {
        ...state,
        workData: action.payload.data,
        workCategoryList: orderBy(workCategoryList, ["categoryId"], ["asc"]),
        workItems: orderBy(workItems, ["workItemId"], ["asc"])
      };
    case types.FETCH_FAILED:
      return { ...state };
    case types.POST_STARTED:
      return { ...state };
    case types.POST_SUCCESS:
      return { ...state };
    case types.POST_FAILED:
      return { ...state };
    case types.DELETE_STARTED:
      return { ...state };
    case types.DELETE_SUCCESS:
      return { ...state };
    case types.DELETE_FAILED:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
