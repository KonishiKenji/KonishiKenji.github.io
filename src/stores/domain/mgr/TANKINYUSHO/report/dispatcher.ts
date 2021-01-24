import { Dispatch } from "redux";
import * as actions from "./actions";

import dispatches from "@stores/dispatches";
import usagePerformanceAPI from "@api/requests/usagePerformance/";
import { dateInYYYYMMDDFormat, dateInYYYYMMFormat } from "@utils/date";
import {
  normalizeTANKINYUSHOReportDataDailyFromAPI,
  normalizeTANKINYUSHOReportDataMonthlyFromAPI,
  getSetUsagePerformanceItemsDaily,
  getSetUsagePerformanceTANKINYUSHOItemsDaily,
  getSetUsagePerformanceItemsMonthly,
  getSetUsagePerformanceTANKINYUSHOItemsMonthly,
  normalizePostUsagePerformanceParamDaily,
  getSetAllStatusType,
  normalizePostUsagePerformanceParamMonthly,
  normalizeTANKINYUSHOReportDataToAPI,
  normalizeServiceTypeNoneDaily,
  normalizeServiceTypeNoneMonthly
} from "./normalizer";
import * as loadingActions from "@stores/loading/actions";
import {
  ReportState,
  UsagePerformanceType,
  UsagePerformanceTANKINYUSHOType,
  REPEAT_DAILY,
  REPEAT_MONTHLY
} from "./types";
import { PostUsagePerformanceDailyParams } from "@api/requests/usagePerformance/postUsagePerformanceDaily";
import cloneDeep from "lodash-es/cloneDeep";
import { PostUsagePerformanceMonthlyParams } from "@api/requests/usagePerformance/postUsagePerformanceMonthly";
import { InitialValues } from "@interfaces/mgr/TANKINYUSHO/report/initial";
import { UsersInFacilityState } from "@stores/domain/mgr/TANKINYUSHO/userInFacility/types";

/**
 * 利用実績一覧(日ごと)データ取得及びstore格納
 * @param dispatch
 */
const fetchTANKINYUSHODaily = (dispatch: Dispatch) => async (
  date: Date
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchTANKINYUSHODailyStarted());
  await usagePerformanceAPI
    .getUsagePerformanceDaily(dateInYYYYMMDDFormat(date))
    .then(response => {
      dispatch(
        actions.fetchTANKINYUSHODailySuccess(
          normalizeTANKINYUSHOReportDataDailyFromAPI(response.data, date)
        )
      );
    })
    .catch(e => {
      dispatch(actions.fetchTANKINYUSHODailyFailed({ error: e.response }));
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
 * 利用実績一覧(月ごと)データ取得及びstore格納
 * @param dispatch
 */
const fetchTANKINYUSHOMonthly = (dispatch: Dispatch) => async (
  uifId: number,
  date: Date
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchTANKINYUSHOMonthlyStarted());
  await usagePerformanceAPI
    .getUsagePerformanceMonthly(uifId, dateInYYYYMMFormat(date))
    .then(response => {
      dispatch(
        actions.fetchTANKINYUSHOMonthlySuccess(
          normalizeTANKINYUSHOReportDataMonthlyFromAPI(response.data)
        )
      );
    })
    .catch(e => {
      dispatch(actions.fetchTANKINYUSHOMonthlyFailed({ error: e.response }));
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
 * usagePerformanceの一項目の更新(日ごと)
 * @param dispatch
 */
const updateTANKINYUSHOUsagePerformanceItemsDaily = (
  dispatch: Dispatch
) => async (
  name: string,
  value: string | number,
  keyValue: string,
  usagePerformanceList: ReportState["reportDaily"]["usagePerformance"]["after"]
): Promise<void> => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    actions.updateTANKINYUSHOUsagePerformanceItemsDaily(
      getSetUsagePerformanceItemsDaily(
        name,
        value,
        keyValue,
        cloneDeep(usagePerformanceList)
      )
    )
  );
};

/**
 * usagePerformanceTANKINYUSHOの一項目の更新(日ごと)
 * @param dispatch
 */
const updateTANKINYUSHOUsagePerformanceTANKINYUSHOItemsDaily = (
  dispatch: Dispatch
) => async (
  name: string,
  value: string | number,
  keyValue: string,
  usagePerformanceTANKINYUSHOList: ReportState["reportDaily"]["usagePerformanceTANKINYUSHO"]["after"]
): Promise<void> => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    actions.updateTANKINYUSHOUsagePerformanceTANKINYUSHOItemsDaily(
      getSetUsagePerformanceTANKINYUSHOItemsDaily(
        name,
        value,
        keyValue,
        cloneDeep(usagePerformanceTANKINYUSHOList)
      )
    )
  );
};

