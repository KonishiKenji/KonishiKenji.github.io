import {
  FacilityType,
  NOT_ACCEPT_FOOD_TRANSFER_IN_STATUSES
} from "@constants/variables";

import { OptionInterface } from "@components/atoms/DropDown";
import { WorkRecordsState } from "@stores/domain/workRecords/types";

import { formatHourAndMinutes } from "@utils/domain/workRecords/date";
import { getStatusList } from "@utils/domain/workRecords/utils";

/**
 * サマリデータのヘッダー取得
 * @param facilityUserName
 * @param statusLable
 */
const getSummaryHeader = (
  facilityUserName: string,
  statusLable: OptionInterface[]
): string[] => {
  const labels = statusLable.map((v) => v.label);
  return [
    `${facilityUserName}名`,
    "受給者証番号",
    "対象期間",
    ...labels,
    "利用日数",
    "食事回数"
  ];
};

/**
 * サマリデータの値取得
 * @param targetTerm
 * @param statusLable
 * @param summaryDataList
 * @param excludedUserIds
 */
const getSummaryBody = (
  targetTerm: string,
  statusLable: OptionInterface[],
  summaryDataList: WorkRecordsState["data"]["summary"],
  excludedUserIds: number[] = []
): any[][] => {
  return summaryDataList
    .filter((excludedData) => !excludedUserIds.includes(excludedData.uifId))
    .map((result) => {
      const values = statusLable.map((v) => Number(v.value));
      const existValues = result.workTimeDetails.reduce((res, data) => {
        res[data.status] = formatHourAndMinutes(data.totalWorkTime);
        return res;
      }, {});
      const statusData = values.map((v) => {
        if (existValues[v] !== undefined) {
          return existValues[v];
        }
        return "-";
      });
      return [
        result.userName,
        result.recipientNumber,
        targetTerm,
        ...statusData,
        result.useCounts,
        result.foodCounts
      ];
    });
};

/**
 * 作業時間 サービス提供状況サマリのサマリ集計部分の修正
 * @param facilityType
 * @param targetTerm
 * @param facilityUserName
 * @param summaryDataList
 */
export const serviceDeliverySummary = (
  facilityType: FacilityType,
  targetTerm: string,
  facilityUserName = "利用者",
  summaryDataList: WorkRecordsState["data"]["summary"],
  selectedUserIds: number[] = []
): any[][] => {
  const statusLabel = getStatusList(facilityType);

  const header = getSummaryHeader(facilityUserName, statusLabel);
  const body = getSummaryBody(
    targetTerm,
    statusLabel,
    summaryDataList,
    selectedUserIds
  );

  return [header, ...body];
};

/**
 * 詳細データのヘッダー取得
 * @param facilityUserName
 * @param statusLable
 */
const getDetailHeader = (
  facilityUserName: string,
  statusLable: OptionInterface[]
): string[] => {
  const labels = statusLable.map((v) => v.label);
  return [
    `${facilityUserName}名`,
    "受給者証番号",
    "対象期間",
    ...labels,
    "食事提供",
    "休憩合計時間",
    "メモ"
  ];
};

/**
 * 詳細データの値取得
 * @param statusLable
 * @param DetailDataList
 */
const getDetailBody = (
  statusLable: OptionInterface[],
  detailDataList: WorkRecordsState["data"]["details"],
  excludedUserIds: number[] = []
): (string | null)[][] => {
  return detailDataList
    .filter((data) => !excludedUserIds.includes(data.uifId))
    .map((data) => {
      const values = statusLable.map((v) => Number(v.value));
      const statusData = values.map((v) => {
        if (data.status === v && data.totalWorkTime) {
          return formatHourAndMinutes(data.totalWorkTime);
        }
        return "-";
      });
      const paramsStatusValue = data.status ? data.status.toString() : "0";
      const isAcceptableStatusField =
        paramsStatusValue === "0"
          ? false
          : !NOT_ACCEPT_FOOD_TRANSFER_IN_STATUSES.find(
              (item) => item === paramsStatusValue
            );
      return [
        data.userName,
        data.recipientNumber,
        data.date,
        ...statusData,
        isAcceptableStatusField && data.food === 1 ? "あり" : "なし",
        data.totalBreakTime ? formatHourAndMinutes(data.totalBreakTime) : "-",
        data.memo
      ];
    });
};

/**
 * 作業時間 サービス提供状況 詳細部分の修正
 * @param facilityType
 * @param facilityUserName
 * @param detailDataList
 */
export const serviceDeliveryDetail = (
  facilityType: FacilityType,
  targetTerm: string,
  facilityUserName = "利用者",
  detailDataList: WorkRecordsState["data"]["details"],
  selectedUserIds: number[] = []
): (string | null)[][] => {
  const statusLabel = getStatusList(facilityType);
  const header = getDetailHeader(facilityUserName, statusLabel);
  const body = getDetailBody(statusLabel, detailDataList, selectedUserIds);

  return [header, ...body];
};
