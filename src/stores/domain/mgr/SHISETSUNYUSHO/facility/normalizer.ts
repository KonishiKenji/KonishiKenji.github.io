import { FacilityState } from "./types";
import { GetFacilityResponse } from "@api/requests/facility/getFacility";
import { PostFacilityParams } from "@api/requests/facility/postFacility";
import { FacilityValues } from "@initialize/mgr/SHISETSUNYUSHO/facility/initialValues";
import {
  INT_FALSE_FROM_API,
  INT_TRUE_FROM_API,
  STRING_FALSE_FROM_API,
  STRING_TRUE_FROM_API,
  DEFAULT_RADIO_VALUE,
  ENABLE_SPECIFIC_BETTER_SUPPORTER_CONDITION_VALUES
} from "@constants/variables";
import { selectDateValueToDate } from "@utils/date";

// , formatTime
/**
 * Normalized Type
 */
export type NormalizedGetFacilityResponse = FacilityState;
export type NormalizedPostFacilityParams = FacilityState;

const castString = (value?: number | null) => {
  if (value === undefined || value === null) {
    return "";
  }
  return value.toString();
};

const undefinedToReturnValue = (
  returnValue: number,
  value?: number
): number => {
  return value === undefined ? returnValue : value;
};

/**
 * GetFacilityResponse === PostFacilityParams前提の共通化
 */
const normalizeApiParams = (
  result: GetFacilityResponse["data"] | PostFacilityParams
): FacilityState => {
  const facility = result.facility;
  const facilitySHISETSUNYUSHO = result.facility_shisetsunyusho || {
    food_expenses: 0,
    food_expenses_breakfast: 0,
    food_expenses_lunch: 0,
    food_expenses_supper: 0,
    food_expenses_day: 0,
    utility: 0,
    utility_costs: 0,
    nutritionist_placement: 0,
    nighttime_placement: 0,
    serious_disability: 0,
    regional_life_transition: 0,
    nutrition_management_flg: 0
  };
  return {
    corporationName: facility.gov_business_owner,
    officeNumber: facility.gov_facility_number,
    officeName: facility.name,
    serviceType: facility.type_service,
    representativeName: facility.responsible_person,
    capacity: facility.capacity !== null ? facility.capacity.toString() : "",
    multiFunctionOfficeFlg:
      facility.multiple_facility_flg === STRING_TRUE_FROM_API,
    masterSubordinateFlg:
      facility.master_subordinate_flg === STRING_TRUE_FROM_API,
    isMasterRadioValue: facility.master_flg ? facility.master_flg : "1",
    allCapacity: castString(facility.total_capacity),
    postalCode: facility.postal_code !== null ? facility.postal_code : "",
    selectedPrefectureName: facility.prefecture_name
      ? facility.prefecture_name
      : "NOT_SELECTED",
    selectedCityCode:
      facility.city_id !== null ? facility.city_id.toString() : "NOT_SELECTED",
    restAddress: facility.address,
    tel: facility.tel,
    cityId: facility.city_id !== null ? facility.city_id.toString() : "",
    availableFood: facility.available_food === STRING_TRUE_FROM_API,
    foodExpenses: undefinedToReturnValue(
      0,
      facilitySHISETSUNYUSHO.food_expenses
    ),
    foodExpensesBreakfast: undefinedToReturnValue(
      0,
      facilitySHISETSUNYUSHO.food_expenses_breakfast
    ),
    foodExpensesLunch: undefinedToReturnValue(
      0,
      facilitySHISETSUNYUSHO.food_expenses_lunch
    ),
    foodExpensesSupper: undefinedToReturnValue(
      0,
      facilitySHISETSUNYUSHO.food_expenses_supper
    ),
    foodExpensesDay: undefinedToReturnValue(
      0,
      facilitySHISETSUNYUSHO.food_expenses_day
    ),
    utility: undefinedToReturnValue(0, facilitySHISETSUNYUSHO.utility),
    utilityCosts: undefinedToReturnValue(
      0,
      facilitySHISETSUNYUSHO.utility_costs
    ),
    originLocalGovFlg: facility.origin_local_gov_flg === STRING_TRUE_FROM_API,
    lackOfSupporterFlg: facility.lack_of_supporter_flg === STRING_TRUE_FROM_API,
    dateStartLackOfSupporter:
      facility.date_start_lack_of_supporter !== null
        ? facility.date_start_lack_of_supporter
        : "",
    nutritionistPlacement: undefinedToReturnValue(
      1,
      facilitySHISETSUNYUSHO.nutritionist_placement
    ),
    nighttimePlacement: undefinedToReturnValue(
      0,
      facilitySHISETSUNYUSHO.nighttime_placement
    ),
    seeHearTeamFlg: facility.see_hear_team_flg === STRING_TRUE_FROM_API,
    regionalLifeTransition:
      facilitySHISETSUNYUSHO.regional_life_transition === INT_TRUE_FROM_API,
    nutritionManagementFlg:
      facilitySHISETSUNYUSHO.nutrition_management_flg === INT_TRUE_FROM_API,
    staffTreatmentSystemType: facility.better_supporter_condition
      ? facility.better_supporter_condition
      : DEFAULT_RADIO_VALUE,
    staffTreatmentSpecificSystemType: facility.specific_better_supporter_condition
      ? facility.specific_better_supporter_condition
      : DEFAULT_RADIO_VALUE,
    seriousDisability: undefinedToReturnValue(
      0,
      facilitySHISETSUNYUSHO.serious_disability
    )
  };
};

