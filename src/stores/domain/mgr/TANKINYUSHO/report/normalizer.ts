import {
  ReportState,
  UsagePerformanceDailyType,
  UsagePerformanceType,
  UsagePerformanceTANKINYUSHOType,
  ReportType,
  REPEAT_DAILY
} from "./types";

import { dateInHyphenYYYYMMDDFormat } from "@utils/date";
import {
  GetUsagePerformanceDailyParams,
  GetUsagePerformanceParamsDaily
} from "@api/requests/usagePerformance/getUsagePerformanceDaily";
import {
  GetUsagePerformanceMonthlyParams,
  GetUsagePerformanceParamsMonthly
} from "@api/requests/usagePerformance/getUsagePerformanceMonthly";
import {
  Checkbox,
  INT_FALSE_FROM_API,
  INT_TRUE_FROM_API
} from "@constants/variables";
import cloneDeep from "lodash-es/cloneDeep";
import isEmpty from "lodash-es/isEmpty";
import {
  UsagePerformanceTANKINYUSHOStoreParamKeyToSelectBoxName,
  UsagePerformanceStoreParamKeyToSelectBoxName,
  StatusType,
  PickupPremiseList
} from "@constants/mgr/TANKINYUSHO/variables";
import {
  PostUsagePerformanceTANKINYUSHODailyParam,
  PostUsagePerformanceDailyParam,
  PostUsagePerformanceDailyParams
} from "@api/requests/usagePerformance/postUsagePerformanceDaily";
import deepEqual from "fast-deep-equal";
import {
  PostUsagePerformanceMonthlyParams,
  PostUsagePerformanceTANKINYUSHOMonthlyParam,
  PostUsagePerformanceMonthlyParam
} from "@api/requests/usagePerformance/postUsagePerformanceMonthly";
import { InitialValues } from "@interfaces/mgr/TANKINYUSHO/report/initial";
import { UsersInFacilityState } from "@stores/domain/mgr/TANKINYUSHO/userInFacility/types";

/**
 * 実績(日ごと)のstore変換
 * @param result APIデータ
 * @param targetDate 取得日付
 */
export const normalizeTANKINYUSHOReportDataDailyFromAPI = (
  result: GetUsagePerformanceDailyParams,
  targetDate?: Date
): ReportState["reportDaily"] => {
  const formatedDate = !targetDate
    ? ""
    : dateInHyphenYYYYMMDDFormat(targetDate);

  const normalized: ReportState["reportDaily"] = {
    usagePerformanceDaily: normalizeGetUsagePerformanceDaily(
      formatedDate,
      result.data.usage_performance_daily
    ),
    usagePerformance: normalizeGetUsagePerformance(
      result.data.usage_performance
    ),
    usagePerformanceTANKINYUSHO: normalizeGetUsagePerformanceTANKINYUSHODaily(
      result.data.usage_performance_tankinyusho
    )
  };
  return normalized;
};

/**
 * 実績(月ごと)のstore変換
 * @param result APIデータ
 */
export const normalizeTANKINYUSHOReportDataMonthlyFromAPI = (
  result: GetUsagePerformanceMonthlyParams
): ReportState["reportMonthly"] => {
  const normalized: ReportState["reportMonthly"] = {
    usagePerformance: normalizeGetUsagePerformanceMonthly(
      result.data.usage_performance
    ),
    usagePerformanceTANKINYUSHO: normalizeGetUsagePerformanceTANKINYUSHOMonthly(
      result.data.usage_performance_tankinyusho
    )
  };
  return normalized;
};

export const normalizeTANKINYUSHOReportDataToAPI = (
  report: UsagePerformanceType,
  reportTANKINYUSHO: UsagePerformanceTANKINYUSHOType,
  formValue: InitialValues,
  usersInFacilityState: UsersInFacilityState,
  reportType: ReportType
): {
  store: UsagePerformanceType;
  storeTANKINYUSHO: UsagePerformanceTANKINYUSHOType;
  post: PostUsagePerformanceDailyParams;
} => {
  return normalizePostUsagePerformanceData(
    report,
    reportTANKINYUSHO,
    formValue,
    usersInFacilityState,
    reportType
  );
};

/**
 * 実績編集postデータ作成
 */
