import { UsersInFacilityState } from "./types";
import { GetFacilityUserTargetIdResponse } from "@api/requests/facility/getFacilityUserTargetId";
import { UsersValues } from "@initialize/mgr/IAB/users/initialValues";
import { Checkbox } from "@constants/variables";
import { selectDateValueToDatePaddingZero } from "@utils/date";
import { FacilityState } from "../facility/types";
import isEmpty from "lodash-es/isEmpty";

/**
 * Normalized Type
 */
export type NormalizedGetFacilityUserTargetIdResponse = UsersInFacilityState["user"];

/**
 * パラメータ内のundefinedはパラメータから除外する
 * @param data
 */
const removeNullParam = (data: UserInFacilityResult): UserInFacilityResult => {
  const targetParm = {
    user_in_facility: {}
  };
  // 引数のデータからuser_in_facilityを取得
  Object.keys(data).forEach((key) => {
    // user_in_facilityからparamを取得
    Object.keys(data[key]).forEach((param) => {
      if (data[key][param] !== undefined) {
        targetParm[key][param] = data[key][param];
      }
    });
  });

  return targetParm;
};

const incomeKindCodeCondition = (
  incomeKind: string,
  incomeKindType: string
): string => {
  let code = "0";
  if (incomeKind === "1") {
    if (incomeKindType === "1") {
      code = "1";
    } else if (incomeKindType === "2") {
      code = "2";
    } else {
      code = "0"; // 未選択またはそれ以外は0を指定させる
    }
  } else {
    code = incomeKind;
  }
  return code;
};

/**
 * stringの時だけnumberに変換
 */
const stringToNumber = (value?: string): number | undefined => {
  return value !== undefined ? Number(value) : value;
};

/**
 * boolean => "0" or "1"
 */
const booleanToString0or1 = (value?: boolean): string | undefined => {
  return value !== undefined ? `${+value}` : value;
};

/**
 * boolean => 0 or 1
 */
const booleanToNumber0or1 = (value?: boolean): number | undefined => {
  return value !== undefined ? +value : value;
};

const castNumberCheckboxValue = (value?: number | null | undefined): string => {
  if (!value) {
    return Checkbox.OFF;
  }
  return value === 1 ? Checkbox.ON : Checkbox.OFF;
};

const castStringCheckboxValue = (value?: string | null | undefined): string => {
  if (!value) {
    return Checkbox.OFF;
  }
  return value === "1" ? Checkbox.ON : Checkbox.OFF;
};

const castString = (value?: number | null | undefined): string | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }
  return value.toString();
};

const castStringOrNull = (value?: number | null | undefined): string | null => {
  if (value === undefined || value === null) {
    return null;
  }
  return value.toString();
};

/**
 * apiのparamが画面に表示する際にデフォルト値に変換されてしまっているため
 * 差分比較のために変換前に戻すメソッド
 * @param target
 *
 * todo: target の any を GetFacilityUserTargetIdResponse["data"] に修正すると横断的な修正が発生するため様子見
 */
const apiParamFormat = (
  target: any,
  facility: FacilityState
): { user_in_facility: any } => {
  const result = {
    user_in_facility: { ...target.user_in_facility }
  };
  if (result.user_in_facility.subsidized_unit_flg === "1") {
    result.user_in_facility.subsidized_yen = null;
  }
  if (result.user_in_facility.subsidized_unit_flg === "2") {
    result.user_in_facility.subsidized_percent = null;
  }
  if (result.user_in_facility.subsidized_flg === Checkbox.OFF) {
    result.user_in_facility.subsidized_percent = null;
    result.user_in_facility.subsidized_yen = null;
    result.user_in_facility.subsidized_unit_flg = null;
    result.user_in_facility.subsidized_city_id = null;
  }
  if (result.user_in_facility.uplimit_facility_flg === Checkbox.OFF) {
    result.user_in_facility.uplimit_facility_name = null;
    result.user_in_facility.uplimit_facility_name2 = null;
    result.user_in_facility.uplimit_facility_name3 = null;
    result.user_in_facility.uplimit_facility_name4 = null;
    result.user_in_facility.uplimit_controlled_by = null;
    result.user_in_facility.uplimit_facility_number = null;
    result.user_in_facility.uplimit_facility_number2 = null;
    result.user_in_facility.uplimit_facility_number3 = null;
    result.user_in_facility.uplimit_facility_number4 = null;
    result.user_in_facility.uplimit_total_yen = null;
    result.user_in_facility.uplimit_total_yen2 = null;
    result.user_in_facility.uplimit_total_yen3 = null;
    result.user_in_facility.uplimit_total_yen4 = null;
    result.user_in_facility.uplimit_user_load_yen = null;
    result.user_in_facility.uplimit_user_load_yen2 = null;
    result.user_in_facility.uplimit_user_load_yen3 = null;
    result.user_in_facility.uplimit_user_load_yen4 = null;
    result.user_in_facility.uplimit_yen = null;
    result.user_in_facility.result_of_management = null;
  }
  if (result.user_in_facility.uplimit_controlled_by === "2") {
    result.user_in_facility.uplimit_total_yen = null;
    result.user_in_facility.uplimit_user_load_yen = null;
  }
  if (result.user_in_facility.result_of_management !== "3") {
    result.user_in_facility.uplimit_yen = null;
  }
  if (result.user_in_facility.create_support_plan_flg === Checkbox.ON) {
    result.user_in_facility.date_start_not_create_support_plan = null;
  }
  if (!facility.mealSaservedServiceFlag) {
    result.user_in_facility.def_food = null;
  }
  if (!facility.transferServiceFlag) {
    result.user_in_facility.def_pickup = null;
  }
  return result;
};

