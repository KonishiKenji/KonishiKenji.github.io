import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { InvoiceCostAmountListData } from "@stores/domain/invoice/type";

type GetInvoicesUserCostAmountListJsonResponse = {
  data: InvoiceCostAmountListData;
};

/**
 * 対象の利用者負担額一覧表のJsonを取得(GroupHomeで未実装の為、未テスト)
 * @param year
 * @param month
 * @param user_ids
 */
export const getInvoicesUserCostAmountListJson = async (
  year: string,
  month: string,
  user_ids: string
): Promise<AxiosResponse<GetInvoicesUserCostAmountListJsonResponse>> => {
  const url = `${VERSION_URL}/invoices/user_cost_amount_list_v2/${year}/${month}?type=json&excluded_user_ids=${user_ids}`;
  return request.get<GetInvoicesUserCostAmountListJsonResponse>(url);
};

export default getInvoicesUserCostAmountListJson;
