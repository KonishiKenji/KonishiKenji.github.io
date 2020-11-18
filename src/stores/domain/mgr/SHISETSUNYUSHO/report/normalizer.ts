import {
  ReportState,
  UsagePerformanceType,
  UsagePerformanceSHISETSUNYUSHOType,
  ReportType,
  REPEAT_DAILY,
  UsagePerformanceDailyType
} from "./types";

import { dateInHyphenYYYYMMDDFormat } from "@utils/date";
import {
  GetUsagePerformanceDailyParams,
  GetUsagePerformanceParamsDaily
} from "@api/requests/usagePerformance/getUsagePerformanceDaily";
import {
  Checkbox,
  INT_TRUE_FROM_API,
  INT_FALSE_FROM_API
} from "@constants/variables";
import cloneDeep from "lodash-es/cloneDeep";
import {
  StatusType,
  UsagePerformanceStoreParamKeyToSelectBoxName,
  UsagePerformanceSHISETSUNYUSHOStoreParamKeyToSelectBoxName
} from "@constants/mgr/SHISETSUNYUSHO/variables";
import {
  GetUsagePerformanceMonthlyParams,
  GetUsagePerformanceParamsMonthly
} from "@api/requests/usagePerformance/getUsagePerformanceMonthly";
import {
  PostUsagePerformanceDailyParams,
  PostUsagePerformanceDailyParam,
  PostUsagePerformanceSHISETSUNYUSHODailyParam
} from "@api/requests/usagePerformance/postUsagePerformanceDaily";
import deepEqual from "fast-deep-equal";
import isEmpty from "lodash-es/isEmpty";
import { InitialValues } from "@interfaces/mgr/SHISETSUNYUSHO/report/initial";
import { UsersInFacilityState } from "@stores/domain/mgr/SHISETSUNYUSHO/userInFacility/types";
import {
  PostUsagePerformanceMonthlyParams,
  PostUsagePerformanceMonthlyParam,
  PostUsagePerformanceSHISETSUNYUSHOMonthlyParam
} from "@api/requests/usagePerformance/postUsagePerformanceMonthly";
import { FacilityState } from "@stores/domain/mgr/SHISETSUNYUSHO/facility/types";

// 利用者ごと用のnormalizer
/**
 * usagePerformanceのPOSTデータ作成(差分更新)(利用者ごと)
 * @param reportUsers
 */
export const normalizePostUsagePerformanceParamUsers = (
  reportUsers: ReportState["reportUsers"]
): PostUsagePerformanceMonthlyParams => {
  const postData: PostUsagePerformanceMonthlyParams = {
    usage_performance: [],
    usage_performance_shisetsunyusho: createUsagePerformanceSHISETSUNYUSHOParam(
      reportUsers.usagePerformanceSHISETSUNYUSHO,
      reportUsers.usagePerformance
    )
  };
  postData.usage_performance = createUsagePerformanceParam(
    reportUsers.usagePerformance,
    postData.usage_performance_shisetsunyusho
  );
  return postData;
};

/**
 * APIパラメータからstoreに変換(利用者ごと)
 * @param result
 */
export const normalizeSHISETSUNYUSHOReportUsersDataFromAPI = (
  result: GetUsagePerformanceMonthlyParams
): ReportState["reportUsers"] => {
  const normalized: ReportState["reportUsers"] = {
    usagePerformance: normalizeGetUsagePerformanceParams(
      result.data.usage_performance
    ),
    usagePerformanceSHISETSUNYUSHO: normalizeGetUsagePerformanceSHISETSUNYUSHO(
      result.data.usage_performance_shisetsunyusho
    )
  };
  return normalized;
};

// 日ごと用のnormalizer
/**
 * usagePerformanceのPOSTデータ作成(差分更新)(日ごと)
 * @param reportDaily
 */
export const normalizePostUsagePerformanceParamDaily = (
  reportDaily: ReportState["reportDaily"]
): PostUsagePerformanceDailyParams => {
  const postData: PostUsagePerformanceDailyParams = {
    usage_performance_daily: createUsagePerformanceDaily(
      reportDaily.usagePerformanceDaily
    ),
    usage_performance: [],
    usage_performance_shisetsunyusho: createUsagePerformanceSHISETSUNYUSHOParam(
      reportDaily.usagePerformanceSHISETSUNYUSHO,
      reportDaily.usagePerformance
    )
  };
  postData.usage_performance = createUsagePerformanceParam(
    reportDaily.usagePerformance,
    postData.usage_performance_shisetsunyusho
  );
  return postData;
};

/**
 * 一括登録用のusagePerformanceDailyの作成(日ごと)
 * @param usagePerformanceDaily
 */
const createUsagePerformanceDaily = (
  usagePerformanceDaily: ReportState["reportDaily"]["usagePerformanceDaily"]
): PostUsagePerformanceDailyParams["usage_performance_daily"] => {
  // 差分がなければ処理しない
  if (!deepEqual(usagePerformanceDaily.before, usagePerformanceDaily.after)) {
    return convertUsagePerformanceDaily(usagePerformanceDaily.after);
  }
  return {};
};