/**
 * 特定のフラグがOFFの場合、APIに送信する項目を削除する
 * @param target
 */
const resultFormat = (
  target: UserInFacilityResult,
  facility: FacilityState
): { user_in_facility: Record<string, any> } => {
  const result = {
    user_in_facility: { ...target.user_in_facility }
  };

  if (result.user_in_facility.subsidized_unit_flg === "1") {
    result.user_in_facility.subsidized_yen = null;
  }
  if (result.user_in_facility.subsidized_unit_flg === "2") {
    result.user_in_facility.subsidized_percent = null;
  }
  if (result.user_in_facility.agreed_by_contract_flg === "1") {
    result.user_in_facility.pay_days_agreed = null;
    result.user_in_facility.business_number_contract = null;
  }
  if (result.user_in_facility.subsidized_flg === Checkbox.OFF) {
    result.user_in_facility.subsidized_percent = null;
    result.user_in_facility.subsidized_yen = null;
    result.user_in_facility.subsidized_unit_flg = null;
    result.user_in_facility.subsidized_city_id = null;
  }
  if (result.user_in_facility.uplimit_controlled_by === "2") {
    result.user_in_facility.uplimit_total_yen = null;
    result.user_in_facility.uplimit_user_load_yen = null;
  }
  if (result.user_in_facility.result_of_management !== "3") {
    result.user_in_facility.uplimit_yen = null;
  }
  if (result.user_in_facility.uplimit_facility_flg === Checkbox.OFF) {
    result.user_in_facility.uplimit_facility_name = null;
    result.user_in_facility.uplimit_facility_name2 = null;
    result.user_in_facility.uplimit_facility_name3 = null;
    result.user_in_facility.uplimit_facility_name4 = null;
    result.user_in_facility.uplimit_controlled_by = null;
    result.user_in_facility.uplimit_facility_number = null;
    result.user_in_facility.uplimit_facility_number2 = null;
    result.user_in_facility.uplimit_facility_number3 = null;
    result.user_in_facility.uplimit_facility_number4 = null;
    result.user_in_facility.uplimit_total_yen = null;
    result.user_in_facility.uplimit_total_yen2 = null;
    result.user_in_facility.uplimit_total_yen3 = null;
    result.user_in_facility.uplimit_total_yen4 = null;
    result.user_in_facility.uplimit_user_load_yen = null;
    result.user_in_facility.uplimit_user_load_yen2 = null;
    result.user_in_facility.uplimit_user_load_yen3 = null;
    result.user_in_facility.uplimit_user_load_yen4 = null;
    result.user_in_facility.uplimit_yen = null;
    result.user_in_facility.result_of_management = null;
  }
  if (result.user_in_facility.create_support_plan_flg === Checkbox.ON) {
    result.user_in_facility.date_start_not_create_support_plan = null;
  }
  if (!facility.mealSaservedServiceFlag) {
    result.user_in_facility.def_food = null;
  }
  if (!facility.transferServiceFlag) {
    result.user_in_facility.def_pickup = null;
  }
  // データベースで必須パラメータなので0を送る
  if (
    !facility.transferServiceFlag ||
    result.user_in_facility.def_pickup === "0"
  ) {
    result.user_in_facility.pickup_premises = "0";
  }
  if (!result.user_in_facility.user_charge_limit_flg) {
    result.user_in_facility.date_begin_user_charge_limit = null;
    result.user_in_facility.date_end_user_charge_limit = null;
  }
  if (!result.user_in_facility.food_serve_addition_flg) {
    result.user_in_facility.date_begin_food_serve_addition = null;
    result.user_in_facility.date_end_food_serve_addition = null;
  }
  if (!result.user_in_facility.care_support_auth_flg) {
    result.user_in_facility.date_begin_care_support_auth = null;
    result.user_in_facility.date_end_care_support_auth = null;
  }
  if (!result.user_in_facility.care_support_payment_flg) {
    result.user_in_facility.date_begin_care_support_payment = null;
    result.user_in_facility.date_end_care_support_payment = null;
  }
  if (!result.user_in_facility.plan_support_payment_flg) {
    result.user_in_facility.date_begin_plan_support_payment = null;
    result.user_in_facility.date_end_plan_support_payment = null;
  }
  if (!result.user_in_facility.plan_support_monitor_flg) {
    result.user_in_facility.date_begin_plan_support_monitor = null;
    result.user_in_facility.date_end_plan_support_monitor = null;
  }
  return result;
};

/**
 * /mgr/facility/users/{id} の結果
 */