const normalizePostUsagePerformanceData = (
  report: UsagePerformanceType,
  reportTANKINYUSHO: UsagePerformanceTANKINYUSHOType,
  formValue: InitialValues,
  usersInFacilityState: UsersInFacilityState,
  reportType: ReportType
): {
  store: UsagePerformanceType;
  storeTANKINYUSHO: UsagePerformanceTANKINYUSHOType;
  post: PostUsagePerformanceDailyParams;
} => {
  const userInFacilityTANKINYUSHO = usersInFacilityState.user
    .user_in_facility_tankinyusho
    ? usersInFacilityState.user.user_in_facility_tankinyusho
    : {};
  // formikをstoreの値に変換
  let usagePerformanceFormValue: UsagePerformanceType = {
    ...report,
    statusType: formValue.initial.statusType
      ? Number(StatusType.IMPLEMENTATION)
      : INT_FALSE_FROM_API,
    medicalSupportType: formValue.initial.medicalSupportType
      ? Number(formValue.initial.medicalSupportType)
      : null,
    remarks: formValue.initial.remarks
  };
  let usagePerformanceTANKINYUSHOFormValue: UsagePerformanceTANKINYUSHOType = {
    ...reportTANKINYUSHO,
    otherSupport: formValue.initial.otherSupportFlg
      ? INT_TRUE_FROM_API
      : INT_FALSE_FROM_API,
    pickup: Number(formValue.initial.pickup),
    pickupPremises: Number(formValue.initial.pickupPremises),
    food: Number(formValue.initial.food),
    emergencyShortterm: formValue.initial.emergencyShorttermFlg
      ? INT_TRUE_FROM_API
      : INT_FALSE_FROM_API,
    overHours: formValue.initial.overHoursFlg
      ? INT_TRUE_FROM_API
      : INT_FALSE_FROM_API,
    capacityOverrunException: Number(
      formValue.initial.capacityOverrunException
    ),
    sputumImplementation: formValue.initial.sputumImplementationFlg
      ? INT_TRUE_FROM_API
      : INT_FALSE_FROM_API,
    severeDisabilitySupport:
      userInFacilityTANKINYUSHO.severe_disability_support === INT_TRUE_FROM_API
        ? formValue.initial.severeDisabilitySupportFlg
          ? INT_TRUE_FROM_API
          : INT_FALSE_FROM_API
        : INT_FALSE_FROM_API
  };

  // disabledの項目を初期化する処理
  let diffUsagePerformanceTANKINYUSHO: Partial<
    UsagePerformanceTANKINYUSHOType
  > = usagePerformanceTANKINYUSHOFormValue;
  if (`${usagePerformanceFormValue.statusType}` === StatusType.NONE) {
    usagePerformanceFormValue = initializeUsagePerformance(
      usagePerformanceFormValue
    );
    usagePerformanceTANKINYUSHOFormValue = initializeUsagePerformanceTANKINYUSHO(
      usagePerformanceTANKINYUSHOFormValue
    );
    diffUsagePerformanceTANKINYUSHO = usagePerformanceTANKINYUSHOFormValue;
  } else {
    diffUsagePerformanceTANKINYUSHO = removeNoChangeData(
      reportTANKINYUSHO,
      usagePerformanceTANKINYUSHOFormValue
    );
  }

  const postUsagePerformance =
    reportType === REPEAT_DAILY
      ? convertUsagePerformanceParamDaily(usagePerformanceFormValue)
      : convertUsagePerformanceParamMonthly(usagePerformanceFormValue);
  const postUsagePerformanceTANKINYUSHO =
    reportType === REPEAT_DAILY
      ? convertUsagePerformanceTANKINYUSHODaily(
          reportTANKINYUSHO,
          diffUsagePerformanceTANKINYUSHO
        )
      : convertUsagePerformanceTANKINYUSHOMonthly(
          reportTANKINYUSHO,
          diffUsagePerformanceTANKINYUSHO
        );

  // disabledの項目を初期化する処理
  if (postUsagePerformanceTANKINYUSHO.pickup === 0) {
    postUsagePerformanceTANKINYUSHO.pickup_premises_flg = 0;
    usagePerformanceTANKINYUSHOFormValue.pickupPremises = 0;
  }
  if (postUsagePerformance.medical_support_type !== 4) {
    postUsagePerformanceTANKINYUSHO.sputum_implementation_flg = 0;
    usagePerformanceTANKINYUSHOFormValue.sputumImplementation = 0;
  }
  // 特殊項目の差分
  if (postUsagePerformanceTANKINYUSHO.sputum_implementation_flg !== undefined) {
    postUsagePerformance.medical_support_type =
      usagePerformanceFormValue.medicalSupportType;
  }

  return {
    store: usagePerformanceFormValue,
    storeTANKINYUSHO: usagePerformanceTANKINYUSHOFormValue,
    post: {
      usage_performance_daily: {},
      usage_performance: [postUsagePerformance],
      usage_performance_tankinyusho: [postUsagePerformanceTANKINYUSHO]
    }
  };
};

/**
 * APIから施設利用者全体の実績記録オブジェクトの変換
 * @param targetDate 対象日付
 * @param usagePerformanceDaily  施設利用者全体の実績記録オブジェクト(APIデータ)
 */
const normalizeGetUsagePerformanceDaily = (
  targetDate: string,
  usagePerformanceDaily: GetUsagePerformanceDailyParams["data"]["usage_performance_daily"]
): ReportState["reportDaily"]["usagePerformanceDaily"] => {
  return {
    before: {
      id: usagePerformanceDaily ? usagePerformanceDaily.id : undefined,
      targetDate: targetDate ? targetDate : undefined,
      bodyRestraintAbolitionUnexecutedFlg: usagePerformanceDaily
        ? castNumberToCheckBox(
            usagePerformanceDaily.body_restraint_abolition_unexecuted_flg
          )
        : undefined
    },
    after: {
      id: usagePerformanceDaily ? usagePerformanceDaily.id : undefined,
      targetDate: targetDate ? targetDate : undefined,
      bodyRestraintAbolitionUnexecutedFlg: usagePerformanceDaily
        ? castNumberToCheckBox(
            usagePerformanceDaily.body_restraint_abolition_unexecuted_flg
          )
        : undefined
    }
  };
};

/**
 * APIから施設利用者の実績記録オブジェクト配列の変換(日ごと)
 * @param getUsagePerformanceList	施設利用者の実績記録オブジェクト配列
 */
