import { BasicValues } from "@interfaces/mgr/IAB/Users/basic";
import { ServiceUseValues } from "@interfaces/mgr/IAB/Users/serviceUse";
import { RecipientCertificateValues } from "@interfaces/mgr/IAB/Users/recipientCertificate";
import { UsersInFacilityState } from "@stores/domain/mgr/IAB/userInFacility/types";
import { dateToSelectDateValue } from "@utils/date";
import {
  DEFAULT_SELECT_VALUE,
  Checkbox,
  DISABILITY_CLASS_LIST
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

// valueがundefinedの場合はreturnValueを返す
// returnValueがundefinedの場合は""を返す
const undefinedToReturnValue = (
  value: string | undefined,
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

// FlgがCheckbox.ONの場合はtrueを返す
const determineTrueOrFalse = (value: Checkbox | undefined): boolean => {
  if (value === Checkbox.ON) {
    return true;
  }
  return false;
};

const initialValues = (state?: UsersInFacilityState["user"]): UsersValues => {
  const userInFacility = state ? state.user_in_facility : {};
  const incomeKind =
    userInFacility.income_kind !== "0" ? userInFacility.income_kind : undefined;
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
      sameCorporationMovementFlg: determineTrueOrFalse(
        userInFacility.same_corporation_movement_flg
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
      classifyDisabilitySupport:
        userInFacility.classify_disability_support ||
        DISABILITY_CLASS_LIST[0].value,
      agreedByContractFlg: undefinedToReturnValue(
        userInFacility.agreed_by_contract_flg,
        1
      ),
      incomeKind: undefinedToReturnValue(incomeKind, 1),
      incomeKindType: undefinedToReturnValue(
        userInFacility.income_kind_type,
        undefined
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
      upperLimitFacilityNumber2: undefinedToReturnValue(
        userInFacility.uplimit_facility_number2
      ),
      upperLimitFacilityNumber3: undefinedToReturnValue(
        userInFacility.uplimit_facility_number3
      ),
      upperLimitFacilityNumber4: undefinedToReturnValue(
        userInFacility.uplimit_facility_number4
      ),
      upperLimitFacilityName: undefinedToReturnValue(
        userInFacility.uplimit_facility_name
      ),
      upperLimitFacilityName2: undefinedToReturnValue(
        userInFacility.uplimit_facility_name2
      ),
      upperLimitFacilityName3: undefinedToReturnValue(
        userInFacility.uplimit_facility_name3
      ),
      upperLimitFacilityName4: undefinedToReturnValue(
        userInFacility.uplimit_facility_name4
      ),
      upperLimitTotalYen: undefinedToReturnValue(
        userInFacility.uplimit_total_yen
      ),
      upperLimitTotalYen2: undefinedToReturnValue(
        userInFacility.uplimit_total_yen2
      ),
      upperLimitTotalYen3: undefinedToReturnValue(
        userInFacility.uplimit_total_yen3
      ),
      upperLimitTotalYen4: undefinedToReturnValue(
        userInFacility.uplimit_total_yen4
      ),
      upperLimitUserLoadYen: undefinedToReturnValue(
        userInFacility.uplimit_user_load_yen
      ),
      upperLimitUserLoadYen2: undefinedToReturnValue(
        userInFacility.uplimit_user_load_yen2
      ),
      upperLimitUserLoadYen3: undefinedToReturnValue(
        userInFacility.uplimit_user_load_yen3
      ),
      upperLimitUserLoadYen4: undefinedToReturnValue(
        userInFacility.uplimit_user_load_yen4
      ),
      resultOfManagement: undefinedToReturnValue(
        userInFacility.result_of_management,
        1
      ),
      upperLimitYen: undefinedToReturnValue(userInFacility.uplimit_yen),
      createSupportPlanFlag:
        userInFacility.create_support_plan_flg === Checkbox.OFF || false,
      notCreateSupportPlanStartDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(
            userInFacility.date_start_not_create_support_plan
          )
        )
      ),
      defFood: undefinedToReturnValue(userInFacility.def_food, 1),
      defPickup: undefinedToReturnValue(userInFacility.def_pickup, 0),
      pickupPremises: undefinedToReturnValue(userInFacility.pickup_premises, 0),
      payDaysAgreed: undefinedToReturnValue(userInFacility.pay_days_agreed),
      businessNumberContract: undefinedToReturnValue(
        userInFacility.business_number_contract
      ),
      monScheduledFlg: determineTrueOrFalse(
        userInFacility.mon_scheduled_flg || Checkbox.ON
      ),
      tueScheduledFlg: determineTrueOrFalse(
        userInFacility.tue_scheduled_flg || Checkbox.ON
      ),
      wedScheduledFlg: determineTrueOrFalse(
        userInFacility.wed_scheduled_flg || Checkbox.ON
      ),
      thuScheduledFlg: determineTrueOrFalse(
        userInFacility.thu_scheduled_flg || Checkbox.ON
      ),
      friScheduledFlg: determineTrueOrFalse(
        userInFacility.fri_scheduled_flg || Checkbox.ON
      ),
      satScheduledFlg: determineTrueOrFalse(userInFacility.sat_scheduled_flg),
      sunScheduledFlg: determineTrueOrFalse(userInFacility.sun_scheduled_flg),
      aTargetForReductionFlg: determineTrueOrFalse(
        userInFacility.a_target_for_reduction_flg
      ),
      defRecordWork: determineTrueOrFalse(
        userInFacility.def_record_work || Checkbox.ON
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
