import { UsersInFacilityState } from "./types";
import { GetFacilityUserTargetIdResponse } from "@api/requests/facility/getFacilityUserTargetId";
import { UsersValues } from "@initialize/mgr/SHUROTEICHAKU/users/initialValues";
import { Checkbox } from "@constants/variables";
import { selectDateValueToDatePaddingZero } from "@utils/date";
import { isEmpty } from "lodash";

/**
 * Normalized Type
 */
export type NormalizedGetFacilityUserTargetIdResponse = UsersInFacilityState["user"];

/**
 * APIのデータをフォームの形式に成形
 * @param result resultの型がanyである理由は、APIの型がCheckboxのため
 */
export const normalizedGetFacilityUserTargetIdResponse = (
  result: any
): NormalizedGetFacilityUserTargetIdResponse => {
  const userInFacility = result.user_in_facility;
  const userInFacilitSHUROTEICHAKU = result.user_in_facility_shuroteichaku;
  const companies = result.companies;
  const companyPersons = result.company_persons;
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
      uplimit_user_load_yen: castStringOrNull(
        userInFacility.uplimit_user_load_yen
      ),
      result_of_management: userInFacility.result_of_management || "1",
      uplimit_yen: castString(userInFacility.uplimit_yen),
      create_support_plan_flg: castStringCheckboxValue(
        userInFacility.create_support_plan_flg
      ),
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
      )
    },
    user_in_facility_shuroteichaku: {
      ...userInFacilitSHUROTEICHAKU,
      income_kind: userInFacilitSHUROTEICHAKU.income_kind
    },
    companies: {
      ...companies
    },
    company_persons: normalizeCompanyPersons(companyPersons)
  };
  return normalized;
};

const normalizeCompanyPersons = (
  companyPersons: GetFacilityUserTargetIdResponse["data"]["company_persons"]
): UsersInFacilityState["user"]["company_persons"] => {
  const companyPersonsValue: UsersInFacilityState["user"]["company_persons"] = [];
  if (companyPersons) {
    companyPersons.map(staff => {
      companyPersonsValue.push({
        ...staff
      });
    });
  }

  return companyPersonsValue;
};

/**
 * フォームの結果をAPIに送れる形式に整形
 */
export const normalizeFormValue = (
  values: UsersValues,
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
      same_corporation_movement_flg: booleanToNumber0or1(
        values.serviceUse.sameCorporationMovementFlg
      ),
      date_pay_begin: selectDateValueToDatePaddingZero(
        values.serviceUse.payStartDate
      ),
      date_pay_end: selectDateValueToDatePaddingZero(
        values.serviceUse.payEndDate
      ),
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
      uplimit_total_yen: isEmpty(values.serviceUse.upperLimitTotalYen)
        ? null
        : stringToNumber(values.serviceUse.upperLimitTotalYen),
      uplimit_user_load_yen: isEmpty(values.serviceUse.upperLimitUserLoadYen)
        ? null
        : stringToNumber(values.serviceUse.upperLimitUserLoadYen),
      result_of_management: values.serviceUse.resultOfManagement,
      uplimit_yen: stringToNumber(values.serviceUse.upperLimitYen),
      create_support_plan_flg: values.serviceUse.createSupportPlanFlag
        ? Checkbox.OFF
        : Checkbox.ON,
      date_start_not_create_support_plan: selectDateValueToDatePaddingZero(
        values.serviceUse.notCreateSupportPlanStartDate
      ),

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
    },
    user_in_facility_shuroteichaku: {
      users_in_facility_id:
        params && params.user_in_facility_shuroteichaku
          ? params.user_in_facility_shuroteichaku.users_in_facility_id
          : undefined,
      income_kind: stringToNumber(values.serviceUse.incomeKindType)
    },
    companies: {
      id: params && params.companies ? params.companies.id : undefined,
      users_in_facility_id:
        params && params.companies
          ? params.companies.users_in_facility_id
          : undefined,
      name: isEmpty(values.companies.name) ? null : values.companies.name,
      overview: isEmpty(values.companies.overview)
        ? null
        : values.companies.overview,
      address: isEmpty(values.companies.address)
        ? null
        : values.companies.address,
      department: isEmpty(values.companies.department)
        ? null
        : values.companies.department,
      working_start_date: selectDateValueToDatePaddingZero(
        values.companies.workingStartDate
      ),
      remarks: isEmpty(values.companies.remarks)
        ? null
        : values.companies.remarks
    },
    company_persons: createCompanyPerson(
      values.companies.companyPersons,
      params
    )
  };

  const normalized: UserInFacilityResult = resultFormat(target);
  let postValue = null;
  // 更新の場合は差分抽出のメソッドへ
  if (params) {
    const targetParm = removeNoChangeData(params, normalized);
    postValue = removeNullParam(targetParm, normalized);
  } else {
    postValue = normalized;
  }

  return postValue;
};