/**
 * store/UsagePerformanceDailyをPostUsagePerformanceParams["usage_performance_daily"]に変換(日ごと)
 * @param usagePerformanceDaily storeのusagePerformanceDaily
 */
const convertUsagePerformanceDaily = (
  usagePerformanceDaily: UsagePerformanceDailyType
): PostUsagePerformanceDailyParams["usage_performance_daily"] => {
  return {
    target_date: usagePerformanceDaily.targetDate,
    body_restraint_abolition_unexecuted_flg:
      usagePerformanceDaily.bodyRestraintAbolitionUnexecutedFlg !== undefined
        ? castCheckBoxToNumber(
            usagePerformanceDaily.bodyRestraintAbolitionUnexecutedFlg
          )
        : 0
  };
};

/**
 * APIパラメータからstoreに変換(日ごと)
 * @param result
 * @param targetDate
 */
export const normalizeSHISETSUNYUSHOReportDailyDataFromAPI = (
  result: GetUsagePerformanceDailyParams,
  targetDate?: Date
): ReportState["reportDaily"] => {
  const formatedDate = !targetDate
    ? ""
    : dateInHyphenYYYYMMDDFormat(targetDate);

  return {
    usagePerformanceDaily: normalizeGetUsagePerformanceDaily(
      formatedDate,
      result.data.usage_performance_daily
    ),
    usagePerformance: normalizeGetUsagePerformanceParams(
      result.data.usage_performance
    ),
    usagePerformanceSHISETSUNYUSHO: normalizeGetUsagePerformanceSHISETSUNYUSHO(
      result.data.usage_performance_shisetsunyusho
    )
  };
};

/**
 * APIから施設利用者全体の実績記録オブジェクトの変換(日ごと)
 * @param targetDate 対象日付
 * @param getUsagePerformanceDaily  施設利用者全体の実績記録オブジェクト(APIデータ)
 */
const normalizeGetUsagePerformanceDaily = (
  targetDate: string,
  getUsagePerformanceDaily: GetUsagePerformanceDailyParams["data"]["usage_performance_daily"]
): ReportState["reportDaily"]["usagePerformanceDaily"] => {
  return {
    before: {
      id: getUsagePerformanceDaily ? getUsagePerformanceDaily.id : undefined,
      targetDate: targetDate || undefined,
      bodyRestraintAbolitionUnexecutedFlg: getUsagePerformanceDaily
        ? castNumberToCheckBox(
            getUsagePerformanceDaily.body_restraint_abolition_unexecuted_flg
          )
        : undefined
    },
    after: {
      id: getUsagePerformanceDaily ? getUsagePerformanceDaily.id : undefined,
      targetDate: targetDate || undefined,
      bodyRestraintAbolitionUnexecutedFlg: getUsagePerformanceDaily
        ? castNumberToCheckBox(
            getUsagePerformanceDaily.body_restraint_abolition_unexecuted_flg
          )
        : undefined
    }
  };
};

// 共通処理
/**
 * APIから施設利用者の実績記録オブジェクト配列の変換
 * @param getUsagePerformanceList	施設利用者の実績記録オブジェクト配列
 */
const normalizeGetUsagePerformanceParams = (
  getUsagePerformanceList:
    | GetUsagePerformanceDailyParams["data"]["usage_performance"]
    | GetUsagePerformanceMonthlyParams["data"]["usage_performance"]
): ReportState[ReportType]["usagePerformance"] => {
  const storeUsagePerformance: ReportState[ReportType]["usagePerformance"]["before"] = {};
  // getAPIのパラメータを連想配列に変換
  getUsagePerformanceList.forEach(
    (
      getUsagePerformance:
        | GetUsagePerformanceParamsDaily
        | GetUsagePerformanceParamsMonthly
    ) => {
      storeUsagePerformance[
        `${getUsagePerformance.users_in_facility_id}_${getUsagePerformance.target_date}`
      ] = {
        id: getUsagePerformance.id,
        usersInFacilityId: getUsagePerformance.users_in_facility_id,
        nameSei: getUsagePerformance.name_sei,
        nameMei: getUsagePerformance.name_mei,
        targetDate: getUsagePerformance.target_date,
        statusType: getUsagePerformance.status_type
          ? getUsagePerformance.status_type
          : 0,
        remarks: getUsagePerformance.remarks,
        isHoliday: getUsagePerformance.is_holiday,
        isServiceEnd: getUsagePerformance.is_service_end,
        initialFlg: getUsagePerformance.id === null
      };
    }
  );

  return {
    before: cloneDeep(storeUsagePerformance),
    after: cloneDeep(storeUsagePerformance)
  };
};

/**
 * APIから施設利用者の実績記録（短期入所）オブジェクト配列の変換
 * objectのkeyは【(user_in_facility_id)-(target_date)】
 * @param getUsagePerformanceSHISETSUNYUSHOList	施設利用者の実績記録（短期入所）オブジェクト
 */