export interface UserInFacilityResult {
  user_in_facility: {
    id?: number | null;
    facility_id?: number | null;
    name_sei?: string | null;
    name_mei?: string | null;
    name_sei_kana?: string | null;
    name_mei_kana?: string | null;
    recipient_number?: string | null;
    none_recipient_number_flg?: number | null;
    gender?: string | null;
    classify_physical_flg?: string | null;
    classify_intelligence_flg?: string | null;
    classify_mind_flg?: string | null;
    classify_growth_flg?: string | null;
    classify_brain_flg?: string | null;
    classify_incurable_flg?: string | null;
    classify_handicapped_flg?: string | null;
    classify_disability_support?: number | null;
    date_birth?: string | null;
    postal_code?: string | null;
    prefecture_name?: string | null;
    city_id?: number | null;
    address?: string | null;
    tel?: string | null;
    email?: string | null;
    guardian_name?: string | null;
    guardian_relation?: string | null;
    guardian_tel?: string | null;
    memo?: string | null;

    /* サービス詳細 */

    date_begin_in_service?: string | null;
    date_end_in_service?: string | null;
    same_corporation_movement_flg?: number | null;
    date_pay_begin?: string | null;
    date_pay_end?: string | null;
    agreed_by_contract_flg?: string | null;
    pay_days_agreed?: string | null;
    business_number_contract?: string | null;
    income_kind?: string | null;
    subsidized_flg?: string | null;
    subsidized_percent?: number | null;
    subsidized_yen?: number | null;
    subsidized_unit_flg?: string | null;
    subsidized_city_id?: number | null;
    uplimit_facility_flg?: string | null;
    uplimit_controlled_by?: string | null;
    uplimit_facility_number?: string | null;
    uplimit_facility_number2?: string | null;
    uplimit_facility_number3?: string | null;
    uplimit_facility_number4?: string | null;
    uplimit_facility_name?: string | null;
    uplimit_facility_name2?: string | null;
    uplimit_facility_name3?: string | null;
    uplimit_facility_name4?: string | null;
    uplimit_total_yen?: number | null;
    uplimit_total_yen2?: number | null;
    uplimit_total_yen3?: number | null;
    uplimit_total_yen4?: number | null;
    uplimit_user_load_yen?: number | null;
    uplimit_user_load_yen2?: number | null;
    uplimit_user_load_yen3?: number | null;
    uplimit_user_load_yen4?: number | null;
    result_of_management?: string | null;
    uplimit_yen?: number | null;
    create_support_plan_flg?: string | null;
    date_start_not_create_support_plan?: string | null;
    def_food?: string | null;
    def_pickup?: string | null;
    pickup_premises?: string | null;

    mon_scheduled_flg?: string | null;
    tue_scheduled_flg?: string | null;
    wed_scheduled_flg?: string | null;
    thu_scheduled_flg?: string | null;
    fri_scheduled_flg?: string | null;
    sat_scheduled_flg?: string | null;
    sun_scheduled_flg?: string | null;
    a_target_for_reduction_flg?: string | null;
    def_record_work?: string | null;

    /* 受給者証 */

    user_charge_limit_flg?: number | null;
    date_begin_user_charge_limit?: string | null;
    date_end_user_charge_limit?: string | null;
    food_serve_addition_flg?: number | null;
    date_begin_food_serve_addition?: string | null;
    date_end_food_serve_addition?: string | null;
    care_support_payment_flg?: number | null;
    date_begin_care_support_payment?: string | null;
    date_end_care_support_payment?: string | null;
    care_support_auth_flg?: number | null;
    date_begin_care_support_auth?: string | null;
    date_end_care_support_auth?: string | null;
    plan_support_payment_flg?: number | null;
    date_begin_plan_support_payment?: string | null;
    date_end_plan_support_payment?: string | null;
    plan_support_monitor_flg?: number | null;
    date_begin_plan_support_monitor?: string | null;
    date_end_plan_support_monitor?: string | null;
  };
}

