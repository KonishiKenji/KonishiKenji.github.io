import { Dispatch } from "redux";
import * as actions from "./actions";
import {
  SEIKATSUKAIGOReportTypeInterface,
  SEIKATSUKAIGOReport,
  REPEAT_DAILY,
  SEIKATSUKAIGOReportAdditionsDaily
} from "./types";
import dispatches from "@stores/dispatches";
import inOutApi from "@api/requests/inOut/";
import {
  dateInYYYYMMDDFormat,
  dateInYYYYFormat,
  dateInMMFormat
} from "@utils/date";
import {
  normalizeSEIKATSUKAIGOReportDataToAPI,
  normalizeSEIKATSUKAIGODailyReportDataFromAPI,
  normalizeSEIKATSUKAIGOUserReportDataFromAPI,
  nomalizeSEIKATSUKAIGODailySummaryDataFromAPI,
  nomalizeSEIKATSUKAIGOUserSummaryDataFromAPI,
  addChangedDataToReportList
} from "./normalizer";
import * as loadingActions from "@stores/loading/actions";
import { InitialValues } from "@interfaces/mgr/SEIKATSUKAIGO/report/initial";
import { FacilityState } from "../facility/types";

/**
 * 利用実績一覧(日ごと)データ取得及びstore格納
 * @param dispatch
 */
const fetchSEIKATSUKAIGODaily = (dispatch: Dispatch) => async (
  date: Date
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchSEIKATSUKAIGODailyStarted());
  await inOutApi
    .getInOut(dateInYYYYMMDDFormat(date))
    .then((response) => {
      dispatch(
        actions.fetchSEIKATSUKAIGODaily(
          normalizeSEIKATSUKAIGODailyReportDataFromAPI(response.data, date)
        )
      );
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch((e) => {
      dispatch(actions.fetchSEIKATSUKAIGODailyFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).loading(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー",
        variant: "error"
      });
    })
    .finally(() => {
      dispatch(loadingActions.loadDone());
    });
};

/**
 * 利用実績一覧(ユーザごと)のデータ取得及びstore格納
 * @param dispatch
 */
const fetchSEIKATSUKAIGOUser = (dispatch: Dispatch) => async (
  uifId: number,
  date: Date
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchSEIKATSUKAIGOUserStarted());
  await inOutApi
    .getInOutUser(uifId, dateInYYYYFormat(date), dateInMMFormat(date))
    .then((response) => {
      dispatch(
        actions.fetchSEIKATSUKAIGOUser(
          normalizeSEIKATSUKAIGOUserReportDataFromAPI(response.data)
        )
      );
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch((e) => {
      dispatch(actions.fetchSEIKATSUKAIGOUserFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).loading(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー",
        variant: "error"
      });
    })
    .finally(() => {
      dispatch(loadingActions.loadDone());
    });
};

/**
 * 利用実績一覧(日ごと)の集計データ取得及びstore格納
 * @param dispatch
 */
const fetchDailySummary = (dispatch: Dispatch) => async (
  date: Date
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchDailySummaryStarted());
  await inOutApi
    .getInOutSummary(dateInYYYYMMDDFormat(date))
    .then((response) => {
      dispatch(
        actions.fetchDailySummary(
          nomalizeSEIKATSUKAIGODailySummaryDataFromAPI(response.data)
        )
      );
    })
    .catch((e) => {
      dispatch(actions.fetchDailySummaryFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー",
        variant: "error"
      });
    })
    .finally(() => {
      dispatch(loadingActions.loadDone());
    });
};

/**
 * 利用実績一覧(ユーザごと)の集計データ取得及びstore格納
 * @param dispatch
 */
const fetchSEIKATSUKAIGOUserSummary = (dispatch: Dispatch) => async (
  uifId: number,
  date: Date
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchSEIKATSUKAIGOUserSummaryStarted());
  await inOutApi
    .getInOutUserSummary(uifId, dateInYYYYFormat(date), dateInMMFormat(date))
    .then((response) => {
      dispatch(
        actions.fetchSEIKATSUKAIGOUserSummary(
          nomalizeSEIKATSUKAIGOUserSummaryDataFromAPI(response.data)
        )
      );
    })
    .catch((e) => {
      dispatch(
        actions.fetchSEIKATSUKAIGOUserSummaryFailed({ error: e.response })
      );
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー",
        variant: "error"
      });
    })
    .finally(() => {
      dispatch(loadingActions.loadDone());
    });
};

/**
 * 利用実績一覧データのDB更新
 * @param dispatch
 */
const putSEIKATSUKAIGOReport = (dispatch: Dispatch) => async (
  reportList: SEIKATSUKAIGOReport[],
  formValue: InitialValues,
  facilityState: FacilityState,
  type: SEIKATSUKAIGOReportTypeInterface["type"]
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.putSEIKATSUKAIGOReportStarted());
  const reportListAfter = addChangedDataToReportList(
    formValue.initial.uifId,
    formValue,
    reportList,
    type
  );
  const data = normalizeSEIKATSUKAIGOReportDataToAPI(
    reportList,
    reportListAfter,
    facilityState
  );
  await inOutApi
    .putInOutRecords(data)
    .then(() => {
      const actionType =
        type === REPEAT_DAILY
          ? actions.putSEIKATSUKAIGOReportDaily(reportListAfter)
          : actions.putSEIKATSUKAIGOReportUser(reportListAfter);
      dispatch(actionType);
    })
    .catch((e) => {
      dispatch(actions.putSEIKATSUKAIGOReportFailed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー",
        variant: "error"
      });
    })
    .finally(() => {
      dispatch(loadingActions.loadDone());
    });
};

/**
 * 利用実績一覧データのDBの身体拘束廃止未実施更新
 * @param dispatch
 */
const postSEIKATSUKAIGOInOutAllRecords = (dispatch: Dispatch) => async (
  reportAdditionDaily: SEIKATSUKAIGOReportAdditionsDaily
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.postSEIKATSUKAIGOInOutAllRecordStarted());
  await inOutApi
    .postInOutAllRecord(reportAdditionDaily.targetDate, {
      bodyRestrictedStillFlg: reportAdditionDaily.bodyRestrictedStillFlg
        ? 1
        : 0,
      openShortTime: reportAdditionDaily.openShortTime
    })
    .then(() => {
      dispatch(actions.postSEIKATSUKAIGOInOutAllRecord(reportAdditionDaily));
    })
    .catch((e) => {
      dispatch(
        actions.postSEIKATSUKAIGOInOutAllRecordFailed({
          error: e.response
        })
      );
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー",
        variant: "error"
      });
    })
    .finally(() => {
      dispatch(loadingActions.loadDone());
    });
};

export default (dispatch: Dispatch) => ({
  fetchSEIKATSUKAIGODaily: fetchSEIKATSUKAIGODaily(dispatch),
  fetchSEIKATSUKAIGOUser: fetchSEIKATSUKAIGOUser(dispatch),
  fetchDailySummary: fetchDailySummary(dispatch),
  fetchSEIKATSUKAIGOUserSummary: fetchSEIKATSUKAIGOUserSummary(dispatch),
  putSEIKATSUKAIGOReport: putSEIKATSUKAIGOReport(dispatch),
  postSEIKATSUKAIGOInOutAllRecords: postSEIKATSUKAIGOInOutAllRecords(dispatch)
});