/**
 * フラグがOFFの時、関連する値を消す
 * 入力後にdisabledとなったテキストエリアのテキストを消す
 */
const removeUnnecessaryValue = (
  target: PostFacilityParams
): PostFacilityParams => {
  const result = {
    facility: { ...target.facility },
    facility_shisetsunyusho: target.facility_shisetsunyusho
      ? { ...target.facility_shisetsunyusho }
      : undefined
  };
  if (result.facility_shisetsunyusho) {
    if (result.facility.available_food === STRING_FALSE_FROM_API) {
      result.facility_shisetsunyusho.food_expenses = 0;
      result.facility_shisetsunyusho.food_expenses_breakfast = 0;
      result.facility_shisetsunyusho.food_expenses_lunch = 0;
      result.facility_shisetsunyusho.food_expenses_supper = 0;
      result.facility_shisetsunyusho.food_expenses_day = 0;
    }
    if (result.facility_shisetsunyusho.food_expenses === 0) {
      result.facility_shisetsunyusho.food_expenses_breakfast = 0;
      result.facility_shisetsunyusho.food_expenses_lunch = 0;
      result.facility_shisetsunyusho.food_expenses_supper = 0;
      result.facility_shisetsunyusho.food_expenses_day = 0;
    }
    if (result.facility_shisetsunyusho.food_expenses === 1) {
      result.facility_shisetsunyusho.food_expenses_day = 0;
    }
    if (result.facility_shisetsunyusho.food_expenses === 2) {
      result.facility_shisetsunyusho.food_expenses_breakfast = 0;
      result.facility_shisetsunyusho.food_expenses_lunch = 0;
      result.facility_shisetsunyusho.food_expenses_supper = 0;
    }
    if (result.facility_shisetsunyusho.utility === 0) {
      result.facility_shisetsunyusho.utility_costs = 0;
    }
  }
  if (result.facility.master_subordinate_flg === STRING_FALSE_FROM_API) {
    result.facility.master_flg = null;
  }
  if (result.facility.lack_of_supporter_flg === STRING_FALSE_FROM_API) {
    result.facility.date_start_lack_of_supporter = null;
  }
  if (
    !ENABLE_SPECIFIC_BETTER_SUPPORTER_CONDITION_VALUES.includes(
      result.facility.better_supporter_condition
    )
  ) {
    result.facility.specific_better_supporter_condition = DEFAULT_RADIO_VALUE;
  }
  return result;
};

export const normalizeGetFacilityResult = (
  response: GetFacilityResponse
): NormalizedGetFacilityResponse => normalizeApiParams(response.data);

export const normalizePostFacilityParams = (
  params: PostFacilityParams
): NormalizedPostFacilityParams => normalizeApiParams(params);

export const normalizePostDifferenceParams = (
  params: PostFacilityParams,
  response: FacilityValues
) => {
  return removeNoChangeData(params, normalizeFormValue(response));
};