const createCompanyPerson = (
  companyPersons: UsersValues["companies"]["companyPersons"],
  params?: GetFacilityUserTargetIdResponse["data"]
): UserInFacilityResult["company_persons"] => {
  const companyPersonsValue: UserInFacilityResult["company_persons"] = [];
  companyPersons.map((staff, index) => {
    companyPersonsValue.push({
      id:
        params && params.company_persons && params.company_persons[index]
          ? params.company_persons[index].id
          : undefined,
      users_in_facility_companies_id:
        params && params.company_persons && params.company_persons[index]
          ? params.company_persons[index].users_in_facility_companies_id
          : undefined,
      name: staff.flg && !isEmpty(staff.name) ? staff.name : null,
      position: staff.flg && !isEmpty(staff.position) ? staff.position : null,
      department:
        staff.flg && !isEmpty(staff.department) ? staff.department : null,
      relationship:
        staff.flg && !isEmpty(staff.relationship)
          ? stringToNumber(staff.relationship)
          : null,
      tel: staff.flg && !isEmpty(staff.tel) ? staff.tel : null,
      email: staff.flg && !isEmpty(staff.email) ? staff.email : null
    });
  });
  return companyPersonsValue;
};

/**
 * 差分抽出のメソッド
 */
const removeNoChangeData = (
  apiValues: GetFacilityUserTargetIdResponse["data"],
  formValues: UserInFacilityResult
): UserInFacilityResult => {
  const target: UserInFacilityResult = {
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
      income_kind: formValues.user_in_facility.income_kind,
      subsidized_flg: undefined,
      subsidized_percent: undefined,
      subsidized_yen: undefined,
      subsidized_unit_flg: undefined,
      subsidized_city_id: undefined,
      uplimit_facility_flg: undefined,
      uplimit_controlled_by: undefined,
      uplimit_facility_number: undefined,
      uplimit_facility_name: undefined,
      uplimit_total_yen: undefined,
      uplimit_user_load_yen: undefined,
      result_of_management: undefined,
      uplimit_yen: undefined,
      create_support_plan_flg: undefined,
      date_start_not_create_support_plan:
        formValues.user_in_facility.create_support_plan_flg === "0"
          ? formValues.user_in_facility.date_start_not_create_support_plan
          : undefined,

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
    },
    user_in_facility_shuroteichaku: {
      users_in_facility_id:
        formValues.user_in_facility_shuroteichaku.users_in_facility_id,
      income_kind: formValues.user_in_facility_shuroteichaku.income_kind
    },
    companies: {
      id: undefined,
      users_in_facility_id: undefined,
      name: undefined,
      overview: undefined,
      address: undefined,
      department: undefined,
      working_start_date: undefined,
      remarks: undefined
    },
    company_persons: [{}, {}]
  };

  const apiValue = apiParamFormat(apiValues);
  if (formValues.companies) {
    // 就労開始年月日のみAPIの型と合わないため
    formValues.companies.working_start_date =
      formValues.companies.working_start_date === ""
        ? null
        : formValues.companies.working_start_date;
  }
  // 差分の項目を抽出 必須項目は除く
  Object.keys(target).forEach(key => {
    Object.keys(target[key]).forEach(param => {
      if (target[key][param] === undefined && formValues[key]) {
        apiValue[key][param] !== formValues[key][param]
          ? (target[key][param] = formValues[key][param])
          : (target[key][param] = undefined);
      }
    });
  });

  if (formValues.company_persons) {
    // company_personsの差分更新
    formValues.company_persons.map((staff, index) => {
      const diffCompanyPersons = {};
      Object.keys(staff).forEach(key => {
        if (apiValue.company_persons) {
          if (
            !apiValue.company_persons[index] ||
            (apiValue.company_persons[index] &&
              apiValue.company_persons[index][key] !== staff[key])
          ) {
            diffCompanyPersons[key] = staff[key];
          }
        }
      });
      if (target.company_persons) {
        target.company_persons.splice(index, 1, diffCompanyPersons);
      }
    });
  }

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
    diffDate.user_in_facility.uplimit_facility_name =
      formValues.user_in_facility.uplimit_facility_name;
  }
  return diffDate;
};

