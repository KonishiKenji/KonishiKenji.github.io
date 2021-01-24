import deepEqual from "fast-deep-equal";
import {
  SEIKATSUKAIGOReport,
  SEIKATSUKAIGOSummary,
  DailyInOutRecords,
  UserInOutRecords,
  SEIKATSUKAIGOReportState,
  SEIKATSUKAIGOReportTypeInterface,
  REPEAT_DAILY,
  REPEAT_USER
} from "./types";

import { dateInHyphenYYYYMMDDFormat, dateInYYYYMMDDFormat } from "@utils/date";
import { GetInOutDailySummaryResponse } from "@api/requests/inOut/getInOutSummary";
import { GetInOutUserSummaryResponse } from "@api/requests/inOut/getInOutUserSummary";
import { GetInOutDailyReportResponse } from "@api/requests/inOut/getInOut";
import { GetInOutUserReportResponse } from "@api/requests/inOut/getInOutUser";
import { FacilityState } from "../facility/types";
import { RequestParam } from "@api/requests/inOut/putInOutRecords";
import { isEmpty } from "lodash-es";
import { InitialDataValues } from "@initialize/mgr/SEIKATSUKAIGO/report/initialValues";
import {
  Checkbox,
  SEIKATSUKAIGO_SUMMARY_SERVICE_STATUS
} from "@constants/variables";

const castString = (value?: string | number | null | undefined): string => {
  if (value === undefined || value === null) {
    return "";
  }
  return value.toString();
};

const castNumber = (
  value?: string | number | null | undefined
): number | null => {
  if (value === undefined || value === null) {
    return null;
  }
  return Number(value);
};

const notNullCastNumber = (
  value?: string | number | null | undefined
): number => {
  if (value === undefined || value === null) {
    return 0;
  }
  return Number(value);
};

// storeのkeyからpiaRequestのkeyに変換するmap表 Request必須値は除く
// "StoreToRequestParam"で定義すること
// + "removeNoChangeData"内の"differenceObject"で初期定義「しない」こと
// = 値に変更ない場合はパラメータを送らなくなる
const StoreToRequestParam = {
  inTime: {
    storeKey: "inTime",
    requestKey: "inTime"
  },
  outTime: {
    storeKey: "outTime",
    requestKey: "outTime"
  },
  lifeSupportHubInDistrictFlg: {
    storeKey: "lifeSupportHubInDistrictFlg",
    requestKey: "lifeSupportHubInDistrictFlg"
  },
  extended: {
    storeKey: "extended",
    requestKey: "extended"
  },
  memo: {
    storeKey: "memo",
    requestKey: "memo"
  }
};

// statusによる不要なデータのstoreKey一覧
const nullDataByStatus = {
  status1: [
    "inTime",
    "outTime",
    "didGetFood",
    "lifeSupportHubInDistrictFlg",
    "extended"
  ],
  status2: ["lifeSupportHubInDistrictFlg"],
  status5: [
    "inTime",
    "outTime",
    "didGetFood",
    "lifeSupportHubInDistrictFlg",
    "extended"
  ],
  status6: ["didGetFood", "lifeSupportHubInDistrictFlg", "extended"],
  status7: ["inTime", "outTime", "didGetFood", "extended"],
  status10: [
    "inTime",
    "outTime",
    "didGetFood",
    "lifeSupportHubInDistrictFlg",
    "extended"
  ]
};

/**
 * 訪問支援項目用の時間差分計算
 * @param inTime 開始時間
 * @param outTime 終了時間
 */
