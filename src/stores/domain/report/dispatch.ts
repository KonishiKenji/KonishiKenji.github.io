import { Dispatch } from "redux";
import * as action from "@stores/domain/report/action";
import {
  ReportTypeInterface,
  Report,
  ReportPerformanceDaily,
  REPEAT_DAILY,
  REPEAT_MONTHLY
} from "@stores/domain/report/type";
import dispatches from "@stores/dispatches";
import { dateInYYYYMMDDFormat, dateInYYYYMMFormat } from "@utils/date";
import {
  normalizeReportMonthlyDataToAPI,
  normalizeReportDailyDataToAPI,
  normalizeReportDataFromAPI
} from "@stores/domain/report/normalizer";

import usagePerformanceApi from "@api/requests/usagePerformance";

const fetchDaily = (dispatch: Dispatch) => async (date: Date) => {
  dispatch(action.fetchDaily.started());
  dispatches.uiDispatch(dispatch).loading(true);
  await usagePerformanceApi
    .getUsagePerformanceDaily(dateInYYYYMMDDFormat(date))
    .then(res => {
      dispatch(
        action.fetchDaily.done({
          result: normalizeReportDataFromAPI(res.data.data, REPEAT_DAILY, date)
        })
      );
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch(e => {
      dispatch(action.fetchDaily.failed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).loading(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー", // TODO fix
        variant: "error"
      });
    });
};

const fetchMonthly = (dispatch: Dispatch) => async (
  uifId: number,
  date: Date
): Promise<void> => {
  dispatch(action.fetchDaily.started());
  dispatches.uiDispatch(dispatch).loading(true);
  await usagePerformanceApi
    .getUsagePerformanceMonthly(uifId, dateInYYYYMMFormat(date))
    .then(res => {
      dispatch(
        action.fetchMonthly.done({
          result: normalizeReportDataFromAPI(res.data.data, REPEAT_MONTHLY)
        })
      );
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch(e => {
      dispatch(action.fetchMonthly.failed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).loading(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー", // TODO fix
        variant: "error"
      });
    });
};

const postDaily = (dispatch: Dispatch) => async (
  reportListBefore: Report[],
  reportListAfter: Report[],
  performanceDaily: ReportPerformanceDaily
): Promise<void> => {
  dispatch(action.fetchDaily.started());
  dispatches.uiDispatch(dispatch).loading(true);
  const data = normalizeReportDailyDataToAPI(
    reportListBefore,
    reportListAfter,
    performanceDaily
  );
  await usagePerformanceApi
    .postSetUsagePerformanceDaily(data)
    .then(() => {
      dispatch(
        action.postDaily.done({
          result: {
            performanceDaily,
            reportList: reportListAfter
          }
        })
      );
      dispatches.uiDispatch(dispatch).stopHistory(false);
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch(e => {
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).loading(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー", // TODO fix
        variant: "error"
      });
    });
};

const postMonthly = (dispatch: Dispatch) => async (
  reportListBefore: Report[],
  reportListAfter: Report[]
): Promise<void> => {
  dispatch(action.fetchDaily.started());
  dispatches.uiDispatch(dispatch).loading(true);
  const data = normalizeReportMonthlyDataToAPI(
    reportListBefore,
    reportListAfter
  );
  await usagePerformanceApi
    .postSetUsagePerformanceMonthly(data)
    .then(() => {
      dispatch(
        action.postMonthly.done({
          result: reportListAfter
        })
      );
      dispatches.uiDispatch(dispatch).stopHistory(false);
      dispatches.uiDispatch(dispatch).loading(false);
    })
    .catch(e => {
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).loading(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー", // TODO fix
        variant: "error"
      });
    });
};

const setBeforeToAfterDaily = (dispatch: Dispatch) => (): void => {
  dispatch(action.setBeforeToAfterDaily());
};

const setBeforeToAfterMonthly = (dispatch: Dispatch) => (): void => {
  dispatch(action.setBeforeToAfterMonthly());
};

const setStatusType = (dispatch: Dispatch) => (
  statusType: string,
  targetKey: number,
  tableType: ReportTypeInterface["type"]
): void => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    action.setStatusType({ value: statusType, type: tableType, key: targetKey })
  );
};