const normalizeGetUsagePerformanceSHISETSUNYUSHO = (
  getUsagePerformanceSHISETSUNYUSHOList:
    | GetUsagePerformanceDailyParams["data"]["usage_performance_shisetsunyusho"]
    | GetUsagePerformanceMonthlyParams["data"]["usage_performance_shisetsunyusho"]
): ReportState[ReportType]["usagePerformanceSHISETSUNYUSHO"] => {
  const storeUsagePerformanceSHISETSUNYUSHO: ReportState[ReportType]["usagePerformanceSHISETSUNYUSHO"]["before"] = {};
  // getAPIのパラメータを連想配列に変換
  if (getUsagePerformanceSHISETSUNYUSHOList) {
    getUsagePerformanceSHISETSUNYUSHOList.forEach(
      (getUsagePerformanceSHISETSUNYUSHO) => {
        storeUsagePerformanceSHISETSUNYUSHO[
          `${getUsagePerformanceSHISETSUNYUSHO.users_in_facility_id}_${getUsagePerformanceSHISETSUNYUSHO.target_date}`
        ] = {
          id: getUsagePerformanceSHISETSUNYUSHO.id,
          usersInFacilityId:
            getUsagePerformanceSHISETSUNYUSHO.users_in_facility_id,
          targetDate: getUsagePerformanceSHISETSUNYUSHO.target_date,
          hospitalizationOvernightStay: castNullOrUndefinedToNumber(
            getUsagePerformanceSHISETSUNYUSHO.hospitalization_overnightstay
          ),
          regionalTransition: castNullOrUndefinedToNumber(
            getUsagePerformanceSHISETSUNYUSHO.regional_transition_flg
          ),
          oralTransition: castNullOrUndefinedToNumber(
            getUsagePerformanceSHISETSUNYUSHO.oral_transition_flg
          ),
          oralPreservation: castNullOrUndefinedToNumber(
            getUsagePerformanceSHISETSUNYUSHO.oral_preservation
          ),
          medicalFoods: castNullOrUndefinedToNumber(
            getUsagePerformanceSHISETSUNYUSHO.medical_foods_flg
          ),
          nutritionManagement: castNullOrUndefinedToNumber(
            getUsagePerformanceSHISETSUNYUSHO.nutrition_management_flg
          ),
          collectionOfUtilityFee: castNullOrUndefinedToNumber(
            getUsagePerformanceSHISETSUNYUSHO.collection_of_utility_fee_flg
          ),
          foodBreakfast: castNullOrUndefinedToNumber(
            getUsagePerformanceSHISETSUNYUSHO.food_breakfast_flg
          ),
          foodLunch: castNullOrUndefinedToNumber(
            getUsagePerformanceSHISETSUNYUSHO.food_lunch_flg
          ),
          foodSupper: castNullOrUndefinedToNumber(
            getUsagePerformanceSHISETSUNYUSHO.food_supper_flg
          ),
          severeDisabilitySupport: castNullOrUndefinedToNumber(
            getUsagePerformanceSHISETSUNYUSHO.severe_disability_support_flg
          )
        };
      }
    );
  }
  return {
    before: cloneDeep(storeUsagePerformanceSHISETSUNYUSHO),
    after: cloneDeep(storeUsagePerformanceSHISETSUNYUSHO)
  };
};

/**
 * StatusTypeの一括更新
 * @param usagePerformanceList storeデータ
 */
export const getSetAllStatusType = (
  usagePerformanceList: ReportState[ReportType]["usagePerformance"]["after"]
): ReportState[ReportType]["usagePerformance"]["after"] => {
  const setAllStatusTypeList: ReportState[ReportType]["usagePerformance"]["after"] = {};
  Object.keys(usagePerformanceList).forEach((keyValue: string) => {
    const setAllServiceType: UsagePerformanceType = cloneDeep(
      usagePerformanceList[keyValue]
    );
    setAllServiceType.statusType = Number(StatusType.LODGING);
    // 実績入力時に初回フラグをfalseにする。
    setAllServiceType.initialFlg = false;
    setAllStatusTypeList[keyValue] = setAllServiceType;
  });
  return setAllStatusTypeList;
};

/**
 * 一項目更新後のUsagePerformanceの取得
 * @param name 項目の名前
 * @param value 更新後の値
 * @param keyValue 更新したusagePerformanceのkey
 * @param usagePerformance storeのusagePerformance
 */
export const getSetUsagePerformanceItems = (
  name: string,
  value: string | number,
  keyValue: string,
  usagePerformance: ReportState[ReportType]["usagePerformance"]["after"]
): ReportState[ReportType]["usagePerformance"]["after"] => {
  const clonedUsagePerformance = cloneDeep(usagePerformance);
  clonedUsagePerformance[keyValue] = setUsagePerformance(
    name,
    value,
    clonedUsagePerformance[keyValue]
  );
  return clonedUsagePerformance;
};

