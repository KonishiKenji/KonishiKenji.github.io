import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 対象月の利用実績情報
 */
export interface GetUsageResultsMonthlyResponce {
  data: {
    usage_results: {
      users_in_facility_id: number;
      name_sei: string;
      name_mei: string;
      target_date: string;
      status_type: number;
      special_area_flg: number;
      remarks: string;
      isHoliday: boolean;
    }[];
  };
}

type GetUsageResultsMonthlyResponse = {
  data: GetUsageResultsMonthlyResponce["data"];
};

/**
 * 対象利用者の対象月の利用実績情報（usage_results）を取得する。
 * @param uifId 施設利用者id string
 * @param date 対象日 string YYYYMM
 */
export const getUsageResultsMonthly = async (
  uifId: string,
  date: string
): Promise<AxiosResponse<GetUsageResultsMonthlyResponse>> => {
  const url = `${VERSION_URL}/usage_results/monthly/${uifId}/${date}`;
  return request.get<GetUsageResultsMonthlyResponse>(url);
};

export default getUsageResultsMonthly;