const defTime = (inTime: string, outTime: string): number => {
  const startTime = new Date(inTime);
  const endTime = new Date(outTime);
  const diffTime =
    Math.floor(endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
  if (diffTime >= 1) {
    return 2;
  }
  return 1;
};
/**
 * yyyy-mm-dd HH:MM:SSの作成
 * @param date yyyy-mm-dd
 * @param time HH:MM
 */
const createTime = (date?: string, time?: string): string => {
  return date && time ? date.concat(" ") + time.concat(":00") : "";
};
/**
 * パラメータの生成
 * @param data
 */
const removeUndefinedParam = (
  data: RequestParam["otherParam"]
): RequestParam["otherParam"] => {
  const param = {};
  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined) {
      param[key] = data[key];
    }
  });
  return param as RequestParam["otherParam"];
};
/**
 * 差分チェック uif_id・targetDate・facirityType・travelTime・pickupPremisesは除く
 */
const isDiff = (before: string | number, after: string | number): boolean => {
  return before !== after;
};

/**
 * statusによって不要な値を変更する
 * @param value formData
 */
const convertParamByStatus = (
  value: SEIKATSUKAIGOReport,
  facilityState: FacilityState
): SEIKATSUKAIGOReport => {
  // 初期化データの作成
  const initialValue = {
    trialUsageKind: "0",
    lifeSupportHubInDistrictFlg: "0",
    inTime: "",
    outTime: "",
    extended: "0",
    didGetFood: "0" as string | null,
    travelTime: "0" as string | null,
    pickupPremises: "0",
    memo: "",
    severeDisabilitySupport: 0 as number | null
  };

  // サービス提供の状況確認、不要項目の初期化
  switch (value.status) {
    case 1:
      // 食事・送迎にnullを設定するとAPIから利用者情報のデフォルト値が返ってくる
      initialValue.didGetFood = null;
      initialValue.travelTime = null;
      break;
    case 2:
      initialValue.inTime = value.inTime ? value.inTime : initialValue.inTime;
      initialValue.outTime = value.outTime
        ? value.outTime
        : initialValue.outTime;
      initialValue.extended = value.extended
        ? value.extended
        : initialValue.extended;
      if (facilityState.mealSaservedServiceFlag) {
        initialValue.didGetFood = value.didGetFood
          ? value.didGetFood
          : initialValue.didGetFood;
      }
      if (facilityState.transferServiceFlag) {
        initialValue.travelTime = value.travelTime
          ? value.travelTime
          : initialValue.travelTime;
        initialValue.pickupPremises = value.pickupPremises
          ? value.pickupPremises
          : initialValue.pickupPremises;
      }
      initialValue.severeDisabilitySupport = value.severeDisabilitySupport
        ? castNumber(value.severeDisabilitySupport)
        : initialValue.severeDisabilitySupport;
      break;
    case 6:
      initialValue.inTime = value.inTime ? value.inTime : initialValue.inTime;
      initialValue.outTime = value.outTime
        ? value.outTime
        : initialValue.outTime;
      break;
    case 7:
      initialValue.lifeSupportHubInDistrictFlg = value.lifeSupportHubInDistrictFlg
        ? value.lifeSupportHubInDistrictFlg
        : initialValue.lifeSupportHubInDistrictFlg;
      initialValue.trialUsageKind = value.trialUsageKind
        ? value.trialUsageKind
        : initialValue.trialUsageKind;
      break;
    default:
  }

  const returnValue: SEIKATSUKAIGOReport = {
    ...value,
    inTime: initialValue.inTime,
    outTime: initialValue.outTime,
    extended: initialValue.extended,
    didGetFood: initialValue.didGetFood,
    travelTime: initialValue.travelTime,
    pickupPremises: initialValue.pickupPremises,
    trialUsageKind: initialValue.trialUsageKind,
    lifeSupportHubInDistrictFlg: initialValue.lifeSupportHubInDistrictFlg,
    severeDisabilitySupport: initialValue.severeDisabilitySupport,
    // 備考は全サービス提供で必須送信項目の為、switch外で処理
    memo: value.memo && !isEmpty(value.memo) ? value.memo : initialValue.memo
  };
  return returnValue;
};