const normalizeGetUsagePerformance = (
  getUsagePerformanceList: GetUsagePerformanceDailyParams["data"]["usage_performance"]
): ReportState["reportDaily"]["usagePerformance"] => {
  const storeUsagePerformance: ReportState["reportDaily"]["usagePerformance"]["before"] = {};
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
        medicalSupportType: getUsagePerformance.medical_support_type,
        remarks: getUsagePerformance.remarks,
        isHoliday: getUsagePerformance.is_holiday,
        isServiceEnd: getUsagePerformance.is_service_end
      };
    }
  );

  return {
    before: cloneDeep(storeUsagePerformance),
    after: cloneDeep(storeUsagePerformance)
  };
};

/**
 * APIから施設利用者の実績記録オブジェクト配列の変換(月ごと)
 * @param getUsagePerformanceList	施設利用者の実績記録オブジェクト配列
 */
const normalizeGetUsagePerformanceMonthly = (
  getUsagePerformanceList: GetUsagePerformanceMonthlyParams["data"]["usage_performance"]
): ReportState["reportMonthly"]["usagePerformance"] => {
  const storeUsagePerformance: ReportState["reportMonthly"]["usagePerformance"]["before"] = {};
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
        medicalSupportType: getUsagePerformance.medical_support_type,
        remarks: getUsagePerformance.remarks,
        isHoliday: getUsagePerformance.is_holiday,
        isServiceEnd: getUsagePerformance.is_service_end
      };
    }
  );

  return {
    before: cloneDeep(storeUsagePerformance),
    after: cloneDeep(storeUsagePerformance)
  };
};

/**
 * APIから施設利用者の実績記録（短期入所）オブジェクト配列の変換(日ごと)
 * objectのkeyは【(user_in_facility_id)-(target_date)】
 * @param getUsagePerformanceTANKINYUSHOList	施設利用者の実績記録（短期入所）オブジェクト
 */
const normalizeGetUsagePerformanceTANKINYUSHODaily = (
  getUsagePerformanceTANKINYUSHOList: GetUsagePerformanceDailyParams["data"]["usage_performance_tankinyusho"]
): ReportState["reportDaily"]["usagePerformanceTANKINYUSHO"] => {
  const storeUsagePerformanceTANKINYUSHO: ReportState["reportDaily"]["usagePerformanceTANKINYUSHO"]["before"] = {};
  // getAPIのパラメータを連想配列に変換
  if (getUsagePerformanceTANKINYUSHOList) {
    getUsagePerformanceTANKINYUSHOList.forEach(
      getUsagePerformanceTANKINYUSHO => {
        storeUsagePerformanceTANKINYUSHO[
          `${getUsagePerformanceTANKINYUSHO.users_in_facility_id}_${getUsagePerformanceTANKINYUSHO.target_date}`
        ] = {
          id: getUsagePerformanceTANKINYUSHO.id,
          usersInFacilityId:
            getUsagePerformanceTANKINYUSHO.users_in_facility_id,
          targetDate: getUsagePerformanceTANKINYUSHO.target_date,
          otherSupport: getUsagePerformanceTANKINYUSHO.other_support_flg,
          pickup: getUsagePerformanceTANKINYUSHO.pickup,
          pickupPremises: getUsagePerformanceTANKINYUSHO.pickup_premises_flg,
          food: getUsagePerformanceTANKINYUSHO.food,
          emergencyShortterm:
            getUsagePerformanceTANKINYUSHO.emergency_shortterm_flg,
          overHours: getUsagePerformanceTANKINYUSHO.over_hours_flg,
          capacityOverrunException:
            getUsagePerformanceTANKINYUSHO.capacity_overrun_exception,
          sputumImplementation:
            getUsagePerformanceTANKINYUSHO.sputum_implementation_flg,
          severeDisabilitySupport:
            getUsagePerformanceTANKINYUSHO.severe_disability_support_flg
        };
      }
    );
  }
  return {
    before: cloneDeep(storeUsagePerformanceTANKINYUSHO),
    after: cloneDeep(storeUsagePerformanceTANKINYUSHO)
  };
};

/**
 * APIから施設利用者の実績記録（短期入所）オブジェクト配列の変換(月ごと)
 * objectのkeyは【(user_in_facility_id)-(target_date)】
 * @param getUsagePerformanceTANKINYUSHOList	施設利用者の実績記録（短期入所）オブジェクト
 */
const normalizeGetUsagePerformanceTANKINYUSHOMonthly = (
  getUsagePerformanceTANKINYUSHOList: GetUsagePerformanceMonthlyParams["data"]["usage_performance_tankinyusho"]
): ReportState["reportMonthly"]["usagePerformanceTANKINYUSHO"] => {
  const storeUsagePerformanceTANKINYUSHO: ReportState["reportMonthly"]["usagePerformanceTANKINYUSHO"]["before"] = {};
  // getAPIのパラメータを連想配列に変換
  if (getUsagePerformanceTANKINYUSHOList) {
    getUsagePerformanceTANKINYUSHOList.forEach(
      getUsagePerformanceTANKINYUSHO => {
        storeUsagePerformanceTANKINYUSHO[
          `${getUsagePerformanceTANKINYUSHO.users_in_facility_id}_${getUsagePerformanceTANKINYUSHO.target_date}`
        ] = {
          id: getUsagePerformanceTANKINYUSHO.id,
          usersInFacilityId:
            getUsagePerformanceTANKINYUSHO.users_in_facility_id,
          targetDate: getUsagePerformanceTANKINYUSHO.target_date,
          otherSupport: getUsagePerformanceTANKINYUSHO.other_support_flg,
          pickup: getUsagePerformanceTANKINYUSHO.pickup,
          pickupPremises: getUsagePerformanceTANKINYUSHO.pickup_premises_flg,
          food: getUsagePerformanceTANKINYUSHO.food,
          emergencyShortterm:
            getUsagePerformanceTANKINYUSHO.emergency_shortterm_flg,
          overHours: getUsagePerformanceTANKINYUSHO.over_hours_flg,
          capacityOverrunException:
            getUsagePerformanceTANKINYUSHO.capacity_overrun_exception,
          sputumImplementation:
            getUsagePerformanceTANKINYUSHO.sputum_implementation_flg,
          severeDisabilitySupport:
            getUsagePerformanceTANKINYUSHO.severe_disability_support_flg
        };
      }
    );
  }
  return {
    before: cloneDeep(storeUsagePerformanceTANKINYUSHO),
    after: cloneDeep(storeUsagePerformanceTANKINYUSHO)
  };
};