/**
 * 子要素の差分判定　子要素に差分がある場合、親要素もパラメータに付与する
 * @param target
 * @param after
 */
const addParentValue = (
  target: UserInFacilityResult,
  after: UserInFacilityResult
): UserInFacilityResult => {
  Object.keys(parentParamsMap).forEach(uifKey => {
    Object.keys(parentParamsMap[uifKey]).forEach(paramKey => {
      const childKeys = parentParamsMap[uifKey][paramKey].childKeys
        ? parentParamsMap[uifKey][paramKey].childKeys
        : [];
      const isDiffChildren: boolean = childKeys.some((childKey: string) => {
        return target[uifKey][childKey] !== undefined;
      });
      if (isDiffChildren) {
        target[uifKey][parentParamsMap[uifKey][paramKey].key] =
          after[uifKey][parentParamsMap[uifKey][paramKey].key];
      }
    });
  });
  return target;
};

/**
 * パラメータ内のundefindはパラメータから除外する
 * @param data
 */
const removeNullParam = (
  data: UserInFacilityResult,
  formData: UserInFacilityResult
): UserInFacilityResult => {
  const targetParm: UserInFacilityResult = {
    user_in_facility: {},
    user_in_facility_shuroteichaku: {},
    companies: {},
    company_persons: []
  };
  // 引数のデータからuser_in_facility,user_in_facility_shuroteichaku
  // companies,company_personsを取得
  Object.keys(data).forEach(key => {
    // user_in_facility,user_in_facility_shuroteichaku
    // companies,company_personsからparamを取得
    Object.keys(data[key]).forEach(param => {
      if (data[key][param] !== undefined) {
        targetParm[key][param] = data[key][param];
      }
    });
  });

  // companiesオブジェクトに差分がある場合idとusers_in_facility_idを追加
  if (
    targetParm.companies &&
    formData.companies &&
    !isEmpty(targetParm.companies)
  ) {
    targetParm.companies.id = formData.companies.id;
    targetParm.companies.users_in_facility_id =
      formData.companies.users_in_facility_id;
  }

  const resultCompanyPersons: UserInFacilityResult["company_persons"] = [];
  // company_personsオブジェクトに差分がある場合idとusers_in_facility_companies_idを追加
  if (!targetParm.company_persons) {
    targetParm.company_persons = resultCompanyPersons;
  } else {
    targetParm.company_persons.forEach((companyPersons, index) => {
      if (
        targetParm.company_persons &&
        formData.company_persons &&
        !isEmpty(companyPersons)
      ) {
        targetParm.company_persons[index].id =
          formData.company_persons[index].id;
        targetParm.company_persons[index].users_in_facility_companies_id =
          formData.company_persons[index].users_in_facility_companies_id;
        resultCompanyPersons.push(targetParm.company_persons[index]);
      }
    });
    targetParm.company_persons = resultCompanyPersons;
  }

  return targetParm;
};

/**
 * stringの時だけnumberに変換
 */
const stringToNumber = (value?: string): number | undefined => {
  return value !== undefined ? Number(value) : value;
};

/**
 * stringの時だけnumberに変換
 */
