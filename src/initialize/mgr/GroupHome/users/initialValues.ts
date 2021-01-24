import { BasicValues } from "@interfaces/mgr/GroupHome/users/basic";
import { ServiceUseValues } from "@interfaces/mgr/GroupHome/users/serviceUse";
import { RecipientCertificateValues } from "@interfaces/mgr/GroupHome/users/recipientCertificate";
import { UsersInFacilityState } from "@stores/domain/mgr/GroupHome/userInFacility/types";
import { dateToSelectDateValue } from "@utils/date";
import {
  DEFAULT_SELECT_VALUE,
  Checkbox,
  DISABILITY_CLASS_LIST
} from "@constants/variables";

export type UsersValues = BasicValues &
  ServiceUseValues &
  RecipientCertificateValues;

const initialValues = (state?: UsersInFacilityState["user"]): UsersValues => {
  const userInFacility = state ? state.user_in_facility : {};
  const groupHome =
    state && state.user_in_facility_group_home
      ? state.user_in_facility_group_home
      : {};
  return {
    basic: {
      nameSei: userInFacility.name_sei || "",
      nameMei: userInFacility.name_mei || "",
      nameSeiKana: userInFacility.name_sei_kana || "",
      nameMeiKana: userInFacility.name_mei_kana || "",
      recipientNumber: userInFacility.recipient_number || "",
      noneRecipientNumberFlag:
        userInFacility.none_recipient_number_flg === Checkbox.ON || false,
      gender: userInFacility.gender || "1",
      classifyPhysicalFlag:
        userInFacility.classify_physical_flg === Checkbox.ON || false,
      classifyIntelligenceFlag:
        userInFacility.classify_intelligence_flg === Checkbox.ON || false,
      classifyMindFlag:
        userInFacility.classify_mind_flg === Checkbox.ON || false,
      classifyGrowthFlag:
        userInFacility.classify_growth_flg === Checkbox.ON || false,
      classifyBrainFlag:
        userInFacility.classify_brain_flg === Checkbox.ON || false,
      classifyIncurableFlag:
        userInFacility.classify_incurable_flg === Checkbox.ON || false,
      classifyHandicappedFlag:
        userInFacility.classify_handicapped_flg === Checkbox.ON || false,
      dateOfBirth: dateToSelectDateValue(userInFacility.date_birth || ""),
      postalCode: userInFacility.postal_code || "",
      prefectureId: userInFacility.prefecture_name || DEFAULT_SELECT_VALUE,
      cityId: `${userInFacility.city_id}` || DEFAULT_SELECT_VALUE,
      restAddress: userInFacility.address || "",
      tel: userInFacility.tel || "",
      email: userInFacility.email || "",
      guardianName: userInFacility.guardian_name || "",
      guardianRelation: userInFacility.guardian_relation || "",
      guardianTel: userInFacility.guardian_tel || "",
      memo: userInFacility.memo || ""
    },
    serviceUse: {
      facilityUnitId: groupHome.facility_unit_id || "",
      inServiceStartDate: dateToSelectDateValue(
        userInFacility.date_begin_in_service || ""
      ),
      inServiceEndDate: dateToSelectDateValue(
        userInFacility.date_end_in_service || ""
      ),
      payStartDate: dateToSelectDateValue(userInFacility.date_pay_begin || ""),
      payEndDate: dateToSelectDateValue(userInFacility.date_pay_end || ""),

      disabilityClass:
        groupHome.disability_class || DISABILITY_CLASS_LIST[0].value,
      regionalTransferForStrongBehaviorType:
        groupHome.regional_transfer_for_strong_behavior_type || "1",
      mentalDisorderSupportType: groupHome.mental_disorder_support_type || "1",
      incomeKind: userInFacility.income_kind || "1",
      incomeKindType: groupHome.income_kind_type || "0",
      specifiedPersonsDisabilitiesBenefits:
        groupHome.specified_persons_disabilities_benefits || "",
      subsidizedFlag: userInFacility.subsidized_flg === Checkbox.ON || false,
      subsidizedPercent: userInFacility.subsidized_percent || "",
      subsidizedYen: userInFacility.subsidized_yen || "",
      subsidizedUnit: userInFacility.subsidized_unit_flg || "1",
      subsidizedCityId:
        `${userInFacility.subsidized_city_id}` || DEFAULT_SELECT_VALUE,
      upperLimitFacilityFlag:
        userInFacility.uplimit_facility_flg === Checkbox.ON || false,
      upperLimitControlledBy: userInFacility.uplimit_controlled_by || "1",
      upperLimitFacilityNumber: userInFacility.uplimit_facility_number || "",
      upperLimitFacilityName: userInFacility.uplimit_facility_name || "",
      upperLimitTotalYen: userInFacility.uplimit_total_yen || "",
      upperLimitUserLoadYen: userInFacility.uplimit_user_load_yen || "",
      resultOfManagement: userInFacility.result_of_management || "1",
      upperLimitYen: userInFacility.uplimit_yen || "",
      createSupportPlanFlag:
        userInFacility.create_support_plan_flg === Checkbox.OFF || false,
      notCreateSupportPlanStartDate: dateToSelectDateValue(
        userInFacility.date_start_not_create_support_plan || ""
      )
    },
    recipientCertificate: {
      userChargeLimitFlag:
        userInFacility.user_charge_limit_flg === Checkbox.ON || false,
      userChargeLimitStartDate: dateToSelectDateValue(
        userInFacility.date_begin_user_charge_limit || ""
      ),
      userChargeLimitEndDate: dateToSelectDateValue(
        userInFacility.date_end_user_charge_limit || ""
      ),
      careSupportAuthFlag:
        userInFacility.care_support_auth_flg === Checkbox.ON || false,
      careSupportAuthStartDate: dateToSelectDateValue(
        userInFacility.date_begin_care_support_auth || ""
      ),
      careSupportAuthEndDate: dateToSelectDateValue(
        userInFacility.date_end_care_support_auth || ""
      ),
      careSupportPaymentFlag:
        userInFacility.care_support_payment_flg === Checkbox.ON || false,
      careSupportPaymentStartDate: dateToSelectDateValue(
        userInFacility.date_begin_care_support_payment || ""
      ),
      careSupportPaymentEndDate: dateToSelectDateValue(
        userInFacility.date_end_care_support_payment || ""
      ),
      planSupportPaymentFlag:
        userInFacility.plan_support_payment_flg === Checkbox.ON || false,
      planSupportPaymentStartDate: dateToSelectDateValue(
        userInFacility.date_begin_plan_support_payment || ""
      ),
      planSupportPaymentEndDate: dateToSelectDateValue(
        userInFacility.date_end_plan_support_payment || ""
      ),
      planSupportMonitorFlag:
        userInFacility.plan_support_monitor_flg === Checkbox.ON || false,
      planSupportMonitorStartDate: dateToSelectDateValue(
        userInFacility.date_begin_plan_support_monitor || ""
      ),
      planSupportMonitorEndDate: dateToSelectDateValue(
        userInFacility.date_end_plan_support_monitor || ""
      )
    }
  };
};

export default initialValues;
