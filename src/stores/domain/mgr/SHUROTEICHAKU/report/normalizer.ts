import { UsageResult, UsageResultsState } from "./types";

import { GetUsageResultsMonthlyResponce } from "@api/requests/usageResults/getUsageResultsMonthly";
import { InitialDataValues } from "@interfaces/mgr/SHUROTEICHAKU/report/initialData";
import { PostUsageResultsParam } from "@api/requests/usageResults/postUsageResultsMonthly";
import deepEqual from "fast-deep-equal";
import { cloneDeep, isEmpty } from "lodash";

/**
 * APIのデータをstoreに変更
 * @param result APIのresponce
 */
export const normalizeUsageResultFromAPI = (
  result: GetUsageResultsMonthlyResponce["data"]
): UsageResult[] => {
  const normalizeReportList = Array.isArray(result.usage_results)
    ? normalizeUsageResultList(result.usage_results)
    : [];
  return normalizeReportList;
};

const normalizeUsageResultList = (
  usageResults: GetUsageResultsMonthlyResponce["data"]["usage_results"]
): UsageResult[] => {
  const normalizedUsageResults: UsageResult[] = usageResults.map(
    usageResult => {
      return {
        uifId: castNumber(usageResult.users_in_facility_id),
        nameSei: castString(usageResult.name_sei),
        // 名
        nameMei: castString(usageResult.name_mei),
        // 対象年月日
        targetDate: castString(usageResult.target_date),
        // サービス提供の状況
        statusType: castNumber(usageResult.status_type),
        // 特別地域加算
        specialAreaFlg: castNumber(usageResult.special_area_flg),
        // 備考
        remarks: castStringOrNull(usageResult.remarks),
        // 休日判定
        isHoliday: usageResult.isHoliday
      };
    }
  );
  return normalizedUsageResults;
};

/**
 * formデータをAPIのrequestに変換
 * @param formValue formのデータ
 * @param storeValues storeのデータ
 */
export const normalizeFormValueToAPI = (
  formValue: UsageResultsState["usageResults"],
  storeValues: UsageResultsState["usageResults"]
): PostUsageResultsParam => {
  const diffData: PostUsageResultsParam = {
    usage_results: getDiffData(formValue, storeValues)
  };
  return diffData;
};

/**
 * formデータをstoreデータに変換
 * @param formValues formのデータ
 */
export const normalizeUsageResultFromForm = (
  formValues: InitialDataValues,
  storeValues: UsageResultsState["usageResults"]
): UsageResultsState["usageResults"] => {
  const usageResultList: UsageResultsState["usageResults"] = storeValues.map(
    (storeValue, index) => {
      const convertReportValue: UsageResult = cloneDeep(storeValue);
      if (
        index < formValues.ReportData.length &&
        storeValue.targetDate === formValues.ReportData[index].targetDate
      ) {
        convertReportValue.statusType = booleanToNumber0or1(
          formValues.ReportData[index].statusType
        );
        convertReportValue.specialAreaFlg = booleanToNumber0or1(
          formValues.ReportData[index].specialAreaFlg
        );
        convertReportValue.remarks = isEmpty(
          formValues.ReportData[index].remarks
        )
          ? null
          : formValues.ReportData[index].remarks;
        // 祝日情報がundefの場合deepCopyされずに後続の処理で不適切な動きをするため
        convertReportValue.isHoliday = storeValue.isHoliday;
      }
      return convertReportValue;
    }
  );
  return usageResultList;
};

/**
 * 差分抽出　差分以外はundefindで対応
 * @param formValue formのデータ
 * @param storeValues storeのデータ
 */
const getDiffData = (
  formValues: UsageResultsState["usageResults"],
  stateValues: UsageResultsState["usageResults"]
): PostUsageResultsParam["usage_results"] => {
  const diffPostParamList: PostUsageResultsParam["usage_results"] = [];
  stateValues.forEach((stateValue, index) => {
    if (
      index < formValues.length &&
      !deepEqual(stateValue, formValues[index])
    ) {
      // 差分一時保管用のデータの初期化
      const diffValue: PostUsageResultsParam["usage_results"][0] = {
        users_in_facility_id: stateValue.uifId ? `${stateValue.uifId}` : "",
        target_date: stateValue.targetDate ? stateValue.targetDate : "",
        status_type: undefined,
        special_area_flg: undefined,
        remarks: undefined
      };

      // 差分の項目を抽出
      Object.keys(StoreToRequestParam).forEach(paramKey => {
        const requestKey = StoreToRequestParam[paramKey].requestKey;
        const storeKey = StoreToRequestParam[paramKey].storeKey;
        isDiff(stateValue[storeKey], formValues[index][storeKey])
          ? (diffValue[requestKey] = formValues[index][storeKey])
          : delete diffValue[requestKey];
      });
      diffPostParamList.push(diffValue);
    }
    return;
  });
  return diffPostParamList;
};

// storeのkeyからpiaRequestのkeyに変換するmap表 Request必須値は除く
const StoreToRequestParam = {
  status_type: {
    storeKey: "statusType",
    requestKey: "status_type"
  },
  special_area_flg: {
    storeKey: "specialAreaFlg",
    requestKey: "special_area_flg"
  },
  remarks: {
    storeKey: "remarks",
    requestKey: "remarks"
  }
};

const castString = (value?: string | null | undefined) => {
  if (value === undefined || value === null) {
    return "";
  }
  return value.toString();
};

const castStringOrNull = (value?: string | null | undefined) => {
  if (value === undefined || value === null) {
    return null;
  }
  return value.toString();
};

const castNumber = (value?: number | null | undefined) => {
  if (value === undefined || value === null) {
    return 0;
  }
  return Number(value);
};

/**
 * boolean => 0 or 1
 */
const booleanToNumber0or1 = (value?: boolean): number => {
  return value !== undefined ? +value : 0;
};

/**
 * 差分チェック uif_id・targetDate・facirityType・travelTime・pickupPremisesは除く
 */
const isDiff = (before: string | number, after: string | number) => {
  return before !== after;
};