const stringToNumberOrNull = (value?: string): number | null => {
  return !isEmpty(value) ? Number(value) : null;
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

const CheckboxValueToNumber0or1 = (value?: Checkbox): number | undefined => {
  return value === Checkbox.OFF ? 0 : 1;
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

const castStringOrNull = (value?: number | null | undefined) => {
  if (value === undefined || value === null) {
    return null;
  }
  return value.toString();
};

/**
 * 差分比較のために
 * APIのパラメータをフォームの形式に整形
 */
export const normalizeApiValue = (
  params: GetFacilityUserTargetIdResponse["data"]
): UserInFacilityResult => {
  const apiValue: UserInFacilityResult = {
    user_in_facility: {
      ...params.user_in_facility,
      none_recipient_number_flg: CheckboxValueToNumber0or1(
        params.user_in_facility.none_recipient_number_flg
      ),
      same_corporation_movement_flg: CheckboxValueToNumber0or1(
        params.user_in_facility.same_corporation_movement_flg
      ),
      subsidized_percent: stringToNumber(
        params.user_in_facility.subsidized_percent
      ),
      subsidized_yen: stringToNumber(params.user_in_facility.subsidized_yen),
      uplimit_total_yen: stringToNumberOrNull(
        params.user_in_facility.uplimit_total_yen
      ),
      uplimit_yen: stringToNumberOrNull(params.user_in_facility.uplimit_yen),
      uplimit_user_load_yen: stringToNumberOrNull(
        params.user_in_facility.uplimit_user_load_yen
      ),
      user_charge_limit_flg: CheckboxValueToNumber0or1(
        params.user_in_facility.user_charge_limit_flg
      ),
      food_serve_addition_flg: CheckboxValueToNumber0or1(
        params.user_in_facility.food_serve_addition_flg
      ),
      care_support_payment_flg: CheckboxValueToNumber0or1(
        params.user_in_facility.care_support_payment_flg
      ),
      care_support_auth_flg: CheckboxValueToNumber0or1(
        params.user_in_facility.care_support_auth_flg
      ),
      plan_support_payment_flg: CheckboxValueToNumber0or1(
        params.user_in_facility.plan_support_payment_flg
      ),
      plan_support_monitor_flg: CheckboxValueToNumber0or1(
        params.user_in_facility.plan_support_monitor_flg
      )
    },
    user_in_facility_shuroteichaku: {
      ...params.user_in_facility_shuroteichaku
    },
    companies: { ...params.companies },
    company_persons: params.company_persons ? params.company_persons : []
  };
  return apiValue;
};

/**
 * apiのparamが画面に表示する際にデフォルト値に変換されてしまっているため
 * 差分比較のために変換前に戻すメソッド
 * @param target
 */
const apiParamFormat = (
  apiParamValue: GetFacilityUserTargetIdResponse["data"]
) => {
  const result: UserInFacilityResult = normalizeApiValue(apiParamValue);
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
    result.user_in_facility.uplimit_controlled_by = null;
    result.user_in_facility.uplimit_facility_number = null;
    result.user_in_facility.uplimit_total_yen = null;
    result.user_in_facility.uplimit_user_load_yen = null;
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
  return result;
};

/**
 * 特定のフラグがOFFの場合、APIに送信する項目を削除する
 * @param target
 */
const resultFormat = (target: UserInFacilityResult) => {
  const result = {
    user_in_facility: { ...target.user_in_facility },
    user_in_facility_shuroteichaku: {
      ...target.user_in_facility_shuroteichaku
    },
    companies: { ...target.companies },
    company_persons: target.company_persons
  };

  if (result.user_in_facility.subsidized_unit_flg === "1") {
    result.user_in_facility.subsidized_yen = null;
  }
  if (result.user_in_facility.subsidized_unit_flg === "2") {
    result.user_in_facility.subsidized_percent = null;
  }
  if (result.user_in_facility.income_kind !== "1") {
    result.user_in_facility_shuroteichaku.income_kind = 0;
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
    result.user_in_facility.result_of_management = null;
  }
  if (result.user_in_facility.create_support_plan_flg === Checkbox.ON) {
    result.user_in_facility.date_start_not_create_support_plan = null;
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
    income_kind?: string | null;
    subsidized_flg?: string | null;
    subsidized_percent?: number | null;
    subsidized_yen?: number | null;
    subsidized_unit_flg?: string | null;
    subsidized_city_id?: number | null;
    uplimit_facility_flg?: string | null;
    uplimit_controlled_by?: string | null;
    uplimit_facility_number?: string | null;
    uplimit_facility_name?: string | null;
    uplimit_total_yen?: number | null;
    uplimit_user_load_yen?: number | null;
    result_of_management?: string | null;
    uplimit_yen?: number | null;
    create_support_plan_flg?: string | null;
    date_start_not_create_support_plan?: string | null;

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
  user_in_facility_shuroteichaku: Partial<{
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
}

// パラメータの親子関係マッピング表
const parentParamsMap = {
  user_in_facility: {
    date_end_in_service: {
      key: "date_end_in_service",
      childKeys: ["date_begin_in_service"]
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
        "uplimit_facility_name",
        "uplimit_total_yen",
        "uplimit_user_load_yen",
        "uplimit_yen",
        "result_of_management"
      ]
    },
    uplimit_controlled_by: {
      key: "uplimit_controlled_by",
      childKeys: [
        "uplimit_facility_number",
        "uplimit_facility_name",
        "uplimit_total_yen",
        "uplimit_user_load_yen",
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
