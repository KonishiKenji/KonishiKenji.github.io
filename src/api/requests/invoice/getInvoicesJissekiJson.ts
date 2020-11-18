import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { InvoiceDataResult } from "@stores/domain/invoice/type";

/**
 * 対象の実績記録票のJsonを取得
 * @param year
 * @param month
 * @param user_ids
 */
export const getInvoicesJissekiJson = async (
  year: string,
  month: string,
  user_ids: string
): Promise<AxiosResponse<InvoiceDataResult>> => {
  const url = `${VERSION_URL}/invoices/jisseki/${year}/${month}?type=json&excluded_user_ids=${user_ids}`;
  return request.get<InvoiceDataResult>(url);
};

export default getInvoicesJissekiJson;