/**
 * 一項目更新後のUsagePerformanceSHISETSUNYUSHOの取得
 * @param name 項目の名前
 * @param value 更新後の値
 * @param keyValue 更新したいusagePerformanceSHISETSUNYUSHOのkey
 * @param usagePerformanceSHISETSUNYUSHO storeのusagePerformanceSHISETSUNYUSHO
 */
export const getSetUsagePerfomanceSHISETSUNYUSHOItems = (
  name: string,
  value: string | number,
  keyValue: string,
  usagePerformanceSHISETSUNYUSHO: ReportState[ReportType]["usagePerformanceSHISETSUNYUSHO"]["after"]
): ReportState[ReportType]["usagePerformanceSHISETSUNYUSHO"]["after"] => {
  const clonedUsagePerformanceSHISETSUNYUSHO = cloneDeep(
    usagePerformanceSHISETSUNYUSHO
  );
  clonedUsagePerformanceSHISETSUNYUSHO[
    keyValue
  ] = setUsagePerformanceSHISETSUNYUSHO(
    name,
    value,
    clonedUsagePerformanceSHISETSUNYUSHO[keyValue]
  );
  return clonedUsagePerformanceSHISETSUNYUSHO;
};

/**
 * サービス提供状況が[-]時の全項目の初期化
 * @param report 実績データ
 * @param notFood 事業所設定(食事提供しているかどうか)
 */
export const normalizeServiceTypeNone = (
  report: ReportState[ReportType],
  notFood: boolean
): ReportState[ReportType] => {
  const usagePerformanceAfter = report.usagePerformance.after;
  Object.keys(usagePerformanceAfter).forEach((keyValue: string) => {
    // サービス提供状況を[-]に更新している場合のみ
    if (
      usagePerformanceAfter[keyValue].statusType !==
        report.usagePerformance.before[keyValue].statusType &&
      `${usagePerformanceAfter[keyValue].statusType}` === StatusType.NONE
    ) {
      report.usagePerformanceSHISETSUNYUSHO.after[
        keyValue
      ] = initializeUsagePerformanceSHISETSUNYUSHO(
        report.usagePerformanceSHISETSUNYUSHO.after[keyValue]
      );
    }
    // 事業所設定の食事提供がOFFの場合、食事提供を初期化する。
    if (notFood) {
      report.usagePerformanceSHISETSUNYUSHO.after[keyValue].foodBreakfast = 0;
      report.usagePerformanceSHISETSUNYUSHO.after[keyValue].foodLunch = 0;
      report.usagePerformanceSHISETSUNYUSHO.after[keyValue].foodSupper = 0;
    }
  });
  return report;
};

/**
 * 一括登録用のusagePerformanceSHISETSUNYUSHOの作成
 * @param usagePerformanceSHISETSUNYUSHO
 * @param usagePerformance
 */
const createUsagePerformanceSHISETSUNYUSHOParam = (
  usagePerformanceSHISETSUNYUSHO: ReportState[ReportType]["usagePerformanceSHISETSUNYUSHO"],
  usagePerformance: ReportState[ReportType]["usagePerformance"]
):
  | PostUsagePerformanceDailyParams["usage_performance_shisetsunyusho"]
  | PostUsagePerformanceMonthlyParams["usage_performance_shisetsunyusho"] => {
  const postUsagePerformanceSHISETSUNYUSHO:
    | PostUsagePerformanceDailyParams["usage_performance_shisetsunyusho"]
    | PostUsagePerformanceMonthlyParams["usage_performance_shisetsunyusho"] = [];
  Object.keys(usagePerformanceSHISETSUNYUSHO.before).forEach(
    (keyValue: string, index: number) => {
      // 初回登録時のみデフォルト値の考慮
      if (
        usagePerformance.before[keyValue].initialFlg &&
        `${usagePerformance.after[keyValue].statusType}` !== StatusType.NONE
      ) {
        usagePerformanceSHISETSUNYUSHO.before[keyValue].foodBreakfast = 0;
        usagePerformanceSHISETSUNYUSHO.before[keyValue].foodLunch = 0;
        usagePerformanceSHISETSUNYUSHO.before[keyValue].foodSupper = 0;
      }
      // サービス提供状況が【-】に更新しているかどうか
      const isInitializedUsagePerformance =
        usagePerformance.after[keyValue].statusType !==
          usagePerformance.before[keyValue].statusType &&
        `${usagePerformance.after[keyValue].statusType}` === StatusType.NONE;
      // 全体を見て違いがなければまたはサービス提供状況が【-】で更新していなければ処理をしない
      if (
        !deepEqual(
          usagePerformanceSHISETSUNYUSHO.before[keyValue],
          usagePerformanceSHISETSUNYUSHO.after[keyValue]
        ) ||
        isInitializedUsagePerformance
      ) {
        // サービス提供状況が【-】で更新している場合、差分更新せずに各項目の初期値に設定する
        const diffObject: Partial<UsagePerformanceSHISETSUNYUSHOType> = isInitializedUsagePerformance
          ? initializeUsagePerformanceSHISETSUNYUSHO(
              usagePerformanceSHISETSUNYUSHO.after[keyValue]
            )
          : removeNoChangeData<UsagePerformanceSHISETSUNYUSHOType>(
              usagePerformanceSHISETSUNYUSHO.before[keyValue],
              usagePerformanceSHISETSUNYUSHO.after[keyValue]
            );
        postUsagePerformanceSHISETSUNYUSHO.push(
          convertUsagePerformanceSHISETSUNYUSHO(
            usagePerformanceSHISETSUNYUSHO.before[keyValue],
            diffObject
          )
        );
      }
    }
  );
  return postUsagePerformanceSHISETSUNYUSHO;
};

