import { OptionInterface } from "@components/atoms/DropDown";

export enum ReportTabInfo {
  DAILY = 0,
  USERS = 1
}

export const REPORT_TABS_INFO = [
  { label: "日ごと", value: ReportTabInfo.DAILY },
  { label: "利用者ごと", value: ReportTabInfo.USERS }
];

// サービス提供状況
export enum StatusType {
  NONE = "0",
  LODGING = "1",
  HOSPITALIZATION_FIRST = "2",
  HOSPITALIZATION = "3",
  HOSPITALIZATION_LAST = "4",
  OVERNIGHT_FIRST = "5",
  OVERNIGHT = "6",
  OVERNIGHT_LAST = "7",
  HOSPITALIZATION_FROM_OVERNIGHT = "8",
  OVERNIGHT_FROM_HOSPITALIZATION = "9",
  HOSPITALIZATION_COMMUNITY_LIFE_OVERNIGHT = "10",
  OVERNIGHT_COMMUNITY_LIFE_HOSPITALIZATION = "11",
  EXPERIENCE_LODGING_FIRST = "13",
  EXPERIENCE_LODGING = "14",
  EXPERIENCE_LODGING_LAST = "15",
  REGIONAL_MIGRATION_SUPPORT = "90"
}

export const STATUS_TYPE: OptionInterface[] = [
  { label: "-", value: StatusType.NONE },
  { label: "宿泊", value: StatusType.LODGING },
  { label: "入院（初日）", value: StatusType.HOSPITALIZATION_FIRST },
  { label: "入院（中日）", value: StatusType.HOSPITALIZATION },
  { label: "入院（最終日）", value: StatusType.HOSPITALIZATION_LAST },
  { label: "外泊（初日）", value: StatusType.OVERNIGHT_FIRST },
  { label: "外泊（中日）", value: StatusType.OVERNIGHT },
  { label: "外泊（最終日）", value: StatusType.OVERNIGHT_LAST },
  { label: "入院→外泊", value: StatusType.HOSPITALIZATION_FROM_OVERNIGHT },
  { label: "外泊→入院", value: StatusType.OVERNIGHT_FROM_HOSPITALIZATION },
  {
    label: "入院→共同生活住居に戻る→外泊",
    value: StatusType.HOSPITALIZATION_COMMUNITY_LIFE_OVERNIGHT
  },
  {
    label: "外泊→共同生活住居に戻る→入院",
    value: StatusType.OVERNIGHT_COMMUNITY_LIFE_HOSPITALIZATION
  },
  { label: "体験宿泊（初日）", value: StatusType.EXPERIENCE_LODGING_FIRST },
  { label: "体験宿泊（中日）", value: StatusType.EXPERIENCE_LODGING },
  { label: "体験宿泊（最終日）", value: StatusType.EXPERIENCE_LODGING_LAST },
  {
    label: "地域移行対応（退所後）",
    value: StatusType.REGIONAL_MIGRATION_SUPPORT
  }
];

// 入院・外泊
export enum HospitalizationOvernightstay {
  NONE = "0",
  ONE = "1",
  TWO = "2",
  SPECIAL = "3"
}

export const HOSPITALIZATION_OVERNIGHTSTAY: OptionInterface[] = [
  { label: "-", value: HospitalizationOvernightstay.NONE },
  { label: "Ⅰ", value: HospitalizationOvernightstay.ONE },
  { label: "Ⅱ", value: HospitalizationOvernightstay.TWO },
  { label: "特別", value: HospitalizationOvernightstay.SPECIAL }
];

export const HOSPITALIZATION_OVERNIGHTSTAY_BY_DIALOG: OptionInterface[] = [
  { label: "-", value: HospitalizationOvernightstay.NONE },
  { label: "入院・外泊時加算(Ⅰ)", value: HospitalizationOvernightstay.ONE },
  { label: "入院・外泊時加算(Ⅱ)", value: HospitalizationOvernightstay.TWO },
  { label: "入院時支援特別加算", value: HospitalizationOvernightstay.SPECIAL }
];

// 地域移行支援
export enum RegionalTransition {
  NONE = "0",
  IMPLEMENTATION = "1"
}

export const REGIONAL_TRANSITION: OptionInterface[] = [
  { label: "-", value: RegionalTransition.NONE },
  { label: "実施", value: RegionalTransition.IMPLEMENTATION }
];

// 光熱水費
export enum CollectionOfUtilityFee {
  NONE = "0",
  IMPLEMENTATION = "1"
}

export const COLLECTION_OF_UTILITY_FEE: OptionInterface[] = [
  { label: "-", value: CollectionOfUtilityFee.NONE },
  { label: "あり", value: CollectionOfUtilityFee.IMPLEMENTATION }
];

// 食事提供(朝)
export enum FoodBreakfast {
  NONE = "0",
  IMPLEMENTATION = "1"
}

export const FOOD_BREAKFAST: OptionInterface[] = [
  { label: "-", value: FoodBreakfast.NONE },
  { label: "あり", value: FoodBreakfast.IMPLEMENTATION }
];

// 食事提供(昼)
export enum FoodLunch {
  NONE = "0",
  IMPLEMENTATION = "1"
}

export const FOOD_LUNCH: OptionInterface[] = [
  { label: "-", value: FoodLunch.NONE },
  { label: "あり", value: FoodLunch.IMPLEMENTATION }
];

