import * as XLSX from "xlsx";
import { WorkRecordsState } from "@stores/domain/workRecords/types";

import { summary, summaryDetail } from "@utils/domain/workRecords/summary";
import {
  serviceDeliverySummary,
  serviceDeliveryDetail
} from "@utils/domain/workRecords/serviceDelivery";

import { format } from "date-fns";
import { FacilityType } from "@constants/variables";

const supplementText = [
  "※作業合計時間はすでに休憩合計時間が除かれている時間になります。"
];

const formatDate = (date: string) => {
  return format(date, "YYYY/MM/DD");
};

export const createExcelFile = (
  workRecordState: WorkRecordsState,
  facilityType: FacilityType,
  facilityUserName: string,
  targetFrom: string,
  targetTo: string,
  selectedUserIds: number[]
) => {
  const targetDate = `${formatDate(targetFrom)}〜${formatDate(targetTo)}`;

  const workBook = XLSX.utils.book_new();

  const sheet1 = [];
  sheet1.push(
    ...summaryData(
      workRecordState,
      facilityType,
      targetDate,
      facilityUserName,
      selectedUserIds
    )
  );

  const workSheet = XLSX.utils.aoa_to_sheet(sheet1, {
    dateNF: "H:mm"
  });
  const columnSettings = [
    { wpx: 150 },
    { wpx: 100 },
    { wpx: 160 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 400 }
  ];
  workSheet["!cols"] = columnSettings;
  XLSX.utils.book_append_sheet(workBook, workSheet, "利用者サマリ");

  // ステータスごとの集計
  const sheet2 = [];
  sheet2.push(
    ...serviceDeliveryData(
      workRecordState,
      facilityType,
      targetDate,
      facilityUserName,
      selectedUserIds
    )
  );
  const workSheet2 = XLSX.utils.aoa_to_sheet(sheet2, {
    dateNF: "H:mm"
  });
  const columnSettings2 = [
    { wpx: 150 },
    { wpx: 100 },
    { wpx: 160 },
    { wpx: 110 },
    { wpx: 110 },
    { wpx: 110 },
    { wpx: 110 },
    { wpx: 110 },
    { wpx: 110 },
    { wpx: 110 },
    { wpx: 110 },
    { wpx: 110 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 400 }
  ];
  workSheet2["!cols"] = columnSettings2;
  XLSX.utils.book_append_sheet(workBook, workSheet2, "サービス提供状況サマリ");

  XLSX.writeFile(
    workBook,
    `作業時間_${formatDate(targetFrom)}-${formatDate(targetTo)}.xlsx`
  );
};

/**
 * 利用者サマリシートデータ
 * @param workRecordState
 * @param targetDate
 * @param facilityUserName
 * @param selectedUserIds
 */
const summaryData = (
  workRecordState: WorkRecordsState,
  facilityType: FacilityType,
  targetDate: string,
  facilityUserName: string,
  selectedUserIds: number[]
) => {
  const result = [];
  result.push([`<${facilityUserName}サマリ`]);
  result.push(supplementText);
  result.push([]);
  result.push(
    ...summary(
      targetDate,
      facilityUserName,
      workRecordState.data.summary,
      selectedUserIds
    )
  );
  result.push([]);

  result.push([`<${facilityUserName}毎の詳細情報>`]);
  result.push(supplementText);
  result.push([]);
  result.push(
    ...summaryDetail(
      facilityType,
      targetDate,
      facilityUserName,
      workRecordState.data.details,
      selectedUserIds
    )
  );

  return result;
};

/**
 * サービス提供状況サマリ
 * @param workRecordState
 * @param targetDate
 * @param facilityUserNaame
 */
const serviceDeliveryData = (
  workRecordState: WorkRecordsState,
  facilityType: FacilityType,
  targetDate: string,
  facilityUserName: string,
  selectedUserIds: number[]
) => {
  const result = [];
  result.push([`<利用者毎のサービス提供状況ごとのサマリ集計>`]);
  result.push(supplementText);
  result.push([]);
  result.push(
    ...serviceDeliverySummary(
      facilityType,
      targetDate,
      facilityUserName,
      workRecordState.data.summary,
      selectedUserIds
    )
  );
  result.push([]);
  result.push([`<利用者毎のサービス提供状況ごとの集計>`]);
  result.push(supplementText);
  result.push([]);

  result.push(
    ...serviceDeliveryDetail(
      facilityType,
      targetDate,
      facilityUserName,
      workRecordState.data.details,
      selectedUserIds
    )
  );
  return result;
};