const createResultInOutRecord = (
  target: SEIKATSUKAIGOReport
): SEIKATSUKAIGOReport => {
  const data: SEIKATSUKAIGOReport = {
    uif_id: castNumber(target.uif_id),
    inoutRecordsId: castNumber(target.inoutRecordsId),
    name: castString(target.name),
    target_date: castString(target.target_date),
    status: castNumber(target.status),
    inTime: castString(target.inTime),
    outTime: castString(target.outTime),
    travelTime: isEmpty(castString(target.travelTime))
      ? "0"
      : castString(target.travelTime),
    pickupPremises: isEmpty(castString(target.pickupPremises))
      ? "0"
      : castString(target.pickupPremises),
    visitSupport: castNumber(target.visitSupport),
    didGetFood: castString(target.didGetFood),
    trialUsageKind: castString(target.trialUsageKind),
    lifeSupportHubInDistrictFlg: castString(target.lifeSupportHubInDistrictFlg),
    extended: castString(target.extended),
    is_holiday: target.is_holiday,
    memo: target.memo,
    facilityType: "SEIKATSUKAIGO",
    initialFlg: castNumber(target.inoutRecordsId) === null,
    severeDisabilitySupport: castNumber(target.severeDisabilitySupport),
    is_severe_disability_support: target.is_severe_disability_support
  };
  return data;
};

/**
 * putで送る用の型に変形
 * @param requestReport
 */
const createPutRequestPamram = (
  requestReport: SEIKATSUKAIGOReport,
  otherParams: RequestParam["otherParam"]
): RequestParam => {
  const date = requestReport.target_date
    ? dateInYYYYMMDDFormat(new Date(requestReport.target_date))
    : null;
  return {
    yyyymmdd: castNumber(Number(date)),
    uif_id: castNumber(requestReport.uif_id),
    otherParam: otherParams
  };
};

/**
 * 差分抽出 差分以外はundefindで対応
 * @param beforeList
 * @param afterList
 */
const removeNoChangeData = (
  beforeList: SEIKATSUKAIGOReport[],
  afterList: SEIKATSUKAIGOReport[],
  facilityState: FacilityState
): RequestParam => {
  let resultAfter = {} as SEIKATSUKAIGOReport;
  let resultBefore = {} as SEIKATSUKAIGOReport;
  // 差分の行を抽出
  afterList.map((after, idx) => {
    if (!deepEqual(after, beforeList[idx])) {
      resultAfter = after;
      resultBefore = beforeList[idx];
    }
    return undefined;
  });
  resultAfter = convertParamByStatus(
    resultAfter as SEIKATSUKAIGOReport,
    facilityState
  );
  // 必須分初期化
  const differenceObject: RequestParam["otherParam"] = {
    status: resultAfter.status,
    restTime: 60,
    didGetFood: resultAfter.didGetFood ? resultAfter.didGetFood : null,
    travelTime: resultAfter.travelTime ? resultAfter.travelTime : null,
    pickupPremises: resultAfter.pickupPremises
      ? resultAfter.pickupPremises
      : "0",
    // 体験利用支援種別は全サービス利用状況で必須扱い。
    trialUsageKind: resultAfter.trialUsageKind,
    facilityType: "SEIKATSUKAIGO",
    severeDisabilitySupport: resultAfter.severeDisabilitySupport
      ? resultAfter.severeDisabilitySupport
      : 0
  };
  // nullにすべきデータのkeyの取得
  const nullDataList = nullDataByStatus[`status${resultAfter.status}`]
    ? nullDataByStatus[`status${resultAfter.status}`]
    : [];

  // 差分の項目を抽出
  Object.keys(StoreToRequestParam).forEach((key) => {
    const { requestKey } = StoreToRequestParam[key];
    const { storeKey } = StoreToRequestParam[key];
    differenceObject[requestKey] =
      isDiff(resultAfter[storeKey], resultBefore[storeKey]) ||
      nullDataList.includes(storeKey)
        ? resultAfter[storeKey]
        : undefined;
  });
  // 初回時のみ且つstatusが【通所】の時、食事提供は必ず入れる。default設定の為
  if (
    resultBefore.initialFlg &&
    resultAfter.status ===
      SEIKATSUKAIGO_SUMMARY_SERVICE_STATUS.USUAL_PLACE.value
  ) {
    differenceObject.didGetFood = resultAfter.didGetFood;
  }
  // 開始時間と終了時間は兄弟関係であるため、どちらか片方に差分が存在した場合どっちも差分とみなす
  if (
    differenceObject.inTime !== undefined ||
    differenceObject.outTime !== undefined
  ) {
    differenceObject.inTime = resultAfter.inTime;
    differenceObject.outTime = resultAfter.outTime;
  }
  const otherParam = removeUndefinedParam(differenceObject);
  return createPutRequestPamram(resultAfter, otherParam);
};

