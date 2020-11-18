import { UsersInFacilityState } from "./types";
import { GetFacilityUserTargetIdResponse } from "@api/requests/facility/getFacilityUserTargetId";
import { UsersValues } from "@initialize/mgr/GroupHome/users/initialValues";
import { Checkbox } from "@constants/variables";
import { selectDateValueToDate } from "@utils/date";

/**
 * Normalized Type
 */
export type NormalizedGetFacilityUserTargetIdResponse = UsersInFacilityState["user"];

export const normalizedGetFacilityUserTargetIdResponse = (
  result: any // TODO: 型定義
): NormalizedGetFacilityUserTargetIdResponse => {
  const userInFacility = result.user_in_facility;
  const userInFacilityGroupHome = result.user_in_facility_group_home;
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
      subsidized_flg: castStringCheckboxValue(userInFacility.subsidized_flg),
      subsidized_percent: castString(userInFacility.subsidized_percent),
      subsidized_yen: castString(userInFacility.subsidized_yen),
      uplimit_controlled_by: userInFacility.uplimit_controlled_by || "1",
      uplimit_facility_flg: castStringCheckboxValue(
        userInFacility.uplimit_facility_flg
      ),
      uplimit_total_yen: castString(userInFacility.uplimit_total_yen),
      uplimit_user_load_yen: castString(userInFacility.uplimit_user_load_yen),
      uplimit_yen: castString(userInFacility.uplimit_yen),
      create_support_plan_flg: castStringCheckboxValue(
        userInFacility.create_support_plan_flg
      ),
      user_charge_limit_flg: castNumberCheckboxValue(
        userInFacility.user_charge_limit_flg
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
      )
    },
    user_in_facility_group_home: {
      ...userInFacilityGroupHome,
      disability_class: castString(userInFacilityGroupHome.disability_class),
      regional_transfer_for_strong_behavior_type: castString(
        userInFacilityGroupHome.regional_transfer_for_strong_behavior_type
      ),
      mental_disorder_support_type: castString(
        userInFacilityGroupHome.mental_disorder_support_type
      ),
      income_kind_type: castString(userInFacilityGroupHome.income_kind_type),
      specified_persons_disabilities_benefits: castString(
        userInFacilityGroupHome.specified_persons_disabilities_benefits
      ),
      facility_unit_id: castString(userInFacilityGroupHome.facility_unit_id)
    }
  };
  return normalized;
};

/**
 * フォームの結果をAPIに送れる形式に整形
 */
export const normalizeFormValue = (
  values: UsersValues,
  operatingUnitFlg: boolean,
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
      recipient_number: values.basic.recipientNumber,
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
      date_birth: selectDateValueToDate(values.basic.dateOfBirth),
      postal_code: values.basic.postalCode,
      prefecture_name: values.basic.prefectureId,
      city_id: stringToNumber(values.basic.cityId),
      address: values.basic.restAddress,
      tel: values.basic.tel,
      email: values.basic.email,
      guardian_name: values.basic.guardianName,
      guardian_relation: values.basic.guardianRelation,
      guardian_tel: values.basic.guardianTel,
      memo: values.basic.memo,

      /* サービス詳細 */
      date_begin_in_service: selectDateValueToDate(
        values.serviceUse.inServiceStartDate
      ),
      date_end_in_service: selectDateValueToDate(
        values.serviceUse.inServiceEndDate
      ),
      date_pay_begin: selectDateValueToDate(values.serviceUse.payStartDate),
      date_pay_end: selectDateValueToDate(values.serviceUse.payEndDate),
      income_kind: values.serviceUse.incomeKind,
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
      uplimit_facility_name: values.serviceUse.upperLimitFacilityName,
      uplimit_total_yen: stringToNumber(values.serviceUse.upperLimitTotalYen),
      uplimit_user_load_yen: stringToNumber(
        values.serviceUse.upperLimitUserLoadYen
      ),
      result_of_management: values.serviceUse.resultOfManagement,
      uplimit_yen: stringToNumber(values.serviceUse.upperLimitYen),
      create_support_plan_flg: values.serviceUse.createSupportPlanFlag
        ? Checkbox.OFF
        : Checkbox.ON,
      date_start_not_create_support_plan: selectDateValueToDate(
        values.serviceUse.notCreateSupportPlanStartDate
      ),

      /* 受給者証 */
      user_charge_limit_flg: booleanToNumber0or1(
        values.recipientCertificate.userChargeLimitFlag
      ),
      date_begin_user_charge_limit: selectDateValueToDate(
        values.recipientCertificate.userChargeLimitStartDate
      ),
      date_end_user_charge_limit: selectDateValueToDate(
        values.recipientCertificate.userChargeLimitEndDate
      ),
      care_support_payment_flg: booleanToNumber0or1(
        values.recipientCertificate.careSupportPaymentFlag
      ),
      date_begin_care_support_payment: selectDateValueToDate(
        values.recipientCertificate.careSupportPaymentStartDate
      ),
      date_end_care_support_payment: selectDateValueToDate(
        values.recipientCertificate.careSupportPaymentEndDate
      ),
      care_support_auth_flg: booleanToNumber0or1(
        values.recipientCertificate.careSupportAuthFlag
      ),
      date_begin_care_support_auth: selectDateValueToDate(
        values.recipientCertificate.careSupportAuthStartDate
      ),
      date_end_care_support_auth: selectDateValueToDate(
        values.recipientCertificate.careSupportAuthEndDate
      ),
      plan_support_payment_flg: booleanToNumber0or1(
        values.recipientCertificate.planSupportPaymentFlag
      ),
      date_begin_plan_support_payment: selectDateValueToDate(
        values.recipientCertificate.planSupportPaymentStartDate
      ),
      date_end_plan_support_payment: selectDateValueToDate(
        values.recipientCertificate.planSupportPaymentEndDate
      ),
      plan_support_monitor_flg: booleanToNumber0or1(
        values.recipientCertificate.planSupportMonitorFlag
      ),
      date_begin_plan_support_monitor: selectDateValueToDate(
        values.recipientCertificate.planSupportMonitorStartDate
      ),
      date_end_plan_support_monitor: selectDateValueToDate(
        values.recipientCertificate.planSupportMonitorEndDate
      )
    },
    user_in_facility_group_home: {
      users_in_facility_id:
        params && params.user_in_facility_group_home
          ? params.user_in_facility_group_home.users_in_facility_id
          : undefined,
      disability_class: stringToNumber(values.serviceUse.disabilityClass),
      regional_transfer_for_strong_behavior_type: stringToNumber(
        values.serviceUse.regionalTransferForStrongBehaviorType
      ),
      mental_disorder_support_type: stringToNumber(
        values.serviceUse.mentalDisorderSupportType
      ),
      income_kind_type: stringToNumber(values.serviceUse.incomeKindType),
      specified_persons_disabilities_benefits: stringToNumber(
        values.serviceUse.specifiedPersonsDisabilitiesBenefits
      ),
      facility_unit_id: stringToNumber(values.serviceUse.facilityUnitId)
    }
  };

  const normalized: UserInFacilityResult = resultFormat(
    target,
    operatingUnitFlg
  );
  return normalized;
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