/**
 * storeのusagePerformanceSHISETSUNYUSHOをpostのusagePerformanceSHISETSUNYUSHOに変換
 * @param usagePerformanceSHISETSUNYUSHO
 * @param diffUsagePerformance
 */
const convertUsagePerformanceSHISETSUNYUSHO = (
  usagePerformanceSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType,
  diffUsagePerformance: Partial<UsagePerformanceSHISETSUNYUSHOType>
):
  | PostUsagePerformanceSHISETSUNYUSHODailyParam
  | PostUsagePerformanceSHISETSUNYUSHOMonthlyParam => {
  const postUsagePerformance:
    | PostUsagePerformanceSHISETSUNYUSHODailyParam
    | PostUsagePerformanceSHISETSUNYUSHOMonthlyParam = {
    target_date: usagePerformanceSHISETSUNYUSHO.targetDate,
    users_in_facility_id: usagePerformanceSHISETSUNYUSHO.usersInFacilityId
  };
  Object.keys(usagePerformanceSHISETSUNYUSHOConvertParamList).forEach(
    (key: string) => {
      if (
        diffUsagePerformance[
          usagePerformanceSHISETSUNYUSHOConvertParamList[key].storeKey
        ] !== undefined
      ) {
        postUsagePerformance[
          usagePerformanceSHISETSUNYUSHOConvertParamList[key].paramKey
        ] =
          diffUsagePerformance[
            usagePerformanceSHISETSUNYUSHOConvertParamList[key].storeKey
          ];
      }
    }
  );
  return postUsagePerformance;
};

/**
 * 一括登録用のusagePerformanceの作成
 * @param usagePerformance storeのusagePerformance
 * @param postUsagePerformanceSHISETSUNYUSHO usagePerformanceSHISETSUNYUSHOのpostデータ
 */
const createUsagePerformanceParam = (
  usagePerformance: ReportState[ReportType]["usagePerformance"],
  postUsagePerformanceSHISETSUNYUSHO:
    | PostUsagePerformanceDailyParams["usage_performance_shisetsunyusho"]
    | PostUsagePerformanceMonthlyParams["usage_performance_shisetsunyusho"]
):
  | PostUsagePerformanceDailyParams["usage_performance"]
  | PostUsagePerformanceMonthlyParams["usage_performance"] => {
  const postUsagePerformance:
    | PostUsagePerformanceDailyParams["usage_performance"]
    | PostUsagePerformanceMonthlyParams["usage_performance"] = [];
  Object.keys(usagePerformance.before).forEach((keyValue: string) => {
    // 差分更新前に初回フラグをマージする。
    usagePerformance.before[keyValue].initialFlg =
      usagePerformance.after[keyValue].initialFlg;

    // 差分がないorPostUsagePerformanceが存在しないときは処理をしない
    if (
      !deepEqual(
        usagePerformance.before[keyValue],
        usagePerformance.after[keyValue]
      ) ||
      existPostUsagePerformance(
        usagePerformance.after[keyValue].targetDate,
        usagePerformance.after[keyValue].usersInFacilityId,
        postUsagePerformanceSHISETSUNYUSHO
      )
    ) {
      postUsagePerformance.push(
        convertUsagePerformanceParams(usagePerformance.after[keyValue])
      );
    }
  });
  return postUsagePerformance;
};

/**
 * 対象データ内に対象日と対象ユーザが合致するものがあればtrue,それ以外falseを返す
 * @param targetDate 対象日
 * @param uifId 対象ユーザId
 * @param postUsagePerformanceSHISETSUNYUSHOList 対象データ
 */
const existPostUsagePerformance = (
  targetDate: string,
  uifId: number,
  postUsagePerformanceSHISETSUNYUSHOList:
    | PostUsagePerformanceDailyParams["usage_performance_shisetsunyusho"]
    | PostUsagePerformanceMonthlyParams["usage_performance_shisetsunyusho"]
): boolean => {
  return postUsagePerformanceSHISETSUNYUSHOList
    ? postUsagePerformanceSHISETSUNYUSHOList.some(
        (
          postUsagePerformanceSHISETSUNYUSHO: Partial<
            | PostUsagePerformanceSHISETSUNYUSHODailyParam
            | PostUsagePerformanceSHISETSUNYUSHOMonthlyParam
          >
        ) => {
          return (
            postUsagePerformanceSHISETSUNYUSHO.users_in_facility_id === uifId &&
            postUsagePerformanceSHISETSUNYUSHO.target_date === targetDate
          );
        }
      )
    : false;
};

