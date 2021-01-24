import deepEqual from "fast-deep-equal";
import {
  IABReport,
  IABSummary,
  DailyInOutRecords,
  UserInOutRecords,
  IABReportState,
  IABReportTypeInterface,
  REPEAT_DAILY,
  REPEAT_MONTHLY
} from "./types";

import { dateInHyphenYYYYMMDDFormat, dateInYYYYMMDDFormat } from "@utils/date";
import { GetInOutDailySummaryResponse } from "@api/requests/inOut/getInOutSummary";
import { GetInOutUserSummaryResponse } from "@api/requests/inOut/getInOutUserSummary";
import { GetInOutDailyReportResponse } from "@api/requests/inOut/getInOut";
import { GetInOutUserReportResponse } from "@api/requests/inOut/getInOutUser";
import { RequestParam } from "@api/requests/inOut/putInOutRecords";
import { isEmpty } from "lodash-es";
import { InitialDataValues } from "@initialize/mgr/IAB/report/initialValues";
import { Checkbox } from "@constants/variables";
import { IAB_OPTION_SERVICE_STATUS } from "@constants/mgr/IAB/variables";
import convertMinutesToTime from "@utils/date/convertMinutesToTime";

// storeのkeyからpiaRequestのkeyに変換するmap表 Request必須値は除く
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
  },
  medicalCooperation: {
    storeKey: "medicalCooperation",
    requestKey: "medicalCooperation"
  }
};

