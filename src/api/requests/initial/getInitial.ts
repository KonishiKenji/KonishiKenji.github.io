import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetInitialResponse {
  data: {
    facility: Partial<{
      first_time_bill_date: string | null;
      total_number_of_users_1_month_before: number | null;
      total_number_of_users_2_month_before: number | null;
      total_number_of_users_3_month_before: number | null;
    }>;
    users: Partial<{
      id: number | null;
      name_sei: string | null;
      name_mei: string | null;
      total_days_in_fiscal_year: number | null;
      users_in_facility_seikatsukaigo: Partial<{
        id: number | null;
        severe_disability_support: number | null;
        severe_disability_support_start_date: string | null;
      }>;
      users_in_facility_jiritsukunren_seikatsu: Partial<{
        id: number | null;
        social_life_support_flg: number | null;
        social_life_support_start_date: string | null;
        visit_start_date: string | null;
      }>;
      users_in_facility_shisetsunyusho: Partial<{
        id: number | null;
        severe_disability_support2_start_date: string | null;
      }>;
      users_in_facility_tankinyusho: Partial<{
        id: number | null;
        short_term_usage_addition_start_date: string | null;
        short_term_usage_addition_count: number | null;
      }>;
    }>[];
  };
}

/**
 * 事業所情報を取得する
 */
export const getInitial = async (): Promise<
  AxiosResponse<GetInitialResponse>
> => {
  const url = `${VERSION_URL}/initial`;
  return request.get<GetInitialResponse>(url);
};

export default getInitial;
