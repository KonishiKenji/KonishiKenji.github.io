import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as action from "@stores/domain/report/action";
import {
  ReportState,
  Report,
  ReportTypeInterface,
  ReportPerformanceDaily,
  ReportPostDailyState
} from "@stores/domain/report/type";

const initialState: ReportState = {
  performanceDaily: {
    before: {
      bodyRestraintAbolitionUnexecutedFlg: false,
      targetDate: ""
    },
    after: {
      bodyRestraintAbolitionUnexecutedFlg: false,
      targetDate: ""
    }
  },
  reportDaily: {
    before: [],
    after: []
  },
  reportMonthly: {
    before: [],
    after: []
  }
};

const stateCreate = (
  state: ReportState,
  stateType: string,
  payload: { value: any; type: ReportTypeInterface["type"]; key: number }
): ReportState => {
  state[payload.type].after[payload.key][stateType] = payload.value;
  return {
    ...state
  };
};

/**
 * statusTypeの変更時にremarks以外を初期化する
 * TODO: use constant
 */
const changeStatusTypeState = (
  state: ReportState,
  payload: {
    value: Report["statusType"];
    type: ReportTypeInterface["type"];
    key: number;
  }
): ReportState => {
  state[payload.type].after[payload.key].statusType = payload.value;
  state[payload.type].after[payload.key].nightSupportType = "1";
  state[payload.type].after[payload.key].hospitalizationSupportType = "1";
  state[payload.type].after[payload.key].getHomeSupportType = "1";
  state[payload.type].after[payload.key].daytimeSupportType = "1";
  state[payload.type].after[payload.key].medicalSupportType = "1";
  state[payload.type].after[payload.key].lifeSupportFlg = "0";
  state[payload.type].after[payload.key].homeCareFlg = "0";
  return {
    ...state
  };
};

/************
 * api setter
 ************/
const fetchDaily = (
  state: ReportState,
  { result }: { result: ReportState }
) => {
  return {
    ...state,
    performanceDaily: result.performanceDaily,
    reportDaily: result.reportDaily
  };
};

const fetchMonthly = (
  state: ReportState,
  { result }: { result: ReportState }
) => {
  return {
    ...state,
    reportMonthly: result.reportMonthly
  };
};

const postDaily = (
  state: ReportState,
  { result }: { result: ReportPostDailyState }
) => {
  const before: Report[] = state.reportDaily.after.map(report => {
    return { ...report };
  });
  return {
    ...state,
    performanceDaily: {
      ...state.performanceDaily,
      before: { ...result.performanceDaily }
    },
    reportDaily: {
      ...state.reportDaily,
      before
    }
  };
};

const postMonthly = (state: ReportState) => {
  const before: Report[] = state.reportMonthly.after.map(report => {
    return { ...report };
  });
  return {
    ...state,
    reportMonthly: {
      ...state.reportMonthly,
      before
    }
  };
};

/************
 * setter
 ************/

const setBeforeToAfterDaily = (state: ReportState) => {
  const after: Report[] = state.reportDaily.before.map(report => {
    return { ...report };
  });
  return {
    ...state,
    reportDaily: {
      ...state.reportDaily,
      after
    }
  };
};

const setBeforeToAfterMonthly = (state: ReportState) => {
  const after: Report[] = state.reportMonthly.before.map(report => {
    return { ...report };
  });
  return {
    ...state,
    reportMonthly: {
      ...state.reportMonthly,
      after
    }
  };
};

const setBodyRestraintAbolitionUnexecutedFlg = (
  state: ReportState,
  payload: {
    value: ReportPerformanceDaily["bodyRestraintAbolitionUnexecutedFlg"];
    type: ReportTypeInterface["type"];
  }
) => {
  return {
    ...state,
    performanceDaily: {
      ...state.performanceDaily,
      after: {
        ...state.performanceDaily.after,
        bodyRestraintAbolitionUnexecutedFlg: payload.value
      }
    }
  };
};

