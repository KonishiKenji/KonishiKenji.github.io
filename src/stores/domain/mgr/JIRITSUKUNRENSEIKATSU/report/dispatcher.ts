import { Dispatch } from "redux";
import * as actions from "./actions";
import { REPEAT_DAILY, InOutReportState, ReportType } from "./types";
import dispatches from "@stores/dispatches";
import inOutApi from "@api/requests/inOut/";
import {
  dateInYYYYMMDDFormat,
  dateInYYYYFormat,
  dateInMMFormat
} from "@utils/date";
import {
  normalizeJIRITSUKUNRENSEIKATSUReportDataToAPI,
  normalizeJIRITSUKUNRENSEIKATSUDailyReportDataFromAPI,
  normalizeJIRITSUKUNRENSEIKATSUUserReportDataFromAPI,
  nomalizeJIRITSUKUNRENSEIKATSUDailySummaryDataFromAPI,
  nomalizeJIRITSUKUNRENSEIKATSUUserSummaryDataFromAPI,
  addChangedDataToReportList
} from "./normalizer";
import * as loadingActions from "@stores/loading/actions";
import { InitialValues } from "@interfaces/mgr/JIRITSUKUNRENSEIKATSU/report/initial";
import { ReportInterface } from "./interfaces/reportInterface";
import { FacilityState } from "../facility/types";
import { UsersInFacilityState } from "../userInFacility/types";

/**
 * 利用実績一覧(日ごと)データ取得及びstore格納
 * @param dispatch
 */
