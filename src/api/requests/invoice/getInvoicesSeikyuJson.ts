import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { InvoiceSeikyuData } from "@stores/domain/invoice/type";

type GetInvoicesSeikyuJsonResponse = {
  data: InvoiceSeikyuData;
};

/**
 * 対象の請求・明細書のJSONを取得
 * @param year
 * @param month
 * @param user_ids
 */
export const getInvoicesSeikyuJson = async (
  year: string,
  month: string,
  user_ids: string
): Promise<AxiosResponse<GetInvoicesSeikyuJsonResponse>> => {
  const url = `${VERSION_URL}/invoices/seikyu_meisai/${year}/${month}?type=json&excluded_user_ids=${user_ids}`;
  return request.get<GetInvoicesSeikyuJsonResponse>(url);
};

export default getInvoicesSeikyuJson;
