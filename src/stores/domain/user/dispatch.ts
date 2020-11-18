import { Dispatch } from "redux";
import * as action from "./action";
import dispatches from "@stores/dispatches";
import get from "lodash-es/get";
import * as loadingActions from "@stores/loading/actions";
import { PostUpdateAssociatedFacilityParams } from "@api/requests/user/postUpdateAssociatedFacility";

import userApi from "@api/requests/user";

export const me = (dispatch: Dispatch) => async (): Promise<void> => {
  const uiDispatches = dispatches.uiDispatch(dispatch);
  dispatch(action.me.started());
  uiDispatches.loading(true);
  await userApi
    .getUser()
    .then(res => {
      dispatch(action.me.done({ result: res.data.data }));
      uiDispatches.loading(false);
    })
    .catch(e => {
      dispatch(action.me.failed({ error: e.response }));
      // token失効時のリロードした時にログアウト処理がうまくいっていないので一旦ここで対応
      if (get(e, "response.status") === 401) {
        dispatches.authDispatch(dispatch).logout();
      }
      uiDispatches.responseError(e.response);
      uiDispatches.loading(false);
    });
};

/**
 * サイドメニューの法人名と事業所名を更新する
 * @param dispatch
 */
const setFacilityValuesToUser = (dispatch: Dispatch) => (
  facilityName: string,
  businessOwner: string,
  multiFunctionOfficeFlag: boolean = false,
  masterSubordinateFlg: boolean = false
) => {
  dispatch(
    action.setFacilityValuesToUser({
      facilityName,
      businessOwner,
      multiFunctionOfficeFlag,
      masterSubordinateFlg
    })
  );
};

/**
 * ログインユーザー所属事業所情報更新
 */
export const updateAssociatedFacility = (dispatch: Dispatch) => async (
  value: PostUpdateAssociatedFacilityParams["facility_id"]
) => {
  dispatch(loadingActions.loadStarted());
  dispatch(action.updateAssociatedFacility(value));
  await userApi
    .postUpdateAssociatedFacility(value)
    .then(res => {
      dispatches.uiDispatch(dispatch).stopHistory(false);
      dispatches.userDispatch(dispatch).me();
    })
    .catch(e => {
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー", // TODO fix
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export default function(dispatch: Dispatch) {
  return {
    me: me(dispatch),
    setFacilityValuesToUser: setFacilityValuesToUser(dispatch),
    updateAssociatedFacility: updateAssociatedFacility(dispatch)
  };
}