export const removeNoChangeData = (
  after: PostFacilityParams,
  before: PostFacilityParams
) => {
  const target: PostFacilityParams = {
    facility: {
      gov_business_owner: after.facility.gov_business_owner,
      gov_facility_number: after.facility.gov_facility_number,
      name: after.facility.name,
      type_service: after.facility.type_service,
      responsible_person: after.facility.responsible_person,
      capacity: after.facility.capacity,
      postal_code: after.facility.postal_code,
      prefecture_name: after.facility.prefecture_name,
      city_id: after.facility.city_id,
      address: after.facility.address,
      tel: after.facility.tel,
      multiple_facility_flg: after.facility.multiple_facility_flg,
      master_subordinate_flg: undefined,
      // multiple_facility_flgを毎回送信しているため
      // 関係のあるmaster_flgとtotal_capacityも毎回送信する
      master_flg: after.facility.master_flg,
      total_capacity: after.facility.total_capacity,
      users_vs_supporter_grade: after.facility.users_vs_supporter_grade,
      welfare_condition: after.facility.welfare_condition,
      better_supporter_condition: after.facility.better_supporter_condition,
      lack_of_supporter_flg: after.facility.lack_of_supporter_flg,
      date_start_lack_of_supporter: after.facility.date_start_lack_of_supporter,
      lack_of_service_admin_flg: after.facility.lack_of_service_admin_flg,
      date_start_lack_of_service_admin:
        after.facility.date_start_lack_of_service_admin,
      origin_local_gov_flg: after.facility.origin_local_gov_flg,
      see_hear_team_flg: after.facility.see_hear_team_flg,

      available_food: undefined,
      specific_better_supporter_condition: undefined
    },
    facility_shisetsunyusho: {
      food_expenses: undefined,
      food_expenses_breakfast: undefined,
      food_expenses_lunch: undefined,
      food_expenses_supper: undefined,
      food_expenses_day: undefined,
      utility: undefined,
      utility_costs: undefined,
      nutritionist_placement: undefined,
      nighttime_placement: undefined,
      serious_disability: undefined,
      regional_life_transition: undefined,
      nutrition_management_flg: undefined
    }
  };

  Object.keys(target).forEach(key => {
    Object.keys(target[key]).forEach(param => {
      if (target[key][param] === undefined) {
        before[key][param] !== after[key][param]
          ? (target[key][param] = after[key][param])
          : (target[key][param] = undefined);
      }
    });
  });

  return addParentValue(target, after);
};

/**
 * 子要素の差分判定 子要素に差分がある場合、親要素もパラメータに付与する
 * @param target
 * @param after
 */
const addParentValue = (
  target: PostFacilityParams,
  after: PostFacilityParams
): PostFacilityParams => {
  Object.keys(parentParamsMap).forEach(facilityKey => {
    Object.keys(parentParamsMap[facilityKey]).forEach(paramKey => {
      const childKeys = parentParamsMap[facilityKey][paramKey].childKeys
        ? parentParamsMap[facilityKey][paramKey].childKeys
        : [];
      const isDiffChildren: boolean = childKeys.some((childKey: string) => {
        return target[facilityKey][childKey] !== undefined;
      });
      if (isDiffChildren) {
        target[facilityKey][parentParamsMap[facilityKey][paramKey].key] =
          after[facilityKey][parentParamsMap[facilityKey][paramKey].key];
      }
    });
  });

  // 特殊な親子関係
  if (target.facility_shisetsunyusho && after.facility_shisetsunyusho) {
    if (target.facility_shisetsunyusho.food_expenses !== undefined) {
      target.facility.available_food = after.facility.available_food;
    }
    if (target.facility.available_food !== undefined) {
      target.facility_shisetsunyusho.food_expenses =
        after.facility_shisetsunyusho.food_expenses;
      target.facility_shisetsunyusho.food_expenses_breakfast =
        after.facility_shisetsunyusho.food_expenses_breakfast;
      target.facility_shisetsunyusho.food_expenses_lunch =
        after.facility_shisetsunyusho.food_expenses_lunch;
      target.facility_shisetsunyusho.food_expenses_supper =
        after.facility_shisetsunyusho.food_expenses_supper;
      target.facility_shisetsunyusho.food_expenses_day =
        after.facility_shisetsunyusho.food_expenses_day;
    }
  }
  return removeNullParam(target);
};

/**
 * パラメータ内のundefinedはパラメータから除外する
 * @param data
 */
const removeNullParam = (data: PostFacilityParams): PostFacilityParams => {
  const targetParm = {
    facility: {},
    facility_shisetsunyusho: {}
  };
  // 引数のデータからfacilityとfacility_shisetsunyushoを取得
  Object.keys(data).forEach(key => {
    // facilityとfacility_shisetsunyushoからparamを取得
    Object.keys(data[key]).forEach(param => {
      if (data[key][param] !== undefined) {
        targetParm[key][param] = data[key][param];
      }
    });
  });

  return targetParm as PostFacilityParams;
};

const castNumber = (value?: string) => {
  return value ? Number(value) : 0;
};

