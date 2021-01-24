import { AxiosRequestConfig, AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 対象の実績記録票のCSVを取得
 * @param year
 * @param month
 * @param user_ids
 */
export const getInvoicesJissekiCsv = async (
  year: string,
  month: string,
  user_ids: string
): Promise<AxiosResponse<string>> => {
  const url = `${VERSION_URL}/invoices/jisseki/${year}/${month}?type=csv&excluded_user_ids=${user_ids}`;
  const requestParams: AxiosRequestConfig = {
    responseType: "blob"
  };
  return request.get<string>(url, requestParams);
};

export default getInvoicesJissekiCsv;