const setStatusType = (
  state: ReportState,
  payload: {
    value: Report["statusType"];
    type: ReportTypeInterface["type"];
    key: number;
  }
) => {
  return changeStatusTypeState(state, payload);
};
const setNightSupportType = (
  state: ReportState,
  payload: {
    value: Report["nightSupportType"];
    type: ReportTypeInterface["type"];
    key: number;
  }
) => {
  return stateCreate(state, "nightSupportType", payload);
};
const setHospitalizationSupportType = (
  state: ReportState,
  payload: {
    value: Report["hospitalizationSupportType"];
    type: ReportTypeInterface["type"];
    key: number;
  }
) => {
  return stateCreate(state, "hospitalizationSupportType", payload);
};
const setGetHomeSupportType = (
  state: ReportState,
  payload: {
    value: Report["getHomeSupportType"];
    type: ReportTypeInterface["type"];
    key: number;
  }
) => {
  return stateCreate(state, "getHomeSupportType", payload);
};
const setDaytimeSupportType = (
  state: ReportState,
  payload: {
    value: Report["daytimeSupportType"];
    type: ReportTypeInterface["type"];
    key: number;
  }
) => {
  return stateCreate(state, "daytimeSupportType", payload);
};
const setMedicalSupportType = (
  state: ReportState,
  payload: {
    value: Report["medicalSupportType"];
    type: ReportTypeInterface["type"];
    key: number;
  }
) => {
  return stateCreate(state, "medicalSupportType", payload);
};
const setLifeSupportFlg = (
  state: ReportState,
  payload: {
    value: Report["lifeSupportFlg"];
    type: ReportTypeInterface["type"];
    key: number;
  }
) => {
  return stateCreate(state, "lifeSupportFlg", payload);
};
const setHomeCareFlg = (
  state: ReportState,
  payload: {
    value: Report["homeCareFlg"];
    type: ReportTypeInterface["type"];
    key: number;
  }
) => {
  return stateCreate(state, "homeCareFlg", payload);
};
const setRemarks = (
  state: ReportState,
  payload: {
    value: Report["remarks"];
    type: ReportTypeInterface["type"];
    key: number;
  }
) => {
  return stateCreate(state, "remarks", payload);
};

/**
 * 未退去かつサービス提供状況が未設定の「ユーザー」を対象に、サービス提供の状況と夜間支援を設定する
 * サービス提供の状況 => 1（宿泊）
 * 夜間支援 => 利用者情報で設定したユニットに紐付く夜間支援体制（複数ユニット運営時のみ）
 */
const setAllStatusTypeDaily = (
  state: ReportState,
  payload: Report["statusType"]
) => {
  const after = state.reportDaily.after.map(report => {
    if (
      report.isServiceEnd === 1 &&
      (report.statusType === "" || report.statusType === "0")
    ) {
      const statusType = payload;
      const nightSupportType = report.defNightSupportType;
      return { ...report, statusType, nightSupportType };
    }
    return report;
  });
  return {
    ...state,
    reportDaily: {
      ...state.reportDaily,
      after
    }
  };
};

/**
 * 未退去かつサービス提供状況が未設定の「日付」を対象に、サービス提供の状況と夜間支援を設定する
 * サービス提供の状況 => 1（宿泊）
 * 夜間支援 => 事業者情報で設定した夜間支援体制加算
 */
const setAllStatusTypeMonthly = (
  state: ReportState,
  payload: Report["statusType"]
) => {
  const after = state.reportMonthly.after.map(report => {
    if (
      report.isServiceEnd === 1 &&
      (report.statusType === "" || report.statusType === "0")
    ) {
      const statusType = payload;
      const nightSupportType = report.defNightSupportType;
      return { ...report, statusType, nightSupportType };
    }
    return report;
  });
  return {
    ...state,
    reportMonthly: {
      ...state.reportMonthly,
      after
    }
  };
};

export default reducerWithInitialState(initialState)
  //  .case(action.fetchDaily.done, fetchDaily)
  .case(action.fetchDaily.done, fetchDaily)
  .case(action.fetchMonthly.done, fetchMonthly)
  .case(
    action.setBodyRestraintAbolitionUnexecutedFlg,
    setBodyRestraintAbolitionUnexecutedFlg
  )
  .case(action.postDaily.done, postDaily)
  .case(action.postMonthly.done, postMonthly)
  .case(action.setBeforeToAfterDaily, setBeforeToAfterDaily)
  .case(action.setBeforeToAfterMonthly, setBeforeToAfterMonthly)
  .case(action.setStatusType, setStatusType)
  .case(action.setNightSupportType, setNightSupportType)
  .case(action.setHospitalizationSupportType, setHospitalizationSupportType)
  .case(action.setGetHomeSupportType, setGetHomeSupportType)
  .case(action.setDaytimeSupportType, setDaytimeSupportType)
  .case(action.setMedicalSupportType, setMedicalSupportType)
  .case(action.setLifeSupportFlg, setLifeSupportFlg)
  .case(action.setHomeCareFlg, setHomeCareFlg)
  .case(action.setRemarks, setRemarks)
  .case(action.setAllStatusTypeDaily, setAllStatusTypeDaily)
  .case(action.setAllStatusTypeMonthly, setAllStatusTypeMonthly);
