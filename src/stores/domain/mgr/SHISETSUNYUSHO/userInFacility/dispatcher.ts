import { Dispatch } from "redux";
import * as actions from "./actions";
import * as loadingActions from "@stores/loading/actions";
import facilityApi from "@api/requests/facility";
import dispatches from "@stores/dispatches";
import { UsersValues } from "@initialize/mgr/SHISETSUNYUSHO/users/initialValues";
import { FacilityState } from "@stores/domain/mgr/SHISETSUNYUSHO/facility/types";
import {
  normalizedGetFacilityUserTargetIdResponse,
  normalizeFormValue
} from "./normalizer";
import * as URL from "@constants/url";
import * as H from "history";
import { UsersInFacilityState } from "./types";

const fetch = (dispatch: Dispatch) => async (date?: Date): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchStarted());
  await facilityApi
    .getFacilityUsers(date)
    .then(res => {
      dispatch(actions.fetchSuccess(res.data));
    })
    .catch(e => {
      dispatch(actions.fetchFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー",
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

const fetchOne = (dispatch: Dispatch) => async (id: string): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchOneStarted());
  await facilityApi
    .getFacilityUserTargetId(id)
    .then(res => {
      const normalizedData = normalizedGetFacilityUserTargetIdResponse(
        res.data.data
      );
      dispatch(actions.fetchOneSuccess(normalizedData));
    })
    .catch(e => {
      dispatch(actions.fetchOneFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー",
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

const create = (dispatch: Dispatch) => async (
  formValues: UsersValues,
  history: H.History,
  facility: FacilityState
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.createStarted());
  const requestData = normalizeFormValue(formValues, facility);
  await facilityApi
    .postNewFacilityUser(requestData)
    .then(() => {
      dispatch(actions.createSuccess());
      dispatches.uiDispatch(dispatch).stopHistory(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "保存が完了しました",
        variant: "success"
      }); // 成功したら画面を戻す
      history.push(URL.USERS);
    })
    .catch(e => {
      dispatch(actions.createFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー",
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

const update = (dispatch: Dispatch) => async (
  formValues: UsersValues,
  history: H.History,
  apiParams: UsersInFacilityState["user"],
  facility: FacilityState
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.updateStarted());
  const id = apiParams.user_in_facility.id;
  const requestData = normalizeFormValue(formValues, facility, apiParams);
  await facilityApi
    .postUpdateFacilityUser(id, requestData)
    .then(() => {
      dispatch(actions.updateSuccess());
      dispatches.uiDispatch(dispatch).stopHistory(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "保存が完了しました",
        variant: "success"
      });
      // 成功したら画面を戻す
      history.push(URL.USERS);
    })
    .catch(e => {
      dispatch(actions.updateFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー",
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

const clear = (dispatch: Dispatch) => async (
  id: string,
  history: H.History
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.clearStarted());
  await facilityApi
    .deleteFacilityUserTargetId(id)
    .then(() => {
      dispatch(actions.clearSuccess());
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "削除が完了しました",
        variant: "success"
      });
      // 成功したら画面を戻す
      history.push(URL.USERS);
    })
    .catch(e => {
      dispatch(actions.clearFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー",
        variant: "error"
      });
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export default (dispatch: Dispatch) => ({
  fetch: fetch(dispatch),
  fetchOne: fetchOne(dispatch),
  create: create(dispatch),
  update: update(dispatch),
  clear: clear(dispatch)
});
