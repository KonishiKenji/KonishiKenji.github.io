import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { Checkbox } from "@constants/variables";

export interface GetFacilityUserTargetIdResponse {
  data: {
    user_in_facility: {
      /* 基本情報 */

      // 施設利用者id
      id?: number;
      // 姓
      name_sei?: string;
      // 名
      name_mei?: string;
      // 姓(カナ)
      name_sei_kana?: string;
      // 名(カナ)
      name_mei_kana?: string;
      // 受給者証番号
      recipient_number?: string;
      // 受給者証未発行、または見学中の利用者である（請求対象外）
      none_recipient_number_flg?: Checkbox;
      // 性別
      gender?: string;
      // 施設id
      facility_id?: number;
      // 身体障害
      classify_physical_flg?: Checkbox;
      // 知的障害
      classify_intelligence_flg?: Checkbox;
      // 精神障害
      classify_mind_flg?: Checkbox;
      // 発達障害
      classify_growth_flg?: Checkbox;
      // 高次脳機能障害
      classify_brain_flg?: Checkbox;
      // 難病等対象者
      classify_incurable_flg?: Checkbox;
      // 障害児
      classify_handicapped_flg?: Checkbox;
      // 生年月日
      date_birth?: string;
      // 郵便番号
      postal_code?: string;
      // 都道府県
      prefecture_name?: string;
      // 市区町村id
      city_id?: number;
      // 住所
      address?: string;
      // 電話番号
      tel?: string;
      // メールアドレス
      email?: string;
      // 保護者名
      guardian_name?: string;
      // 保護者、続柄
      guardian_relation?: string;
      // 保護者 電話番号
      guardian_tel?: string;
      // 備考
      memo?: string;

      /* サービス詳細 */

      // 入居日 yyyy-mm-dd
      date_begin_in_service?: string;
      // 退居日 yyyy-mm-dd
      date_end_in_service?: string;
      // 支給決定開始日
      date_pay_begin?: string;
      // 支給決定終了日
      date_pay_end?: string;
      // 障害支援区分
      classify_disability_support?: string;
      // 負担上限額
      income_kind?: string;
      // 所得区分
      income_kind_type?: string;
      // Checkbox?: 自治体助成金対応
      subsidized_flg?: Checkbox;
      // 金額?: %
      subsidized_percent?: string;
      // 金額 ¥
      subsidized_yen?: string;
      // Select?: 自治体助成金対応(単位 1?: %, 2?: ¥)
      subsidized_unit_flg?: string;
      // 市区町村番号
      subsidized_city_id?: number;
      // 上限額管理事業所有り
      uplimit_facility_flg?: Checkbox;
      // 上限管理事業所コード null, 1?: 上限額管理事業所あり 2?: 他事業所が上限を管理
      uplimit_controlled_by?: string;
      // サービス提供した事業者番号
      uplimit_facility_number?: string;
      // サービス提供した事業者番号2
      uplimit_facility_number2?: string;
      // サービス提供した事業者番号3
      uplimit_facility_number3?: string;
      // サービス提供した事業者番号4
      uplimit_facility_number4?: string;
      // 上限額管理事業所 事業所名
      uplimit_facility_name?: string;
      // 上限額管理事業所 事業所名2
      uplimit_facility_name2?: string;
      // 上限額管理事業所 事業所名3
      uplimit_facility_name3?: string;
      // 上限額管理事業所 事業所名4
      uplimit_facility_name4?: string;
      // 上限管理・総費用額(金額)
      uplimit_total_yen?: string;
      // 上限管理・総費用額(金額)2
      uplimit_total_yen2?: string;
      // 上限管理・総費用額(金額)3
      uplimit_total_yen3?: string;
      // 上限管理・総費用額(金額)4
      uplimit_total_yen4?: string;
      // 上限管理・利用者負担額(yen)
      uplimit_user_load_yen?: string;
      // 上限管理・利用者負担額(yen)2
      uplimit_user_load_yen2?: string;
      // 上限管理・利用者負担額(yen)3
      uplimit_user_load_yen3?: string;
      // 上限管理・利用者負担額(yen)4
      uplimit_user_load_yen4?: string;
      // 利用者負担上限額管理結果
      result_of_management?: string;
      // 自事業所調整上限額
      uplimit_yen?: string;
      // 個別支援計画作成済み
      create_support_plan_flg?: Checkbox;
      // 個別支援計画作成期間開始日
      date_start_not_create_support_plan?: string;
      // 同一法人の事業所から受け入れ(初期加算対象外)
      same_corporation_movement_flg?: Checkbox;
      // 契約支給量
      agreed_by_contract_flg?: string;
      // 食事提供サービス
      def_food?: string;
      // 送迎サービス
      def_pickup?: string;
      // 同一敷地内送迎
      pickup_premises?: string;
      // 日数
      pay_days_agreed?: string;
      // 事業所記入欄番号
      business_number_contract?: string;

      /* 受給者証 */

      // 負担上限月額の適用期間 1: ON, 0: OFF
      user_charge_limit_flg?: Checkbox;
      // 負担上限月額の適用開始日 yyyy-mm-dd
      date_begin_user_charge_limit?: string;
      // 負担上限月額の適用終了日 yyyy-mm-dd
      date_end_user_charge_limit?: string;
      // 食事提供体制加算の適用 1: ON, 0: OFF
      food_serve_addition_flg?: Checkbox;
      // 食事提供体制加算の適用開始日 yyyy-mm-dd
      date_begin_food_serve_addition?: string;
      // 食事提供体制加算の適用終了日 yyyy-mm-dd
      date_end_food_serve_addition?: string;
      // 介護給付費の支給決定フラグ 1?: ON 0?: OFF
      care_support_payment_flg?: Checkbox;
      // 介護給付費の支給決定期間 開始日 yyyy-mm-dd
      date_begin_care_support_payment?: string;
      // 介護給付費の支給決定期間 終了日 yyyy-mm-dd
      date_end_care_support_payment?: string;
      // 障害支援区分の認定有効  1: ON, 0: OFF
      care_support_auth_flg?: Checkbox;
      // 障害支援区分の認定有効期間 開始日 yyyy-mm-dd
      date_begin_care_support_auth?: string;
      // 障害支援区分の認定有効期間 終了日 yyyy-mm-dd
      date_end_care_support_auth?: string;
      // 計画相談支援給付費の支給決定フラグ 1?: ON 0?: OFF
      plan_support_payment_flg?: Checkbox;
      // 計画相談支援給付費の支給期間 開始日 yyyy-mm-dd
      date_begin_plan_support_payment?: string;
      // 計画相談支援給付費の支給期間 終了日 yyyy-mm-dd
      date_end_plan_support_payment?: string;
      // 計画相談支援給付費のモニタリング期間 フラグ 1?: ON 0?: OFF
      plan_support_monitor_flg?: Checkbox;
      // 計画相談支援給付費のモニタリング期間 開始日 yyyy-mm-dd
      date_begin_plan_support_monitor?: string;
      // 計画相談支援給付費のモニタリング期間 終了日 yyyy-mm-dd
      date_end_plan_support_monitor?: string;

      // 通所予定日（月）
      mon_scheduled_flg?: Checkbox;
      // 通所予定日（火）
      tue_scheduled_flg?: Checkbox;
      // 通所予定日（水）
      wed_scheduled_flg?: Checkbox;
      // 通所予定日（木）
      thu_scheduled_flg?: Checkbox;
      // 通所予定日（金）
      fri_scheduled_flg?: Checkbox;
      // 通所予定日（土）
      sat_scheduled_flg?: Checkbox;
      // 通所予定日（日）
      sun_scheduled_flg?: Checkbox;
      // A型減免対象
      a_target_for_reduction_flg?: Checkbox;
      // 作業時間を管理する
      def_record_work?: Checkbox;
    };
    user_in_facility_group_home?: {
      // 施設利用者id
      users_in_facility_id?: number;
      // 障害区分
      disability_class?: string;
      // 強度行動障害者地域移行体制・重度障害支援体制加算
      regional_transfer_for_strong_behavior_type?: string;
      // 地域生活移行個別支援特別加算・精神障害者地域移行体制加算
      mental_disorder_support_type?: string;
      // 所得区分
      income_kind_type?: string;
      // 特定障害者特別給付費
      specified_persons_disabilities_benefits?: string;
      // 運営ユニットid
      facility_unit_id?: string;
    };
    user_in_facility_seikatsukaigo?: Partial<{
      // 施設利用者id
      users_in_facility_id: number;
      // 所得区分
      income_kind: string;
      // 障害区分
      disability_class: string;
      // 重度障害者支援
      severe_disability_support: number;
      // 加算算定開始日
      severe_disability_support_start_date: string;
      // リハビリテーション加算
      rehabilitation: string;
      // リハビリテーション実施計画作成日
      rehabilitation_start_date: string;
    }>;
    user_in_facility_shuroteichaku?: Partial<{
      // 施設利用者id
      users_in_facility_id: number;
      // 所得区分
      income_kind: number;
    }>;
    companies?: Partial<{
      id: number;
      // 施設利用者id
      users_in_facility_id: number;
      // 企業名
      name: string;
      // 企業概要
      overview: string;
      // 住所
      address: string;
      // 所属部署
      department: string;
      // 就労開始年月日
      working_start_date: string;
      // 備考
      remarks: string;
    }>;
    company_persons?: Partial<{
      id: number;
      // 企業情報id
      users_in_facility_companies_id: number;
      // 担当者名
      name: string;
      // 役職
      position: string;
      // 所属部署
      department: string;
      // 関係性
      relationship: number;
      // 電話番号
      tel: string;
      // メールアドレス
      email: string;
    }>[];
    user_in_facility_tankinyusho?: Partial<{
      // 施設利用者id
      users_in_facility_id: number;
      // 支援の種類
      support_type: number;
      // 障害区分
      disability_class: number;
      // 障害児区分
      disability_child_class: number;
      // 重症心身障害フラグ（医療型のみ）
      severely_disabled_flg: number;
      // 利用タイプ（医療型のみ）
      use_type: number;
      // 負担上限月額0円の場合の所得区分
      income_kind: number;
      // 医療的ケア対象支援加算
      medical_care_flg: number;
      // 特別重度支援加算
      special_severe_disability_support: number;
      // 重度障害者支援加算（区分6のみ）
      severe_disability_support: number;
      // 同一敷地内への移動による退所フラグ
      end_in_service_same_corporation_movement_flg: number;
    }>;
    user_in_facility_jiritsukunren_seikatsu?: Partial<{
      // 施設利用者id
      users_in_facility_id: number;
      // 障害区分
      disability_class: number;
      // 所得区分
      income_kind: number;
      // 視覚障害
      blindness_flg: number;
      // 個別訓練支援計画作成済み
      individual_training_implementation_plan_flg: number;
      // 社会生活支援特別加算
      social_life_support_flg: number;
    }>;
    user_in_facility_shisetsunyusho?: Partial<{
      // 施設利用者id
      users_in_facility_id: number;
      // 補足給付
      supplementary_benefit_flg: number;
      // 補足給付金額
      supplementary_benefit_yen: number | null;
      // 障害区分
      disability_class: number;
      // 負担上限月額0円の場合の所得区分
      income_kind: number;
      // 重度障害者支援加算（区分６のみ）
      severe_disability_support: number;
      // 重度障害者支援加算算定開始日
      severe_disability_support2_start_date: string;
      // 地域生活移行個別支援特別加算（Ⅱ）
      regional_life_transition2: number;
      // 食事提供（朝）デフォルト
      food_breakfast_flg: number | null;
      // 食事提供（昼）デフォルト
      food_lunch_flg: number | null;
      // 食事提供（夜）デフォルト
      food_supper_flg: number | null;
    }>;
  };
}

/**
 * 事業所に紐づくユーザーをID指定で取得する。
 * @param id ユーザーID
 */
export const getFacilityUserTargetId = async (
  id: string
): Promise<AxiosResponse<GetFacilityUserTargetIdResponse>> => {
  const url = `${VERSION_URL}/facility/users/${id}`;
  return request.get<GetFacilityUserTargetIdResponse>(url);
};

export default getFacilityUserTargetId;
