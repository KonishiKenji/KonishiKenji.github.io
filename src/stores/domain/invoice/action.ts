import typescriptFsa from "typescript-fsa";

const actionCreator = typescriptFsa("INVOICE");
import {
  DownloadableResponseResult,
  DownloadCsvResult,
  HistoryResult,
  InvoiceDataResult,
  InvoiceCostAmountListData,
  InvoiceSeikyuData,
  InvoiceUplimitData,
  InvoiceUserSeikyuData,
  InvoiceUserReceiptData,
  FacilityMultiFunctional
} from "@stores/domain/invoice/type";

export const downloadable = actionCreator.async<
  void,
  DownloadableResponseResult
>("DOWNLOADABLE");

export const history = actionCreator.async<void, HistoryResult>("HISTORY");

// サービス提供実績記録票
export const downloadJissekiCsv = actionCreator.async<void, DownloadCsvResult>(
  "DOWNLOAD_JISSEKI_CSV"
);
// JSON
export const downloadJissekiJson = actionCreator.async<void, InvoiceDataResult>(
  "DOWNLOAD_JISSEKI_JSON"
);

// 請求書・明細書
export const downloadSeikyuCsv = actionCreator.async<void, DownloadCsvResult>(
  "DOWNLOAD_SEIKYU_CSV"
);
// JSON
export const downloadSeikyuJson = actionCreator.async<void, InvoiceSeikyuData>(
  "DOWNLOAD_SEIKYU_JSON"
);

// 利用者負担額一覧表
export const downloadCostAmountListJson = actionCreator.async<
  void,
  InvoiceCostAmountListData
>("DOWNLOAD_COST_AMOUNT_LIST_JSON");

// 利用者負担上限管理結果票
export const downloadUplimitCsv = actionCreator.async<void, DownloadCsvResult>(
  "DOWNLOAD_UPLIMIT_CSV"
);
// JSON
export const downloadUplimitJson = actionCreator.async<
  void,
  InvoiceUplimitData[]
>("DOWNLOAD_UPLIMIT_JSON");

////////
// 履歴
// 請求書
export const downloadUserSeikyuJson = actionCreator.async<
  void,
  InvoiceUserSeikyuData[]
>("DOWNLOAD_USER_SEIKYU_JSON");

// 領収書
export const downloadUserReceiptJson = actionCreator.async<
  void,
  InvoiceUserReceiptData[]
>("DOWNLOAD_USER_RECEIPT_JSON");

// 代理受領書
export const downloadUserAgencyReceiptJson = actionCreator.async<
  void,
  InvoiceUserReceiptData[]
>("DOWNLOAD_USER_AGENCY_RECEIPT_JSON");

// 多機能情報
export const getMultiFunctionalFacility = actionCreator.async<
  void,
  FacilityMultiFunctional
>("GET_MULTI_FUNCTIONAL_FACILITY");
