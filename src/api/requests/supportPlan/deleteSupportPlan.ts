import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 指定IDの個別支援計画のデータ削除
 * @param uifId 事業所所属ユーザーのID
 * @param supportPlanId 個別支援計画書ID
 */
const deleteSupportPlan = async (
  uifId: string,
  supportPlanId: string
): Promise<AxiosResponse<unknown>> => {
  const url = `${VERSION_URL}/support_plan/${uifId}/${supportPlanId}`;
  return request.delete(url);
};

export default deleteSupportPlan;