/**
 * usagePerformanceDailyの更新
 * @param dispatch
 */
const updateTANKINYUSHOUsagePerformanceDaily = (dispatch: Dispatch) => async (
  usagePerformanceDaily: ReportState["reportDaily"]["usagePerformanceDaily"]["after"]
) => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    actions.updateTANKINYUSHOUsagePerformanceDaily(
      cloneDeep(usagePerformanceDaily)
    )
  );
};

/**
 * usagePerformanceの一項目の更新(月ごと)
 * @param dispatch
 */
const updateTANKINYUSHOUsagePerformanceItemsMonthly = (
  dispatch: Dispatch
) => async (
  name: string,
  value: string | number,
  keyValue: string,
  usagePerformanceList: ReportState["reportMonthly"]["usagePerformance"]["after"]
): Promise<void> => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    actions.updateTANKINYUSHOUsagePerformanceMonthly(
      getSetUsagePerformanceItemsMonthly(
        name,
        value,
        keyValue,
        cloneDeep(usagePerformanceList)
      )
    )
  );
};

/**
 * usagePerformanceTANKINYUSHOの一項目の更新(月ごと)
 * @param dispatch
 */
const updateTANKINYUSHOUsagePerformanceTANKINYUSHOItemsMonthly = (
  dispatch: Dispatch
) => async (
  name: string,
  value: string | number,
  keyValue: string,
  usagePerformanceTANKINYUSHOList: ReportState["reportMonthly"]["usagePerformanceTANKINYUSHO"]["after"]
): Promise<void> => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    actions.updateTANKINYUSHOUsagePerformanceTANKINYUSHOMonthly(
      getSetUsagePerformanceTANKINYUSHOItemsMonthly(
        name,
        value,
        keyValue,
        cloneDeep(usagePerformanceTANKINYUSHOList)
      )
    )
  );
};

/**
 * 利用実績一覧データのDB更新(日ごと)
 * @param dispatch
 */
