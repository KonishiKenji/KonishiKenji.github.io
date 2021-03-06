import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetFacilityResponse {
  data: {
    facility: {
      id: number;
      gov_business_owner: string;
      gov_facility_number: string;
      name: string;
      type_service: string;
      responsible_person: string;
      capacity: number | null;
      postal_code: string;
      prefecture_name: string;
      city_id: number;
      address: string;
      tel: string;
      multiple_facility_flg: string;
      users_vs_supporter_grade: string;
      welfare_condition: string;
      better_supporter_condition: string;
      specific_better_supporter_condition: string;
      lack_of_supporter_flg: string;
      date_start_lack_of_supporter: string | null;
      lack_of_service_admin_flg: string;
      date_start_lack_of_service_admin: string | null;
      origin_local_gov_flg: string;
      see_hear_team_flg: string | null;

      total_capacity?: number | null;
      available_food?: string;
      available_pickup?: string;
      available_pickup_kind?: string;
      mon_active_flg?: string;
      tue_active_flg?: string;
      wed_active_flg?: string;
      thu_active_flg?: string;
      fri_active_flg?: string;
      sat_active_flg?: string;
      sun_active_flg?: string;
      mon_open?: string;
      tue_open?: string;
      wed_open?: string;
      thu_open?: string;
      fri_open?: string;
      sat_open?: string;
      sun_open?: string;
      mon_close?: string;
      tue_close?: string;
      wed_close?: string;
      thu_close?: string;
      fri_close?: string;
      sat_close?: string;
      sun_close?: string;
      execute_kaizen_flg?: string;
      ab_support_ikou_flg?: string;
      ab_support_ikou_result?: string;
      ab_support_ikou_result_number?: number;
      master_subordinate_flg?: string | null;
      master_flg?: string | null;
      a_execute_measures_for_load_reduction_flg: string;
      a_execute_measures_for_load_reduction_unit_flg: string | null;
      a_yen_of_load_reduction: number | null;
      a_percent_of_load_reduction: number | null;
      i_fix_rate_get_job: string | null;
      a_average_work_duration: string;
      b_average_monthly_wage: string;
      i_train_finished_flg: string;
      ab_support_serious: string;
      mental_disorder_leave_support: string;
      a_wage_up_date_start: string | null;
      a_wage_up_date_end: string | null;
      b_target_kouchin_teacher_date_start: string | null;
      b_target_kouchin_teacher_date_end: string | null;
      work_truncate_minutes: number | null;
      work_start_time: string | null;
      work_end_time: string | null;
      operating_unit_flg?: number;
    };
    facility_group_home?: {
      facility_type: number;
      ave_users_last_fiscal_year: number;
      def_night_support_flg: number;
      night_shift_supporter_flg: number;
      nursing_supporter_flg: number;
      commuter_support_flg: number;
      subtraction_of_large_scale_housing: number;
      night_support_type: number | null;
    };
    facility_seikatsukaigo?: {
      facility_type: number;
      satellite_type_etc_flg: number;
      doctor_placement_flg: number;
      open_short_time: number;
      nursing_supporter: number;
      severe_disability_support_flg: number;
      serious_supporter_flg: number;
    };
    facility_shuroteichaku?: {
      number_of_users: number;
      rate_get_job: number;
      workhardenes_result_flg: number;
      workplace_adaptation_assistant_flg: number;
    };
    facility_tankinyusho?: {
      facility_type: number;
      medical_type: number;
      fulltime_nursing_staff: number;
      serious_disability_flg: number;
      facility_combi_status: number;
      large_scale_flg: number;
      medical_support_flg: number;
      dietician: number;
    };
    facility_jiritsukunren_seikatsu?: {
      facility_type: number;
      standard_overuse_flg: number;
      nursing_supporter_flg: number;
      short_stay: number;
      support_for_mentally_ill_discharge: number;
    };
    facility_shisetsunyusho?: {
      food_expenses: number;
      food_expenses_breakfast: number;
      food_expenses_lunch: number;
      food_expenses_supper: number;
      food_expenses_day: number;
      utility: number;
      utility_costs: number;
      nutritionist_placement: number;
      nighttime_placement: number;
      serious_disability: number;
      regional_life_transition: number;
      nutrition_management_flg: number;
    };
    users: {
      id: number;
      recipient_number: string;
      name_sei: string;
      name_mei: string;
      def_record_work: string;
    }[];
    workBreakTimes: {
      id: number;
      facility_id: number;
      start_time: string;
      end_time: string;
    }[];
    workBreakTimeItems: {
      id: number;
      facility_id: number;
      work_time_item_id: number;
      work_break_time_id: number;
      start_time: string;
      end_time: string;
      applied: number;
    }[];
    workTimeItems: {
      id: number;
      facility_id: number;
      start_time: string | null;
      end_time: string | null;
      day_of_the_week: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
    }[];
    // GHのみ
    units?: {
      id: number | null;
      unit_name: string;
      night_support_type: number | null;
      ave_users_last_fiscal_year: number;
      is_deleted: number;
    }[];
  };
}

/**
 * 事業所情報を取得する
 */
export const getFacility = async (): Promise<
  AxiosResponse<GetFacilityResponse>
> => {
  const url = `${VERSION_URL}/facility`;
  return request.get<GetFacilityResponse>(url);
};

export default getFacility;
