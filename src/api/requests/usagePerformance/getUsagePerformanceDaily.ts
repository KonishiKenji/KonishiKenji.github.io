import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { ReportResultAPI } from "@stores/domain/report/type";

export interface GetUsagePerformanceDailyParams {
  data: {
    usage_performance_daily: {
      id: number;
      target_date: string;
      body_restraint_abolition_unexecuted_flg: number;
    };
    usage_performance: {
      id: number;
      users_in_facility_id: number;
      name_sei: string;
      name_mei: string;
      target_date: string;
      status_type: number;
      night_support_type: number;
      def_night_support_type: number;
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
    usage_performance_shisetsunyusho?: {
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
  };
}

export type GetUsagePerformanceParamsDaily = GetUsagePerformanceDailyParams["data"]["usage_performance"][0];

type ForNormalizeReportDataFromAPI = {
  data: ReportResultAPI;
};

type GetUsagePerformanceDailyResponse = ForNormalizeReportDataFromAPI &
  GetUsagePerformanceDailyParams;

/**
 * 日毎の利用実績を取得
 * @param date 対象日 YYYYMMDD
 */
export const getUsagePerformanceDaily = async (
  date: string
): Promise<AxiosResponse<GetUsagePerformanceDailyResponse>> => {
  const url = `${VERSION_URL}/usage_performance/daily/${date}`;
  return request.get<GetUsagePerformanceDailyResponse>(url);
};

export default getUsagePerformanceDaily;
