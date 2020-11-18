import { BasicValues } from "@interfaces/mgr/SHISETSUNYUSHO/Users/basic";
import { ServiceUseValues } from "@interfaces/mgr/SHISETSUNYUSHO/Users/serviceUse";
import { RecipientCertificateValues } from "@interfaces/mgr/SHISETSUNYUSHO/Users/recipientCertificate";
import { UsersInFacilityState } from "@stores/domain/mgr/SHISETSUNYUSHO/userInFacility/types";
import { dateToSelectDateValue } from "@utils/date";
import { DEFAULT_SELECT_VALUE, Checkbox } from "@constants/variables";
import { SelectDateValue } from "@interfaces/ui/form";

export type UsersValues = BasicValues &
  ServiceUseValues &
  RecipientCertificateValues;

// ""を"NOT_SELECTED"に変換
const emptyToNotSelected = (value: SelectDateValue): SelectDateValue => {
  const date = {
    year: value.year === "" ? "NOT_SELECTED" : value.year,
    month: value.month,
    day: value.day
  };
  return date;
};

// valueがundefinedまたはnullの場合はreturnValueを返す
// returnValueがundefinedの場合は""を返す
const undefinedToReturnValue = (
  value?: string | null,
  returnValue?: number
): string => {
  if (value === undefined || value === null) {
    if (returnValue === undefined) {
      return "";
    }
    return `${returnValue}`;
  }
  return value;
};

// valueがundefinedまたはnullの場合はreturnValueを返す
// returnValueがundefinedの場合は""を返す
const undefinedNumberToReturnValue = (
  value?: number | null,
  returnValue?: number
): string => {
  if (value === undefined || value === null) {
    if (returnValue === undefined) {
      return "";
    }
    return `${returnValue}`;
  }
  return `${value}`;
};

// valueがCheckbox.ONの場合はtrueを返す
const determineTrueOrFalse = (value?: Checkbox): boolean => {
  return value === Checkbox.ON;
};

// valueが1の場合はtrueを返す
// valueがundefinedまたはnullの場合はdefaultValueを返す
const numberToBoolean = (
  value?: number | null,
  defaultValue?: boolean
): boolean => {
  if (defaultValue !== undefined) {
    if (value === undefined || value === null) {
      return defaultValue;
    }
  }
  return value === 1;
};

