import { RadioItemInterface } from "@components/atoms/RadioButtons";
import { OptionInterface } from "@components/atoms/DropDown";

// 常勤看護職員等配置加算
export enum FullTimeNursePlacementTypes {
  "なし" = 0,
  "常勤看護職員等配置（Ⅰ）", // 1
  "常勤看護職員等配置（Ⅱ）" // 2
}

// 人員配置体制
export enum StaffPlacementTypes {
  "なし" = 0,
  "Ⅰ型（1.7：1）", // 1
  "Ⅱ型（2：1）", // 2
  "Ⅲ型（2.5：1）", // 3
  "Ⅳ型（3：1）", // 4
  "Ⅴ型（3.5：1）", // 5
  "Ⅵ型（4：1）", // 6
  "Ⅶ型（4.5：1）", // 7
  "Ⅷ型（5：1）", // 8
  "Ⅸ型（5.5：1）", // 9
  "Ⅹ型（6：1）" // 10
}

export enum OpenShortTime {
  NONE = "0",
  LESS_FOUR_HOURS = "1",
  BETWEEN_FOUR_TO_SIX = "2",
  MORE_SIX = "3"
}
export const OPENED_TIME_ITEMS: OptionInterface[] = [
  { label: "なし", value: OpenShortTime.NONE },
  { label: "開所時間４時間未満", value: OpenShortTime.LESS_FOUR_HOURS },
  {
    label: "開所時間４時間以上６時間未満",
    value: OpenShortTime.BETWEEN_FOUR_TO_SIX
  }
];

// 送迎サービス
export const SUPPLY_PICKUP_SERVICE_ITEMS = [
  { label: "送迎サービス（Ⅰ）", value: "1" },
  { label: "送迎サービス（Ⅱ）", value: "2" }
];

// 就労移行支援体制加算 前年度実績就労継続者
export const SUPPORT_IKOU_RESULT_ITEMS = [
  { label: "6ヶ月以上の就労継続者なし", value: "1" },
  { label: "6ヶ月以上の就労継続者あり", value: "2" }
];

// 福祉専門職員配置等加算
export enum WelfareSpecialistPlacementType {
  "なし" = 1, // 1
  "福祉専門職員配置加算 (Ⅰ)", // 2
  "福祉専門職員配置加算 (Ⅱ)", // 3
  "福祉専門職員配置加算 (Ⅲ)" // 4
}

// 重度障害者支援
export const SEVERE_DISABILITY_SUPPORT_TYPE_LIST: RadioItemInterface[] = [
  { label: "なし", value: "0" },
  { label: "あり", value: "1" },
  { label: "あり（基礎研修修了者対応）", value: "2" }
];

// リハビリテーション加算
export const REHABILITATION_TYPE_LIST: RadioItemInterface[] = [
  { label: "なし", value: "0" },
  { label: "リハビリテーション加算（Ⅰ）", value: "1" },
  { label: "リハビリテーション加算（Ⅱ）", value: "2" }
];

export const SEIKATSUKAIGO_TYPE_LIST = [
  { label: "生活介護", value: "0" },
  { label: "共生型生活介護サービス（Ⅰ）", value: "1" },
  { label: "共生型生活介護サービス（Ⅱ）", value: "2" },
  { label: "基準該当生活介護サービス（Ⅰ）", value: "5" },
  { label: "基準該当生活介護サービス（Ⅱ）", value: "6" },
  { label: "経過的生活介護", value: "9" }
];
