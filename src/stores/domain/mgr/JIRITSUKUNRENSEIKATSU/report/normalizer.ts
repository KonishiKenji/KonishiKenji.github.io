import deepEqual from "fast-deep-equal";
import {
  REPEAT_DAILY,
  REPEAT_USER,
  InOutReportState,
  ReportType
} from "./types";
import { dateInHyphenYYYYMMDDFormat, dateInYYYYMMDDFormat } from "@utils/date";
import { GetInOutDailySummaryResponse } from "@api/requests/inOut/getInOutSummary";
import { GetInOutUserSummaryResponse } from "@api/requests/inOut/getInOutUserSummary";
import { GetInOutDailyReportResponse } from "@api/requests/inOut/getInOut";
import { GetInOutUserReportResponse } from "@api/requests/inOut/getInOutUser";
import { RequestParam } from "@api/requests/inOut/putInOutRecords";
import { isEmpty, cloneDeep } from "lodash-es";
import { Checkbox } from "@constants/variables";
import {
  JIRITSUKUNRENSEIKATSU_SUMMARY_SERVICE_STATUS,
  JIRITSUKUNRENSEIKATSU_VISIT_SUPPORT_VALUE,
  JIRITSUKUNREN_IN_OUT_RECORDS_STATUS
} from "@constants/mgr/JIRITSUKUNRENSEIKATSU/variables";
import { ReportInterface } from "./interfaces/reportInterface";
import { InitialValues } from "@interfaces/mgr/JIRITSUKUNRENSEIKATSU/report/initial";
import { FacilityState } from "../facility/types";
import { UsersInFacilityState } from "../userInFacility/types";

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
  medicalCooperation: {
    storeKey: "medicalCooperation",
    requestKey: "medicalCooperation"
  },
  sputumImplementationFlg: {
    storeKey: "sputumImplementationFlg",
    requestKey: "sputumImplementationFlg"
  },
  helpSocialLifeFlg: {
    storeKey: "helpSocialLifeFlg",
    requestKey: "helpSocialLifeFlg"
  },
  shortStayFlg: {
    storeKey: "shortStayFlg",
    requestKey: "shortStay"
  },
  supportForMentallyIllDischarge: {
    storeKey: "supportForMentallyIllDischarge",
    requestKey: "supportForMentallyIllDischarge"
  },
  specialAreaFlg: {
    storeKey: "specialAreaFlg",
    requestKey: "specialAreaFlg"
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
    "specialAreaFlg",
    "medicalCooperation",
    "helpSocialLifeFlg",
    "shortStayFlg",
    "supportForMentallyIllDischarge",
    "lifeSupportHubInDistrictFlg"
  ],
  status2: ["specialAreaFlg", "lifeSupportHubInDistrictFlg"],
  status5: [
    "inTime",
    "outTime",
    "specialAreaFlg",
    "medicalCooperation",
    "helpSocialLifeFlg",
    "shortStayFlg",
    "supportForMentallyIllDischarge",
    "lifeSupportHubInDistrictFlg"
  ],
  status6: [
    "medicalCooperation",
    "helpSocialLifeFlg",
    "shortStayFlg",
    "supportForMentallyIllDischarge",
    "lifeSupportHubInDistrictFlg"
  ],
  status7: [
    "inTime",
    "outTime",
    "specialAreaFlg",
    "medicalCooperation",
    "helpSocialLifeFlg",
    "shortStayFlg",
    "supportForMentallyIllDischarge"
  ],
  status10: [
    "inTime",
    "outTime",
    "specialAreaFlg",
    "medicalCooperation",
    "helpSocialLifeFlg",
    "shortStayFlg",
    "supportForMentallyIllDischarge",
    "lifeSupportHubInDistrictFlg"
  ]
};

// パラメータの関係マッピング表
const relationshipParamsMap = {
  inTime: {
    storeKey: "inTime",
    requestKey: "inTime",
    cooperationKeys: ["outTime"]
  },
  outTime: {
    storeKey: "outTime",
    requestKey: "outTime",
    cooperationKeys: ["inTime"]
  },
  medicalCooperation: {
    storeKey: "medicalCooperation",
    requestKey: "medicalCooperation",
    cooperationKeys: ["sputumImplementationFlg"]
  }
};

