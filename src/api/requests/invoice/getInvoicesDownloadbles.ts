import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { DownloadableResponseResult } from "@stores/domain/invoice/type";

/**
 * 請求ダウンロード可能対象取得
 */
export const getInvoicesDownloadbles = async (): Promise<
  AxiosResponse<DownloadableResponseResult>
> => {
  const url = `${VERSION_URL}/invoices/downloadables`;
  return request.get<DownloadableResponseResult>(url);
};

export default getInvoicesDownloadbles;
