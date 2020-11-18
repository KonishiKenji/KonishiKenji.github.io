import { Dispatch } from "redux";
import * as actions from "./actions";
import {
  IABReportTypeInterface,
  IABReport,
  REPEAT_DAILY,
  IABReportAdditionsDaily
} from "./types";
import dispatches from "@stores/dispatches";
import inOutApi from "@api/requests/inOut/";
import {
  dateInYYYYMMDDFormat,
  dateInYYYYFormat,
  dateInMMFormat
} from "@utils/date";
import {
  normalizeIABReportDataToAPI,
  normalizeIABDailyReportDataFromAPI,
  normalizeIABUserReportDataFromAPI,
  normalizeIABDailySummaryDataFromAPI,
  normalizeIABUserSummaryDataFromAPI,
  addChangedDataToReportList
} from "./normalizer";
import * as loadingActions from "@stores/loading/actions";
import { InitialDataValues } from "@initialize/mgr/IAB/report/initialValues";

/**
 * 利用実績一覧(日ごと)データ取得及びstore格納
 * @param dispatch
 */
const fetchIABDaily = (dispatch: Dispatch) => async (
  date: Date
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchIABDailyStarted());
  await inOutApi
    .getInOut(dateInYYYYMMDDFormat(date))
    .then((response) => {
      dispatch(
        actions.fetchIABDaily(
          normalizeIABDailyReportDataFromAPI(response.data, date)
        )
      );
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch((e) => {
      dispatch(actions.fetchIABDailyFailed({ error: e.response }));
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
const fetchIABUser = (dispatch: Dispatch) => async (
  uifId: number,
  date: Date
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchIABUserStarted());
  await inOutApi
    .getInOutUser(uifId, dateInYYYYFormat(date), dateInMMFormat(date))
    .then((response) => {
      dispatch(
        actions.fetchIABUser(normalizeIABUserReportDataFromAPI(response.data))
      );
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch((e) => {
      dispatch(actions.fetchIABUserFailed({ error: e.response }));
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
          normalizeIABDailySummaryDataFromAPI(response.data)
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
const fetchIABUserSummary = (dispatch: Dispatch) => async (
  uifId: number,
  date: Date
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchIABUserSummaryStarted());
  await inOutApi
    .getInOutUserSummary(uifId, dateInYYYYFormat(date), dateInMMFormat(date))
    .then((response) => {
      dispatch(
        actions.fetchIABUserSummary(
          normalizeIABUserSummaryDataFromAPI(response.data)
        )
      );
    })
    .catch((e) => {
      dispatch(actions.fetchIABUserSummaryFailed({ error: e.response }));
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
const putIABReport = (dispatch: Dispatch) => async (
  reportList: IABReport[],
  formValue: InitialDataValues,
  type: IABReportTypeInterface["type"],
  facilityType: string
) => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.putIABReportStarted());
  const reportListAfter = addChangedDataToReportList(
    formValue.initial.uifId,
    formValue,
    reportList,
    type
  );

  const data = normalizeIABReportDataToAPI(
    reportList,
    reportListAfter,
    facilityType
  );
  await inOutApi
    .putInOutRecords(data)
    .then(() => {
      const actionType =
        type === REPEAT_DAILY
          ? actions.putIABReportDaily(reportListAfter)
          : actions.putIABReportUser(reportListAfter);
      dispatch(actionType);
    })
    .catch((e) => {
      dispatch(actions.putIABReportFailed({ error: e.response }));
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
const postIABInOutAllRecords = (dispatch: Dispatch) => async (
  reportAdditionDaily: IABReportAdditionsDaily
) => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.postIABInOutAllRecordStarted());
  await inOutApi
    .postInOutAllRecord(reportAdditionDaily.targetDate, {
      bodyRestrictedStillFlg: reportAdditionDaily.bodyRestrictedStillFlg
        ? 1
        : 0,
      openShortTime: reportAdditionDaily.openShortTime
    })
    .then(() => {
      dispatch(actions.postIABInOutAllRecord(reportAdditionDaily));
    })
    .catch((e) => {
      dispatch(
        actions.postIABInOutAllRecordFailed({
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
  fetchIABDaily: fetchIABDaily(dispatch),
  fetchIABUser: fetchIABUser(dispatch),
  fetchDailySummary: fetchDailySummary(dispatch),
  fetchIABUserSummary: fetchIABUserSummary(dispatch),
  putIABReport: putIABReport(dispatch),
  postIABInOutAllRecords: postIABInOutAllRecords(dispatch)
});
