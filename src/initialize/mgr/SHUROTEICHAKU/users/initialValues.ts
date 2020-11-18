import { BasicValues } from "@interfaces/mgr/SHUROTEICHAKU/Users/basic";
import { ServiceUseValues } from "@interfaces/mgr/SHUROTEICHAKU/Users/serviceUse";
import { RecipientCertificateValues } from "@interfaces/mgr/SHUROTEICHAKU/Users/recipientCertificate";
import { CompaniesValues } from "@interfaces/mgr/SHUROTEICHAKU/Users/companies";
import { UsersInFacilityState } from "@stores/domain/mgr/SHUROTEICHAKU/userInFacility/types";
import { dateToSelectDateValue } from "@utils/date";
import { DEFAULT_SELECT_VALUE, Checkbox } from "@constants/variables";
import { SelectDateValue } from "@interfaces/ui/form";

export type UsersValues = BasicValues &
  ServiceUseValues &
  RecipientCertificateValues &
  CompaniesValues;

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

// valueがundefinedの場合はreturnValueを返す
// returnValueがundefinedの場合は""を返す
const undefinedNumberToReturnValue = (
  value: number | undefined,
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

// FlgがCheckbox.ONの場合はtrueを返す
const determineTureOrFalse = (value: Checkbox | undefined): boolean => {
  if (value === Checkbox.ON) {
    return true;
  }
  return false;
};

const initialValues = (state?: UsersInFacilityState["user"]): UsersValues => {
  const userInFacility = state ? state.user_in_facility : {};
  const SHUROTEICHAKU =
    state && state.user_in_facility_shuroteichaku
      ? state.user_in_facility_shuroteichaku
      : {};
  const companies = state && state.companies ? state.companies : {};
  const companyPersons =
    state && state.company_persons ? state.company_persons : [];
  return {
    basic: {
      nameSei: undefinedToReturnValue(userInFacility.name_sei),
      nameMei: undefinedToReturnValue(userInFacility.name_mei),
      nameSeiKana: undefinedToReturnValue(userInFacility.name_sei_kana),
      nameMeiKana: undefinedToReturnValue(userInFacility.name_mei_kana),
      recipientNumber: undefinedToReturnValue(userInFacility.recipient_number),
      noneRecipientNumberFlag: determineTureOrFalse(
        userInFacility.none_recipient_number_flg
      ),
      gender: undefinedToReturnValue(userInFacility.gender, 1),
      classifyPhysicalFlag: determineTureOrFalse(
        userInFacility.classify_physical_flg
      ),
      classifyIntelligenceFlag: determineTureOrFalse(
        userInFacility.classify_intelligence_flg
      ),
      classifyMindFlag: determineTureOrFalse(userInFacility.classify_mind_flg),
      classifyGrowthFlag: determineTureOrFalse(
        userInFacility.classify_growth_flg
      ),
      classifyBrainFlag: determineTureOrFalse(
        userInFacility.classify_brain_flg
      ),
      classifyIncurableFlag: determineTureOrFalse(
        userInFacility.classify_incurable_flg
      ),
      classifyHandicappedFlag: determineTureOrFalse(
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
      sameCorporationMovementFlg: determineTureOrFalse(
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
      incomeKind: undefinedToReturnValue(userInFacility.income_kind, 1),
      incomeKindType: undefinedNumberToReturnValue(
        SHUROTEICHAKU.income_kind,
        0
      ),
      subsidizedFlag: determineTureOrFalse(userInFacility.subsidized_flg),
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
      upperLimitFacilityFlag: determineTureOrFalse(
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
      createSupportPlanFlag:
        userInFacility.create_support_plan_flg === Checkbox.OFF || false,
      notCreateSupportPlanStartDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(
            userInFacility.date_start_not_create_support_plan
          )
        )
      )
    },
    recipientCertificate: {
      userChargeLimitFlag: determineTureOrFalse(
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
      foodServeAdditionFlg: determineTureOrFalse(
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
      careSupportAuthFlag: determineTureOrFalse(
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
      careSupportPaymentFlag: determineTureOrFalse(
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
      planSupportPaymentFlag: determineTureOrFalse(
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
      planSupportMonitorFlag: determineTureOrFalse(
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
    },
    companies: {
      name: undefinedToReturnValue(companies.name),
      overview: undefinedToReturnValue(companies.overview),
      address: undefinedToReturnValue(companies.address),
      workingStartDate: emptyToNotSelected(
        dateToSelectDateValue(
          undefinedToReturnValue(companies.working_start_date)
        )
      ),
      department: undefinedToReturnValue(companies.department),
      remarks: undefinedToReturnValue(companies.remarks),
      companyPersons: createCompanyPersons(companyPersons)
    }
  };
};

const createCompanyPersons = (
  companyPersons: UsersInFacilityState["user"]["company_persons"]
): CompaniesValues["companies"]["companyPersons"] => {
  const companyPersonsValue: CompaniesValues["companies"]["companyPersons"] = [
    {
      flg: false,
      name: "",
      position: "",
      department: "",
      relationship: "",
      tel: "",
      email: ""
    },
    {
      flg: false,
      name: "",
      position: "",
      department: "",
      relationship: "",
      tel: "",
      email: ""
    }
  ];
  if (companyPersons) {
    companyPersons.map((staff, index) => {
      companyPersonsValue.splice(index, 1, {
        flg: checkFlg(staff),
        name: undefinedToReturnValue(staff.name),
        position: undefinedToReturnValue(staff.position),
        department: undefinedToReturnValue(staff.department),
        relationship: undefinedNumberToReturnValue(staff.relationship),
        tel: undefinedToReturnValue(staff.tel),
        email: undefinedToReturnValue(staff.email)
      });
      return;
    });
  }

  return companyPersonsValue;
};

const checkFlg = (staff: object): boolean => {
  for (const key of Object.keys(staff)) {
    // staff[key]に0が入る可能性があるため
    if (
      staff[key] !== null &&
      staff[key] !== undefined &&
      STAFF_KEYS.includes(key)
    ) {
      return true;
    }
  }
  return false;
};

// 担当者のフラグがONになるパラメータ
const STAFF_KEYS = [
  "name",
  "position",
  "department",
  "relationship",
  "tel",
  "email"
];

export default initialValues;