/**
 * 差分チェック uif_id・targetDate・facirityType・didGetFood・travelTime・pickupPremisesは除く
 */
const isDiff = (before: string | number, after: string | number): boolean => {
  return before !== after;
};

const castString = (value?: string | null | undefined): string => {
  if (value === undefined || value === null) {
    return "";
  }
  return value.toString();
};

const castNumber = (value?: number | null | undefined): number | null => {
  if (value === undefined || value === null) {
    return null;
  }
  return Number(value);
};

const castCheckBoxValue = (
  value: number | string | undefined | null
): string | null => {
  // number型の0だとtrue判定になるため
  if (!value && `${value}` !== "0") {
    return null;
  }
  return `${value}` === `${Checkbox.ON}` ? `${Checkbox.ON}` : `${Checkbox.OFF}`;
};

const castSelectBoxValue = (
  value: number | string | undefined | null
): string | null => {
  // number型の0だとtrue判定になるため
  if (!value && `${value}` !== "0") {
    return null;
  }
  return `${value}`;
};

/**
 * disable状態の項目の変換 disable時のnull
 * @param disableFlg disable判定フラグ
 * @param checkBoxValue チェックボックスの値
 * @param notNull DBにnotNull制約があるかどうか
 */
const convertDisableCheckBoxValue = (
  disableFlg: boolean,
  checkBoxValue: boolean,
  notNull: boolean
): string | null => {
  if (disableFlg) {
    return notNull ? Checkbox.OFF : null;
  }
  return checkBoxValue ? Checkbox.ON : Checkbox.OFF;
};

/**
 * 訪問支援項目用の時間差分計算
 * @param inTime 開始時間
 * @param outTime 終了時間
 */