// パラメータの親子関係マッピング表
const parentParamsMap = {
  user_in_facility: {
    date_end_in_service: {
      key: "date_end_in_service",
      childKeys: ["date_begin_in_service"]
    },
    agreed_by_contract_flg: {
      key: "agreed_by_contract_flg",
      childKeys: ["business_number_contract", "pay_days_agreed"]
    },
    business_number_contract: {
      key: "business_number_contract",
      childKeys: ["pay_days_agreed"]
    },
    pay_days_agreed: {
      key: "pay_days_agreed",
      childKeys: ["business_number_contract"]
    },
    subsidized_flg: {
      key: "subsidized_flg",
      childKeys: [
        "subsidized_unit_flg",
        "subsidized_percent",
        "subsidized_yen",
        "subsidized_city_id"
      ]
    },
    subsidized_unit_flg: {
      key: "subsidized_unit_flg",
      childKeys: ["subsidized_percent", "subsidized_yen", "subsidized_city_id"]
    },
    subsidized_percent: {
      key: "subsidized_percent",
      childKeys: ["subsidized_unit_flg", "subsidized_city_id"]
    },
    subsidized_yen: {
      key: "subsidized_yen",
      childKeys: ["subsidized_unit_flg", "subsidized_city_id"]
    },
    subsidized_city_id: {
      key: "subsidized_city_id",
      childKeys: ["subsidized_percent", "subsidized_yen", "subsidized_unit_flg"]
    },
    uplimit_facility_flg: {
      key: "uplimit_facility_flg",
      childKeys: [
        "uplimit_controlled_by",
        "uplimit_facility_number",
        "uplimit_facility_number2",
        "uplimit_facility_number3",
        "uplimit_facility_number4",
        "uplimit_facility_name",
        "uplimit_facility_name2",
        "uplimit_facility_name3",
        "uplimit_facility_name4",
        "uplimit_total_yen",
        "uplimit_total_yen2",
        "uplimit_total_yen3",
        "uplimit_total_yen4",
        "uplimit_user_load_yen",
        "uplimit_user_load_yen2",
        "uplimit_user_load_yen3",
        "uplimit_user_load_yen4",
        "uplimit_yen",
        "result_of_management"
      ]
    },
    uplimit_controlled_by: {
      key: "uplimit_controlled_by",
      childKeys: [
        "uplimit_facility_number",
        "uplimit_facility_number2",
        "uplimit_facility_number3",
        "uplimit_facility_number4",
        "uplimit_facility_name",
        "uplimit_facility_name2",
        "uplimit_facility_name3",
        "uplimit_facility_name4",
        "uplimit_total_yen",
        "uplimit_total_yen2",
        "uplimit_total_yen3",
        "uplimit_total_yen4",
        "uplimit_user_load_yen",
        "uplimit_user_load_yen2",
        "uplimit_user_load_yen3",
        "uplimit_user_load_yen4",
        "uplimit_yen",
        "result_of_management"
      ]
    },
    result_of_management: {
      key: "result_of_management",
      childKeys: ["uplimit_yen"]
    },
    create_support_plan_flg: {
      key: "create_support_plan_flg",
      childKeys: ["date_start_not_create_support_plan"]
    },
    def_pickup: {
      key: "def_pickup",
      childKeys: ["pickup_premises"]
    },
    pickup_premises: {
      key: "pickup_premises",
      childKeys: ["def_pickup"]
    },
    user_charge_limit_flg: {
      key: "user_charge_limit_flg",
      childKeys: ["date_begin_user_charge_limit", "date_end_user_charge_limit"]
    },
    date_begin_user_charge_limit: {
      key: "date_begin_user_charge_limit",
      childKeys: ["date_end_user_charge_limit"]
    },
    date_end_user_charge_limit: {
      key: "date_end_user_charge_limit",
      childKeys: ["date_begin_user_charge_limit"]
    },
    food_serve_addition_flg: {
      key: "food_serve_addition_flg",
      childKeys: [
        "date_end_food_serve_addition",
        "date_begin_food_serve_addition"
      ]
    },
    date_begin_food_serve_addition: {
      key: "date_begin_food_serve_addition",
      childKeys: ["date_end_food_serve_addition"]
    },
    date_end_food_serve_addition: {
      key: "date_end_food_serve_addition",
      childKeys: ["date_begin_food_serve_addition"]
    },
    care_support_auth_flg: {
      key: "care_support_auth_flg",
      childKeys: ["date_end_care_support_auth", "date_begin_care_support_auth"]
    },
    date_begin_care_support_auth: {
      key: "date_begin_care_support_auth",
      childKeys: ["date_end_care_support_auth"]
    },
    date_end_care_support_auth: {
      key: "date_end_care_support_auth",
      childKeys: ["date_begin_care_support_auth"]
    },
    care_support_payment_flg: {
      key: "care_support_payment_flg",
      childKeys: [
        "date_end_care_support_payment",
        "date_begin_care_support_payment"
      ]
    },
    date_begin_care_support_payment: {
      key: "date_begin_care_support_payment",
      childKeys: ["date_end_care_support_payment"]
    },
    date_end_care_support_payment: {
      key: "date_end_care_support_payment",
      childKeys: ["date_begin_care_support_payment"]
    },
    plan_support_payment_flg: {
      key: "plan_support_payment_flg",
      childKeys: [
        "date_end_plan_support_payment",
        "date_begin_plan_support_payment"
      ]
    },
    date_begin_plan_support_payment: {
      key: "date_begin_plan_support_payment",
      childKeys: ["date_end_plan_support_payment"]
    },
    date_end_plan_support_payment: {
      key: "date_end_plan_support_payment",
      childKeys: ["date_begin_plan_support_payment"]
    },
    plan_support_monitor_flg: {
      key: "plan_support_monitor_flg",
      childKeys: [
        "date_end_plan_support_monitor",
        "date_begin_plan_support_monitor"
      ]
    },
    date_begin_plan_support_monitor: {
      key: "date_begin_plan_support_monitor",
      childKeys: ["date_end_plan_support_monitor"]
    },
    date_end_plan_support_monitor: {
      key: "date_end_plan_support_monitor",
      childKeys: ["date_begin_plan_support_monitor"]
    }
  }
};

/**
 * 子要素の差分判定 子要素に差分がある場合、親要素もパラメータに付与する
 * @param target
 * @param after
 */
const addParentValue = (
  target: UserInFacilityResult,
  after: UserInFacilityResult
): UserInFacilityResult => {
  const result = { ...target };
  Object.keys(parentParamsMap).forEach((uifKey) => {
    Object.keys(parentParamsMap[uifKey]).forEach((paramKey) => {
      const childKeys = parentParamsMap[uifKey][paramKey].childKeys
        ? parentParamsMap[uifKey][paramKey].childKeys
        : [];
      const isDiffChildren: boolean = childKeys.some((childKey: string) => {
        return target[uifKey][childKey] !== undefined;
      });
      if (isDiffChildren) {
        result[uifKey][parentParamsMap[uifKey][paramKey].key] =
          after[uifKey][parentParamsMap[uifKey][paramKey].key];
      }
    });
  });
  return result;
};

