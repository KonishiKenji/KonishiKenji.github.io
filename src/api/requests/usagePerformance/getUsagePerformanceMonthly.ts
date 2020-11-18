import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { ReportResultAPI } from "@stores/domain/report/type";

export interface GetUsagePerformanceMonthlyParams {
  data: {
    usage_performance: {
      id: number;
      users_in_facility_id: number;
      name_sei: string;
      name_mei: string;
      target_date: string;
      status_type: number;
      night_support_type: number;
      hospitalization_support_type: number;
      get_home_support_type: number;
      daytime_support_type: number;
      medical_support_type: number;
      life_support_flg: number;
      home_care_flg: number;
      remarks: string;
      is_holiday: boolean;
      is_service_end: number;
    }[];
    usage_performance_tankinyusho?: {
      id: number;
      users_in_facility_id: number;
      target_date: string;
      other_support_flg: number;
      pickup: number;
      pickup_premises_flg: number;
      food: number;
      emergency_shortterm_flg: number;
      over_hours_flg: number;
      capacity_overrun_exception: number;
      medical_support: number;
      sputum_implementation_flg: number;
      severe_disability_support_flg: number;
    }[];
    usage_performance_shisetsunyusho: {
      id: number;
      target_date: string;
      users_in_facility_id: number;
      hospitalization_overnightstay: number;
      regional_transition_flg: number;
      oral_transition_flg: number;
      oral_preservation: number;
      medical_foods_flg: number;
      nutrition_management_flg: number;
      collection_of_utility_fee_flg: number;
      food_breakfast_flg: number;
      food_lunch_flg: number;
      food_supper_flg: number;
      severe_disability_support_flg: number;
    }[];
    def_night_support_type: number;
  };
}

export type GetUsagePerformanceParamsMonthly = GetUsagePerformanceMonthlyParams["data"]["usage_performance"][0];

type ForNormalizeReportDataFromAPI = {
  data: ReportResultAPI;
};
type GetUsagePerformanceMonthly = ForNormalizeReportDataFromAPI &
  GetUsagePerformanceMonthlyParams;

/**
 * 月毎の利用実績を取得
 * @param id
 * @param date 対象日 YYYYMM
 */
export const getUsagePerformanceMonthly = async (
  id: number,
  date: string
): Promise<AxiosResponse<GetUsagePerformanceMonthly>> => {
  const url = `${VERSION_URL}/usage_performance/monthly/${id}/${date}`;
  return request.get<GetUsagePerformanceMonthly>(url);
};

export default getUsagePerformanceMonthly;
