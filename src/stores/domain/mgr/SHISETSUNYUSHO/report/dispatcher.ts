import { Dispatch } from "redux";
import * as actions from "./actions";

import dispatches from "@stores/dispatches";
import usagePerformanceAPI from "@api/requests/usagePerformance/";
import { dateInYYYYMMDDFormat, dateInYYYYMMFormat } from "@utils/date";
import {
  normalizeSHISETSUNYUSHOReportDailyDataFromAPI,
  normalizeSHISETSUNYUSHOReportDataToAPI,
  normalizeSHISETSUNYUSHOReportUsersDataFromAPI,
  getSetAllStatusType,
  getSetUsagePerformanceItems,
  getSetUsagePerfomanceSHISETSUNYUSHOItems,
  normalizeServiceTypeNone,
  normalizePostUsagePerformanceParamDaily,
  normalizePostUsagePerformanceParamUsers
} from "./normalizer";
import * as loadingActions from "@stores/loading/actions";
import {
  ReportState,
  UsagePerformanceType,
  UsagePerformanceSHISETSUNYUSHOType,
  REPEAT_DAILY,
  REPEAT_USERS
} from "./types";
import cloneDeep from "lodash-es/cloneDeep";
import { InitialValues } from "@interfaces/mgr/SHISETSUNYUSHO/report/initial";
import { UsersInFacilityState } from "@stores/domain/mgr/SHISETSUNYUSHO/userInFacility/types";
import { PostUsagePerformanceDailyParams } from "@api/requests/usagePerformance/postUsagePerformanceDaily";
import { PostUsagePerformanceMonthlyParams } from "@api/requests/usagePerformance/postUsagePerformanceMonthly";
import { FacilityState } from "@stores/domain/mgr/SHISETSUNYUSHO/facility/types";

// 日ごと用dispatcher
/**
 * 利用実績一覧(日ごと)データ取得及びstore格納
 * @param dispatch
 */
const fetchSHISETSUNYUSHODaily = (dispatch: Dispatch) => async (
  date: Date
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchSHISETSUNYUSHODailyStarted());
  await usagePerformanceAPI
    .getUsagePerformanceDaily(dateInYYYYMMDDFormat(date))
    .then(response => {
      dispatch(
        actions.fetchSHISETSUNYUSHODailySuccess(
          normalizeSHISETSUNYUSHOReportDailyDataFromAPI(response.data, date)
        )
      );
    })
    .catch(e => {
      dispatch(actions.fetchSHISETSUNYUSHODailyFailed({ error: e.response }));
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
 * 選択された利用者のサービス提供状況の一括更新(日ごと)
 * @param dispatch
 */
const updateSHISETSUNYUSHOAllStatusTypeDaily = (dispatch: Dispatch) => async (
  usagePerformanceList: ReportState["reportDaily"]["usagePerformance"]["after"]
): Promise<void> => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    actions.updateSHISETSUNYUSHOAllStatusTypeDaily(
      getSetAllStatusType(cloneDeep(usagePerformanceList))
    )
  );
};

/**
 * usagePerformanceの一項目の更新(日ごと)
 * @param dispatch
 */
const updateSHISETSUNYUSHOUsagePerformanceItemsDaily = (
  dispatch: Dispatch
) => async (
  name: string,
  value: string | number,
  keyValue: string,
  reportState: ReportState
): Promise<void> => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    actions.updateSHISETSUNYUSHOUsagePerformanceParamsDaily(
      getSetUsagePerformanceItems(
        name,
        value,
        keyValue,
        cloneDeep(reportState.reportDaily.usagePerformance.after)
      )
    )
  );
};

/**
 * usagePerformanceSHISETSUNYUSHOの一項目の更新(日ごと)
 * @param dispatch
 */
const updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOItemsDaily = (
  dispatch: Dispatch
) => async (
  name: string,
  value: string | number,
  keyValue: string,
  reportState: ReportState
): Promise<void> => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    actions.updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHODaily(
      getSetUsagePerfomanceSHISETSUNYUSHOItems(
        name,
        value,
        keyValue,
        cloneDeep(reportState.reportDaily.usagePerformanceSHISETSUNYUSHO.after)
      )
    )
  );
};

/**
 * usagePerformanceDailyの更新
 * @param dispatch
 */
const updateSHISETSUNYUSHOUsagePerformanceDaily = (
  dispatch: Dispatch
) => async (
  usagePerformanceDaily: ReportState["reportDaily"]["usagePerformanceDaily"]["after"]
) => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    actions.updateSHISETSUNYUSHOUsagePerformanceDaily(
      cloneDeep(usagePerformanceDaily)
    )
  );
};

/**
 * 実績の一括登録(日ごと)
 * @param dispatch
 */