const castNumberCheckboxValue = (value?: number | null | undefined) => {
  if (!value) {
    return Checkbox.OFF;
  }
  return value === 1 ? Checkbox.ON : Checkbox.OFF;
};

const castStringCheckboxValue = (value?: string | null | undefined) => {
  if (!value) {
    return Checkbox.OFF;
  }
  return value === "1" ? Checkbox.ON : Checkbox.OFF;
};

const castString = (value?: number | null | undefined) => {
  if (value === undefined || value === null) {
    return undefined;
  }
  return value.toString();
};

/**
 * 特定のフラグがOFFの場合、APIに送信する項目を削除する
 * @param target
 */
const resultFormat = (
  target: UserInFacilityResult,
  operatingUnitFlg: boolean
) => {
  const result = {
    user_in_facility: { ...target.user_in_facility },
    user_in_facility_group_home: { ...target.user_in_facility_group_home }
  };
  if (result.user_in_facility.income_kind !== "1") {
    result.user_in_facility_group_home.income_kind_type = 0;
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
    result.user_in_facility.uplimit_controlled_by = null;
    result.user_in_facility.uplimit_facility_number = null;
    result.user_in_facility.uplimit_total_yen = null;
    result.user_in_facility.uplimit_user_load_yen = null;
    result.user_in_facility.uplimit_yen = null;
  }
  if (result.user_in_facility.create_support_plan_flg === Checkbox.ON) {
    result.user_in_facility.date_start_not_create_support_plan = null;
  }
  if (!result.user_in_facility.user_charge_limit_flg) {
    result.user_in_facility.date_begin_user_charge_limit = null;
    result.user_in_facility.date_end_user_charge_limit = null;
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
  if (!operatingUnitFlg) {
    delete result.user_in_facility_group_home.facility_unit_id;
  }
  return result;
};

/**
 * /mgr/facility/users/{id} の結果
 */
export interface UserInFacilityResult {
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

    /* サービス詳細 */

    date_begin_in_service?: string | null | undefined;
    date_end_in_service?: string | null | undefined;
    date_pay_begin?: string | null | undefined;
    date_pay_end?: string | null | undefined;
    income_kind?: string | null | undefined;
    subsidized_flg?: string | null | undefined;
    subsidized_percent?: number | null | undefined;
    subsidized_yen?: number | null | undefined;
    subsidized_unit_flg?: string | null | undefined;
    subsidized_city_id?: number | null | undefined;
    uplimit_facility_flg?: string | null | undefined;
    uplimit_controlled_by?: string | null | undefined;
    uplimit_facility_number?: string | null | undefined;
    uplimit_facility_name?: string | null | undefined;
    uplimit_total_yen?: number | null | undefined;
    uplimit_user_load_yen?: number | null | undefined;
    result_of_management?: string | null | undefined;
    uplimit_yen?: number | null | undefined;
    create_support_plan_flg?: string | null | undefined;
    date_start_not_create_support_plan?: string | null | undefined;

    /* 受給者証 */

    user_charge_limit_flg?: number | null | undefined;
    date_begin_user_charge_limit?: string | null | undefined;
    date_end_user_charge_limit?: string | null | undefined;
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
  };
  user_in_facility_group_home: {
    users_in_facility_id?: number | null | undefined;
    disability_class?: number | null | undefined;
    regional_transfer_for_strong_behavior_type: number | null | undefined;
    mental_disorder_support_type: number | null | undefined;
    income_kind_type?: number | null | undefined;
    specified_persons_disabilities_benefits?: number | null | undefined;
    facility_unit_id?: number;
  };
}