const fetchJIRITSUKUNRENSEIKATSUDaily = (dispatch: Dispatch) => async (
  date: Date
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchJIRITSUKUNRENSEIKATSUDailyStarted());
  await inOutApi
    .getInOut(dateInYYYYMMDDFormat(date))
    .then(response => {
      dispatch(
        actions.fetchJIRITSUKUNRENSEIKATSUDaily(
          normalizeJIRITSUKUNRENSEIKATSUDailyReportDataFromAPI(
            response.data,
            date
          )
        )
      );
    })
    .catch(e => {
      dispatch(
        actions.fetchJIRITSUKUNRENSEIKATSUDailyFailed({ error: e.response })
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
 * 利用実績一覧(ユーザごと)のデータ取得及びstore格納
 * @param dispatch
 */
const fetchJIRITSUKUNRENSEIKATSUUser = (dispatch: Dispatch) => async (
  uifId: number,
  date: Date
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchJIRITSUKUNRENSEIKATSUUserStarted());
  await inOutApi
    .getInOutUser(uifId, dateInYYYYFormat(date), dateInMMFormat(date))
    .then(response => {
      dispatch(
        actions.fetchJIRITSUKUNRENSEIKATSUUser(
          normalizeJIRITSUKUNRENSEIKATSUUserReportDataFromAPI(response.data)
        )
      );
    })
    .catch(e => {
      dispatch(
        actions.fetchJIRITSUKUNRENSEIKATSUUserFailed({ error: e.response })
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
 * 利用実績一覧(日ごと)の集計データ取得及びstore格納
 * @param dispatch
 */
const fetchJIRITSUKUNRENSEIKATSUDailySummary = (dispatch: Dispatch) => async (
  date: Date
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchJIRITSUKUNRENSEIKATSUDailySummaryStarted());
  await inOutApi
    .getInOutSummary(dateInYYYYMMDDFormat(date))
    .then(response => {
      dispatch(
        actions.fetchJIRITSUKUNRENSEIKATSUDailySummary(
          nomalizeJIRITSUKUNRENSEIKATSUDailySummaryDataFromAPI(response.data)
        )
      );
    })
    .catch(e => {
      dispatch(
        actions.fetchJIRITSUKUNRENSEIKATSUDailySummaryFailed({
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

/**
 * 利用実績一覧(ユーザごと)の集計データ取得及びstore格納
 * @param dispatch
 */
const fetchJIRITSUKUNRENSEIKATSUUserSummary = (dispatch: Dispatch) => async (
  uifId: number,
  date: Date
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchJIRITSUKUNRENSEIKATSUUserSummaryStarted());
  await inOutApi
    .getInOutUserSummary(uifId, dateInYYYYFormat(date), dateInMMFormat(date))
    .then(response => {
      dispatch(
        actions.fetchJIRITSUKUNRENSEIKATSUUserSummary(
          nomalizeJIRITSUKUNRENSEIKATSUUserSummaryDataFromAPI(response.data)
        )
      );
    })
    .catch(e => {
      dispatch(
        actions.fetchJIRITSUKUNRENSEIKATSUUserSummaryFailed({
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

/**
 * 利用実績一覧データのDB更新
 * @param dispatch
 */
const putJIRITSUKUNRENSEIKATSUReport = (dispatch: Dispatch) => async (
  reportList: ReportInterface[],
  formValue: InitialValues,
  facilityState: FacilityState,
  userswInFacilityState: UsersInFacilityState,
  type: ReportType
) => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.putJIRITSUKUNRENSEIKATSUReportStarted());
  const reportListAfter = addChangedDataToReportList(
    formValue.initial.uifId,
    formValue,
    reportList,
    facilityState,
    userswInFacilityState,
    type
  );
  const data = normalizeJIRITSUKUNRENSEIKATSUReportDataToAPI(
    reportList,
    reportListAfter
  );
  await inOutApi
    .putInOutRecords(data)
    .then(() => {
      const actionType =
        type === REPEAT_DAILY
          ? actions.putJIRITSUKUNRENSEIKATSUReportDaily(reportListAfter)
          : actions.putJIRITSUKUNRENSEIKATSUReportUser(reportListAfter);
      dispatch(actionType);
    })
    .catch(e => {
      dispatch(
        actions.putJIRITSUKUNRENSEIKATSUReportFailed({ error: e.response })
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
 * 利用実績一覧データのDBの身体拘束廃止未実施更新
 * @param dispatch
 */
const postJIRITSUKUNRENSEIKATSUInOutAllRecord = (dispatch: Dispatch) => async (
  restrictedStillFlg: InOutReportState["reports"]["additionsDaily"]
) => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.postJIRITSUKUNRENSEIKATSUInOutAllRecordStarted());
  await inOutApi
    .postInOutAllRecord(restrictedStillFlg.targetDate, {
      bodyRestrictedStillFlg: restrictedStillFlg.bodyRestrictedStillFlg ? 1 : 0,
      openShortTime: 0
    })
    .then(() => {
      dispatch(
        actions.postJIRITSUKUNRENSEIKATSUInOutAllRecord(restrictedStillFlg)
      );
    })
    .catch(e => {
      dispatch(
        actions.postJIRITSUKUNRENSEIKATSUInOutAllRecordFailed({
          error: e.response
        })
      );
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー", // TODO fix
        variant: "error"
      });
    })
    .finally(() => {
      dispatch(loadingActions.loadDone());
    });
};

export default (dispatch: Dispatch) => ({
  fetchJIRITSUKUNRENSEIKATSUDaily: fetchJIRITSUKUNRENSEIKATSUDaily(dispatch),
  fetchJIRITSUKUNRENSEIKATSUUser: fetchJIRITSUKUNRENSEIKATSUUser(dispatch),
  fetchJIRITSUKUNRENSEIKATSUDailySummary: fetchJIRITSUKUNRENSEIKATSUDailySummary(
    dispatch
  ),
  fetchJIRITSUKUNRENSEIKATSUUserSummary: fetchJIRITSUKUNRENSEIKATSUUserSummary(
    dispatch
  ),
  putJIRITSUKUNRENSEIKATSUReport: putJIRITSUKUNRENSEIKATSUReport(dispatch),
  postJIRITSUKUNRENSEIKATSUInOutAllRecord: postJIRITSUKUNRENSEIKATSUInOutAllRecord(
    dispatch
  )
});