const initialValues = (state?: UsersInFacilityState["user"]): UsersValues => {
  const userInFacility = state ? state.user_in_facility : {};
  const SHISETSUNYUSHO =
    state && state.user_in_facility_shisetsunyusho
      ? state.user_in_facility_shisetsunyusho
      : {};
  return {
    basic: {
      nameSei: undefinedToReturnValue(userInFacility.name_sei),
      nameMei: undefinedToReturnValue(userInFacility.name_mei),
      nameSeiKana: undefinedToReturnValue(userInFacility.name_sei_kana),
      nameMeiKana: undefinedToReturnValue(userInFacility.name_mei_kana),
      recipientNumber: undefinedToReturnValue(userInFacility.recipient_number),
      noneRecipientNumberFlag: determineTrueOrFalse(
        userInFacility.none_recipient_number_flg
      ),
      gender: undefinedToReturnValue(userInFacility.gender, 1),
      classifyPhysicalFlag: determineTrueOrFalse(
        userInFacility.classify_physical_flg
      ),
      classifyIntelligenceFlag: determineTrueOrFalse(
        userInFacility.classify_intelligence_flg
      ),
      classifyMindFlag: determineTrueOrFalse(userInFacility.classify_mind_flg),
      classifyGrowthFlag: determineTrueOrFalse(
        userInFacility.classify_growth_flg
      ),
      classifyBrainFlag: determineTrueOrFalse(
        userInFacility.classify_brain_flg
      ),
      classifyIncurableFlag: determineTrueOrFalse(
        userInFacility.classify_incurable_flg
      ),
      classifyHandicappedFlag: determineTrueOrFalse(
        userInFacility.classify_handicapped_flg
      ),
      dateOfBirth: emptyToNotSelected(
        dateToSelectDateValue(undefinedToReturnValue(userInFacility.date_birth))
      ),
      postalCode: undefinedToReturnValue(userInFacility.postal_code),
      prefectureId: userInFacility.prefecture_name || DEFAULT_SELECT_VALUE,
      cityId: userInFacility.city_id
        ? `${userInFacility.city_id}`
        : DEFAULT_SELECT_VALUE,
      restAddress: undefinedToReturnValue(userInFacility.address),
      tel: undefinedToReturnValue(userInFacility.tel),
      email: undefinedToReturnValue(userInFacility.email),
      guardianName: undefinedToReturnValue(userInFacility.guardian_name),
      guardianRelation: undefinedToReturnValue(
        userInFacility.guardian_relation
      ),
      guardianTel: undefinedToReturnValue(userInFacility.guardian_tel),
      memo: undefinedToReturnValue(userInFacility.memo)
    },
    serviceUse: {
      inServiceStartDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(userInFacility.date_begin_in_service)
        )
      ),
      inServiceEndDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(userInFacility.date_end_in_service)
        )
      ),
      payStartDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(userInFacility.date_pay_begin)
        )
      ),
      payEndDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(userInFacility.date_pay_end)
        )
      ),
      disabilityClass: undefinedNumberToReturnValue(
        SHISETSUNYUSHO.disability_class,
        0
      ),
      severeDisabilitySupport: numberToBoolean(
        SHISETSUNYUSHO.severe_disability_support
      ),
      severeDisabilitySupportStartData: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(
            SHISETSUNYUSHO.severe_disability_support2_start_date
          )
        )
      ),
      incomeKind: undefinedToReturnValue(userInFacility.income_kind, 1),
      incomeKindType: undefinedNumberToReturnValue(
        SHISETSUNYUSHO.income_kind,
        0
      ),
      subsidizedFlag: determineTrueOrFalse(userInFacility.subsidized_flg),
      subsidizedPercent: undefinedToReturnValue(
        userInFacility.subsidized_percent
      ),
      subsidizedYen: undefinedToReturnValue(userInFacility.subsidized_yen),
      subsidizedUnit: undefinedToReturnValue(
        userInFacility.subsidized_unit_flg,
        1
      ),
      subsidizedCityId: userInFacility.subsidized_city_id
        ? `${userInFacility.subsidized_city_id}`
        : DEFAULT_SELECT_VALUE,
      supplementaryBenefitFlg: numberToBoolean(
        SHISETSUNYUSHO.supplementary_benefit_flg
      ),
      supplementaryBenefitYen: undefinedNumberToReturnValue(
        SHISETSUNYUSHO.supplementary_benefit_yen
      ),
      upperLimitFacilityFlag: determineTrueOrFalse(
        userInFacility.uplimit_facility_flg
      ),
      upperLimitControlledBy: undefinedToReturnValue(
        userInFacility.uplimit_controlled_by,
        1
      ),
      upperLimitFacilityNumber: undefinedToReturnValue(
        userInFacility.uplimit_facility_number
      ),
      upperLimitFacilityName: undefinedToReturnValue(
        userInFacility.uplimit_facility_name
      ),
      upperLimitTotalYen: undefinedToReturnValue(
        userInFacility.uplimit_total_yen
      ),
      upperLimitUserLoadYen: undefinedToReturnValue(
        userInFacility.uplimit_user_load_yen
      ),
      resultOfManagement: undefinedToReturnValue(
        userInFacility.result_of_management,
        1
      ),
      upperLimitYen: undefinedToReturnValue(userInFacility.uplimit_yen),
      createSupportPlanFlg:
        userInFacility.create_support_plan_flg === Checkbox.OFF || false,
      notCreateSupportPlanStartDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(
            userInFacility.date_start_not_create_support_plan
          )
        )
      ),
      defFood: undefinedToReturnValue(userInFacility.def_food, 1),
      foodBreakfastFlg: numberToBoolean(
        SHISETSUNYUSHO.food_breakfast_flg,
        true
      ),
      foodLunchFlg: numberToBoolean(SHISETSUNYUSHO.food_lunch_flg, true),
      foodSupperFlg: numberToBoolean(SHISETSUNYUSHO.food_supper_flg, true),
      regionalLifeTransition2: numberToBoolean(
        SHISETSUNYUSHO.regional_life_transition2
      )
    },
    recipientCertificate: {
      userChargeLimitFlag: determineTrueOrFalse(
        userInFacility.user_charge_limit_flg
      ),
      userChargeLimitStartDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(userInFacility.date_begin_user_charge_limit)
        )
      ),
      userChargeLimitEndDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(userInFacility.date_end_user_charge_limit)
        )
      ),
      foodServeAdditionFlg: determineTrueOrFalse(
        userInFacility.food_serve_addition_flg
      ),
      foodServeAdditionStartDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(userInFacility.date_begin_food_serve_addition)
        )
      ),
      foodServeAdditionEndDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(userInFacility.date_end_food_serve_addition)
        )
      ),
      careSupportAuthFlag: determineTrueOrFalse(
        userInFacility.care_support_auth_flg
      ),
      careSupportAuthStartDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(userInFacility.date_begin_care_support_auth)
        )
      ),
      careSupportAuthEndDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(userInFacility.date_end_care_support_auth)
        )
      ),
      careSupportPaymentFlag: determineTrueOrFalse(
        userInFacility.care_support_payment_flg
      ),
      careSupportPaymentStartDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(userInFacility.date_begin_care_support_payment)
        )
      ),
      careSupportPaymentEndDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(userInFacility.date_end_care_support_payment)
        )
      ),
      planSupportPaymentFlag: determineTrueOrFalse(
        userInFacility.plan_support_payment_flg
      ),
      planSupportPaymentStartDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(userInFacility.date_begin_plan_support_payment)
        )
      ),
      planSupportPaymentEndDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(userInFacility.date_end_plan_support_payment)
        )
      ),
      planSupportMonitorFlag: determineTrueOrFalse(
        userInFacility.plan_support_monitor_flg
      ),
      planSupportMonitorStartDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(userInFacility.date_begin_plan_support_monitor)
        )
      ),
      planSupportMonitorEndDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(userInFacility.date_end_plan_support_monitor)
        )
      )
    }
  };
};

export default initialValues;