export const normalizeFormValue = (
  state: FacilityValues
): PostFacilityParams => {
  return removeUnnecessaryValue({
    facility: {
      gov_business_owner: state.basic.corporationName,
      gov_facility_number: state.basic.officeNumber,
      name: state.basic.officeName,
      type_service: state.basic.serviceType,
      responsible_person: state.basic.representativeName,
      capacity:
        state.basic.capacity !== "" ? parseInt(state.basic.capacity, 10) : null,
      postal_code: state.basic.postalCode,
      prefecture_name: state.basic.prefectureId,
      city_id: parseInt(state.basic.cityId, 10),
      address: state.basic.restAddress,
      tel: state.basic.tel,
      multiple_facility_flg: state.basic.multiFunctionOfficeFlg
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      master_subordinate_flg: state.basic.masterSubordinateFlg
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      master_flg: state.basic.isMasterRadioValue,
      total_capacity: state.basic.multiFunctionOfficeFlg
        ? state.basic.allCapacity !== ""
          ? parseInt(state.basic.allCapacity, 10)
          : null
        : null,
      users_vs_supporter_grade: "",
      welfare_condition: "",
      better_supporter_condition: state.additionalItem.staffTreatmentSystemType,
      lack_of_supporter_flg: state.subtractionItem.lackOfSupporterFlg
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      date_start_lack_of_supporter: state.subtractionItem
        .dateStartLackOfSupporter
        ? selectDateValueToDate(state.subtractionItem.dateStartLackOfSupporter)
        : null,
      lack_of_service_admin_flg: "",
      date_start_lack_of_service_admin: null,
      origin_local_gov_flg: state.subtractionItem.originLocalGovFlg
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      see_hear_team_flg: state.additionalItem.seeHearTeamFlg
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,

      available_food: state.basic.availableFood
        ? STRING_TRUE_FROM_API
        : STRING_FALSE_FROM_API,
      specific_better_supporter_condition:
        state.additionalItem.staffTreatmentSpecificSystemType
    },
    facility_shisetsunyusho: {
      food_expenses: castNumber(state.basic.foodExpenses),
      food_expenses_breakfast: castNumber(state.basic.foodExpensesBreakfast),
      food_expenses_lunch: castNumber(state.basic.foodExpensesLunch),
      food_expenses_supper: castNumber(state.basic.foodExpensesSupper),
      food_expenses_day: castNumber(state.basic.foodExpensesDay),
      utility: castNumber(state.basic.utility),
      utility_costs: castNumber(state.basic.utilityCosts),
      nutritionist_placement: castNumber(
        state.subtractionItem.nutritionistPlacement
      ),
      nighttime_placement: castNumber(state.additionalItem.nighttimePlacement),
      serious_disability: castNumber(state.additionalItem.seriousDisability),
      regional_life_transition: state.additionalItem.regionalLifeTransition
        ? INT_TRUE_FROM_API
        : INT_FALSE_FROM_API,
      nutrition_management_flg: state.additionalItem.nutritionManagementFlg
        ? INT_TRUE_FROM_API
        : INT_FALSE_FROM_API
    }
  });
};

// パラメータの親子関係マッピング表
const parentParamsMap = {
  facility: {
    master_subordinate_flg: {
      key: "master_subordinate_flg",
      childKeys: ["master_flg"]
    },
    better_supporter_condition: {
      key: "better_supporter_condition",
      childKeys: ["specific_better_supporter_condition"]
    },
    specific_better_supporter_condition: {
      key: "specific_better_supporter_condition",
      childKeys: ["better_supporter_condition"]
    }
  },
  facility_shisetsunyusho: {
    food_expenses: {
      key: "food_expenses",
      childKeys: [
        "food_expenses_breakfast",
        "food_expenses_lunch",
        "food_expenses_supper",
        "food_expenses_day"
      ]
    },
    food_expenses_breakfast: {
      key: "food_expenses_breakfast",
      childKeys: ["food_expenses"]
    },
    food_expenses_lunch: {
      key: "food_expenses_lunch",
      childKeys: ["food_expenses"]
    },
    food_expenses_supper: {
      key: "food_expenses_supper",
      childKeys: ["food_expenses"]
    },
    food_expenses_day: {
      key: "food_expenses_day",
      childKeys: ["food_expenses"]
    },
    utility: {
      key: "utility",
      childKeys: ["utility_costs"]
    },
    utility_costs: {
      key: "utility_costs",
      childKeys: ["utility"]
    }
  }
};