// statusによる不要なデータのstoreKey一覧
const nullDataByStatus = {
  status1: [
    "inTime",
    "outTime",
    "didGetFood",
    "lifeSupportHubInDistrictFlg",
    "medicalCooperation",
    "extended"
  ],
  status2: ["lifeSupportHubInDistrictFlg"],
  status5: [
    "inTime",
    "outTime",
    "didGetFood",
    "lifeSupportHubInDistrictFlg",
    "medicalCooperation",
    "extended"
  ],
  status6: [
    "didGetFood",
    "lifeSupportHubInDistrictFlg",
    "medicalCooperation",
    "extended"
  ],
  status7: [
    "inTime",
    "outTime",
    "didGetFood",
    "medicalCooperation",
    "extended"
  ],
  status10: [
    "inTime",
    "outTime",
    "didGetFood",
    "lifeSupportHubInDistrictFlg",
    "medicalCooperation",
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
const createTime = (date?: string, time?: string): string | undefined => {
  return date && time ? date.concat(" ") + time.concat(":00") : "";
};

const convertTime = (time?: string): string => {
  return time ? time.concat(":00") : "";
};

/**
 * 休憩時間を時分秒の形式へ変換する
 * @param minutes 休憩時間
 */
const convertBreakTime = (minutes?: number): string => {
  let res = "";
  if (minutes) {
    const time = convertMinutesToTime(minutes);
    res = `${time.hour.padStart(2, "0")}:${time.minutes}:00`;
  }
  return res;
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
 * 差分チェック uif_id・targetDate・facilityType・travelTime・pickupPremisesは除く
 */
const isDiff = (before: string | number, after: string | number): boolean => {
  return before !== after;
};

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

const createResultInOutRecord = (target: IABReport): IABReport => {
  const data: IABReport = {
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
    medicalCooperation: isEmpty(castString(target.medicalCooperation))
      ? "0"
      : castString(target.medicalCooperation),
    pickupPremises: isEmpty(castString(target.pickupPremises))
      ? "0"
      : castString(target.pickupPremises),
    visitSupport: castNumber(target.visitSupport),
    didGetFood: castString(target.didGetFood),
    trialUsageKind: castString(target.trialUsageKind),
    lifeSupportHubInDistrictFlg: castString(target.lifeSupportHubInDistrictFlg),
    helpInhouseLifeFlg: castString(target.helpInhouseLifeFlg),
    helpSocialLifeFlg: castString(target.helpSocialLifeFlg),
    trainCommuteFlg: castString(target.trainCommuteFlg),
    extended: castString(target.extended),
    is_holiday: target.is_holiday,
    defRecordWork: target.defRecordWork,
    memo: target.memo,
    facilityType: "IAB",
    initialFlg: castNumber(target.inoutRecordsId) === null,
    workRecord: {
      id:
        target.workRecord && target.workRecord.id ? target.workRecord.id : null,
      inoutRecordsId:
        target.workRecord && target.workRecord.inoutRecordsId
          ? target.workRecord.inoutRecordsId
          : null,
      worked: target.workRecord && target.workRecord.worked,
      startTime: target.workRecord && castString(target.workRecord.startTime),
      endTime: target.workRecord && castString(target.workRecord.endTime),
      breakTime: target.workRecord && castString(target.workRecord.breakTime),
      totalTime: target.workRecord && castString(target.workRecord.totalTime),
      memo: target.workRecord && castString(target.workRecord.memo),
      histories: target.workRecord && target.workRecord.histories
    }
  };
  return data;
};

/**
 * statusによって不要な値を変更する
 * @param value formData
 */
const convertParamByStatus = (value: IABReport): IABReport => {
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
    worked: 0,
    startTime: null as string | null,
    endTime: null as string | null,
    breakTime: null as string | null,
    workMemo: null as string | null,
    medicalCooperation: "0",
    helpInhouseLifeFlg: "0",
    helpSocialLifeFlg: "0",
    trainCommuteFlg: "0"
  };

  // サービス提供の状況確認、不要項目の初期化
  switch (value.status) {
    case 1:
      // 食事・送迎にnullを設定するとAPIから利用者情報のデフォルト値が返ってくる
      initialValue.didGetFood = null;
      initialValue.travelTime = null;
      break;
    case 2:
    case 3:
    case 4:
    case 8:
    case 9:
      initialValue.inTime = value.inTime ? value.inTime : initialValue.inTime;
      initialValue.outTime = value.outTime
        ? value.outTime
        : initialValue.outTime;
      initialValue.extended = value.extended
        ? value.extended
        : initialValue.extended;
      initialValue.didGetFood = value.didGetFood
        ? value.didGetFood
        : initialValue.didGetFood;
      initialValue.travelTime = value.travelTime
        ? value.travelTime
        : initialValue.travelTime;
      initialValue.pickupPremises = value.pickupPremises
        ? value.pickupPremises
        : initialValue.pickupPremises;
      initialValue.medicalCooperation = value.medicalCooperation
        ? value.medicalCooperation
        : initialValue.medicalCooperation;
      initialValue.helpInhouseLifeFlg = value.helpInhouseLifeFlg
        ? value.helpInhouseLifeFlg
        : initialValue.helpInhouseLifeFlg;
      initialValue.helpSocialLifeFlg = value.helpSocialLifeFlg
        ? value.helpSocialLifeFlg
        : initialValue.helpSocialLifeFlg;
      initialValue.trainCommuteFlg = value.trainCommuteFlg
        ? value.trainCommuteFlg
        : initialValue.trainCommuteFlg;
      initialValue.worked = value.workRecord.worked
        ? value.workRecord.worked
        : initialValue.worked;
      initialValue.startTime = value.workRecord.startTime
        ? value.workRecord.startTime
        : initialValue.startTime;
      initialValue.endTime = value.workRecord.endTime
        ? value.workRecord.endTime
        : initialValue.endTime;
      initialValue.breakTime = value.workRecord.breakTime
        ? value.workRecord.breakTime
        : initialValue.breakTime;
      initialValue.workMemo = value.workRecord.memo
        ? value.workRecord.memo
        : initialValue.workMemo;
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
      break;
  }

  const convertParam: IABReport = value;
  convertParam.inTime = initialValue.inTime;
  convertParam.outTime = initialValue.outTime;
  convertParam.extended = initialValue.extended;
  convertParam.didGetFood = initialValue.didGetFood;
  convertParam.travelTime = initialValue.travelTime;
  convertParam.pickupPremises = initialValue.pickupPremises;
  convertParam.trialUsageKind = initialValue.trialUsageKind;
  convertParam.lifeSupportHubInDistrictFlg =
    initialValue.lifeSupportHubInDistrictFlg;
  convertParam.medicalCooperation = initialValue.medicalCooperation;
  convertParam.helpInhouseLifeFlg = initialValue.helpInhouseLifeFlg;
  convertParam.helpSocialLifeFlg = initialValue.helpSocialLifeFlg;
  convertParam.trainCommuteFlg = initialValue.trainCommuteFlg;
  convertParam.workRecord.worked = initialValue.worked;
  convertParam.workRecord.startTime = initialValue.startTime;
  convertParam.workRecord.endTime = initialValue.endTime;
  convertParam.workRecord.breakTime = initialValue.breakTime;
  convertParam.workRecord.memo = initialValue.workMemo;

  // 備考は全サービス提供で必須送信項目の為、switch外で処理
  convertParam.memo =
    convertParam.memo && !isEmpty(convertParam.memo)
      ? convertParam.memo
      : initialValue.memo;

  // 作業実施のフラグがない時、時刻周りを送らないようにする
  if (convertParam.workRecord && convertParam.workRecord.worked === 0) {
    convertParam.workRecord.startTime = null;
    convertParam.workRecord.endTime = null;
    convertParam.workRecord.breakTime = null;
    convertParam.workRecord.totalTime = null;
  }

  return convertParam;
};

/**
 * putで送る用の型に変形
 * @param requestReport
 */
const createPutRequestParam = (
  requestReport: IABReport,
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
  beforeList: IABReport[],
  afterList: IABReport[],
  targetFacilityType: string
): RequestParam => {
  let resultAfter = {} as IABReport;
  let resultBefore = {} as IABReport;
  const workKey = "workRecord";
  // 差分の行を抽出
  afterList.forEach((after, idx) => {
    if (!deepEqual(after, beforeList[idx])) {
      resultAfter = after;
      resultBefore = beforeList[idx];
    }
  });
  resultAfter = convertParamByStatus(resultAfter as IABReport);

  // 必須分初期化
  const differenceObject: RequestParam["otherParam"] = {
    status: resultAfter.status,
    restTime: 60,
    didGetFood: resultAfter.didGetFood ? resultAfter.didGetFood : null,
    travelTime: resultAfter.travelTime ? resultAfter.travelTime : null,
    pickupPremises: resultAfter.pickupPremises
      ? resultAfter.pickupPremises
      : "0",
    // 体験利用支援種別は全サービス利用状況で必須扱い。statusが7の際にform値,7以外の際はnullを送信
    trialUsageKind: resultAfter.trialUsageKind,
    facilityType: targetFacilityType,
    medicalCooperation: resultAfter.medicalCooperation,
    helpInhouseLifeFlg: resultAfter.helpInhouseLifeFlg,
    helpSocialLifeFlg: resultAfter.helpSocialLifeFlg,
    trainCommuteFlg: resultAfter.trainCommuteFlg
  };

  // 作業時間関連項目
  const differenceObjectWorks: RequestParam["otherParam"]["workRecord"] = {
    id:
      resultAfter.workRecord && resultAfter.workRecord.id
        ? resultAfter.workRecord.id
        : null,
    inoutRecordsId:
      resultAfter.workRecord && resultAfter.workRecord.inoutRecordsId
        ? resultAfter.workRecord.inoutRecordsId
        : null,
    worked:
      resultAfter.workRecord && resultAfter.workRecord.worked
        ? resultAfter.workRecord.worked
        : 0,
    startTime:
      resultAfter.workRecord && resultAfter.workRecord.startTime
        ? resultAfter.workRecord.startTime
        : "",
    endTime:
      resultAfter.workRecord && resultAfter.workRecord.endTime
        ? resultAfter.workRecord.endTime
        : "",
    breakTime:
      resultAfter.workRecord && resultAfter.workRecord.breakTime
        ? resultAfter.workRecord.breakTime
        : "",
    memo:
      resultAfter.workRecord && resultAfter.workRecord.memo
        ? resultAfter.workRecord.memo
        : ""
  };

  // nullにすべきデータのkeyの取得
  const nullDataList = nullDataByStatus[`status${resultAfter.status}`]
    ? nullDataByStatus[`status${resultAfter.status}`]
    : [];

  // 差分の項目を抽出
  Object.keys(StoreToRequestParam).forEach((key) => {
    const { requestKey } = StoreToRequestParam[key];
    const { storeKey } = StoreToRequestParam[key];
    if (
      isDiff(resultAfter[storeKey], resultBefore[storeKey]) ||
      nullDataList.includes(storeKey)
    ) {
      differenceObject[requestKey] = resultAfter[storeKey];
    } else {
      differenceObject[requestKey] = undefined;
    }
  });

  // 初回時のみ且つ食事提供を選択可能なstatusの時、食事提供は必ず入れる。default設定の為
  if (
    resultBefore.initialFlg &&
    resultAfter.status &&
    IAB_OPTION_SERVICE_STATUS.some((item) => {
      return item.value === resultAfter.status;
    })
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
  otherParam[workKey] = differenceObjectWorks; // 作業時間関連項目を反映する処理

  return createPutRequestParam(resultAfter, otherParam);
};

const normalizeReportList = (
  usersList:
    | GetInOutDailyReportResponse["data"]["users"]
    | GetInOutUserReportResponse["data"]["records"],
  date: string
): IABReport[] => {
  const reportList: IABReport[] = [];
  Object.keys(usersList).forEach((key) => {
    const target = usersList[key];
    const report = createResultInOutRecord(target);
    reportList.push(report);
  });
  return reportList;
};

const normalizeCountPerStatus = (
  result: GetInOutDailySummaryResponse | GetInOutUserSummaryResponse
): IABSummary["countsPerStatus"] => {
  const resultList: { status: number | null; count: number | null }[] = [];
  Object.keys(result.data.summary.countsPerStatus).forEach((key) => {
    const target = result.data.summary.countsPerStatus[key];
    resultList.push({
      status: castNumber(target.status),
      count: castNumber(target.count)
    });
  });
  return resultList;
};

const normalizeBaseSummary = (
  result: GetInOutDailySummaryResponse | GetInOutUserSummaryResponse
): IABSummary => {
  const normalized: IABSummary = {
    serviceCounts: {
      oneWayCount: castNumber(result.data.summary.serviceCounts.oneWayCount),
      pickupCount: castNumber(result.data.summary.serviceCounts.pickupCount),
      foodCount: castNumber(result.data.summary.serviceCounts.foodCount),
      medicalSupportCount: castNumber(
        result.data.summary.serviceCounts.medicalSupportCount
      ),
      transitionPreparationSupportCount: castNumber(
        result.data.summary.serviceCounts.transitionPreparationSupportCount
      ),
      offsiteSupportCount: castNumber(
        result.data.summary.serviceCounts.offsiteSupportCount
      )
    },
    countsPerStatus: normalizeCountPerStatus(result),
    inoutRecords: []
  };
  return normalized;
};

const normalizeDailyInOutRecords = (
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

const normalizeUserInOutRecords = (
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

export const normalizeIABDailyReportDataFromAPI = (
  result: GetInOutDailyReportResponse,
  targetDate?: Date
): IABReportState => {
  const formatedDate = !targetDate
    ? ""
    : dateInHyphenYYYYMMDDFormat(targetDate);
  const normalizedReportList = normalizeReportList(
    result.data.users,
    formatedDate
  );
  const normalized: IABReportState = {
    additionsDaily: {
      bodyRestrictedStillFlg: result.data.additions
        ? Boolean(castNumber(result.data.additions.bodyRestrictedStillFlg))
        : false,
      openShortTime: notNullCastNumber(result.data.additions.openShortTime),
      targetDate: formatedDate
    },
    reportDaily: {
      reportList: JSON.parse(JSON.stringify(normalizedReportList))
    },
    reportUser: {
      reportList: [],
      numberOfAbsence: 0
    }
  };
  return normalized;
};

export const normalizeIABUserReportDataFromAPI = (
  result: GetInOutUserReportResponse,
  targetDate?: Date
): IABReportState["reportUser"] => {
  const formatedDate = !targetDate
    ? ""
    : dateInHyphenYYYYMMDDFormat(targetDate);
  const normalizedReportList = normalizeReportList(
    result.data.records,
    formatedDate
  );
  const normalized: IABReportState["reportUser"] = {
    reportList: JSON.parse(JSON.stringify(normalizedReportList)),
    numberOfAbsence: castNumber(result.data.counts.numberOfAbsence)
  };
  return normalized;
};

export const normalizeIABDailySummaryDataFromAPI = (
  result: GetInOutDailySummaryResponse
): IABSummary => {
  const inoutRecords = normalizeDailyInOutRecords(result);
  const baseSummary = normalizeBaseSummary(result);
  baseSummary.inoutRecords = inoutRecords;
  return baseSummary;
};

export const normalizeIABUserSummaryDataFromAPI = (
  result: GetInOutUserSummaryResponse
): IABSummary => {
  const inoutRecords = normalizeUserInOutRecords(result);
  const baseSummary = normalizeBaseSummary(result);
  baseSummary.inoutRecords = inoutRecords;
  return baseSummary;
};

export const normalizeIABReportDataToAPI = (
  reportListBefore: IABReport[],
  reportListAfter: IABReport[],
  facilityType: string
): RequestParam => {
  const targetReportList = removeNoChangeData(
    reportListBefore,
    reportListAfter,
    facilityType
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
  reportList: IABReport[],
  type: IABReportTypeInterface["type"]
): IABReport[] => {
  const result = JSON.parse(JSON.stringify(reportList));
  Object.keys(reportList).forEach((key) => {
    if (
      (reportList[key].uif_id === index && type === REPEAT_DAILY) ||
      (reportList[key].target_date === values.initial.targetDate &&
        type === REPEAT_MONTHLY)
    ) {
      result[key].status = parseInt(values.initial.status, 10);

      const date = values.initial.targetDate;
      result[key].target_date = date;
      result[key].memo = values.initial.memo;

      result[key].inTime = createTime(date, values.initial.inTime);
      result[key].outTime = createTime(date, values.initial.outTime);
      result[key].extended = values.initial.extended;
      result[key].didGetFood = values.initial.didGetFood;
      result[key].medicalCooperation = values.initial.medicalCooperation;
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
      result[key].helpInhouseLifeFlg = values.initial.helpInhouseLifeFlg
        ? Checkbox.ON
        : Checkbox.OFF;
      result[key].helpSocialLifeFlg = values.initial.helpSocialLifeFlg
        ? Checkbox.ON
        : Checkbox.OFF;
      result[key].trainCommuteFlg = values.initial.trainCommuteFlg
        ? Checkbox.ON
        : Checkbox.OFF;

      result[key].workRecord.id = values.workRecord.id;
      result[key].workRecord.inoutRecordId = values.workRecord.inoutRecordsId;
      result[key].workRecord.worked = values.workRecord.worked
        ? parseInt(Checkbox.ON, 10)
        : parseInt(Checkbox.OFF, 10);
      result[key].workRecord.startTime = convertTime(
        values.workRecord.startTime
      );
      result[key].workRecord.endTime = convertTime(values.workRecord.endTime);
      result[key].workRecord.breakTime = convertBreakTime(
        parseInt(values.workRecord.breakTime, 10)
      );
      result[key].workRecord.memo = values.workRecord.memo;

      if (result[key].initialFlg === true) result[key].initialFlg = false;
    }
  });
  return result;
};
