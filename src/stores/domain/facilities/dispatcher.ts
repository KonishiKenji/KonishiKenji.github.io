import { Dispatch } from "redux";
import * as actions from "./actions";
import facilityApi from "@api/requests/facilities";
import dispatches from "@stores/dispatches";

/**
 * 業務支援施設リスト取得
 */
const AssociatedFacilityList = (dispatch: Dispatch) => async (): Promise<
  void
> => {
  dispatch(actions.fetchFacilityListStarted());
  await facilityApi
    .getAssociatedFacilityList()
    .then(res => {
      dispatch(actions.fetchFacilityListSuccess(res.data));
    })
    .catch(e => {
      dispatch(actions.fetchFacilityListFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
    });
};

export default (dispatch: Dispatch) => ({
  AssociatedFacilityList: AssociatedFacilityList(dispatch)
});
