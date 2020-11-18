import {
  FacilityType,
  NOT_ACCEPT_FOOD_TRANSFER_IN_STATUSES
} from "@constants/variables";

import { WorkRecordsState } from "@stores/domain/workRecords/types";
import { formatHourAndMinutes } from "@utils/domain/workRecords/date";

import { getStatusList } from "@utils/domain/workRecords/utils";

export const summary = (
  targetTerm: string,
  facilityUserName = "利用者",
  summaryDataList: WorkRecordsState["data"]["summary"],
  excludedUserIds: number[] = []
): (string | number)[][] => {
  const header = [
    `${facilityUserName}名`,
    "受給者証番号",
    "対象期間",
    "利用日数",
    "食事回数",
    "作業合計時間",
    "休憩合計時間"
  ];

  const body = summaryDataList
    .filter((data) => !excludedUserIds.includes(data.uifId))
    .map((data) => {
      return [
        data.userName,
        data.recipientNumber,
        targetTerm,
        data.useCounts,
        data.foodCounts,
        data.totalWorkTime !== null
          ? formatHourAndMinutes(data.totalWorkTime)
          : "-",
        data.totalBreakTime !== null
          ? formatHourAndMinutes(data.totalBreakTime)
          : "-"
      ];
    });
  return [header, ...body];
};

export const summaryDetail = (
  facilityType: FacilityType,
  targetTerm: string,
  facilityUserName = "利用者",
  detailList: WorkRecordsState["data"]["details"],
  excludedUserIds: number[] = []
): any[][] => {
  const header = [
    `${facilityUserName}名`,
    "受給者証番号",
    "日付",
    "サービス提供状況",
    "通所開始時間",
    "通所終了時間",
    "食事提供",
    "作業開始時間",
    "作業終了時間",
    "作業合計時間",
    "休憩合計時間",
    "メモ"
  ];
  const statusList = getStatusList(facilityType).reduce((val, data) => {
    val[data.value] = data.label;
    return val;
  }, {});

  const body = detailList
    .filter((data) => !excludedUserIds.includes(data.uifId))
    .map((data) => {
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
        statusList[data.status],
        data.inoutStartTime !== null
          ? formatHourAndMinutes(data.inoutStartTime)
          : "-",
        data.inoutEndTime !== null
          ? formatHourAndMinutes(data.inoutEndTime)
          : "-",
        isAcceptableStatusField && data.food === 1 ? "あり" : "なし",
        data.workStartTime !== null
          ? formatHourAndMinutes(data.workStartTime)
          : "-",
        data.workEndTime !== null
          ? formatHourAndMinutes(data.workEndTime)
          : "-",
        data.totalWorkTime !== null
          ? formatHourAndMinutes(data.totalWorkTime)
          : "-",
        data.totalBreakTime !== null
          ? formatHourAndMinutes(data.totalBreakTime)
          : "-",
        data.memo || ""
      ];
    });
  return [header, ...body];
};
