import { BasicValues } from "@interfaces/mgr/TANKINYUSHO/Users/basic";
import { ServiceUseValues } from "@interfaces/mgr/TANKINYUSHO/Users/serviceUse";
import { RecipientCertificateValues } from "@interfaces/mgr/TANKINYUSHO/Users/recipientCertificate";
import { UsersInFacilityState } from "@stores/domain/mgr/TANKINYUSHO/userInFacility/types";
import { dateToSelectDateValue } from "@utils/date";
import {
  DEFAULT_SELECT_VALUE,
  Checkbox,
  INT_TRUE_FROM_API
} from "@constants/variables";
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

// valueがundefinedの場合はreturnValueを返す
// returnValueがundefinedの場合は""を返す
const undefinedNumberToReturnValue = (
  value?: number,
  returnValue?: number
): string => {
  if (value === undefined) {
    if (returnValue === undefined) {
      return "";
    }
    return `${returnValue}`;
  }
  return `${value}`;
};

// FlgがCheckbox.ONの場合はtrueを返す
const determineTrueOrFalse = (value: Checkbox | undefined): boolean => {
  if (value === Checkbox.ON) {
    return true;
  }
  return false;
};

// FlgがCheckbox.ONの場合はtrueを返す
const numberToTrueOrFalse = (value: number | undefined): boolean => {
  if (value === INT_TRUE_FROM_API) {
    return true;
  }
  return false;
};

const initialValues = (state?: UsersInFacilityState["user"]): UsersValues => {
  const userInFacility = state ? state.user_in_facility : {};
  const TANKINYUSHO =
    state && state.user_in_facility_tankinyusho
      ? state.user_in_facility_tankinyusho
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
      endInServiceSameCorporationMovementFlg: numberToTrueOrFalse(
        TANKINYUSHO.end_in_service_same_corporation_movement_flg
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
      classifyHandicappedFlag: determineTrueOrFalse(
        userInFacility.classify_handicapped_flg
      ),
      disabilityChildClass: undefinedNumberToReturnValue(
        TANKINYUSHO.disability_child_class,
        0
      ),
      disabilityClass: undefinedNumberToReturnValue(
        TANKINYUSHO.disability_class,
        0
      ),
      severeDisabilitySupport: undefinedNumberToReturnValue(
        TANKINYUSHO.severe_disability_support,
        0
      ),
      payDaysAgreed: undefinedToReturnValue(userInFacility.pay_days_agreed),
      businessNumberContract: undefinedToReturnValue(
        userInFacility.business_number_contract
      ),
      supportType: undefinedNumberToReturnValue(TANKINYUSHO.support_type, 0),
      incomeKind: undefinedToReturnValue(userInFacility.income_kind, 1),
      incomeKindType: undefinedNumberToReturnValue(TANKINYUSHO.income_kind, 0),
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
      severelyDisabledFlg: numberToTrueOrFalse(
        TANKINYUSHO.severely_disabled_flg
      ),
      useType: numberToTrueOrFalse(TANKINYUSHO.use_type),
      medicalCareFlg: numberToTrueOrFalse(TANKINYUSHO.medical_care_flg),
      specialSevereDisabilitySupport: undefinedNumberToReturnValue(
        TANKINYUSHO.special_severe_disability_support,
        0
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
