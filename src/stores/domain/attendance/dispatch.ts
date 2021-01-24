import * as action from "./action";
import { Dispatch } from "redux";
import { dateInYYYYMMDDFormat, dateToObject } from "@utils/date";
import dispatches from "@stores/dispatches";
import {
  normalizeAttendanceListFromAPI,
  normalizeAttendanceFromAPI
} from "@stores/domain/attendance/normalizer";
import inOutApi from "@api/requests/inOut";

const fetchAttendanceList = (dispatch: Dispatch) => async () => {
  dispatches.uiDispatch(dispatch).loading(true);
  await inOutApi
    .getInOutList(dateInYYYYMMDDFormat(new Date()))
    .then(res => {
      dispatch(
        action.fetchAttendanceList(normalizeAttendanceListFromAPI(res.data))
      );
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch(e => {
      dispatches.uiDispatch(dispatch).loading(false);
      if (e.response && e.response.status && isLogout(e.response.status)) {
        dispatches.authDispatch(dispatch).logout();
      }
    });
};

const fetchAttendance = (dispatch: Dispatch) => async (
  id: number,
  kana: string
) => {
  await inOutApi
    .getUserInOut(id, dateInYYYYMMDDFormat(new Date()))
    .then(res => {
      if (res.data.data) {
        dispatch(
          action.fetchAttendance(normalizeAttendanceFromAPI(res.data.data, id))
        );
      }
    })
    .catch(e => {
      if (e.response && e.response.status && isLogout(e.response.status)) {
        dispatches.authDispatch(dispatch).logout();
      }
    });
};

const inTime = (dispatch: Dispatch) => async (
  id: number,
  name: string,
  status: number
) => {
  const requestParams = {
    status,
    in_time: new Date().getTime()
  };
  dispatches.uiDispatch(dispatch).loading(true);
  await inOutApi
    .postInTime(id, requestParams)
    .then(res => {
      inOutApi
        .getInOutList(dateInYYYYMMDDFormat(new Date()))
        .then(list => {
          dispatch(
            action.fetchAttendanceList(
              normalizeAttendanceListFromAPI(list.data)
            )
          );
          dispatches.uiDispatch(dispatch).snackbar({
            open: true,
            message: `${name}さん　${dateToObject(new Date()).hour}:${
              dateToObject(new Date()).minute
            }に通所しました`,
            variant: "success"
          });
          dispatches.uiDispatch(dispatch).loading(false);
        })
        .catch(e => {
          if (e.response && e.response.status && isLogout(e.response.status)) {
            dispatches.authDispatch(dispatch).logout();
          }
          dispatches.uiDispatch(dispatch).loading(false);
        });
    })
    .catch(e => {
      if (e.response && e.response.status && isLogout(e.response.status)) {
        dispatches.authDispatch(dispatch).logout();
      } else {
        dispatches.uiDispatch(dispatch).snackbar({
          open: true,
          message: `通所処理に失敗しました。`,
          variant: "error"
        });
      }
      dispatches.uiDispatch(dispatch).loading(false);
    });
};

const outTime = (dispatch: Dispatch) => async (
  id: number,
  name: string,
  status: number
) => {
  const requestParams = {
    status,
    out_time: new Date().getTime()
  };
  dispatches.uiDispatch(dispatch).loading(true);
  await inOutApi
    .postOutTime(id, requestParams)
    .then(res => {
      inOutApi
        .getInOutList(dateInYYYYMMDDFormat(new Date()))
        .then(list => {
          dispatch(
            action.fetchAttendanceList(
              normalizeAttendanceListFromAPI(list.data)
            )
          );
          dispatches.uiDispatch(dispatch).snackbar({
            open: true,
            message: `${name}さん　${dateToObject(new Date()).hour}:${
              dateToObject(new Date()).minute
            }に退所しました`,
            variant: "success"
          });
          dispatches.uiDispatch(dispatch).loading(false);
        })
        .catch(e => {
          if (e.response && e.response.status && isLogout(e.response.status)) {
            dispatches.authDispatch(dispatch).logout();
          }
          dispatches.uiDispatch(dispatch).loading(false);
        });
    })
    .catch(e => {
      if (e.response && e.response.status && isLogout(e.response.status)) {
        dispatches.authDispatch(dispatch).logout();
      } else {
        dispatches.uiDispatch(dispatch).snackbar({
          open: true,
          message: `通所処理に失敗しました。`,
          variant: "error"
        });
      }
      dispatches.uiDispatch(dispatch).loading(false);
    });
};

const isLogout = (status: number) => {
  return status === 400 || status === 401;
};

export default function(dispatch: Dispatch) {
  return {
    fetchAttendanceList: fetchAttendanceList(dispatch),
    fetchAttendance: fetchAttendance(dispatch),
    inTime: inTime(dispatch),
    outTime: outTime(dispatch)
  };
}
