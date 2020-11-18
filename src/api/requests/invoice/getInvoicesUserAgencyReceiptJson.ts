import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { InvoiceUserReceiptData } from "@stores/domain/invoice/type";

type GetInvoicesUserAgencyReceiptJsonResponse = {
  data: InvoiceUserReceiptData[];
};

/**
 * 利用者代理受領書のデータを取得する
 * @param dataKey
 */
export const getInvoicesUserAgencyReceiptJson = async (
  dataKey: string
): Promise<AxiosResponse<GetInvoicesUserAgencyReceiptJsonResponse>> => {
  const url = `${VERSION_URL}/invoices/user_agency_receipt/${dataKey}`;
  return request.get<GetInvoicesUserAgencyReceiptJsonResponse>(url);
};

export default getInvoicesUserAgencyReceiptJson;