const defTime = (inTime: string, outTime: string): string => {
  const startTime = new Date(inTime);
  const endTime = new Date(outTime);
  const diffTime =
    Math.floor(endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
  if (diffTime >= 1) {
    return JIRITSUKUNRENSEIKATSU_VISIT_SUPPORT_VALUE.OVER_ONE_HOUR;
  }
  return JIRITSUKUNRENSEIKATSU_VISIT_SUPPORT_VALUE.LESS_ONE_HOUR;
};

/**
 * 訪問支援項目の変換
 * @param values formの値
 * @param inTime 開始時間
 * @param outTime 終了時間
 * @param isVisualImpairment 視覚障害者フラグ
 */
const convertVisitSupport = (
  values: InitialValues["initial"],
  inTime: string,
  outTime: string,
  isVisualImpairment: boolean
): string => {
  // サービス利用状況が訪問(6)の場合のみ
  if (values.status === "6") {
    // 利用者設定で【視覚障害者】が設定されている時
    if (isVisualImpairment && values.visitSupport) {
      return JIRITSUKUNRENSEIKATSU_VISIT_SUPPORT_VALUE.PROFESSIONAL_TRAINING;
    }
    if (!isEmpty(inTime) && !isEmpty(outTime)) {
      return defTime(inTime, outTime);
    }
  }
  return JIRITSUKUNRENSEIKATSU_VISIT_SUPPORT_VALUE.NONE;
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

const createResultInOutRecord = (target: ReportInterface): ReportInterface => {
  const data: ReportInterface = {
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
    visitSupport: castSelectBoxValue(target.visitSupport),
    didGetFood: castSelectBoxValue(target.didGetFood),
    trialUsageKind: castSelectBoxValue(target.trialUsageKind),
    lifeSupportHubInDistrictFlg: castCheckBoxValue(
      target.lifeSupportHubInDistrictFlg
    ),
    is_holiday: target.is_holiday,
    memo: target.memo,
    facilityType: "JIRITSUKUNREN_SEIKATSU",
    initialFlg: castNumber(target.inoutRecordsId) === null,
    medicalCooperation: castSelectBoxValue(target.medicalCooperation),
    sputumImplementationFlg: castCheckBoxValue(target.sputumImplementationFlg),
    helpSocialLifeFlg: castCheckBoxValue(target.helpSocialLifeFlg),
    shortStayFlg: castCheckBoxValue(target.shortStayFlg),
    supportForMentallyIllDischarge: castCheckBoxValue(
      target.supportForMentallyIllDischarge
    ),
    specialAreaFlg: castCheckBoxValue(target.specialAreaFlg)
  };
  return data;
};

/**
 * statusによって不要な値を変更する
 * @param value storeValue
 * @param formValue formValue
 */
const convertFormToStore = (
  storeValue: ReportInterface,
  formValue: InitialValues,
  facilityState: FacilityState,
  usersInFacilityState: UsersInFacilityState
): ReportInterface => {
  // storeの初期化データの作成
  const convertStoreValue: ReportInterface = {
    // 基本データはstoreのデータ引継ぎ
    uif_id: storeValue.uif_id,
    inoutRecordsId: storeValue.inoutRecordsId,
    target_date: formValue.initial.targetDate,
    initialFlg: false,
    name: storeValue.name,
    is_holiday: storeValue.is_holiday,
    facilityType: storeValue.facilityType,
    // 以下はformの値により更新
    status: parseInt(formValue.initial.status, 10),
    memo: formValue.initial.memo,
    trialUsageKind: null as string | null,
    inTime: null as string | null,
    outTime: null as string | null,
    didGetFood: "0",
    travelTime: "0",
    lifeSupportHubInDistrictFlg: null as string | null,
    pickupPremises: "0",
    visitSupport: null as string | null,
    medicalCooperation: null as string | null,
    sputumImplementationFlg: "0",
    helpSocialLifeFlg: null as string | null,
    shortStayFlg: "0",
    supportForMentallyIllDischarge: "0",
    specialAreaFlg: "0"
  };

  const date = formValue.initial.targetDate;
  // ステータスに応じて必要なデータをformから挿入
  switch (formValue.initial.status) {
    case JIRITSUKUNREN_IN_OUT_RECORDS_STATUS.USUAL_PLACE:
      convertStoreValue.inTime = createTime(date, formValue.initial.inTime);
      convertStoreValue.outTime = createTime(date, formValue.initial.outTime);
      if (facilityState.mealSaservedServiceFlag) {
        convertStoreValue.didGetFood = formValue.initial.didGetFood;
      }
      if (facilityState.transferServiceFlag) {
        convertStoreValue.travelTime = formValue.initial.travelTime;
        convertStoreValue.pickupPremises = formValue.initial.pickupPremises;
      }
      convertStoreValue.medicalCooperation =
        formValue.initial.medicalCooperation;
      convertStoreValue.sputumImplementationFlg =
        formValue.initial.medicalCooperation === "4" &&
        formValue.initial.sputumImplementationFlg
          ? Checkbox.ON
          : Checkbox.OFF;
      convertStoreValue.helpSocialLifeFlg = convertDisableCheckBoxValue(
        usersInFacilityState.user.user_in_facility_jiritsukunren_seikatsu
          ? `${usersInFacilityState.user.user_in_facility_jiritsukunren_seikatsu.social_life_support_flg}` ===
              Checkbox.OFF
          : false,
        formValue.initial.helpSocialLifeFlg,
        false
      );
      convertStoreValue.shortStayFlg = convertDisableCheckBoxValue(
        facilityState.shortStayType === "0",
        formValue.initial.shortStayFlg,
        true
      );
      convertStoreValue.supportForMentallyIllDischarge = convertDisableCheckBoxValue(
        facilityState.supportForMentallyIllDisChargeSystemType === "0",
        formValue.initial.supportForMentallyIllDischarge,
        true
      );
      break;
    case JIRITSUKUNREN_IN_OUT_RECORDS_STATUS.VISIT:
      convertStoreValue.inTime = createTime(date, formValue.initial.inTime);
      convertStoreValue.outTime = createTime(date, formValue.initial.outTime);
      convertStoreValue.visitSupport = convertVisitSupport(
        formValue.initial,
        convertStoreValue.inTime,
        convertStoreValue.outTime,
        usersInFacilityState.user.user_in_facility_jiritsukunren_seikatsu
          ? `${usersInFacilityState.user.user_in_facility_jiritsukunren_seikatsu.blindness_flg}` ===
              Checkbox.ON
          : false
      );
      convertStoreValue.specialAreaFlg = formValue.initial.specialAreaFlg
        ? Checkbox.ON
        : Checkbox.OFF;
      break;
    case JIRITSUKUNREN_IN_OUT_RECORDS_STATUS.TRIAL_USE_SUPPORT:
      convertStoreValue.trialUsageKind = formValue.initial.trialUsageKind;
      convertStoreValue.lifeSupportHubInDistrictFlg = formValue.initial
        .lifeSupportHubInDistrictFlg
        ? Checkbox.ON
        : Checkbox.OFF;
      break;
    default:
      break;
  }
  return convertStoreValue;
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
  values: InitialValues,
  reportList: ReportInterface[],
  facilityState: FacilityState,
  usersInFacilityState: UsersInFacilityState,
  type: ReportType
): ReportInterface[] => {
  const result: ReportInterface[] = JSON.parse(JSON.stringify(reportList));
  Object.keys(reportList).forEach((key) => {
    if (
      (reportList[key].uif_id === index && type === REPEAT_DAILY) ||
      (reportList[key].target_date === values.initial.targetDate &&
        type === REPEAT_USER)
    ) {
      result[key] = convertFormToStore(
        result[key],
        values,
        facilityState,
        usersInFacilityState
      );
    }
  });
  return result;
};

/**
 * 要素の差分判定 要素に差分がある場合、連携要素もパラメータに付与する
 * @param target
 * @param after
 */
const addRelationValue = (
  target: RequestParam["otherParam"],
  after: ReportInterface
): RequestParam["otherParam"] => {
  const addedRelationParam = cloneDeep(target);
  Object.keys(relationshipParamsMap).forEach((relationKey) => {
    const cooperationKeys = relationshipParamsMap[relationKey].cooperationKeys
      ? relationshipParamsMap[relationKey].cooperationKeys
      : [];
    const hasDiffCooperation: boolean = cooperationKeys.some(
      (cooperationKey: string) => {
        return addedRelationParam[cooperationKey] !== undefined;
      }
    );
    if (hasDiffCooperation) {
      addedRelationParam[relationshipParamsMap[relationKey].requestKey] =
        after[relationshipParamsMap[relationKey].storeKey];
    }
  });
  return addedRelationParam;
};

/**
 * putで送る用の型に変形
 * @param requestReport
 */
const createPutRequestPamram = (
  requestReport: ReportInterface,
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
 * statusによって不要な値を変更する
 * @param value formData
 */
const convertParamByStatus = (value: ReportInterface): ReportInterface => {
  // 初期化データの作成
  const initialValue = {
    // 開始時間
    inTime: "",
    // 終了時間
    outTime: "",
    // 送迎
    travelTime: "0" as string | null,
    // 同一敷地内(送迎)
    pickupPremises: "0",
    // 食事提供
    didGetFood: "0" as string | null,
    // 体験利用支援種別
    trialUsageKind: "0",
    // 地域生活支援拠点
    lifeSupportHubInDistrictFlg: "0",
    // 医療連携体制
    medicalCooperation: "0",
    // 社会生活支援
    helpSocialLifeFlg: "0",
    // 特別地域加算
    specialAreaFlg: "0",
    // 備考
    memo: ""
  };

  // サービス提供の状況確認、不要項目の初期化
  switch (`${value.status}`) {
    case JIRITSUKUNREN_IN_OUT_RECORDS_STATUS.NONE:
      initialValue.didGetFood = null;
      initialValue.travelTime = null;
      break;
    case JIRITSUKUNREN_IN_OUT_RECORDS_STATUS.USUAL_PLACE:
      initialValue.inTime = value.inTime ? value.inTime : initialValue.inTime;
      initialValue.outTime = value.outTime
        ? value.outTime
        : initialValue.outTime;
      initialValue.travelTime = value.travelTime
        ? value.travelTime
        : initialValue.travelTime;
      initialValue.pickupPremises = value.pickupPremises
        ? value.pickupPremises
        : initialValue.pickupPremises;
      initialValue.didGetFood = value.didGetFood
        ? value.didGetFood
        : initialValue.didGetFood;
      initialValue.medicalCooperation = value.medicalCooperation
        ? value.medicalCooperation
        : initialValue.medicalCooperation;
      initialValue.helpSocialLifeFlg = value.helpSocialLifeFlg
        ? value.helpSocialLifeFlg
        : initialValue.helpSocialLifeFlg;
      break;
    case JIRITSUKUNREN_IN_OUT_RECORDS_STATUS.VISIT:
      initialValue.inTime = value.inTime ? value.inTime : initialValue.inTime;
      initialValue.outTime = value.outTime
        ? value.outTime
        : initialValue.outTime;
      initialValue.specialAreaFlg = value.specialAreaFlg
        ? value.specialAreaFlg
        : initialValue.specialAreaFlg;
      break;
    case JIRITSUKUNREN_IN_OUT_RECORDS_STATUS.TRIAL_USE_SUPPORT:
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

  const returnValue: ReportInterface = {
    ...value,
    inTime: initialValue.inTime,
    outTime: initialValue.outTime,
    travelTime: initialValue.travelTime,
    pickupPremises: initialValue.pickupPremises,
    didGetFood: initialValue.didGetFood,
    trialUsageKind: initialValue.trialUsageKind,
    lifeSupportHubInDistrictFlg: initialValue.lifeSupportHubInDistrictFlg,
    medicalCooperation: initialValue.medicalCooperation,
    helpSocialLifeFlg: initialValue.helpSocialLifeFlg,
    specialAreaFlg: initialValue.specialAreaFlg,
    memo: value.memo && !isEmpty(value.memo) ? value.memo : initialValue.memo
  };

  return returnValue;
};

/**
 * 差分抽出 差分以外はundefindで対応
 * @param beforeList
 * @param afterList
 */
const removeNoChangeData = (
  beforeList: ReportInterface[],
  afterList: ReportInterface[]
): RequestParam => {
  let resultAfter = {} as ReportInterface;
  let resultBefore = {} as ReportInterface;
  // 差分の行を抽出
  afterList.forEach((after, idx) => {
    if (!deepEqual(after, beforeList[idx])) {
      resultAfter = cloneDeep(after);
      resultBefore = beforeList[idx];
    }
  });

  resultAfter = convertParamByStatus(resultAfter as ReportInterface);

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
    facilityType: "JIRITSUKUNREN_SEIKATSU"
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
      JIRITSUKUNRENSEIKATSU_SUMMARY_SERVICE_STATUS.USUAL_PLACE.value
  ) {
    differenceObject.didGetFood = resultAfter.didGetFood;
  }

  // 訪問支援は3(視覚障害者に対する専門的訓練)の時は常に送る。
  if (
    resultAfter.visitSupport ===
    JIRITSUKUNRENSEIKATSU_VISIT_SUPPORT_VALUE.PROFESSIONAL_TRAINING
  ) {
    differenceObject.visitSupport = resultAfter.visitSupport;
  }

  // 連携項目の追加
  const addedRelationParamObject = addRelationValue(
    differenceObject,
    resultAfter
  );

  const otherParam = removeUndefinedParam(addedRelationParamObject);
  return createPutRequestPamram(resultAfter, otherParam);
};

const nomalizeReportList = (
  usersList:
    | GetInOutDailyReportResponse["data"]["users"]
    | GetInOutUserReportResponse["data"]["records"],
  date: string
): ReportInterface[] => {
  const reportList: ReportInterface[] = [];
  Object.keys(usersList).forEach((key) => {
    const target = usersList[key];
    const report = createResultInOutRecord(target);
    reportList.push(report);
  });
  return reportList;
};

const nomalizeCountPerStatus = (
  result: GetInOutDailySummaryResponse | GetInOutUserSummaryResponse
): {
  status: number | null;
  count: number | null;
}[] => {
  const resultList: {
    status: number | null;
    count: number | null;
  }[] = [];
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
): InOutReportState["summary"] => {
  const nomalized: InOutReportState["summary"] = {
    serviceCounts: {
      oneWayCount: castNumber(result.data.summary.serviceCounts.oneWayCount),
      pickupCount: castNumber(result.data.summary.serviceCounts.pickupCount),
      foodCount: castNumber(result.data.summary.serviceCounts.foodCount),
      shortStayCount: castNumber(
        result.data.summary.serviceCounts.shortStayCount
      )
    },
    countsPerStatus: nomalizeCountPerStatus(result),
    inoutRecords: {
      dailyInOutRecords: [],
      userInOutRecords: []
    }
  };
  return nomalized;
};

const nomalizeDailyInOutRecords = (
  result: GetInOutDailySummaryResponse
): InOutReportState["summary"]["inoutRecords"]["dailyInOutRecords"] => {
  const resultList: {
    userName: string;
    recipientNumber: string;
    status: number | null;
  }[] = [];
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
): InOutReportState["summary"]["inoutRecords"]["userInOutRecords"] => {
  const resultList: {
    date: string;
    status: number | null;
  }[] = [];
  Object.keys(result.data.inoutRecords).forEach((key) => {
    const target = result.data.inoutRecords[key];
    resultList.push({
      date: castString(target.date),
      status: castNumber(target.status)
    });
  });
  return resultList;
};

export const normalizeJIRITSUKUNRENSEIKATSUDailyReportDataFromAPI = (
  result: GetInOutDailyReportResponse,
  targetDate?: Date
): InOutReportState["reports"] => {
  const formatedDate = !targetDate
    ? ""
    : dateInHyphenYYYYMMDDFormat(targetDate);
  const normalizeReportList = nomalizeReportList(
    result.data.users,
    formatedDate
  );
  const normalized: InOutReportState["reports"] = {
    additionsDaily: {
      bodyRestrictedStillFlg: result.data.additions.bodyRestrictedStillFlg
        ? Boolean(castNumber(result.data.additions.bodyRestrictedStillFlg))
        : false,
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

export const normalizeJIRITSUKUNRENSEIKATSUUserReportDataFromAPI = (
  result: GetInOutUserReportResponse,
  targetDate?: Date
): InOutReportState["reports"]["reportUser"] => {
  const formatedDate = !targetDate
    ? ""
    : dateInHyphenYYYYMMDDFormat(targetDate);
  const normalizeReportList = nomalizeReportList(
    result.data.records,
    formatedDate
  );
  const normalized: InOutReportState["reports"]["reportUser"] = {
    reportList: JSON.parse(JSON.stringify(normalizeReportList)),
    numberOfAbsence: castNumber(result.data.counts.numberOfAbsence)
  };
  return normalized;
};

export const nomalizeJIRITSUKUNRENSEIKATSUDailySummaryDataFromAPI = (
  result: GetInOutDailySummaryResponse
): InOutReportState["summary"] => {
  const inoutRecords = nomalizeDailyInOutRecords(result);
  const baseSummary = nomalizeBaseSummary(result);
  baseSummary.inoutRecords.dailyInOutRecords = inoutRecords;
  return baseSummary;
};

export const nomalizeJIRITSUKUNRENSEIKATSUUserSummaryDataFromAPI = (
  result: GetInOutUserSummaryResponse
): InOutReportState["summary"] => {
  const inoutRecords = nomalizeUserInOutRecords(result);
  const baseSummary = nomalizeBaseSummary(result);
  baseSummary.inoutRecords.userInOutRecords = inoutRecords;
  return baseSummary;
};

export const normalizeJIRITSUKUNRENSEIKATSUReportDataToAPI = (
  reportListBefore: ReportInterface[],
  reportListAfter: ReportInterface[]
): RequestParam => {
  const targetReportList = removeNoChangeData(
    reportListBefore,
    reportListAfter
  );
  return targetReportList;
};