export const normalizedGetFacilityUserTargetIdResponse = (
  result: any
): NormalizedGetFacilityUserTargetIdResponse => {
  const userInFacility = result;
  const normalized = {
    user_in_facility: {
      ...userInFacility,
      none_recipient_number_flg: castNumberCheckboxValue(
        userInFacility.none_recipient_number_flg
      ),
      classify_physical_flg: castStringCheckboxValue(
        userInFacility.classify_physical_flg
      ),
      classify_intelligence_flg: castStringCheckboxValue(
        userInFacility.classify_intelligence_flg
      ),
      classify_mind_flg: castStringCheckboxValue(
        userInFacility.classify_mind_flg
      ),
      classify_growth_flg: castStringCheckboxValue(
        userInFacility.classify_growth_flg
      ),
      classify_brain_flg: castStringCheckboxValue(
        userInFacility.classify_brain_flg
      ),
      classify_incurable_flg: castStringCheckboxValue(
        userInFacility.classify_incurable_flg
      ),
      classify_handicapped_flg: castStringCheckboxValue(
        userInFacility.classify_handicapped_flg
      ),
      classify_disability_support: castString(
        userInFacility.classify_disability_support
      ),
      same_corporation_movenent_flg: castNumberCheckboxValue(
        userInFacility.same_corporation_movenent_flg
      ),
      subsidized_flg: castStringCheckboxValue(userInFacility.subsidized_flg),
      subsidized_percent: castString(userInFacility.subsidized_percent),
      subsidized_yen: castString(userInFacility.subsidized_yen),
      uplimit_controlled_by: userInFacility.uplimit_controlled_by || "1",
      uplimit_facility_flg: castStringCheckboxValue(
        userInFacility.uplimit_facility_flg
      ),
      uplimit_total_yen: castStringOrNull(userInFacility.uplimit_total_yen),
      uplimit_total_yen2: castStringOrNull(userInFacility.uplimit_total_yen2),
      uplimit_total_yen3: castStringOrNull(userInFacility.uplimit_total_yen3),
      uplimit_total_yen4: castStringOrNull(userInFacility.uplimit_total_yen4),
      uplimit_user_load_yen: castStringOrNull(
        userInFacility.uplimit_user_load_yen
      ),
      uplimit_user_load_yen2: castStringOrNull(
        userInFacility.uplimit_user_load_yen2
      ),
      uplimit_user_load_yen3: castStringOrNull(
        userInFacility.uplimit_user_load_yen3
      ),
      uplimit_user_load_yen4: castStringOrNull(
        userInFacility.uplimit_user_load_yen4
      ),
      result_of_management: userInFacility.result_of_management || "1",
      uplimit_yen: castString(userInFacility.uplimit_yen),
      create_support_plan_flg: castStringCheckboxValue(
        userInFacility.create_support_plan_flg
      ),
      def_food: castString(userInFacility.def_food),
      def_pickup: castString(userInFacility.def_pickup),
      pickup_premises: castString(userInFacility.pickup_premises),
      user_charge_limit_flg: castNumberCheckboxValue(
        userInFacility.user_charge_limit_flg
      ),
      food_serve_addition_flg: castNumberCheckboxValue(
        userInFacility.food_serve_addition_flg
      ),
      care_support_payment_flg: castNumberCheckboxValue(
        userInFacility.care_support_payment_flg
      ),
      care_support_auth_flg: castNumberCheckboxValue(
        userInFacility.care_support_auth_flg
      ),
      plan_support_payment_flg: castNumberCheckboxValue(
        userInFacility.plan_support_payment_flg
      ),
      plan_support_monitor_flg: castNumberCheckboxValue(
        userInFacility.plan_support_monitor_flg
      ),
      mon_scheduled_flg: castStringCheckboxValue(
        userInFacility.mon_scheduled_flg
      ),
      tue_scheduled_flg: castStringCheckboxValue(
        userInFacility.tue_scheduled_flg
      ),
      wed_scheduled_flg: castStringCheckboxValue(
        userInFacility.wed_scheduled_flg
      ),
      thu_scheduled_flg: castStringCheckboxValue(
        userInFacility.thu_scheduled_flg
      ),
      fri_scheduled_flg: castStringCheckboxValue(
        userInFacility.fri_scheduled_flg
      ),
      sat_scheduled_flg: castStringCheckboxValue(
        userInFacility.sat_scheduled_flg
      ),
      sun_scheduled_flg: castStringCheckboxValue(
        userInFacility.sun_scheduled_flg
      ),
      income_kind:
        userInFacility.income_kind === "1" || userInFacility.income_kind === "2"
          ? "1"
          : castString(userInFacility.income_kind),
      income_kind_type:
        userInFacility.income_kind === "1" || userInFacility.income_kind === "2"
          ? castString(userInFacility.income_kind)
          : undefined
    }
  };
  return normalized;
};

/**
 * 差分抽出のメソッド
 */
