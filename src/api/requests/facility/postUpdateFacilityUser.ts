import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface PostUpdateFacilityUserParams {
  user_in_facility: {
    id?: number | null | undefined;
    name_sei?: string | null | undefined;
    name_mei?: string | null | undefined;
    name_sei_kana?: string | null | undefined;
    name_mei_kana?: string | null | undefined;
    recipient_number?: string | null | undefined;
    none_recipient_number_flg?: number | null | undefined;
    gender?: string | null | undefined;
    classify_physical_flg?: string | null | undefined;
    classify_intelligence_flg?: string | null | undefined;
    classify_mind_flg?: string | null | undefined;
    classify_growth_flg?: string | null | undefined;
    classify_brain_flg?: string | null | undefined;
    classify_incurable_flg?: string | null | undefined;
    classify_handicapped_flg?: string | null | undefined;
    date_birth?: string | null | undefined;
    postal_code?: string | null | undefined;
    prefecture_name?: string | null | undefined;
    city_id?: number | null | undefined;
    address?: string | null | undefined;
    tel?: string | null | undefined;
    email?: string | null | undefined;
    guardian_name?: string | null | undefined;
    guardian_relation?: string | null | undefined;
    guardian_tel?: string | null | undefined;
    memo?: string | null | undefined;

    date_begin_in_service?: string | null | undefined;
    date_end_in_service?: string | null | undefined;
    date_pay_begin?: string | null | undefined;
    date_pay_end?: string | null | undefined;
    classify_disability_support?: number | null | undefined;
    income_kind?: string | null | undefined;
    subsidized_flg?: string | null | undefined;
    subsidized_percent?: number | null | undefined;
    subsidized_yen?: number | null | undefined;
    subsidized_unit_flg?: string | null | undefined;
    subsidized_city_id?: number | null | undefined;
    uplimit_facility_flg?: string | null | undefined;
    uplimit_controlled_by?: string | null | undefined;
    uplimit_facility_number?: string | null | undefined;
    uplimit_facility_number2?: string | null | undefined;
    uplimit_facility_number3?: string | null | undefined;
    uplimit_facility_number4?: string | null | undefined;
    uplimit_facility_name?: string | null | undefined;
    uplimit_facility_name2?: string | null | undefined;
    uplimit_facility_name3?: string | null | undefined;
    uplimit_facility_name4?: string | null | undefined;
    uplimit_total_yen?: number | null | undefined;
    uplimit_total_yen2?: number | null | undefined;
    uplimit_total_yen3?: number | null | undefined;
    uplimit_total_yen4?: number | null | undefined;
    uplimit_user_load_yen?: number | null | undefined;
    uplimit_user_load_yen2?: number | null | undefined;
    uplimit_user_load_yen3?: number | null | undefined;
    uplimit_user_load_yen4?: number | null | undefined;
    result_of_management?: string | null | undefined;
    uplimit_yen?: number | null | undefined;
    create_support_plan_flg?: string | null | undefined;
    date_start_not_create_support_plan?: string | null | undefined;
    same_corporation_movement_flg?: number | null | undefined;
    agreed_by_contract_flg?: string | null | undefined;
    def_food?: string | null | undefined;
    def_pickup?: string | null | undefined;
    pickup_premises?: string | null | undefined;
    pay_days_agreed?: string | null | undefined;
    business_number_contract?: string | null | undefined;

    user_charge_limit_flg?: number | null | undefined;
    date_begin_user_charge_limit?: string | null | undefined;
    date_end_user_charge_limit?: string | null | undefined;
    food_serve_addition_flg?: number | null | undefined;
    date_begin_food_serve_addition?: string | null | undefined;
    date_end_food_serve_addition?: string | null | undefined;
    care_support_payment_flg?: number | null | undefined;
    date_begin_care_support_payment?: string | null | undefined;
    date_end_care_support_payment?: string | null | undefined;
    care_support_auth_flg?: number | null | undefined;
    date_begin_care_support_auth?: string | null | undefined;
    date_end_care_support_auth?: string | null | undefined;
    plan_support_payment_flg?: number | null | undefined;
    date_begin_plan_support_payment?: string | null | undefined;
    date_end_plan_support_payment?: string | null | undefined;
    plan_support_monitor_flg?: number | null | undefined;
    date_begin_plan_support_monitor?: string | null | undefined;
    date_end_plan_support_monitor?: string | null | undefined;
    facility_id?: number | null | undefined;

    mon_scheduled_flg?: string | null | undefined;
    tue_scheduled_flg?: string | null | undefined;
    wed_scheduled_flg?: string | null | undefined;
    thu_scheduled_flg?: string | null | undefined;
    fri_scheduled_flg?: string | null | undefined;
    sat_scheduled_flg?: string | null | undefined;
    sun_scheduled_flg?: string | null | undefined;
  };
  user_in_facility_group_home?: {
    users_in_facility_id?: number | null | undefined;
    disability_class?: number | null | undefined;
    regional_transfer_for_strong_behavior_type: number | null | undefined;
    mental_disorder_support_type: number | null | undefined;
    income_kind_type?: number | null | undefined;
    specified_persons_disabilities_benefits?: number | null | undefined;
    facility_unit_id?: number;
  };
  user_in_facility_seikatsukaigo?: Partial<{
    users_in_facility_id: number | null;
    disability_class: number | null;
    severe_disability_support: number | null;
    severe_disability_support_start_date: string | null;
    rehabilitation: number | null;
    rehabilitation_start_date: string | null;
    income_kind: number | null;
  }>;
  user_in_facility_shuroteichaku?: Partial<{
    users_in_facility_id: number | null;
    income_kind: number | null;
  }>;
  companies?: Partial<{
    id: number | null;
    users_in_facility_id: number | null;
    name: string | null;
    overview: string | null;
    address: string | null;
    department: string | null;
    working_start_date: string | null;
    remarks: string | null;
  }>;
  company_persons?: Partial<{
    id: number | null;
    users_in_facility_companies_id: number | null;
    name: string | null;
    position: string | null;
    department: string | null;
    relationship: number | null;
    tel: string | null;
    email: string | null;
  }>[];
  user_in_facility_tankinyusho?: Partial<{
    users_in_facility_id: number;
    support_type: number;
    disability_class: number;
    disability_child_class: number;
    severely_disabled_flg: number | null;
    use_type: number;
    income_kind: number;
    medical_care_flg: number;
    special_severe_disability_support: number;
    severe_disability_support: number;
    end_in_service_same_corporation_movement_flg: number;
  }>;
  user_in_facility_jiritsukunren_seikatsu?: Partial<{
    users_in_facility_id: number | null;
    disability_class: number | null;
    income_kind: number | null;
    blindness_flg: number | null;
    individual_training_implementation_plan_flg: number | null;
    social_life_support_flg: number | null;
  }>;
  user_in_facility_shisetsunyusho?: Partial<{
    users_in_facility_id: number;
    supplementary_benefit_flg: number;
    supplementary_benefit_yen: number | null;
    disability_class: number;
    income_kind: number;
    severe_disability_support: number;
    severe_disability_support2_start_date: string | null;
    regional_life_transition2: number;
    food_breakfast_flg: number | null;
    food_lunch_flg: number | null;
    food_supper_flg: number | null;
  }>;
}

/**
 * 事業所情報に紐付く利用者情報を更新する
 * @param id : 利用者ID
 * @param values : 更新する利用者情報
 */
export const postUpdateFacilityUser = async (
  id: number | undefined,
  values: PostUpdateFacilityUserParams
): Promise<AxiosResponse<unknown>> => {
  const url = `${VERSION_URL}/facility/users/${id}`;
  return request.post(url, values);
};

export default postUpdateFacilityUser;