// 食事提供(夜)
export enum FoodSupper {
  NONE = "0",
  IMPLEMENTATION = "1"
}

export const FOOD_SUPPER: OptionInterface[] = [
  { label: "-", value: FoodSupper.NONE },
  { label: "あり", value: FoodSupper.IMPLEMENTATION }
];

// 食事単価
export enum foodExpenses {
  NONE = "0",
  PER_FOOD = "1",
  PER_DAY = "2"
}

export const FOOD_EXPENSES_TYPE_LIST: OptionInterface[] = [
  { label: "負担なし", value: foodExpenses.NONE },
  { label: "食事ごと", value: foodExpenses.PER_FOOD },
  { label: "１日ごと", value: foodExpenses.PER_DAY }
];

// 経口移行加算
export enum OralTransition {
  NONE = "0",
  ADDITION = "1"
}

export const ORAL_TRANSITION: OptionInterface[] = [
  { label: "-", value: OralTransition.NONE },
  { label: "経口移行加算対象", value: OralTransition.ADDITION }
];

// 経口維持加算
export enum OralPreservation {
  NONE = "0",
  ADDITION_ONE = "1",
  ADDITION_TWO = "2"
}

export const ORAL_PRESERVATION: OptionInterface[] = [
  { label: "-", value: OralPreservation.NONE },
  { label: "経口維持加算Ⅰ", value: OralPreservation.ADDITION_ONE },
  { label: "経口維持加算Ⅱ", value: OralPreservation.ADDITION_TWO }
];

// 光熱水費
export enum utility {
  NONE = "0",
  PER_DAY = "1",
  PER_MONTH = "2"
}

export const UTILITY_TYPE_LIST: OptionInterface[] = [
  { label: "負担なし", value: utility.NONE },
  { label: "日ごと", value: utility.PER_DAY },
  { label: "月ごと", value: utility.PER_MONTH }
];

export const NIGHTTIME_PLACEMENT_LIST: OptionInterface[] = [
  { label: "配置なし", value: "0" },
  { label: "配置あり（生活支援員）", value: "1" },
  { label: "配置あり（看護職員）", value: "2" }
];

export const SERIOUS_DISABILITY_LIST: OptionInterface[] = [
  { label: "なし", value: "0" },
  { label: "重度障害者支援加算（Ⅰ）", value: "1" },
  { label: "重度障害者支援加算（Ⅰ）（重度）", value: "2" },
  { label: "重度障害者支援加算（Ⅱ）", value: "3" }
];

export const NUTRITIONIST_PLACEMENT_LIST: OptionInterface[] = [
  { label: "配置あり（常勤）", value: "1" },
  { label: "配置あり（非常勤）", value: "2" },
  { label: "配置なし", value: "0" }
];

export const STAFF_TREATMENT_SPECIFIC_SYSTEM_LIST: OptionInterface[] = [
  { label: "なし", value: "1" },
  { label: "特定処遇改善加算", value: "2" }
];

// 登録できる項目一覧
export const BulkRegistrationItemList = {
  STATUS_TYPE: "statusType",
  HOSPITALIZATION_OVERNIGHTSTAY: "hospitalizationOvernightstay",
  REGIONAL_TRANSITION: "regionalTransition",
  COLLECTION_OF_UTILITY_FEE: "collectionOfUtilityFee",
  FOOD_BREAKFAST: "foodBreakfast",
  FOOD_LUNCH: "foodLunch",
  FOOD_SUPPER: "foodSupper"
} as const;
export type BulkRegistrationItemList = typeof BulkRegistrationItemList[keyof typeof BulkRegistrationItemList];

// usagePerformance項目一覧
export const USAGE_PERFORMANCE_ITEM_LIST: BulkRegistrationItemList[] = [
  BulkRegistrationItemList.STATUS_TYPE
];

// usagePerformanceSHISETSUNYUSHO項目一覧
export const USAGE_PERFORMANCE_SHISETSUNYUSHO_ITEM_LIST: BulkRegistrationItemList[] = [
  BulkRegistrationItemList.HOSPITALIZATION_OVERNIGHTSTAY,
  BulkRegistrationItemList.REGIONAL_TRANSITION,
  BulkRegistrationItemList.COLLECTION_OF_UTILITY_FEE,
  BulkRegistrationItemList.FOOD_BREAKFAST,
  BulkRegistrationItemList.FOOD_LUNCH,
  BulkRegistrationItemList.FOOD_SUPPER
];

// storeのkey名とselectBoxのkey名の関連付け
export const UsagePerformanceStoreParamKeyToSelectBoxName = {
  statusType: {
    storeKey: "statusType",
    cast: "number"
  }
};

// storeのkey名とselectBoxのkey名の関連付け
export const UsagePerformanceSHISETSUNYUSHOStoreParamKeyToSelectBoxName = {
  hospitalizationOvernightstay: {
    storeKey: "hospitalizationOvernightStay",
    cast: "number"
  },
  regionalTransition: { storeKey: "regionalTransition", cast: "number" },
  collectionOfUtilityFee: {
    storeKey: "collectionOfUtilityFee",
    cast: "number"
  },
  foodBreakfast: { storeKey: "foodBreakfast", cast: "number" },
  foodLunch: { storeKey: "foodLunch", cast: "number" },
  foodSupper: { storeKey: "foodSupper", cast: "number" }
};
