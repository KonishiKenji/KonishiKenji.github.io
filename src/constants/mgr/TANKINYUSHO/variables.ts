import { OptionInterface } from "@components/atoms/DropDown";
import { RadioItemInterface } from "@components/atoms/RadioButtons";

// 障害児区分
export const DISABILITY_CHILD_CLASS_LIST: RadioItemInterface[] = [
  { label: "なし", value: "0" },
  { label: "区分1", value: "1" },
  { label: "区分2", value: "2" },
  { label: "区分3", value: "3" }
];

// 支援内容
export const SUPPORT_TYPE_LIST: RadioItemInterface[] = [
  { label: "その他", value: "0" },
  { label: "医療型（療養介護、重心）", value: "1" },
  { label: "医療型（その他）", value: "2" }
];

// 重度障害者支援
export const SEVERE_DISABILITY_SUPPORT_TYPE_LIST: RadioItemInterface[] = [
  { label: "なし", value: "0" },
  { label: "あり", value: "1" }
];

// 特別重度支援
export const SPECIAL_SEVERE_DISABILITY_SUPPORT_TYPE_LIST: RadioItemInterface[] = [
  { label: "対象外", value: "0" },
  { label: "特別重度支援加算（Ⅰ）", value: "1" },
  { label: "特別重度支援加算（Ⅱ）", value: "2" }
];

// 施設タイプ
export const FACILITY_TYPE_ITEMS: OptionInterface[] = [
  { label: "選択してください", value: "" },
  { label: "福祉型短期入所", value: "0" },
  { label: "医療型短期入所", value: "1" },
  { label: "医療型特定短期入所", value: "2" },
  { label: "共生型短期入所", value: "3" },
  { label: "基準該当短期入所", value: "4" }
];

// 医療施設タイプ:施設タイプが医療型短期入所の場合
export const MEDICAL_TYPE_ITEMS: OptionInterface[] = [
  { label: "選択してください", value: "0" },
  { label: "医療型短期入所（Ⅰ）", value: "1" },
  { label: "医療型短期入所（Ⅱ）（Ⅲ）", value: "2" }
];

// 医療施設タイプ:施設タイプが医療型特定短期入所の場合
export const MEDICAL_SPECIFIC_TYPE_ITEMS: OptionInterface[] = [
  { label: "選択してください", value: "0" },
  { label: "医療型特定短期入所（Ⅰ）（Ⅳ）", value: "1" },
  { label: "医療型特定短期入所（Ⅴ）（Ⅵ）", value: "2" },
  { label: "医療型特定短期入所（Ⅱ）（Ⅲ）", value: "3" }
];

// 施設併用状況
export const FACILITY_COMBI_STATUS_ITEMS: RadioItemInterface[] = [
  { label: "単独施設", value: "0" },
  {
    label: "単独施設ではない（外部サービス利用型指定共同生活援助事業所）",
    value: "1"
  },
  { label: "単独施設ではない（指定宿泊型自立訓練事業所）", value: "2" },
  { label: "単独施設ではない（指定共同生活援助事業所）", value: "3" },
  {
    label: "単独施設ではない（日中サービス支援型指定共同生活援助事業所）",
    value: "4"
  },
  { label: "それ以外", value: "5" }
];

// 配置人数
export const FULLTIME_NURSING_STAFF_ITEMS: RadioItemInterface[] = [
  { label: "6人以下", value: "1" },
  { label: "7人以上12人以下", value: "2" },
  { label: "13人以上17人以下", value: "3" },
  { label: "18人以上", value: "4" }
];

// 栄養士配置
export const DIETICIAN_ITEMS: RadioItemInterface[] = [
  { label: "栄養士配置加算（Ⅰ）", value: "1" },
  { label: "栄養士配置加算（Ⅱ）", value: "2" }
];

// 福祉専門職員配置等加算
export const WELFARE_SPECIALIST_PLACEMENT_TYPE_ITEMS: RadioItemInterface[] = [
  { label: "なし", value: "1" },
  { label: "福祉専門職員配置等加算 (Ⅰ)", value: "2" },
  { label: "福祉専門職員配置等加算 (Ⅱ)", value: "3" }
];

export enum TANKINYUSHOReportTabInfo {
  DAILY = 0,
  MONTHLY = 1
}

export const TANKINYUSHO_REPORT_TABS_INFO = [
  { label: "日ごと", value: TANKINYUSHOReportTabInfo.DAILY },
  { label: "利用者ごと", value: TANKINYUSHOReportTabInfo.MONTHLY }
];

// サービス提供の状況
export enum StatusType {
  NONE = "0",
  IMPLEMENTATION = "16"
}