/**
 * storeのusagePerformanceをpostのusagePerformanceに変換
 * @param usagePerformance
 */
const convertUsagePerformanceParams = (
  usagePerformance: UsagePerformanceType
): PostUsagePerformanceDailyParam | PostUsagePerformanceMonthlyParam => {
  // 既存のsetUsagePerformanceが差分更新に対応していないため、1つでも差分が存在すれば全て送る。
  const postUsagePerformance:
    | PostUsagePerformanceDailyParam
    | PostUsagePerformanceMonthlyParam = {
    target_date: usagePerformance.targetDate,
    users_in_facility_id: usagePerformance.usersInFacilityId,
    status_type: usagePerformance.statusType,
    remarks: usagePerformance.remarks ? usagePerformance.remarks : null,
    // 以下の項目は入れないとAPIでエラーを起こすため設定する。
    daytime_support_type: null,
    get_home_support_type: null,
    hospitalization_support_type: null,
    life_support_flg: null,
    night_support_type: null,
    medical_support_type: null
  };
  return postUsagePerformance;
};

/**
 * UsagePerformanceの一項目更新
 * @param name 項目名
 * @param value 変更値
 * @param usagePerformance storeのusagePerformance
 */
const setUsagePerformance = (
  name: string,
  value: string | number,
  usagePerformance: UsagePerformanceType
): UsagePerformanceType => {
  // 登録すべきものがなかった場合return
  if (usagePerformance === undefined) {
    return usagePerformance;
  }
  const castedValue =
    typeof value === "number" ? value : castStringToNumber(value);
  usagePerformance[
    UsagePerformanceStoreParamKeyToSelectBoxName[name].storeKey
  ] = castedValue;
  // 実績入力時に初回フラグをfalseにする。
  usagePerformance.initialFlg = false;
  return usagePerformance;
};

/**
 * UsagePerformanceSHISETSUNYUSHOの一項目更新
 * @param name 項目名
 * @param value 変更値
 * @param usagePerformanceSHISETSUNYUSHO storeのusagePerformanceSHISETSUNYUSHO
 */
const setUsagePerformanceSHISETSUNYUSHO = (
  name: string,
  value: string | number,
  usagePerformanceSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType
): UsagePerformanceSHISETSUNYUSHOType => {
  // 登録すべきものがなかった場合return
  if (usagePerformanceSHISETSUNYUSHO === undefined) {
    return usagePerformanceSHISETSUNYUSHO;
  }
  const castedValue =
    typeof value === "number" ? value : castStringToNumber(value);
  usagePerformanceSHISETSUNYUSHO[
    UsagePerformanceSHISETSUNYUSHOStoreParamKeyToSelectBoxName[name].storeKey
  ] = castedValue;

  return usagePerformanceSHISETSUNYUSHO;
};

/**
 * usagePerformanceSHISETSUNYUSHOの初期化
 * @param usagePerformanceSHISETSUNYUSHO
 */
const initializeUsagePerformanceSHISETSUNYUSHO = (
  usagePerformanceSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType
): UsagePerformanceSHISETSUNYUSHOType => {
  return cloneDeep({
    ...usagePerformanceSHISETSUNYUSHO,
    hospitalizationOvernightStay: 0,
    regionalTransition: 0,
    oralTransition: 0,
    oralPreservation: 0,
    medicalFoods: 0,
    collectionOfUtilityFee: 0,
    foodBreakfast: 0,
    foodLunch: 0,
    foodSupper: 0,
    severeDisabilitySupport: 0,
    nutritionManagement: 0
  });
};

/**
 * 差分更新ロジック
 */
const removeNoChangeData = <T>(beforeObject: T, afterObject: T): Partial<T> => {
  const diffObject = {} as Partial<T>;
  Object.keys(beforeObject).forEach((key: string) => {
    if (isDiff(beforeObject[key], afterObject[key], key)) {
      diffObject[key] = afterObject[key];
    }
  });
  return diffObject;
};

/**
 * 差分チェック uif_id・targetDateは除く
 */
const isDiff = (
  before: string | number,
  after: string | number,
  key: string
) => {
  return before !== after;
};

/**
 * 値比較
 * @param value
 * @param targetValue
 */
const isNotUndefAndNotTargetValue = (
  targetValue: string | number,
  value?: string | number
): boolean => {
  return value !== undefined && value !== targetValue;
};

/**
 * ダイアログからの実績登録データの変換
 * @param report
 * @param reportSHISETSUNYUSHO
 * @param formValue
 * @param usersInFacilityState
 * @param facilityState
 * @param reportType
 */