const removeNoChangeData = (
  apiValues: GetFacilityUserTargetIdResponse["data"],
  formValues: UserInFacilityResult,
  facility: FacilityState
): UserInFacilityResult => {
  const target = {
    user_in_facility: {
      id: formValues.user_in_facility.id,
      facility_id: formValues.user_in_facility.facility_id,
      name_sei: undefined,
      name_mei: undefined,
      name_sei_kana: undefined,
      name_mei_kana: undefined,
      recipient_number: undefined,
      none_recipient_number_flg: undefined,
      gender: undefined,
      classify_physical_flg: undefined,
      classify_intelligence_flg: undefined,
      classify_mind_flg: undefined,
      classify_growth_flg: undefined,
      classify_brain_flg: undefined,
      classify_incurable_flg: undefined,
      classify_handicapped_flg: undefined,
      date_birth: formValues.user_in_facility.date_birth,
      postal_code: undefined,
      prefecture_name: undefined,
      city_id: undefined,
      address: undefined,
      tel: undefined,
      email: undefined,
      guardian_name: undefined,
      guardian_relation: undefined,
      guardian_tel: undefined,
      memo: undefined,

      /* サービス詳細 */
      date_begin_in_service: formValues.user_in_facility.date_begin_in_service,
      date_end_in_service: undefined,
      same_corporation_movement_flg: undefined,
      date_pay_begin: formValues.user_in_facility.date_pay_begin,
      date_pay_end: formValues.user_in_facility.date_pay_end,
      classify_disability_support: undefined,
      agreed_by_contract_flg: undefined,
      pay_days_agreed: undefined,
      business_number_contract: undefined,
      income_kind: formValues.user_in_facility.income_kind,
      subsidized_flg: undefined,
      subsidized_percent: undefined,
      subsidized_yen: undefined,
      subsidized_unit_flg: undefined,
      subsidized_city_id: undefined,
      uplimit_facility_flg: undefined,
      uplimit_controlled_by: undefined,
      uplimit_facility_number: undefined,
      uplimit_facility_number2: undefined,
      uplimit_facility_number3: undefined,
      uplimit_facility_number4: undefined,
      uplimit_facility_name: undefined,
      uplimit_facility_name2: undefined,
      uplimit_facility_name3: undefined,
      uplimit_facility_name4: undefined,
      uplimit_total_yen: undefined,
      uplimit_total_yen2: undefined,
      uplimit_total_yen3: undefined,
      uplimit_total_yen4: undefined,
      uplimit_user_load_yen: undefined,
      uplimit_user_load_yen2: undefined,
      uplimit_user_load_yen3: undefined,
      uplimit_user_load_yen4: undefined,
      result_of_management: undefined,
      uplimit_yen: undefined,
      create_support_plan_flg: undefined,
      date_start_not_create_support_plan:
        formValues.user_in_facility.create_support_plan_flg === "0"
          ? formValues.user_in_facility.date_start_not_create_support_plan
          : undefined,
      def_food: undefined,
      def_pickup: undefined,
      pickup_premises: undefined,
      mon_scheduled_flg: undefined,
      tue_scheduled_flg: undefined,
      wed_scheduled_flg: undefined,
      thu_scheduled_flg: undefined,
      fri_scheduled_flg: undefined,
      sat_scheduled_flg: undefined,
      sun_scheduled_flg: undefined,
      a_target_for_reduction_flg:
        formValues.user_in_facility.a_target_for_reduction_flg,
      def_record_work: formValues.user_in_facility.def_record_work,

      /* 受給者証 */
      user_charge_limit_flg: undefined,
      date_begin_user_charge_limit: undefined,
      date_end_user_charge_limit: undefined,
      food_serve_addition_flg: undefined,
      date_begin_food_serve_addition: undefined,
      date_end_food_serve_addition: undefined,
      care_support_payment_flg: undefined,
      date_begin_care_support_payment: undefined,
      date_end_care_support_payment: undefined,
      care_support_auth_flg: undefined,
      date_begin_care_support_auth: undefined,
      date_end_care_support_auth: undefined,
      plan_support_payment_flg: undefined,
      date_begin_plan_support_payment: undefined,
      date_end_plan_support_payment: undefined,
      plan_support_monitor_flg: undefined,
      date_begin_plan_support_monitor: undefined,
      date_end_plan_support_monitor: undefined
    }
  };

  const apiValue = apiParamFormat(apiValues, facility);
  const form = formValues.user_in_facility;
  // サービス提供終了日のみAPIの型と合わないため
  form.date_end_in_service =
    form.date_end_in_service === "" ? null : form.date_end_in_service;
  // 差分の項目を抽出 必須項目は除く
  Object.keys(target).forEach((key) => {
    Object.keys(target[key]).forEach((param) => {
      if (target[key][param] === undefined) {
        const left = `${apiValue[key][param]}`;
        const right = `${formValues[key][param]}`;
        if (left !== right) {
          target[key][param] = formValues[key][param];
        } else {
          target[key][param] = undefined;
        }
      }
    });
  });

  const diffDate = addParentValue(target, formValues);
  // 特殊項目の差分比較
  // 自治体助成金の単位に変更があったら隠れている項目をnullにして送信する
  if (diffDate.user_in_facility.subsidized_unit_flg === "1") {
    diffDate.user_in_facility.subsidized_yen = null;
  }
  if (diffDate.user_in_facility.subsidized_unit_flg === "2") {
    diffDate.user_in_facility.subsidized_percent = null;
  }
  // 上限管理事業所ありの項目に変更があったら
  // 事業所番号と事業所名は入力値を送信する
  if (diffDate.user_in_facility.uplimit_facility_flg === "1") {
    diffDate.user_in_facility.uplimit_facility_number =
      formValues.user_in_facility.uplimit_facility_number;
    diffDate.user_in_facility.uplimit_facility_number2 =
      formValues.user_in_facility.uplimit_facility_number2;
    diffDate.user_in_facility.uplimit_facility_number3 =
      formValues.user_in_facility.uplimit_facility_number3;
    diffDate.user_in_facility.uplimit_facility_number4 =
      formValues.user_in_facility.uplimit_facility_number4;
    diffDate.user_in_facility.uplimit_facility_name =
      formValues.user_in_facility.uplimit_facility_name;
    diffDate.user_in_facility.uplimit_facility_name2 =
      formValues.user_in_facility.uplimit_facility_name2;
    diffDate.user_in_facility.uplimit_facility_name3 =
      formValues.user_in_facility.uplimit_facility_name3;
    diffDate.user_in_facility.uplimit_facility_name4 =
      formValues.user_in_facility.uplimit_facility_name4;
  }
  return diffDate;
};

