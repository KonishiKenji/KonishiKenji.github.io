import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { ContactValues } from "@interfaces/contact/contact";
import { CONTACT_COMPLETE } from "@constants/url";

import contactApi from "@api/requests/contact";

/************
 * api
 ************/

export const post = (dispatch: Dispatch) => async (
  params: ContactValues,
  history: any
) => {
  dispatches.uiDispatch(dispatch).loading(true);
  contactApi
    .postContact(params)
    .then(success(dispatch, history))
    .catch(error(dispatch));
};

const success = (dispatch: Dispatch, history: any) => () => {
  dispatches.uiDispatch(dispatch).loading(false);
  dispatches.uiDispatch(dispatch).snackbar({
    open: true,
    message: "送信が完了しました",
    variant: "success"
  });
  history.push(CONTACT_COMPLETE);
};

const error = (dispatch: Dispatch) => (e: any) => {
  dispatches.uiDispatch(dispatch).responseError(e.response);
  dispatches.uiDispatch(dispatch).loading(false);
  dispatches.uiDispatch(dispatch).snackbar({
    open: true,
    message: "通信エラー",
    variant: "error"
  });
};

export default function(dispatch: Dispatch) {
  return {
    post: post(dispatch)
  };
}