export const STATUS_TYPE = [
  { label: "-", value: StatusType.NONE },
  { label: "実施", value: StatusType.IMPLEMENTATION }
];

// 生活介護等または指定通所支援等を実施
export enum OtherSupport {
  NONE = "0",
  IMPLEMENTATION = "1"
}

export const OTHER_SUPPORT = [
  { label: "-", value: OtherSupport.NONE },
  { label: "実施", value: OtherSupport.IMPLEMENTATION }
];

export const SUPPLY_FOOD_SERVICE_LIST = [
  { label: "-", value: "0" },
  { label: "あり", value: "1" }
];

// 送迎サービス
export enum SupplyPickupServiceList {
  NONE = "0",
  OU = "1",
  FUKU = "2",
  OUFUKU = "3"
}

export const SUPPLY_PICKUP_SERVICE_LIST = [
  { label: "-", value: SupplyPickupServiceList.NONE },
  { label: "往", value: SupplyPickupServiceList.OU },
  { label: "復", value: SupplyPickupServiceList.FUKU },
  { label: "往復", value: SupplyPickupServiceList.OUFUKU }
];

// 同一敷地内送迎
export enum PickupPremiseList {
  NONE = "0",
  ON_SITE = "1"
}

export const PICKUP_PREMISES = [
  { label: "-", value: PickupPremiseList.NONE },
  { label: "同一敷地内", value: PickupPremiseList.ON_SITE }
];

// 緊急短期入所受入
export enum EmergencyShortterm {
  NONE = "0",
  IMPLEMENTATION = "1"
}

export const EMERGENCY_SHORTTERM = [
  { label: "-", value: EmergencyShortterm.NONE },
  { label: "実施", value: EmergencyShortterm.IMPLEMENTATION }
];

// 単独型18時間以上
export enum OverHours {
  NONE = "0",
  IMPLEMENTATION = "1"
}

export const OVER_HOURS = [
  { label: "-", value: OverHours.NONE },
  { label: "実施", value: OverHours.IMPLEMENTATION }
];

// 定員超過特例
export const CAPACITY_OVERRUN_EXCEPTION = [
  { label: "対象外", value: "0" },
  { label: "定員超過特例", value: "1" },
  { label: "定員超過特例（同一日、同一事業所内）", value: "2" }
];

export const MEDICAL_COOPERATION_TEXT = [
  { label: "加算なし", value: "0" },
  { label: "医療連携体制加算（Ⅰ）", value: "1" },
  { label: "医療連携体制加算（Ⅱ）", value: "2" },
  { label: "医療連携体制加算（Ⅲ,Ⅳ）", value: "4" },
  { label: "医療連携体制加算（Ⅵ）", value: "6" },
  { label: "医療連携体制加算（Ⅶ）", value: "7" }
];

// 登録できる項目一覧
export const BulkRegistrationItemList = {
  STATUS_TYPE: "statusType",
  OTHER_SUPPORT: "otherSupport",
  FOOD: "food",
  PICK_UP: "pickup",
  PICK_UP_PREMISE: "pickupPremise",
  EMERGENCY_SHORTTERM: "emergencyShortterm",
  OVER_HOURS: "overHours"
} as const;

export type BulkRegistrationItemList = typeof BulkRegistrationItemList[keyof typeof BulkRegistrationItemList];

// usagePerformance項目一覧
export const USAGE_PERFORMANCE_ITEM_LIST: BulkRegistrationItemList[] = [
  BulkRegistrationItemList.STATUS_TYPE
];

// usagePerformance項目一覧
export const USAGE_PERFORMANCE_TANKINYUSHO_ITEM_LIST: BulkRegistrationItemList[] = [
  BulkRegistrationItemList.OTHER_SUPPORT,
  BulkRegistrationItemList.FOOD,
  BulkRegistrationItemList.PICK_UP,
  BulkRegistrationItemList.PICK_UP_PREMISE,
  BulkRegistrationItemList.EMERGENCY_SHORTTERM,
  BulkRegistrationItemList.OVER_HOURS
];

// storeのkey名とselectBoxのkey名の関連付け
export const UsagePerformanceStoreParamKeyToSelectBoxName = {
  statusType: { storeKey: "statusType", cast: "number" }
};

// storeのkey名とselectBoxのkey名の関連付け
export const UsagePerformanceTANKINYUSHOStoreParamKeyToSelectBoxName = {
  otherSupport: { storeKey: "otherSupport", cast: "number" },
  food: { storeKey: "food", cast: "number" },
  pickup: { storeKey: "pickup", cast: "number" },
  pickupPremise: { storeKey: "pickupPremises", cast: "number" },
  emergencyShortterm: { storeKey: "emergencyShortterm", cast: "number" },
  overHours: { storeKey: "overHours", cast: "number" }
};
