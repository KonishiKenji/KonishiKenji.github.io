import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 対象月の利用実績情報（usage_results）パラメータ
 */
export interface PostUsageResultsParam {
  usage_results: {
    users_in_facility_id: string;
    target_date: string;
    status_type?: number;
    special_area_flg?: number;
    remarks?: string;
  }[];
}

/**
 * 対象利用者の対象月の利用実績情報（usage_results）を登録/更新する。
 * @param values パラメータ postUsageResultsParam
 * @param uifId  施設利用者id string
 * @param date 対象日 string
 */
export const postUsageResultsMonthly = async (
  values: PostUsageResultsParam,
  uifId: string,
  date: string
): Promise<AxiosResponse<unknown>> => {
  const url = `${VERSION_URL}/usage_results/monthly/${uifId}/${date}`;
  return request.post(url, values);
};

export default postUsageResultsMonthly;
