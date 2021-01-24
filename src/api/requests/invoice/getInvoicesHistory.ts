import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { HistoryResult } from "@stores/domain/invoice/type";

/**
 * 請求ダウンロード可能対象取得
 */
export const getInvoicesHistory = async (): Promise<
  AxiosResponse<HistoryResult>
> => {
  const url = `${VERSION_URL}/invoices/history`;
  return request.get<HistoryResult>(url);
};

export default getInvoicesHistory;