const postSHISETSUNYUSHOBulkRegistrationDaily = (dispatch: Dispatch) => async (
  reportState: ReportState["reportDaily"],
  notFood: boolean
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  const normalizedReportState: ReportState["reportDaily"] = normalizeServiceTypeNone(
    cloneDeep(reportState),
    notFood
  ) as ReportState["reportDaily"];
  dispatch(actions.postSHISETSUNYUSHOBulkRegistrationDailyStarted());
  const postUsagePerformanceParam: PostUsagePerformanceDailyParams = normalizePostUsagePerformanceParamDaily(
    normalizedReportState
  );
  await usagePerformanceAPI
    .postUsagePerformanceDaily(postUsagePerformanceParam)
    .then(response => {
      dispatch(
        actions.postSHISETSUNYUSHOBulkRegistrationDailySuccess(
          normalizedReportState
        )
      );
      dispatches.uiDispatch(dispatch).stopHistory(false);
    })
    .catch(e => {
      dispatch(
        actions.postSHISETSUNYUSHOBulkRegistrationDailyFailed({
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

// 利用者ごと用dispatcher
/**
 * 利用実績一覧(利用者ごと)データ取得及びstore格納
 * @param dispatch
 */
const fetchSHISETSUNYUSHOUsers = (dispatch: Dispatch) => async (
  uifId: number,
  date: Date
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchSHISETSUNYUSHOUsersStarted());
  await usagePerformanceAPI
    .getUsagePerformanceMonthly(uifId, dateInYYYYMMFormat(date))
    .then(response => {
      dispatch(
        actions.fetchSHISETSUNYUSHOUsersSuccess(
          normalizeSHISETSUNYUSHOReportUsersDataFromAPI(response.data)
        )
      );
    })
    .catch(e => {
      dispatch(actions.fetchSHISETSUNYUSHOUsersFailed({ error: e.response }));
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
 * 選択された利用者のサービス提供状況の一括更新(利用者ごと)
 * @param dispatch
 */
const updateSHISETSUNYUSHOAllStatusTypeUsers = (dispatch: Dispatch) => async (
  usagePerformanceList: ReportState["reportUsers"]["usagePerformance"]["after"]
): Promise<void> => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    actions.updateSHISETSUNYUSHOAllStatusTypeUsers(
      getSetAllStatusType(cloneDeep(usagePerformanceList))
    )
  );
};

/**
 * 利用実績一覧データのDB更新(日ごと)
 * @param dispatch
 */
const postSHISETSUNYUSHOReportDaily = (dispatch: Dispatch) => async (
  report: UsagePerformanceType,
  reportSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType,
  formValue: InitialValues,
  usersInFacilityState: UsersInFacilityState,
  facilityState: FacilityState
) => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.postSHISETSUNYUSHOReportDailyStarted());
  const data = normalizeSHISETSUNYUSHOReportDataToAPI(
    report,
    reportSHISETSUNYUSHO,
    formValue,
    usersInFacilityState,
    facilityState,
    REPEAT_DAILY
  );
  const key = `${report.usersInFacilityId}_${reportSHISETSUNYUSHO.targetDate}`;
  await usagePerformanceAPI
    .postUsagePerformanceDaily(data.post)
    .then(() => {
      const actionType = actions.postSHISETSUNYUSHOReportDailySuccess(
        data.store,
        data.storeSHISETSUNYUSHO,
        key
      );
      dispatch(actionType);
    })
    .catch(e => {
      dispatch(
        actions.postSHISETSUNYUSHOReportDailyFailed({ error: e.response })
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
 * usagePerformanceの一項目の更新(利用者ごと)
 * @param dispatch
 */
const updateSHISETSUNYUSHOUsagePerformanceItemsUsers = (
  dispatch: Dispatch
) => async (
  name: string,
  value: string | number,
  keyValue: string,
  reportState: ReportState
): Promise<void> => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    actions.updateSHISETSUNYUSHOUsagePerformanceParamsUsers(
      getSetUsagePerformanceItems(
        name,
        value,
        keyValue,
        cloneDeep(reportState.reportUsers.usagePerformance.after)
      )
    )
  );
};

/**
 * usagePerformanceSHISETSUNYUSHOの一項目の更新(利用者ごと)
 * @param dispatch
 */
const updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOItemsUsers = (
  dispatch: Dispatch
) => async (
  name: string,
  value: string | number,
  keyValue: string,
  reportState: ReportState
): Promise<void> => {
  dispatches.uiDispatch(dispatch).stopHistory(true);
  dispatch(
    actions.updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOUsers(
      getSetUsagePerfomanceSHISETSUNYUSHOItems(
        name,
        value,
        keyValue,
        cloneDeep(reportState.reportUsers.usagePerformanceSHISETSUNYUSHO.after)
      )
    )
  );
};

/**
 * 実績の一括登録(利用者ごと)
 * @param dispatch
 */
const postSHISETSUNYUSHOBulkRegistrationUsers = (dispatch: Dispatch) => async (
  reportState: ReportState["reportUsers"],
  notFood: boolean
): Promise<void> => {
  dispatch(loadingActions.loadStarted());
  const normalizedReportState: ReportState["reportUsers"] = normalizeServiceTypeNone(
    cloneDeep(reportState),
    notFood
  );
  dispatch(actions.postSHISETSUNYUSHOBulkRegistrationUsersStarted());
  const postUsagePerformanceParam: PostUsagePerformanceMonthlyParams = normalizePostUsagePerformanceParamUsers(
    normalizedReportState
  );
  await usagePerformanceAPI
    .postUsagePerformanceMonthly(postUsagePerformanceParam)
    .then(response => {
      dispatch(
        actions.postSHISETSUNYUSHOBulkRegistrationUsersSuccess(
          normalizedReportState
        )
      );
      dispatches.uiDispatch(dispatch).stopHistory(false);
    })
    .catch(e => {
      dispatch(
        actions.postSHISETSUNYUSHOBulkRegistrationUsersFailed({
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
 * 利用実績一覧データのDB更新(利用者ごと)
 * @param dispatch
 */
const postSHISETSUNYUSHOReportUsers = (dispatch: Dispatch) => async (
  report: UsagePerformanceType,
  reportSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType,
  formValue: InitialValues,
  usersInFacilityState: UsersInFacilityState,
  facilityState: FacilityState
) => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.postSHISETSUNYUSHOReportUsersStarted());
  const data = normalizeSHISETSUNYUSHOReportDataToAPI(
    report,
    reportSHISETSUNYUSHO,
    formValue,
    usersInFacilityState,
    facilityState,
    REPEAT_USERS
  );
  const key = `${report.usersInFacilityId}_${reportSHISETSUNYUSHO.targetDate}`;
  await usagePerformanceAPI
    .postUsagePerformanceMonthly(data.post)
    .then(() => {
      const actionType = actions.postSHISETSUNYUSHOReportUsersSuccess(
        data.store,
        data.storeSHISETSUNYUSHO,
        key
      );
      dispatch(actionType);
    })
    .catch(e => {
      dispatch(
        actions.postSHISETSUNYUSHOReportUsersFailed({ error: e.response })
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
 * 一括更新データのリセット
 * @param dispatch
 */
const resetSHISETSUNYUSHOUsagePerformance = (dispatch: Dispatch) => async (
  reportState: ReportState
): Promise<void> => {
  dispatch(actions.resetSHISETSUNYUSHOUsagePerformance(cloneDeep(reportState)));
};

export default (dispatch: Dispatch) => ({
  // 日ごと用dispatcher
  fetchSHISETSUNYUSHODaily: fetchSHISETSUNYUSHODaily(dispatch),
  updateSHISETSUNYUSHOAllStatusTypeDaily: updateSHISETSUNYUSHOAllStatusTypeDaily(
    dispatch
  ),
  postSHISETSUNYUSHOReportDaily: postSHISETSUNYUSHOReportDaily(dispatch),
  updateSHISETSUNYUSHOUsagePerformanceItemsDaily: updateSHISETSUNYUSHOUsagePerformanceItemsDaily(
    dispatch
  ),
  updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOItemsDaily: updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOItemsDaily(
    dispatch
  ),
  updateSHISETSUNYUSHOUsagePerformanceDaily: updateSHISETSUNYUSHOUsagePerformanceDaily(
    dispatch
  ),
  postSHISETSUNYUSHOBulkRegistrationDaily: postSHISETSUNYUSHOBulkRegistrationDaily(
    dispatch
  ),

  // 利用者ごと用dispatcher
  fetchSHISETSUNYUSHOUsers: fetchSHISETSUNYUSHOUsers(dispatch),
  updateSHISETSUNYUSHOAllStatusTypeUsers: updateSHISETSUNYUSHOAllStatusTypeUsers(
    dispatch
  ),
  updateSHISETSUNYUSHOUsagePerformanceItemsUsers: updateSHISETSUNYUSHOUsagePerformanceItemsUsers(
    dispatch
  ),
  updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOItemsUsers: updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOItemsUsers(
    dispatch
  ),
  postSHISETSUNYUSHOBulkRegistrationUsers: postSHISETSUNYUSHOBulkRegistrationUsers(
    dispatch
  ),
  postSHISETSUNYUSHOReportUsers: postSHISETSUNYUSHOReportUsers(dispatch),

  // 共通dispatcher
  resetSHISETSUNYUSHOUsagePerformance: resetSHISETSUNYUSHOUsagePerformance(
    dispatch
  )
});