const setBodyRestraintAbolitionUnexecutedFlg = (dispatch: Dispatch) => (
  flg: boolean,
  tableType: ReportTypeInterface["type"]
): void => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    action.setBodyRestraintAbolitionUnexecutedFlg({
      value: flg,
      type: tableType
    })
  );
};

const setNightSupportType = (dispatch: Dispatch) => (
  nightSupportType: string,
  targetKey: number,
  tableType: ReportTypeInterface["type"]
): void => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    action.setNightSupportType({
      value: nightSupportType,
      type: tableType,
      key: targetKey
    })
  );
};

const setHospitalizationSupportType = (dispatch: Dispatch) => (
  hospitalizationSupportType: string,
  targetKey: number,
  tableType: ReportTypeInterface["type"]
): void => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    action.setHospitalizationSupportType({
      value: hospitalizationSupportType,
      type: tableType,
      key: targetKey
    })
  );
};

const setGetHomeSupportType = (dispatch: Dispatch) => (
  getHomeSupportType: string,
  targetKey: number,
  tableType: ReportTypeInterface["type"]
): void => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    action.setGetHomeSupportType({
      value: getHomeSupportType,
      type: tableType,
      key: targetKey
    })
  );
};

const setDaytimeSupportType = (dispatch: Dispatch) => (
  daytimeSupportType: string,
  targetKey: number,
  tableType: ReportTypeInterface["type"]
): void => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    action.setDaytimeSupportType({
      value: daytimeSupportType,
      type: tableType,
      key: targetKey
    })
  );
};

const setMedicalSupportType = (dispatch: Dispatch) => (
  medicalSupportType: string,
  targetKey: number,
  tableType: ReportTypeInterface["type"]
): void => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    action.setMedicalSupportType({
      value: medicalSupportType,
      type: tableType,
      key: targetKey
    })
  );
};

const setLifeSupportFlg = (dispatch: Dispatch) => (
  lifeSupportFlg: string,
  targetKey: number,
  tableType: ReportTypeInterface["type"]
): void => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    action.setLifeSupportFlg({
      value: lifeSupportFlg,
      type: tableType,
      key: targetKey
    })
  );
};

const setHomeCareFlg = (dispatch: Dispatch) => (
  homeCareFlg: string,
  targetKey: number,
  tableType: ReportTypeInterface["type"]
): void => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    action.setHomeCareFlg({
      value: homeCareFlg,
      type: tableType,
      key: targetKey
    })
  );
};

const setRemarks = (dispatch: Dispatch) => (
  remarks: string,
  targetKey: number,
  tableType: ReportTypeInterface["type"]
): void => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    action.setRemarks({ value: remarks, type: tableType, key: targetKey })
  );
};

const setAllStatusTypeDaily = (dispatch: Dispatch) => (
  statusType: string
): void => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(action.setAllStatusTypeDaily(statusType));
};

const setAllStatusTypeMonthly = (dispatch: Dispatch) => (
  statusType: string
): void => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(action.setAllStatusTypeMonthly(statusType));
};

export default (dispatch: Dispatch) => ({
  fetchDaily: fetchDaily(dispatch),
  fetchMonthly: fetchMonthly(dispatch),
  postDaily: postDaily(dispatch),
  postMonthly: postMonthly(dispatch),
  setBeforeToAfterDaily: setBeforeToAfterDaily(dispatch),
  setBeforeToAfterMonthly: setBeforeToAfterMonthly(dispatch),
  setStatusType: setStatusType(dispatch),
  setBodyRestraintAbolitionUnexecutedFlg: setBodyRestraintAbolitionUnexecutedFlg(
    dispatch
  ),
  setNightSupportType: setNightSupportType(dispatch),
  setHospitalizationSupportType: setHospitalizationSupportType(dispatch),
  setGetHomeSupportType: setGetHomeSupportType(dispatch),
  setDaytimeSupportType: setDaytimeSupportType(dispatch),
  setMedicalSupportType: setMedicalSupportType(dispatch),
  setLifeSupportFlg: setLifeSupportFlg(dispatch),
  setHomeCareFlg: setHomeCareFlg(dispatch),
  setRemarks: setRemarks(dispatch),
  setAllStatusTypeDaily: setAllStatusTypeDaily(dispatch),
  setAllStatusTypeMonthly: setAllStatusTypeMonthly(dispatch)
});
