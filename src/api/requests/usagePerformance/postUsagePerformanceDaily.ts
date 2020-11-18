import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface PostUsagePerformanceDailyParams {
  usage_performance_daily?: Partial<{
    target_date: string;
    body_restraint_abolition_unexecuted_flg: number;
  }>;
  usage_performance?: {
    users_in_facility_id: number;
    target_date: string;
    status_type: number;
    night_support_type: number | null;
    hospitalization_support_type: number | null;
    get_home_support_type: number | null;
    daytime_support_type: number | null;
    medical_support_type: number | null;
    life_support_flg: number | null;
    remarks: string | null;
    isHoliday?: boolean | null;
  }[];
  usage_performance_tankinyusho?: Partial<{
    users_in_facility_id: number;
    target_date: string;
    other_support_flg?: number;
    pickup?: number;
    pickup_premises_flg?: number;
    food?: number;
    emergency_shortterm_flg?: number;
    over_hours_flg?: number;
    capacity_overrun_exception?: number;
    medical_support?: number;
    sputum_implementation_flg?: number;
    severe_disability_support_flg?: number;
  }>[];
  usage_performance_shisetsunyusho?: Partial<{
    users_in_facility_id: number;
    target_date: string;
    hospitalization_overnightstay?: number;
    regional_transition_flg?: number;
    oral_transition_flg?: number;
    oral_preservation?: number;
    medical_foods_flg?: number;
    nutrition_management_flg?: number;
    small_group_care_flg?: number;
    collection_of_utility_fee_flg?: number;
    food_breakfast_flg?: number;
    food_lunch_flg?: number;
    food_supper_flg?: number;
    severe_disability_support_flg?: number;
  }>[];
}

export type PostUsagePerformanceDailyParam = NonNullable<
  PostUsagePerformanceDailyParams["usage_performance"]
>[0];
export type PostUsagePerformanceTANKINYUSHODailyParam = NonNullable<
  PostUsagePerformanceDailyParams["usage_performance_tankinyusho"]
>[0];
export type PostUsagePerformanceSHISETSUNYUSHODailyParam = NonNullable<
  PostUsagePerformanceDailyParams["usage_performance_shisetsunyusho"]
>[0];

export const postUsagePerformanceDaily = async (
  values: PostUsagePerformanceDailyParams
): Promise<AxiosResponse<unknown>> => {
  const url = `${VERSION_URL}/usage_performance/daily/set`;
  return request.post(url, values);
};

export default postUsagePerformanceDaily;
