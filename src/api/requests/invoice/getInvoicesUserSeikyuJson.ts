import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { InvoiceUserSeikyuData } from "@stores/domain/invoice/type";

type GetInvoicesUserSeikyuJsonResponse = {
  data: InvoiceUserSeikyuData[];
};

/**
 * 利用者請求書のデータを取得する
 * @param dataKey
 */
export const getInvoicesUserSeikyuJson = async (
  dataKey: string
): Promise<AxiosResponse<GetInvoicesUserSeikyuJsonResponse>> => {
  const url = `${VERSION_URL}/invoices/user_invoice/${dataKey}`;
  return request.get<GetInvoicesUserSeikyuJsonResponse>(url);
};

export default getInvoicesUserSeikyuJson;
