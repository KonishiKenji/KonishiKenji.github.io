import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { InvoiceUserReceiptData } from "@stores/domain/invoice/type";

type GetInvoicesUserReceiptJsonResponse = {
  data: InvoiceUserReceiptData[];
};

/**
 * 利用者領収書のデータを取得する
 * @param dataKey
 */
export const getInvoicesUserReceiptJson = async (
  dataKey: string
): Promise<AxiosResponse<GetInvoicesUserReceiptJsonResponse>> => {
  const url = `${VERSION_URL}/invoices/user_receipt/${dataKey}`;
  return request.get<GetInvoicesUserReceiptJsonResponse>(url);
};

export default getInvoicesUserReceiptJson;