const postTANKINYUSHOReportDaily = (dispatch: Dispatch) => async (
  report: UsagePerformanceType,
  reportTANKINYUSHO: UsagePerformanceTANKINYUSHOType,
  formValue: InitialValues,
  usersInFacilityState: UsersInFacilityState
) => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.postTANKINYUSHOReportDailyStarted());
  const data = normalizeTANKINYUSHOReportDataToAPI(
    report,
    reportTANKINYUSHO,
    formValue,
    usersInFacilityState,
    REPEAT_DAILY
  );
  const key = `${report.usersInFacilityId}_${reportTANKINYUSHO.targetDate}`;
  await usagePerformanceAPI
    .postUsagePerformanceDaily(data.post)
    .then(() => {
      const actionType = actions.postTANKINYUSHOReportDailySuccess(
        data.store,
        data.storeTANKINYUSHO,
        key
      );
      dispatch(actionType);
    })
    .catch(e => {
      dispatch(actions.postTANKINYUSHOReportDailyFailed({ error: e.response }));
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
 * 利用実績一覧データのDB更新(利用者ごと)
 * @param dispatch
 */
const postTANKINYUSHOReportMonthly = (dispatch: Dispatch) => async (
  report: UsagePerformanceType,
  reportTANKINYUSHO: UsagePerformanceTANKINYUSHOType,
  formValue: InitialValues,
  usersInFacilityState: UsersInFacilityState
) => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.postTANKINYUSHOReportMonthlyStarted());
  const data = normalizeTANKINYUSHOReportDataToAPI(
    report,
    reportTANKINYUSHO,
    formValue,
    usersInFacilityState,
    REPEAT_MONTHLY
  );
  const key = `${report.usersInFacilityId}_${reportTANKINYUSHO.targetDate}`;
  await usagePerformanceAPI
    .postUsagePerformanceMonthly(data.post)
    .then(() => {
      const actionType = actions.postTANKINYUSHOReportMonthlySuccess(
        data.store,
        data.storeTANKINYUSHO,
        key
      );
      dispatch(actionType);
    })
    .catch(e => {
      dispatch(
        actions.postTANKINYUSHOReportMonthlyFailed({ error: e.response })
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
 * 実績の一括登録(日ごと)
 * @param dispatch
 */
const postTANKINYUSHOBulkRegistrationDaily = (dispatch: Dispatch) => async (
  reportState: ReportState["reportDaily"]
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  const normalizedReportState: ReportState["reportDaily"] = normalizeServiceTypeNoneDaily(
    cloneDeep(reportState)
  );
  dispatch(actions.postTANKINYUSHOBulkRegistrationDailyStarted());
  const postUsagePerformanceParam: PostUsagePerformanceDailyParams = normalizePostUsagePerformanceParamDaily(
    normalizedReportState
  );
  await usagePerformanceAPI
    .postUsagePerformanceDaily(postUsagePerformanceParam)
    .then(response => {
      dispatch(
        actions.postTANKINYUSHOBulkRegistrationDailySuccess(
          normalizedReportState
        )
      );
    })
    .catch(e => {
      dispatch(
        actions.postTANKINYUSHOBulkRegistrationDailyFailed({
          error: e.response
        })
      );
      dispatches.uiDispatch(dispatch).responseError(e.response);
      dispatches.uiDispatch(dispatch).stopHistory(false);
      dispatches.uiDispatch(dispatch).snackbar({
        open: true,
        message: "通信エラー",
        variant: "error"
      });
    })
    .finally(() => {
      dispatches.uiDispatch(dispatch).stopHistory(false);
      dispatch(loadingActions.loadDone());
    });
};

/**
 * 実績の一括登録(月ごと)
 * @param dispatch
 */
const postTANKINYUSHOBulkRegistrationMonthly = (dispatch: Dispatch) => async (
  reportState: ReportState["reportMonthly"]
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  const normalizedReportState: ReportState["reportMonthly"] = normalizeServiceTypeNoneMonthly(
    cloneDeep(reportState)
  );
  dispatch(actions.postTANKINYUSHOBulkRegistrationMonthlyStarted());
  const postUsagePerformanceParam: PostUsagePerformanceMonthlyParams = normalizePostUsagePerformanceParamMonthly(
    normalizedReportState
  );
  await usagePerformanceAPI
    .postUsagePerformanceMonthly(postUsagePerformanceParam)
    .then(response => {
      dispatch(
        actions.postTANKINYUSHOBulkRegistrationMonthlySuccess(
          normalizedReportState
        )
      );
      dispatches.uiDispatch(dispatch).stopHistory(false);
    })
    .catch(e => {
      dispatch(
        actions.postTANKINYUSHOBulkRegistrationMonthlyFailed({
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
      dispatches.uiDispatch(dispatch).stopHistory(false);
      dispatch(loadingActions.loadDone());
    });
};

/**
 * 選択された利用者のサービス提供状況の一括更新
 * @param dispatch
 */
const updateTANKINYUSHOAllStatusType = (dispatch: Dispatch) => async (
  keyList: string[],
  usagePerformanceList: ReportState["reportDaily"]["usagePerformance"]["after"]
): Promise<void> => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    actions.updateTANKINYUSHOAllStatusType(
      getSetAllStatusType(keyList, cloneDeep(usagePerformanceList))
    )
  );
};

/**
 * 一括更新データのリセット
 * @param dispatch
 */
const resetTANKINYUSHOUsagePerformance = (dispatch: Dispatch) => async (
  reportState: ReportState
): Promise<void> => {
  dispatch(actions.resetTANKINYUSHOUsagePerformance(cloneDeep(reportState)));
};

export default (dispatch: Dispatch) => ({
  fetchTANKINYUSHODaily: fetchTANKINYUSHODaily(dispatch),
  fetchTANKINYUSHOMonthly: fetchTANKINYUSHOMonthly(dispatch),
  updateTANKINYUSHOUsagePerformanceItemsDaily: updateTANKINYUSHOUsagePerformanceItemsDaily(
    dispatch
  ),
  updateTANKINYUSHOUsagePerformanceTANKINYUSHOItemsDaily: updateTANKINYUSHOUsagePerformanceTANKINYUSHOItemsDaily(
    dispatch
  ),
  updateTANKINYUSHOUsagePerformanceDaily: updateTANKINYUSHOUsagePerformanceDaily(
    dispatch
  ),
  updateTANKINYUSHOUsagePerformanceItemsMonthly: updateTANKINYUSHOUsagePerformanceItemsMonthly(
    dispatch
  ),
  updateTANKINYUSHOUsagePerformanceTANKINYUSHOItemsMonthly: updateTANKINYUSHOUsagePerformanceTANKINYUSHOItemsMonthly(
    dispatch
  ),
  postTANKINYUSHOReportDaily: postTANKINYUSHOReportDaily(dispatch),
  postTANKINYUSHOReportMonthly: postTANKINYUSHOReportMonthly(dispatch),
  postTANKINYUSHOBulkRegistrationDaily: postTANKINYUSHOBulkRegistrationDaily(
    dispatch
  ),
  postTANKINYUSHOBulkRegistrationMonthly: postTANKINYUSHOBulkRegistrationMonthly(
    dispatch
  ),
  updateTANKINYUSHOAllStatusType: updateTANKINYUSHOAllStatusType(dispatch),
  resetTANKINYUSHOUsagePerformance: resetTANKINYUSHOUsagePerformance(dispatch)
});