export const normalizeSHISETSUNYUSHOReportDataToAPI = (
  report: UsagePerformanceType,
  reportSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType,
  formValue: InitialValues,
  usersInFacilityState: UsersInFacilityState,
  facilityState: FacilityState,
  reportType: ReportType
): {
  store: UsagePerformanceType;
  storeSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType;
  post: PostUsagePerformanceDailyParams | PostUsagePerformanceMonthlyParams;
} => {
  return normalizePostUsagePerformanceData(
    report,
    reportSHISETSUNYUSHO,
    formValue,
    usersInFacilityState,
    facilityState,
    reportType
  );
};

/**
 * 実績編集postデータ作成
 */
const normalizePostUsagePerformanceData = (
  report: UsagePerformanceType,
  reportSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType,
  formValue: InitialValues,
  usersInFacilityState: UsersInFacilityState,
  facilityState: FacilityState,
  reportType: ReportType
): {
  store: UsagePerformanceType;
  storeSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType;
  post: PostUsagePerformanceDailyParams | PostUsagePerformanceMonthlyParams;
} => {
  const userInFacilitySHISETSUNYUSHO = usersInFacilityState.user
    .user_in_facility_shisetsunyusho
    ? usersInFacilityState.user.user_in_facility_shisetsunyusho
    : {};
  // formikをstoreの値に変換
  const usagePerformanceFormValue: UsagePerformanceType = {
    ...report,
    statusType: Number(formValue.initial.statusType),
    remarks: formValue.initial.remarks,
    initialFlg: false
  };
  let usagePerformanceSHISETSUNYUSHOFormValue: UsagePerformanceSHISETSUNYUSHOType = {
    ...reportSHISETSUNYUSHO,
    hospitalizationOvernightStay: Number(
      formValue.initial.hospitalizationOvernightStay
    ),
    regionalTransition: formValue.initial.regionalTransitionFlg
      ? INT_TRUE_FROM_API
      : INT_FALSE_FROM_API,
    oralTransition: Number(formValue.initial.oralTransition),
    oralPreservation: Number(formValue.initial.oralPreservation),
    medicalFoods: formValue.initial.medicalFoodsFlg
      ? INT_TRUE_FROM_API
      : INT_FALSE_FROM_API,
    nutritionManagement: facilityState.nutritionManagementFlg
      ? formValue.initial.nutritionManagementFlg
        ? INT_TRUE_FROM_API
        : INT_FALSE_FROM_API
      : INT_FALSE_FROM_API,
    collectionOfUtilityFee: formValue.initial.collectionOfUtilityFeeFlg
      ? INT_TRUE_FROM_API
      : INT_FALSE_FROM_API,
    foodBreakfast: facilityState.availableFood
      ? formValue.initial.foodBreakfastFlg
        ? INT_TRUE_FROM_API
        : INT_FALSE_FROM_API
      : INT_FALSE_FROM_API,
    foodLunch: facilityState.availableFood
      ? formValue.initial.foodLunchFlg
        ? INT_TRUE_FROM_API
        : INT_FALSE_FROM_API
      : INT_FALSE_FROM_API,
    foodSupper: facilityState.availableFood
      ? formValue.initial.foodSupperFlg
        ? INT_TRUE_FROM_API
        : INT_FALSE_FROM_API
      : INT_FALSE_FROM_API,
    severeDisabilitySupport:
      userInFacilitySHISETSUNYUSHO.severe_disability_support ===
      INT_TRUE_FROM_API
        ? formValue.initial.severeDisabilitySupportFlg
          ? INT_TRUE_FROM_API
          : INT_FALSE_FROM_API
        : INT_FALSE_FROM_API
  };

  // disabledの項目を初期化する処理
  let diffUsagePerformanceSHISETSUNYUSHO: Partial<UsagePerformanceSHISETSUNYUSHOType> = usagePerformanceSHISETSUNYUSHOFormValue;
  if (
    `${usagePerformanceFormValue.statusType}` === StatusType.NONE.toString()
  ) {
    usagePerformanceSHISETSUNYUSHOFormValue = initializeUsagePerformanceSHISETSUNYUSHO(
      usagePerformanceSHISETSUNYUSHOFormValue
    );
    diffUsagePerformanceSHISETSUNYUSHO = usagePerformanceSHISETSUNYUSHOFormValue;
  } else {
    // 初回登録時のみデフォルト値の考慮
    if (report.initialFlg) {
      reportSHISETSUNYUSHO.foodBreakfast = 0;
      reportSHISETSUNYUSHO.foodLunch = 0;
      reportSHISETSUNYUSHO.foodSupper = 0;
    }
    // 差分抽出
    diffUsagePerformanceSHISETSUNYUSHO = removeNoChangeData(
      reportSHISETSUNYUSHO,
      usagePerformanceSHISETSUNYUSHOFormValue
    );
  }

  const postUsagePerformanceSHISETSUNYUSHO = [];
  // 差分チェック
  if (!isEmpty(diffUsagePerformanceSHISETSUNYUSHO)) {
    const convertedUsagePerformanceSHISETSUNYUSHO = convertUsagePerformanceSHISETSUNYUSHO(
      reportSHISETSUNYUSHO,
      diffUsagePerformanceSHISETSUNYUSHO
    );

    // 経口経過と経口維持が対象外(0)以外の時に療養食を0にする。
    if (
      isNotUndefAndNotTargetValue(
        0,
        convertedUsagePerformanceSHISETSUNYUSHO.oral_preservation
      ) ||
      isNotUndefAndNotTargetValue(
        0,
        convertedUsagePerformanceSHISETSUNYUSHO.oral_transition_flg
      )
    ) {
      convertedUsagePerformanceSHISETSUNYUSHO.medical_foods_flg = 0;
      usagePerformanceSHISETSUNYUSHOFormValue.medicalFoods = 0;
    }
    // 療養食が0以外の時に経口経過と経口維持が対象外(0)にする
    if (
      isNotUndefAndNotTargetValue(
        0,
        convertedUsagePerformanceSHISETSUNYUSHO.medical_foods_flg
      )
    ) {
      convertedUsagePerformanceSHISETSUNYUSHO.oral_preservation = 0;
      usagePerformanceSHISETSUNYUSHOFormValue.oralPreservation = 0;
      convertedUsagePerformanceSHISETSUNYUSHO.oral_transition_flg = 0;
      usagePerformanceSHISETSUNYUSHOFormValue.oralTransition = 0;
    }

    postUsagePerformanceSHISETSUNYUSHO.push(
      convertedUsagePerformanceSHISETSUNYUSHO
    );
  }

  const postUsagePerformance = [];
  // 差分チェック
  if (
    !deepEqual(report, usagePerformanceFormValue) ||
    postUsagePerformanceSHISETSUNYUSHO.length !== 0
  ) {
    postUsagePerformance.push(
      convertUsagePerformanceParams(usagePerformanceFormValue)
    );
  }
  const postValue =
    reportType === REPEAT_DAILY
      ? {
          usage_performance_daily: {},
          usage_performance: postUsagePerformance,
          usage_performance_shisetsunyusho: postUsagePerformanceSHISETSUNYUSHO
        }
      : {
          usage_performance: postUsagePerformance,
          usage_performance_shisetsunyusho: postUsagePerformanceSHISETSUNYUSHO
        };
  return {
    store: usagePerformanceFormValue,
    storeSHISETSUNYUSHO: usagePerformanceSHISETSUNYUSHOFormValue,
    post: postValue
  };
};