/**
 * 一項目更新後のUsagePerformanceの取得(日ごと)
 * @param name 項目の名前
 * @param value 更新後の値
 * @param keyValue 更新したいusagePerformanceのkey値
 * @param usagePerformance storeのusagePerformance
 */
export const getSetUsagePerformanceItemsDaily = (
  name: string,
  value: string | number,
  keyValue: string,
  usagePerformance: ReportState["reportDaily"]["usagePerformance"]["after"]
): ReportState["reportDaily"]["usagePerformance"]["after"] => {
  const clonedUsagePerformance = cloneDeep(usagePerformance);
  clonedUsagePerformance[keyValue] = setUsagePerformance(
    name,
    value,
    clonedUsagePerformance[keyValue]
  );
  return clonedUsagePerformance;
};

/**
 * 一項目更新後のUsagePerformanceの取得(月ごと)
 * @param name 項目の名前
 * @param value 更新後の値
 * @param keyValue 更新したいusagePerformanceのkey値
 * @param usagePerformance storeのusagePerformance
 */
export const getSetUsagePerformanceItemsMonthly = (
  name: string,
  value: string | number,
  keyValue: string,
  usagePerformance: ReportState["reportMonthly"]["usagePerformance"]["after"]
): ReportState["reportMonthly"]["usagePerformance"]["after"] => {
  const clonedUsagePerformance = cloneDeep(usagePerformance);
  clonedUsagePerformance[keyValue] = setUsagePerformance(
    name,
    value,
    clonedUsagePerformance[keyValue]
  );
  return clonedUsagePerformance;
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
  return usagePerformance;
};

/**
 * 一項目更新後のUsagePerformanceTANKINYUSHOの取得(日ごと)
 * @param name 項目の名前
 * @param value 更新後の値
 * @param keyValue 更新したいusagePerformanceTANKINYUSHOのkey値
 * @param usagePerformanceTANKINYUSHO storeのusagePerformanceTANKINYUSHO
 */
export const getSetUsagePerformanceTANKINYUSHOItemsDaily = (
  name: string,
  value: string | number,
  keyValue: string,
  usagePerformanceTANKINYUSHO: ReportState["reportDaily"]["usagePerformanceTANKINYUSHO"]["after"]
): ReportState["reportDaily"]["usagePerformanceTANKINYUSHO"]["after"] => {
  const clonedUsagePerformanceTANKINYUSHO = cloneDeep(
    usagePerformanceTANKINYUSHO
  );
  clonedUsagePerformanceTANKINYUSHO[keyValue] = setUsagePerformanceTANKINYUSHO(
    name,
    value,
    clonedUsagePerformanceTANKINYUSHO[keyValue]
  );
  return clonedUsagePerformanceTANKINYUSHO;
};

/**
 * 一項目更新後のUsagePerformanceTANKINYUSHOの取得(月ごと)
 * @param name 項目の名前
 * @param value 更新後の値
 * @param keyValue 更新したいusagePerformanceTANKINYUSHOのkey値
 * @param usagePerformanceTANKINYUSHO storeのusagePerformanceTANKINYUSHO
 */
export const getSetUsagePerformanceTANKINYUSHOItemsMonthly = (
  name: string,
  value: string | number,
  keyValue: string,
  usagePerformanceTANKINYUSHO: ReportState["reportMonthly"]["usagePerformanceTANKINYUSHO"]["after"]
): ReportState["reportMonthly"]["usagePerformanceTANKINYUSHO"]["after"] => {
  const clonedUsagePerformanceTANKINYUSHO = cloneDeep(
    usagePerformanceTANKINYUSHO
  );
  clonedUsagePerformanceTANKINYUSHO[keyValue] = setUsagePerformanceTANKINYUSHO(
    name,
    value,
    clonedUsagePerformanceTANKINYUSHO[keyValue]
  );
  return clonedUsagePerformanceTANKINYUSHO;
};

/**
 * UsagePerformanceTANKINYUSHOの一項目更新
 * @param name 項目名
 * @param value 変更値
 * @param usagePerformanceTANKINYUSHO storeのusagePerformanceTANKINYUSHO
 */