const nomalizeReportList = (
  usersList:
    | GetInOutDailyReportResponse["data"]["users"]
    | GetInOutUserReportResponse["data"]["records"],
  date: string
): SEIKATSUKAIGOReport[] => {
  const reportList: SEIKATSUKAIGOReport[] = [];
  Object.keys(usersList).forEach((key) => {
    const target = usersList[key];
    const report = createResultInOutRecord(target);
    reportList.push(report);
  });
  return reportList;
};

const nomalizeCountPerStatus = (
  result: GetInOutDailySummaryResponse | GetInOutUserSummaryResponse
): SEIKATSUKAIGOSummary["countsPerStatus"] => {
  const resultList: SEIKATSUKAIGOSummary["countsPerStatus"] = [];
  Object.keys(result.data.summary.countsPerStatus).forEach((key) => {
    const target = result.data.summary.countsPerStatus[key];
    resultList.push({
      status: castNumber(target.status),
      count: castNumber(target.count)
    });
  });
  return resultList;
};

const nomalizeBaseSummary = (
  result: GetInOutDailySummaryResponse | GetInOutUserSummaryResponse
): SEIKATSUKAIGOSummary => {
  const nomalized: SEIKATSUKAIGOSummary = {
    serviceCounts: {
      oneWayCount: castNumber(result.data.summary.serviceCounts.oneWayCount),
      pickupCount: castNumber(result.data.summary.serviceCounts.pickupCount),
      foodCount: castNumber(result.data.summary.serviceCounts.foodCount)
    },
    countsPerStatus: nomalizeCountPerStatus(result),
    inoutRecords: []
  };
  return nomalized;
};

const nomalizeDailyInOutRecords = (
  result: GetInOutDailySummaryResponse
): DailyInOutRecords[] => {
  const resultList: DailyInOutRecords[] = [];
  Object.keys(result.data.inoutRecords).forEach((key) => {
    const target = result.data.inoutRecords[key];
    resultList.push({
      userName: castString(target.userName),
      recipientNumber: castString(target.recipientNumber),
      status: castNumber(target.status)
    });
  });
  return resultList;
};

const nomalizeUserInOutRecords = (
  result: GetInOutUserSummaryResponse
): UserInOutRecords[] => {
  const resultList: UserInOutRecords[] = [];
  Object.keys(result.data.inoutRecords).forEach((key) => {
    const target = result.data.inoutRecords[key];
    resultList.push({
      date: castString(target.date),
      status: castNumber(target.status)
    });
  });
  return resultList;
};

export const normalizeSEIKATSUKAIGODailyReportDataFromAPI = (
  result: GetInOutDailyReportResponse,
  targetDate?: Date
): SEIKATSUKAIGOReportState => {
  const formatedDate = !targetDate
    ? ""
    : dateInHyphenYYYYMMDDFormat(targetDate);
  const normalizeReportList = nomalizeReportList(
    result.data.users,
    formatedDate
  );
  const normalized: SEIKATSUKAIGOReportState = {
    additionsDaily: {
      bodyRestrictedStillFlg: result.data.additions
        ? Boolean(castNumber(result.data.additions.bodyRestrictedStillFlg))
        : false,
      openShortTime: notNullCastNumber(result.data.additions.openShortTime),
      targetDate: formatedDate
    },
    reportDaily: {
      reportList: JSON.parse(JSON.stringify(normalizeReportList))
    },
    reportUser: {
      reportList: [],
      numberOfAbsence: 0
    }
  };
  return normalized;
};

