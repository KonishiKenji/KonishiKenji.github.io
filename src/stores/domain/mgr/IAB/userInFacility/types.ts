import { GetFacilityUsersResponse } from "@api/requests/facility/getFacilityUsers";
import { GetFacilityUserTargetIdResponse } from "@api/requests/facility/getFacilityUserTargetId";

/**
 * ActionNames
 */
export const FETCH_STARTED = "IAB/USER_IN_FACILITY/FETCH_STARTED";
export const FETCH_SUCCESS = "IAB/USER_IN_FACILITY/FETCH_SUCCESS";
export const FETCH_FAILED = "IAB/USER_IN_FACILITY/FETCH_FAILED";
export const FETCH_ONE_STARTED = "IAB/USER_IN_FACILITY/FETCH_ONE_STARTED";
export const FETCH_ONE_SUCCESS = "IAB/USER_IN_FACILITY/FETCH_ONE_SUCCESS";
export const FETCH_ONE_FAILED = "IAB/USER_IN_FACILITY/FETCH_ONE_FAILED";
export const CREATE_STARTED = "IAB/USER_IN_FACILITY/CREATE_STARTED";
export const CREATE_SUCCESS = "IAB/USER_IN_FACILITY/CREATE_SUCCESS";
export const CREATE_FAILED = "IAB/USER_IN_FACILITY/CREATE_FAILED";
export const UPDATE_STARTED = "IAB/USER_IN_FACILITY/UPDATE_STARTED";
export const UPDATE_SUCCESS = "IAB/USER_IN_FACILITY/UPDATE_SUCCESS";
export const UPDATE_FAILED = "IAB/USER_IN_FACILITY/UPDATE_FAILED";
export const CLEAR_STARTED = "IAB/USER_IN_FACILITY/CLEAR_STARTED";
export const CLEAR_SUCCESS = "IAB/USER_IN_FACILITY/CLEAR_SUCCESS";
export const CLEAR_FAILED = "IAB/USER_IN_FACILITY/CLEAR_FAILED";

export interface UsersInFacilityState {
  users: GetFacilityUsersResponse["data"];
  user: GetFacilityUserTargetIdResponse["data"];
  doneUpsertUser: boolean;
  userValidation: Partial<{
    // 受給者証番号
    recipient_number: string;
    // 姓
    name_sei: string;
    // 名
    name_mei: string;
    // 姓(カナ)
    name_sei_kana: string;
    // 名(カナ)
    name_mei_kana: string;
    // 性別
    gender: string;
    // サービス開始日 yyyy-mm-dd
    date_begin_in_service: string;
    //  サービス終了日 yyyy-mm-dd
    date_end_in_service: string;
    // 生年月日
    date_birth: string;
    // 住所
    address: string;
    // 郵便番号
    postal_code: string;
    // 年id
    city_id: string;
    // 電話番号
    tel: string;
    // メールアドレス
    email: string;
    // 所得区分(利用者上限月額) 0:負担額0円（所得区分未選択） 1:生活保護(負担額 0円) 2: 低所得(負担額 0円)
    // 3: 一般1(負担上限金額: 9,300円) 4: 一般2(負担上限額 37,200円) 5: 一般2(18,600円) 6: 4,600円
    income_kind: string;
    // 所得区分 1:生活保護 2: 低所得
    income_kind_type: string;
    // 金額: %
    subsidized_percent: string;
    // 金額 ¥
    subsidized_yen: string;
    // 市区町村番号
    subsidized_city_id: string;
    // 支給決定開始日
    date_pay_begin: string;
    // 支給決定終了日
    date_pay_end: string;
    // 上限管理事業所コード null, 1: 上限額管理事業所あり 2: 他事業所が上限を管理
    uplimit_controlled_by: string;
    // サービス提供した事業者番号
    uplimit_facility_number: string;
    // サービス提供した事業者番号2
    uplimit_facility_number2: string;
    // サービス提供した事業者番号3
    uplimit_facility_number3: string;
    // サービス提供した事業者番号4
    uplimit_facility_number4: string;
    // 上限額管理事業所 事業所名
    uplimit_facility_name: string;
    // 上限額管理事業所 事業所名2
    uplimit_facility_name2: string;
    // 上限額管理事業所 事業所名3
    uplimit_facility_name3: string;
    // 上限額管理事業所 事業所名4
    uplimit_facility_name4: string;
    // 個別支援計画-未作成開始日 yyyy-mm-dd
    date_start_not_create_support_plan: string;
    // 上限管理・総費用額(金額)
    uplimit_total_yen: string;
    // 上限管理・総費用額(金額)2
    uplimit_total_yen2: string;
    // 上限管理・総費用額(金額)3
    uplimit_total_yen3: string;
    // 上限管理・総費用額(金額)4
    uplimit_total_yen4: string;
    // 上限管理・利用者負担額(yen)
    uplimit_user_load_yen: string;
    // 上限管理・利用者負担額(yen)2
    uplimit_user_load_yen2: string;
    // 上限管理・利用者負担額(yen)3
    uplimit_user_load_yen3: string;
    // 上限管理・利用者負担額(yen)4
    uplimit_user_load_yen4: string;
    // 負担上限月額の適用開始日 yyyy-mm-dd
    date_begin_user_charge_limit: string;
    // 負担上限月額の適用終了日 yyyy-mm-dd
    date_end_user_charge_limit: string;
    // 障害支援区分の認定有効期間 開始日 yyyy-mm-dd
    date_begin_care_support_auth: string;
    // 障害支援区分の認定有効期間 終了日 yyyy-mm-dd
    date_end_care_support_auth: string;
    // 介護給付費の支給決定期間 開始日 yyyy-mm-dd
    date_begin_care_support_payment: string;
    // 介護給付費の支給決定期間 終了日 yyyy-mm-dd
    date_end_care_support_payment: string;
    // 計画相談支援給付費の支給期間 開始日 yyyy-mm-dd
    date_begin_plan_support_payment: string;
    // 計画相談支援給付費の支給期間 終了日 yyyy-mm-dd
    date_end_plan_support_payment: string;
    // 計画相談支援給付費のモニタリング期間 開始日 yyyy-mm-dd
    date_begin_plan_support_monitor: string;
    // 計画相談支援給付費のモニタリング期間 終了日 yyyy-mm-dd
    date_end_plan_support_monitor: string;
    // 都道府県
    prefecture_name: string;

    // 通所予定日（月）
    mon_scheduled_flg: string;
    // 通所予定日（火）
    tue_scheduled_flg: string;
    // 通所予定日（水）
    wed_scheduled_flg: string;
    // 通所予定日（木）
    thu_scheduled_flg: string;
    // 通所予定日（金）
    fri_scheduled_flg: string;
    // 通所予定日（土）
    sat_scheduled_flg: string;
    // 通所予定日（日）
    sun_scheduled_flg: string;
    // A型減免対象
    a_target_for_reduction_flg: string;
    // 作業時間を管理する
    def_record_work: string;
  }>;
}