const setUsagePerformanceTANKINYUSHO = (
  name: string,
  value: string | number,
  usagePerformanceTANKINYUSHO: UsagePerformanceTANKINYUSHOType
): UsagePerformanceTANKINYUSHOType => {
  // 登録すべきものがなかった場合return
  if (usagePerformanceTANKINYUSHO === undefined) {
    return usagePerformanceTANKINYUSHO;
  }
  const castedValue =
    typeof value === "number" ? value : castStringToNumber(value);
  usagePerformanceTANKINYUSHO[
    UsagePerformanceTANKINYUSHOStoreParamKeyToSelectBoxName[name].storeKey
  ] = castedValue;
  const picupPremise = "pickupPremise";
  if (name === "pickup") {
    usagePerformanceTANKINYUSHO[
      UsagePerformanceTANKINYUSHOStoreParamKeyToSelectBoxName[
        picupPremise
      ].storeKey
    ] = Number(PickupPremiseList.NONE);
  }
  return usagePerformanceTANKINYUSHO;
};

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
    usage_performance_tankinyusho: createUsagePerformanceTANKINYUSHOParamDaily(
      reportDaily.usagePerformanceTANKINYUSHO,
      reportDaily.usagePerformance
    )
  };
  postData.usage_performance = createUsagePerformanceParamDaily(
    reportDaily.usagePerformance,
    postData.usage_performance_tankinyusho
  );
  return postData;
};

/**
 * usagePerformanceのPOSTデータ作成(差分更新)(月ごと)
 * @param reportMonthly
 */