export const normalizeSEIKATSUKAIGOUserReportDataFromAPI = (
  result: GetInOutUserReportResponse,
  targetDate?: Date
): SEIKATSUKAIGOReportState["reportUser"] => {
  const formatedDate = !targetDate
    ? ""
    : dateInHyphenYYYYMMDDFormat(targetDate);
  const normalizeReportList = nomalizeReportList(
    result.data.records,
    formatedDate
  );
  const normalized: SEIKATSUKAIGOReportState["reportUser"] = {
    reportList: JSON.parse(JSON.stringify(normalizeReportList)),
    numberOfAbsence: castNumber(result.data.counts.numberOfAbsence)
  };
  return normalized;
};

export const nomalizeSEIKATSUKAIGODailySummaryDataFromAPI = (
  result: GetInOutDailySummaryResponse
): SEIKATSUKAIGOSummary => {
  const inoutRecords = nomalizeDailyInOutRecords(result);
  const baseSummary = nomalizeBaseSummary(result);
  baseSummary.inoutRecords = inoutRecords;
  return baseSummary;
};

export const nomalizeSEIKATSUKAIGOUserSummaryDataFromAPI = (
  result: GetInOutUserSummaryResponse
): SEIKATSUKAIGOSummary => {
  const inoutRecords = nomalizeUserInOutRecords(result);
  const baseSummary = nomalizeBaseSummary(result);
  baseSummary.inoutRecords = inoutRecords;
  return baseSummary;
};

export const normalizeSEIKATSUKAIGOReportDataToAPI = (
  reportListBefore: SEIKATSUKAIGOReport[],
  reportListAfter: SEIKATSUKAIGOReport[],
  facilityState: FacilityState
): RequestParam => {
  const targetReportList = removeNoChangeData(
    reportListBefore,
    reportListAfter,
    facilityState
  );

  return targetReportList;
};

/**
 * formの値をstoreに反映
 * @param index
 * @param values
 * @param reportAfter
 * @param type
 */
export const addChangedDataToReportList = (
  index: number,
  values: InitialDataValues,
  reportList: SEIKATSUKAIGOReport[],
  type: SEIKATSUKAIGOReportTypeInterface["type"]
): SEIKATSUKAIGOReport[] => {
  const result = JSON.parse(JSON.stringify(reportList));
  Object.keys(reportList).forEach((key) => {
    if (
      (reportList[key].uif_id === index && type === REPEAT_DAILY) ||
      (reportList[key].target_date === values.initial.targetDate &&
        type === REPEAT_USER)
    ) {
      result[key].status = parseInt(values.initial.status, 10);

      const date = values.initial.targetDate;
      result[key].target_date = date;
      result[key].memo = values.initial.memo;

      result[key].inTime = createTime(date, values.initial.inTime);
      result[key].outTime = createTime(date, values.initial.outTime);
      result[key].extended = values.initial.extended;
      result[key].didGetFood = values.initial.didGetFood;
      result[key].travelTime = values.initial.travelTime;
      result[key].visitSupport =
        values.initial.status === "6"
          ? defTime(result[key].inTime, result[key].outTime)
          : "0";
      result[key].pickupPremises = values.initial.pickupPremises;
      result[key].trialUsageKind = values.initial.trialUsageKind;
      result[key].lifeSupportHubInDistrictFlg = values.initial
        .lifeSupportHubInDistrictFlg
        ? Checkbox.ON
        : Checkbox.OFF;
      result[key].severeDisabilitySupport = values.initial
        .severeDisabilitySupport
        ? Checkbox.ON
        : Checkbox.OFF;
      if (result[key].initialFlg === true) result[key].initialFlg = false;
    }
  });
  return result;
};