/**
 * boolean(CheckBox) cast number
 * @param value
 */
const castCheckBoxToNumber = (value: boolean): number => {
  return value ? Number(Checkbox.ON) : Number(Checkbox.OFF);
};

/**
 * number cast CheckBox(boolean)
 * @param value
 */
const castNumberToCheckBox = (value: number | string): boolean => {
  return `${value}` === Checkbox.ON;
};

/**
 * string cast number
 * @param value
 */
const castStringToNumber = (value: string): number => {
  if (isEmpty(value) || isNaN(Number(value))) {
    return 0;
  }
  return Number(value);
};

/**
 * null or Undefined時に初期値(0)に変換する
 * @param value
 */
const castNullOrUndefinedToNumber = (value?: number | null): number => {
  if (value === null || value === undefined) {
    return 0;
  }
  return value;
};
// usagePerformanceSHISETSUNYUSHO store to postParam list
const usagePerformanceSHISETSUNYUSHOConvertParamList = {
  hospitalizationOvernightStay: {
    storeKey: "hospitalizationOvernightStay",
    paramKey: "hospitalization_overnightstay"
  },
  regionalTransition: {
    storeKey: "regionalTransition",
    paramKey: "regional_transition_flg"
  },
  oralTransition: {
    storeKey: "oralTransition",
    paramKey: "oral_transition_flg"
  },
  oralPreservation: {
    storeKey: "oralPreservation",
    paramKey: "oral_preservation"
  },
  medicalFoods: {
    storeKey: "medicalFoods",
    paramKey: "medical_foods_flg"
  },
  nutritionManagement: {
    storeKey: "nutritionManagement",
    paramKey: "nutrition_management_flg"
  },
  collectionOfUtilityFee: {
    storeKey: "collectionOfUtilityFee",
    paramKey: "collection_of_utility_fee_flg"
  },
  foodBreakfast: {
    storeKey: "foodBreakfast",
    paramKey: "food_breakfast_flg"
  },
  foodLunch: {
    storeKey: "foodLunch",
    paramKey: "food_lunch_flg"
  },
  foodSupper: {
    storeKey: "foodSupper",
    paramKey: "food_supper_flg"
  },
  severeDisabilitySupport: {
    storeKey: "severeDisabilitySupport",
    paramKey: "severe_disability_support_flg"
  }
};