export const normalizePostUsagePerformanceParamMonthly = (
  reportMonthly: ReportState["reportMonthly"]
): PostUsagePerformanceMonthlyParams => {
  const postData: PostUsagePerformanceMonthlyParams = {
    usage_performance: [],
    usage_performance_tankinyusho: createUsagePerformanceTANKINYUSHOParamMonthly(
      reportMonthly.usagePerformanceTANKINYUSHO,
      reportMonthly.usagePerformance
    )
  };
  postData.usage_performance = createUsagePerformanceParamMonthly(
    reportMonthly.usagePerformance,
    postData.usage_performance_tankinyusho
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
 * 一括登録用のusagePerformanceの作成(日ごと)
 * @param usagePerformance storeのusagePerformance
 * @param postUsagePerformanceTANKINYUSHO post用のusage_performance_tankinyusho
 */
const createUsagePerformanceParamDaily = (
  usagePerformance: ReportState["reportDaily"]["usagePerformance"],
  postUsagePerformanceTANKINYUSHO: PostUsagePerformanceDailyParams["usage_performance_tankinyusho"]
): PostUsagePerformanceDailyParams["usage_performance"] => {
  const postUsagePerformance: PostUsagePerformanceDailyParams["usage_performance"] = [];
  Object.keys(usagePerformance.before).forEach((keyValue: string) => {
    // 差分がないorUsagePerformanceTANKINYUSHO[uifId]が存在しなければ処理をしない
    if (
      !deepEqual(
        usagePerformance.before[keyValue],
        usagePerformance.after[keyValue]
      ) ||
      existPostUsagePerformanceDaily(
        usagePerformance.after[keyValue].targetDate,
        usagePerformance.after[keyValue].usersInFacilityId,
        postUsagePerformanceTANKINYUSHO
      )
    ) {
      postUsagePerformance.push(
        convertUsagePerformanceParamDaily(usagePerformance.after[keyValue])
      );
    }
  });
  return postUsagePerformance;
};

/**
 * 対象データ内に対象日と対象ユーザが合致するものがあればtrue,それ以外falseを返す(日ごと)
 * @param targetDate 対象日
 * @param uifId 対象ユーザId
 * @param postUsagePerformanceTANKINYUSHOList 対象データ
 */
const existPostUsagePerformanceDaily = (
  targetDate: string,
  uifId: number,
  postUsagePerformanceTANKINYUSHOList: PostUsagePerformanceDailyParams["usage_performance_tankinyusho"]
): boolean => {
  return postUsagePerformanceTANKINYUSHOList
    ? postUsagePerformanceTANKINYUSHOList.some(
        (
          postUsagePerformanceTANKINYUSHO: Partial<
            PostUsagePerformanceTANKINYUSHODailyParam
          >
        ) => {
          return (
            postUsagePerformanceTANKINYUSHO.users_in_facility_id === uifId &&
            postUsagePerformanceTANKINYUSHO.target_date === targetDate
          );
        }
      )
    : false;
};

/**
 * storeのusagePerformanceをpostのusagePerformanceに変換(日ごと)
 * @param usagePerformance
 */
const convertUsagePerformanceParamDaily = (
  usagePerformance: UsagePerformanceType
): PostUsagePerformanceDailyParam => {
  // 既存のsetUsagePerformanceが差分更新に対応していないため、1つでも差分が存在すれば全て送る。
  const postUsagePerformance: PostUsagePerformanceDailyParam = {
    target_date: usagePerformance.targetDate,
    users_in_facility_id: usagePerformance.usersInFacilityId,
    status_type: usagePerformance.statusType,
    medical_support_type: usagePerformance.medicalSupportType,
    remarks: usagePerformance.remarks ? usagePerformance.remarks : null,
    // 以下の項目は入れないとAPIでエラーを起こすため設定する。
    daytime_support_type: null,
    get_home_support_type: null,
    hospitalization_support_type: null,
    life_support_flg: null,
    night_support_type: null
  };
  return postUsagePerformance;
};

/**
 * 一括登録用のusagePerformanceの作成(月ごと)
 * @param usagePerformance storeのusagePerformance
 * @param postUsagePerformanceTANKINYUSHO post用のusage_performance_tankinyusho
 */
const createUsagePerformanceParamMonthly = (
  usagePerformance: ReportState["reportMonthly"]["usagePerformance"],
  postUsagePerformanceTANKINYUSHO: PostUsagePerformanceMonthlyParams["usage_performance_tankinyusho"]
): PostUsagePerformanceMonthlyParams["usage_performance"] => {
  const postUsagePerformance: PostUsagePerformanceMonthlyParams["usage_performance"] = [];
  Object.keys(usagePerformance.before).forEach((keyValue: string) => {
    // 差分がないorUsagePerformanceTANKINYUSHO[uifId]が存在しなければ処理をしない
    if (
      !deepEqual(
        usagePerformance.before[keyValue],
        usagePerformance.after[keyValue]
      ) ||
      existPostUsagePerformanceMonthly(
        usagePerformance.after[keyValue].targetDate,
        usagePerformance.after[keyValue].usersInFacilityId,
        postUsagePerformanceTANKINYUSHO
      )
    ) {
      postUsagePerformance.push(
        convertUsagePerformanceParamMonthly(usagePerformance.after[keyValue])
      );
    }
  });
  return postUsagePerformance;
};

/**
 * 対象データ内に対象日と対象ユーザが合致するものがあればtrue,それ以外falseを返す(月ごと)
 * @param targetDate 対象日
 * @param uifId 対象ユーザId
 * @param postUsagePerformanceTANKINYUSHOList 対象データ
 */
const existPostUsagePerformanceMonthly = (
  targetDate: string,
  uifId: number,
  postUsagePerformanceTANKINYUSHOList: PostUsagePerformanceMonthlyParams["usage_performance_tankinyusho"]
): boolean => {
  return postUsagePerformanceTANKINYUSHOList
    ? postUsagePerformanceTANKINYUSHOList.some(
        (
          postUsagePerformanceTANKINYUSHO: Partial<
            PostUsagePerformanceTANKINYUSHODailyParam
          >
        ) => {
          return (
            postUsagePerformanceTANKINYUSHO.users_in_facility_id === uifId &&
            postUsagePerformanceTANKINYUSHO.target_date === targetDate
          );
        }
      )
    : false;
};

/**
 * storeのusagePerformanceをpostのusagePerformanceに変換(月ごと)
 * @param usagePerformance
 */
const convertUsagePerformanceParamMonthly = (
  usagePerformance: UsagePerformanceType
): PostUsagePerformanceMonthlyParam => {
  // 既存のsetUsagePerformanceが差分更新に対応していないため、1つでも差分が存在すれば全て送る。
  const postUsagePerformance: PostUsagePerformanceMonthlyParam = {
    target_date: usagePerformance.targetDate,
    users_in_facility_id: usagePerformance.usersInFacilityId,
    status_type: usagePerformance.statusType,
    medical_support_type: usagePerformance.medicalSupportType,
    remarks: usagePerformance.remarks ? usagePerformance.remarks : null,
    // 以下の項目は入れないとAPIでエラーを起こすため設定する。
    daytime_support_type: null,
    get_home_support_type: null,
    hospitalization_support_type: null,
    life_support_flg: null,
    night_support_type: null
  };
  return postUsagePerformance;
};

/**
 * 一括登録用のusagePerformanceTANKINYUSHOの作成(日ごと)
 * @param usagePerformanceTANKINYUSHO
 */
const createUsagePerformanceTANKINYUSHOParamDaily = (
  usagePerformanceTANKINYUSHO: ReportState["reportDaily"]["usagePerformanceTANKINYUSHO"],
  usagePerformance: ReportState["reportDaily"]["usagePerformance"]
): PostUsagePerformanceDailyParams["usage_performance_tankinyusho"] => {
  const postUsagePerformance: PostUsagePerformanceDailyParams["usage_performance_tankinyusho"] = [];
  Object.keys(usagePerformanceTANKINYUSHO.before).forEach(
    (keyValue: string, index: number) => {
      // サービス提供状況が【-】に更新しているかどうか
      const isInitializedUsagePerformance =
        usagePerformance.after[keyValue].statusType !==
          usagePerformance.before[keyValue].statusType &&
        `${usagePerformance.after[keyValue].statusType}` === StatusType.NONE;
      // 全体を見て違いがなければまたはサービス提供状況が【-】で更新していなければ処理をしない
      if (
        !deepEqual(
          usagePerformanceTANKINYUSHO.before[keyValue],
          usagePerformanceTANKINYUSHO.after[keyValue]
        ) ||
        isInitializedUsagePerformance
      ) {
        // サービス提供状況が【-】で更新している場合、差分更新せずに各項目の初期値に設定する
        const diffObject: Partial<
          UsagePerformanceTANKINYUSHOType
        > = isInitializedUsagePerformance
          ? initializeUsagePerformanceTANKINYUSHO(
              usagePerformanceTANKINYUSHO.after[keyValue]
            )
          : removeNoChangeData<UsagePerformanceTANKINYUSHOType>(
              usagePerformanceTANKINYUSHO.before[keyValue],
              usagePerformanceTANKINYUSHO.after[keyValue]
            );
        postUsagePerformance.push(
          convertUsagePerformanceTANKINYUSHODaily(
            usagePerformanceTANKINYUSHO.before[keyValue],
            diffObject
          )
        );
      }
      // disabledの項目を初期化する処理
      if (
        postUsagePerformance[index] &&
        postUsagePerformance[index].pickup === 0
      ) {
        postUsagePerformance[index].pickup_premises_flg = 0;
      }
    }
  );
  return postUsagePerformance;
};

/**
 * storeのusagePerformanceTANKINYUSHOをpostのusagePerformanceTANKINYUSHOに変換(日ごと)
 * @param usagePerformanceTANKINYUSHO
 * @param diffUsagePerformance
 */
const convertUsagePerformanceTANKINYUSHODaily = (
  usagePerformanceTANKINYUSHO: UsagePerformanceTANKINYUSHOType,
  diffUsagePerformance: Partial<UsagePerformanceTANKINYUSHOType>
): PostUsagePerformanceTANKINYUSHODailyParam => {
  const postUsagePerformance: PostUsagePerformanceTANKINYUSHODailyParam = {
    target_date: usagePerformanceTANKINYUSHO.targetDate,
    users_in_facility_id: usagePerformanceTANKINYUSHO.usersInFacilityId
  };
  Object.keys(usagePerformanceTANKINYUSHOConvertParamList).forEach(
    (key: string) => {
      if (
        diffUsagePerformance[
          usagePerformanceTANKINYUSHOConvertParamList[key].storeKey
        ] !== undefined
      ) {
        postUsagePerformance[
          usagePerformanceTANKINYUSHOConvertParamList[key].paramKey
        ] =
          diffUsagePerformance[
            usagePerformanceTANKINYUSHOConvertParamList[key].storeKey
          ];
      }
    }
  );
  return postUsagePerformance;
};

/**
 * 一括登録用のusagePerformanceTANKINYUSHOの作成(月ごと)
 * @param usagePerformanceTANKINYUSHO
 */
const createUsagePerformanceTANKINYUSHOParamMonthly = (
  usagePerformanceTANKINYUSHO: ReportState["reportMonthly"]["usagePerformanceTANKINYUSHO"],
  usagePerformance: ReportState["reportDaily"]["usagePerformance"]
): PostUsagePerformanceMonthlyParams["usage_performance_tankinyusho"] => {
  const postUsagePerformance: PostUsagePerformanceMonthlyParams["usage_performance_tankinyusho"] = [];
  Object.keys(usagePerformanceTANKINYUSHO.before).forEach(
    (keyValue: string, index: number) => {
      // サービス提供状況が【-】に更新しているかどうか
      const isInitializedUsagePerformance =
        usagePerformance.after[keyValue].statusType !==
          usagePerformance.before[keyValue].statusType &&
        `${usagePerformance.after[keyValue].statusType}` === StatusType.NONE;
      // 全体を見て違いがなければまたはサービス提供状況が【-】で更新していなければ処理をしない
      if (
        !deepEqual(
          usagePerformanceTANKINYUSHO.before[keyValue],
          usagePerformanceTANKINYUSHO.after[keyValue]
        ) ||
        isInitializedUsagePerformance
      ) {
        // サービス提供状況が【-】で更新している場合、差分更新せずに各項目の初期値に設定する
        const diffObject: Partial<
          UsagePerformanceTANKINYUSHOType
        > = isInitializedUsagePerformance
          ? initializeUsagePerformanceTANKINYUSHO(
              usagePerformanceTANKINYUSHO.after[keyValue]
            )
          : removeNoChangeData<UsagePerformanceTANKINYUSHOType>(
              usagePerformanceTANKINYUSHO.before[keyValue],
              usagePerformanceTANKINYUSHO.after[keyValue]
            );
        postUsagePerformance.push(
          convertUsagePerformanceTANKINYUSHOMonthly(
            usagePerformanceTANKINYUSHO.before[keyValue],
            diffObject
          )
        );
      }
      // disabledの項目を初期化する処理
      if (
        postUsagePerformance[index] &&
        postUsagePerformance[index].pickup === 0
      ) {
        postUsagePerformance[index].pickup_premises_flg = 0;
      }
    }
  );
  return postUsagePerformance;
};

/**
 * storeのusagePerformanceTANKINYUSHOをpostのusagePerformanceTANKINYUSHOに変換(月ごと)
 * @param usagePerformanceTANKINYUSHO
 * @param diffUsagePerformance
 */
const convertUsagePerformanceTANKINYUSHOMonthly = (
  usagePerformanceTANKINYUSHO: UsagePerformanceTANKINYUSHOType,
  diffUsagePerformance: Partial<UsagePerformanceTANKINYUSHOType>
): PostUsagePerformanceTANKINYUSHOMonthlyParam => {
  const postUsagePerformance: PostUsagePerformanceTANKINYUSHOMonthlyParam = {
    target_date: usagePerformanceTANKINYUSHO.targetDate,
    users_in_facility_id: usagePerformanceTANKINYUSHO.usersInFacilityId
  };
  Object.keys(usagePerformanceTANKINYUSHOConvertParamList).forEach(
    (key: string) => {
      if (
        diffUsagePerformance[
          usagePerformanceTANKINYUSHOConvertParamList[key].storeKey
        ] !== undefined
      ) {
        postUsagePerformance[
          usagePerformanceTANKINYUSHOConvertParamList[key].paramKey
        ] =
          diffUsagePerformance[
            usagePerformanceTANKINYUSHOConvertParamList[key].storeKey
          ];
      }
    }
  );
  return postUsagePerformance;
};

/**
 * StatusTypeの一括更新
 * @param keyList
 * @param usagePerformanceList
 */
export const getSetAllStatusType = (
  keyList: string[],
  usagePerformanceList: ReportState["reportDaily"]["usagePerformance"]["after"]
): ReportState["reportDaily"]["usagePerformance"]["after"] => {
  const setAllStatusTypeList: ReportState["reportDaily"]["usagePerformance"]["after"] = {};
  Object.keys(usagePerformanceList).forEach((keyValue: string) => {
    const setAllServiceType: UsagePerformanceType = cloneDeep(
      usagePerformanceList[keyValue]
    );
    if (keyList.includes(keyValue)) {
      setAllServiceType.statusType = Number(StatusType.IMPLEMENTATION);
    }
    setAllStatusTypeList[keyValue] = setAllServiceType;
  });
  return setAllStatusTypeList;
};

/**
 * サービス提供状況が[-]時の全項目の初期化(日ごと)
 * @param reportState
 */
export const normalizeServiceTypeNoneDaily = (
  reportState: ReportState["reportDaily"]
): ReportState["reportDaily"] => {
  const usagePerformanceAfter = reportState.usagePerformance.after;
  Object.keys(usagePerformanceAfter).forEach((keyValue: string) => {
    if (`${usagePerformanceAfter[keyValue].statusType}` === StatusType.NONE) {
      reportState.usagePerformance.after[keyValue] = initializeUsagePerformance(
        reportState.usagePerformance.after[keyValue]
      );
      reportState.usagePerformanceTANKINYUSHO.after[
        keyValue
      ] = initializeUsagePerformanceTANKINYUSHO(
        reportState.usagePerformanceTANKINYUSHO.after[keyValue]
      );
    }
  });
  return reportState;
};

/**
 * サービス提供状況が[-]時の全項目の初期化(月ごと)
 * @param reportState
 */
export const normalizeServiceTypeNoneMonthly = (
  reportState: ReportState["reportMonthly"]
): ReportState["reportMonthly"] => {
  const usagePerformanceAfter = reportState.usagePerformance.after;
  Object.keys(usagePerformanceAfter).forEach((keyValue: string) => {
    if (`${usagePerformanceAfter[keyValue].statusType}` === StatusType.NONE) {
      reportState.usagePerformance.after[keyValue] = initializeUsagePerformance(
        reportState.usagePerformance.after[keyValue]
      );
      reportState.usagePerformanceTANKINYUSHO.after[
        keyValue
      ] = initializeUsagePerformanceTANKINYUSHO(
        reportState.usagePerformanceTANKINYUSHO.after[keyValue]
      );
    }
  });
  return reportState;
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

  return addRelationValue(diffObject, afterObject);
};

/**
 * 要素の差分判定　要素に差分がある場合、連携要素もパラメータに付与する
 * @param target
 * @param after
 */
const addRelationValue = <T>(target: T, after: T): Partial<T> => {
  const addedRelationParam = cloneDeep(target);
  Object.keys(relationshipParamsMap).forEach(relationKey => {
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
 * usagePerformanceの初期化
 * @param usagePerformance
 */
const initializeUsagePerformance = (
  usagePerformance: UsagePerformanceType
): UsagePerformanceType => {
  return cloneDeep({
    ...usagePerformance,
    medicalSupportType: null
  });
};

/**
 * usagePerformanceTANKINYUSHOの初期化
 * @param usagePerformanceTANKINYUSHO
 */
const initializeUsagePerformanceTANKINYUSHO = (
  usagePerformanceTANKINYUSHO: UsagePerformanceTANKINYUSHOType
): UsagePerformanceTANKINYUSHOType => {
  return cloneDeep({
    ...usagePerformanceTANKINYUSHO,
    capacityOverrunException: 0,
    emergencyShortterm: 0,
    food: 0,
    otherSupport: 0,
    overHours: 0,
    pickup: 0,
    pickupPremises: 0,
    severeDisabilitySupport: 0,
    sputumImplementation: 0
  });
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
 * boolean(CheckBox) cast number
 * @param value
 */
const castCheckBoxToNumber = (value: boolean): number => {
  return value ? Number(Checkbox.ON) : Number(Checkbox.OFF);
};

// usagePerformanceTANKINYUSHO store to postParam list
const usagePerformanceTANKINYUSHOConvertParamList = {
  statusType: {
    storeKey: "otherSupport",
    paramKey: "other_support_flg"
  },
  pickup: {
    storeKey: "pickup",
    paramKey: "pickup"
  },
  pickupPremises: {
    storeKey: "pickupPremises",
    paramKey: "pickup_premises_flg"
  },
  food: {
    storeKey: "food",
    paramKey: "food"
  },
  emergencyShortterm: {
    storeKey: "emergencyShortterm",
    paramKey: "emergency_shortterm_flg"
  },
  overHours: {
    storeKey: "overHours",
    paramKey: "over_hours_flg"
  },
  capacityOverrunException: {
    storeKey: "capacityOverrunException",
    paramKey: "capacity_overrun_exception"
  },
  medicalSupport: {
    storeKey: "medicalSupport",
    paramKey: "medical_support"
  },
  sputumImplementation: {
    storeKey: "sputumImplementation",
    paramKey: "sputum_implementation_flg"
  },
  severeDisabilitySupport: {
    storeKey: "severeDisabilitySupport",
    paramKey: "severe_disability_support_flg"
  }
};

// パラメータの関係マッピング表
const relationshipParamsMap = {
  pickup: {
    storeKey: "pickup",
    requestKey: "pickup",
    cooperationKeys: ["pickupPremises"]
  },
  pickupPremises: {
    storeKey: "pickupPremises",
    requestKey: "pickupPremises",
    cooperationKeys: ["pickup"]
  }
};
