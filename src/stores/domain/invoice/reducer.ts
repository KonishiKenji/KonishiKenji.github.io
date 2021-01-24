import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as action from "@stores/domain/invoice/action";
import {
  DownloadableResponseResult,
  DownloadableMonth,
  DownloadCsvResult,
  HistoryResult,
  HistoryResultData,
  InvoiceData,
  InvoiceDataResult,
  InvoiceCostAmountListData,
  InvoiceSeikyuData,
  InvoiceUplimitData,
  InvoiceState,
  InvoiceUserSeikyuData,
  InvoiceUserReceiptData,
  FacilityMultiFunctional
} from "@stores/domain/invoice/type";

import download from "@utils/download";

const downloadable = (
  state: InvoiceState,
  { result }: { result: DownloadableResponseResult }
) => ({
  ...state,
  downloadable: {
    ...result
  }
});

const history = (
  state: InvoiceState,
  { result }: { result: HistoryResult }
) => ({
  ...state,
  history: result.data
});

const downloadJissekiCsv = (
  state: InvoiceState,
  { result }: { result: DownloadCsvResult }
) => {
  const { data, year, month } = result;
  download(data, `jissekikiroku_${year}-${month}.csv`, "text/csv", () => {
    return;
  });
  return state;
};

const downloadJissekiJson = (
  state: InvoiceState,
  { result }: { result: InvoiceDataResult }
) => {
  return {
    ...state,
    invoiceData: {
      data: result.data
    }
  };
};

const downloadSeikyuCsv = (
  state: InvoiceState,
  { result }: { result: DownloadCsvResult }
) => {
  const { data, year, month } = result;
  download(data, `seikyu-meisai_${year}-${month}.csv`, "text/csv", () => {
    return;
  });
  return state;
};

const downloadSeikyuJson = (
  state: InvoiceState,
  { result }: { result: InvoiceSeikyuData }
) => {
  return {
    ...state,
    invoiceSeikyuData: result
  };
};

const downloadCostAmountListJson = (
  state: InvoiceState,
  { result }: { result: InvoiceCostAmountListData }
) => {
  return {
    ...state,
    invoiceCostAmountListData: result
  };
};

const downloadUplimitCsv = (
  state: InvoiceState,
  { result }: { result: DownloadCsvResult }
) => {
  const { data, year, month } = result;
  download(data, `zyougen-kanri_${year}-${month}.csv`, "text/csv", () => {
    return;
  });
  return state;
};

const downloadUplimitJson = (
  state: InvoiceState,
  { result }: { result: InvoiceUplimitData[] }
) => {
  return {
    ...state,
    invoiceUplimitData: result
  };
};

const downloadUserSeikyuJson = (
  state: InvoiceState,
  { result }: { result: InvoiceUserSeikyuData[] }
) => {
  return {
    ...state,
    invoiceUserSeikyuData: result
  };
};

const downloadUserReceiptJson = (
  state: InvoiceState,
  { result }: { result: InvoiceUserReceiptData[] }
) => {
  return {
    ...state,
    invoiceUserReceiptData: result
  };
};

const downloadUserAgencyReceiptJson = (
  state: InvoiceState,
  { result }: { result: InvoiceUserReceiptData[] }
) => {
  return {
    ...state,
    invoiceUserAgencyReceiptData: result
  };
};

const facilityMultiFunctional = (
  state: InvoiceState,
  { result }: { result: FacilityMultiFunctional }
) => {
  return {
    ...state,
    facilityMultiFunctional: result
  };
};

const initialState = {
  downloadable: {
    months: [] as DownloadableMonth[]
  },
  history: [] as HistoryResultData[],
  invoiceData: {
    data: [] as InvoiceData[]
  },
  invoiceSeikyuData: {} as InvoiceSeikyuData,
  invoiceUplimitData: [] as InvoiceUplimitData[],
  invoiceCostAmountListData: {} as InvoiceCostAmountListData,
  invoiceUserSeikyuData: [] as InvoiceUserSeikyuData[],
  invoiceUserReceiptData: [] as InvoiceUserReceiptData[],
  invoiceUserAgencyReceiptData: [] as InvoiceUserReceiptData[],
  facilityMultiFunctional: {} as FacilityMultiFunctional
};

export default reducerWithInitialState(initialState)
  .case(action.downloadable.done, downloadable)
  .case(action.history.done, history)
  .case(action.downloadJissekiCsv.done, downloadJissekiCsv)
  .case(action.downloadJissekiJson.done, downloadJissekiJson)
  .case(action.downloadSeikyuCsv.done, downloadSeikyuCsv)
  .case(action.downloadSeikyuJson.done, downloadSeikyuJson)
  .case(action.downloadCostAmountListJson.done, downloadCostAmountListJson)
  .case(action.downloadUplimitCsv.done, downloadUplimitCsv)
  .case(action.downloadUplimitJson.done, downloadUplimitJson)
  .case(action.downloadUserSeikyuJson.done, downloadUserSeikyuJson)
  .case(action.downloadUserReceiptJson.done, downloadUserReceiptJson)
  .case(
    action.downloadUserAgencyReceiptJson.done,
    downloadUserAgencyReceiptJson
  )
  .case(action.getMultiFunctionalFacility.done, facilityMultiFunctional);