/**
 * フォームの結果をAPIに送れる形式に整形
 */
export const normalizeFormValue = (
  values: UsersValues,
  facility: FacilityState,
  params?: GetFacilityUserTargetIdResponse["data"]
): UserInFacilityResult => {
  const target: UserInFacilityResult = {
    user_in_facility: {
      id: params ? params.user_in_facility.id : undefined,
      facility_id: params ? params.user_in_facility.facility_id : undefined,

      /* 基本情報 */
      name_sei: values.basic.nameSei,
      name_mei: values.basic.nameMei,
      name_sei_kana: values.basic.nameSeiKana,
      name_mei_kana: values.basic.nameMeiKana,
      recipient_number: isEmpty(values.basic.recipientNumber)
        ? null
        : values.basic.recipientNumber,
      none_recipient_number_flg: booleanToNumber0or1(
        values.basic.noneRecipientNumberFlag
      ),
      gender: values.basic.gender,
      classify_physical_flg: booleanToString0or1(
        values.basic.classifyPhysicalFlag
      ),
      classify_intelligence_flg: booleanToString0or1(
        values.basic.classifyIntelligenceFlag
      ),
      classify_mind_flg: booleanToString0or1(values.basic.classifyMindFlag),
      classify_growth_flg: booleanToString0or1(values.basic.classifyGrowthFlag),
      classify_brain_flg: booleanToString0or1(values.basic.classifyBrainFlag),
      classify_incurable_flg: booleanToString0or1(
        values.basic.classifyIncurableFlag
      ),
      classify_handicapped_flg: booleanToString0or1(
        values.basic.classifyHandicappedFlag
      ),
      date_birth: selectDateValueToDatePaddingZero(values.basic.dateOfBirth),
      postal_code: values.basic.postalCode,
      prefecture_name: values.basic.prefectureId,
      city_id: stringToNumber(values.basic.cityId),
      address: values.basic.restAddress,
      tel: isEmpty(values.basic.tel) ? null : values.basic.tel,
      email: isEmpty(values.basic.email) ? null : values.basic.email,
      guardian_name: isEmpty(values.basic.guardianName)
        ? null
        : values.basic.guardianName,
      guardian_relation: isEmpty(values.basic.guardianRelation)
        ? null
        : values.basic.guardianRelation,
      guardian_tel: isEmpty(values.basic.guardianTel)
        ? null
        : values.basic.guardianTel,
      memo: isEmpty(values.basic.memo) ? null : values.basic.memo,

      /* サービス詳細 */
      date_begin_in_service: selectDateValueToDatePaddingZero(
        values.serviceUse.inServiceStartDate
      ),
      date_end_in_service: selectDateValueToDatePaddingZero(
        values.serviceUse.inServiceEndDate
      ),
      classify_disability_support: stringToNumber(
        values.serviceUse.classifyDisabilitySupport
      ),
      same_corporation_movement_flg: booleanToNumber0or1(
        values.serviceUse.sameCorporationMovementFlg
      ),
      date_pay_begin: selectDateValueToDatePaddingZero(
        values.serviceUse.payStartDate
      ),
      date_pay_end: selectDateValueToDatePaddingZero(
        values.serviceUse.payEndDate
      ),
      agreed_by_contract_flg: values.serviceUse.agreedByContractFlg,
      pay_days_agreed: values.serviceUse.payDaysAgreed,
      business_number_contract: values.serviceUse.businessNumberContract,
      income_kind: incomeKindCodeCondition(
        values.serviceUse.incomeKind,
        values.serviceUse.incomeKindType
      ),
      subsidized_flg: booleanToString0or1(values.serviceUse.subsidizedFlag),
      subsidized_percent:
        values.serviceUse.subsidizedUnit === "1"
          ? stringToNumber(values.serviceUse.subsidizedPercent)
          : undefined,
      subsidized_yen:
        values.serviceUse.subsidizedUnit === "2"
          ? stringToNumber(values.serviceUse.subsidizedYen)
          : undefined,
      subsidized_unit_flg: values.serviceUse.subsidizedUnit,
      subsidized_city_id: stringToNumber(values.serviceUse.subsidizedCityId),
      uplimit_facility_flg: booleanToString0or1(
        values.serviceUse.upperLimitFacilityFlag
      ),
      uplimit_controlled_by: values.serviceUse.upperLimitControlledBy,
      uplimit_facility_number: values.serviceUse.upperLimitFacilityNumber,
      uplimit_facility_number2: values.serviceUse.upperLimitFacilityNumber2,
      uplimit_facility_number3: values.serviceUse.upperLimitFacilityNumber3,
      uplimit_facility_number4: values.serviceUse.upperLimitFacilityNumber4,
      uplimit_facility_name: values.serviceUse.upperLimitFacilityName,
      uplimit_facility_name2: values.serviceUse.upperLimitFacilityName2,
      uplimit_facility_name3: values.serviceUse.upperLimitFacilityName3,
      uplimit_facility_name4: values.serviceUse.upperLimitFacilityName4,
      uplimit_total_yen: isEmpty(values.serviceUse.upperLimitTotalYen)
        ? null
        : stringToNumber(values.serviceUse.upperLimitTotalYen),
      uplimit_total_yen2: isEmpty(values.serviceUse.upperLimitTotalYen2)
        ? null
        : stringToNumber(values.serviceUse.upperLimitTotalYen2),
      uplimit_total_yen3: isEmpty(values.serviceUse.upperLimitTotalYen3)
        ? null
        : stringToNumber(values.serviceUse.upperLimitTotalYen3),
      uplimit_total_yen4: isEmpty(values.serviceUse.upperLimitTotalYen4)
        ? null
        : stringToNumber(values.serviceUse.upperLimitTotalYen4),
      uplimit_user_load_yen: isEmpty(values.serviceUse.upperLimitUserLoadYen)
        ? null
        : stringToNumber(values.serviceUse.upperLimitUserLoadYen),
      uplimit_user_load_yen2: isEmpty(values.serviceUse.upperLimitUserLoadYen2)
        ? null
        : stringToNumber(values.serviceUse.upperLimitUserLoadYen2),
      uplimit_user_load_yen3: isEmpty(values.serviceUse.upperLimitUserLoadYen3)
        ? null
        : stringToNumber(values.serviceUse.upperLimitUserLoadYen3),
      uplimit_user_load_yen4: isEmpty(values.serviceUse.upperLimitUserLoadYen4)
        ? null
        : stringToNumber(values.serviceUse.upperLimitUserLoadYen4),
      result_of_management: values.serviceUse.resultOfManagement,
      uplimit_yen: stringToNumber(values.serviceUse.upperLimitYen),
      create_support_plan_flg: values.serviceUse.createSupportPlanFlag
        ? Checkbox.OFF
        : Checkbox.ON,
      date_start_not_create_support_plan: selectDateValueToDatePaddingZero(
        values.serviceUse.notCreateSupportPlanStartDate
      ),
      def_food: values.serviceUse.defFood,
      def_pickup: values.serviceUse.defPickup,
      pickup_premises: values.serviceUse.pickupPremises,

      mon_scheduled_flg: booleanToString0or1(values.serviceUse.monScheduledFlg),
      tue_scheduled_flg: booleanToString0or1(values.serviceUse.tueScheduledFlg),
      wed_scheduled_flg: booleanToString0or1(values.serviceUse.wedScheduledFlg),
      thu_scheduled_flg: booleanToString0or1(values.serviceUse.thuScheduledFlg),
      fri_scheduled_flg: booleanToString0or1(values.serviceUse.friScheduledFlg),
      sat_scheduled_flg: booleanToString0or1(values.serviceUse.satScheduledFlg),
      sun_scheduled_flg: booleanToString0or1(values.serviceUse.sunScheduledFlg),
      a_target_for_reduction_flg: booleanToString0or1(
        values.serviceUse.aTargetForReductionFlg
      ),
      def_record_work: booleanToString0or1(values.serviceUse.defRecordWork),

      /* 受給者証 */
      user_charge_limit_flg: booleanToNumber0or1(
        values.recipientCertificate.userChargeLimitFlag
      ),
      date_begin_user_charge_limit: selectDateValueToDatePaddingZero(
        values.recipientCertificate.userChargeLimitStartDate
      ),
      date_end_user_charge_limit: selectDateValueToDatePaddingZero(
        values.recipientCertificate.userChargeLimitEndDate
      ),
      food_serve_addition_flg: booleanToNumber0or1(
        values.recipientCertificate.foodServeAdditionFlg
      ),
      date_begin_food_serve_addition: selectDateValueToDatePaddingZero(
        values.recipientCertificate.foodServeAdditionStartDate
      ),
      date_end_food_serve_addition: selectDateValueToDatePaddingZero(
        values.recipientCertificate.foodServeAdditionEndDate
      ),
      care_support_payment_flg: booleanToNumber0or1(
        values.recipientCertificate.careSupportPaymentFlag
      ),
      date_begin_care_support_payment: selectDateValueToDatePaddingZero(
        values.recipientCertificate.careSupportPaymentStartDate
      ),
      date_end_care_support_payment: selectDateValueToDatePaddingZero(
        values.recipientCertificate.careSupportPaymentEndDate
      ),
      care_support_auth_flg: booleanToNumber0or1(
        values.recipientCertificate.careSupportAuthFlag
      ),
      date_begin_care_support_auth: selectDateValueToDatePaddingZero(
        values.recipientCertificate.careSupportAuthStartDate
      ),
      date_end_care_support_auth: selectDateValueToDatePaddingZero(
        values.recipientCertificate.careSupportAuthEndDate
      ),
      plan_support_payment_flg: booleanToNumber0or1(
        values.recipientCertificate.planSupportPaymentFlag
      ),
      date_begin_plan_support_payment: selectDateValueToDatePaddingZero(
        values.recipientCertificate.planSupportPaymentStartDate
      ),
      date_end_plan_support_payment: selectDateValueToDatePaddingZero(
        values.recipientCertificate.planSupportPaymentEndDate
      ),
      plan_support_monitor_flg: booleanToNumber0or1(
        values.recipientCertificate.planSupportMonitorFlag
      ),
      date_begin_plan_support_monitor: selectDateValueToDatePaddingZero(
        values.recipientCertificate.planSupportMonitorStartDate
      ),
      date_end_plan_support_monitor: selectDateValueToDatePaddingZero(
        values.recipientCertificate.planSupportMonitorEndDate
      )
    }
  };

  const normalized: UserInFacilityResult = resultFormat(target, facility);
  let requestData = normalized;
  // 更新の場合は差分抽出のメソッドへ
  if (params) {
    const targetParam = removeNoChangeData(params, normalized, facility);
    requestData = removeNullParam(targetParam);
  }
  return requestData;
};
