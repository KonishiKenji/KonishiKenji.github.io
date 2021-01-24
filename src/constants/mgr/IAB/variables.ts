import { RadioItemInterface } from "@components/atoms/RadioButtons";
import { OptionInterface } from "@components/atoms/DropDown";

// 常勤看護職員等配置加算
export enum FullTimeNursePlacementTypes {
  "なし" = 0,
  "常勤看護職員等配置（Ⅰ）", // 1
  "常勤看護職員等配置（Ⅱ）" // 2
}

// 就職後６ヶ月以上の定着率 // Iのみ
export enum PostEmploymentRetentionRateTypes {
  "なし" = 7,
  "0割超1割未満" = 6,
  "1割以上2割未満" = 5,
  "2割以上3割未満" = 4,
  "3割以上4割未満" = 3,
  "4割以上5割未満" = 2,
  "5割以上" = 1
}

// 職員配置
export enum StaffPlacementTypes {
  "7.5：1" = 1,
  "10：1" // 2
}

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

export enum DischargeSupportFacilityTypes {
  "なし" = 1,
  "精神障害者退院支援施設加算（Ⅰ）",
  "精神障害者退院支援施設加算（Ⅱ）"
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

// 負担_単位
export const BEAR_UNIT_ITEMS = [
  { label: "%", value: "1" },
  { label: "円", value: "2" }
];

// 利用者の1日平均労働時間 // Aのみ
export enum AverageDailyWorkingHoursOfUsersType {
  "2時間未満" = 7,
  "2時間以上3時間未満" = 6,
  "3時間以上4時間未満" = 5,
  "4時間以上5時間未満" = 4,
  "5時間以上6時間未満" = 3,
  "6時間以上7時間未満" = 2,
  "7時間以上" = 1
}

// 平均工賃の月額 // Bのみ
export enum MonthlyAverageWageType {
  "5千円未満" = 7,
  "5千円以上1万円未満" = 6,
  "1万円以上2万円未満" = 5,
  "2万円以上2万5千円未満" = 4,
  "2万5千円以上3万円未満" = 3,
  "3万円以上4万5千円未満" = 2,
  "4万5千円以上" = 1
}

// 重度者支援体制加算
export enum SevereSupportType {
  "なし" = 1,
  "重度者支援体制加算（Ⅰ）",
  "重度者支援体制加算（Ⅱ）"
}

export const SUPPORT_IKOU_RESULT_ITEM = [
  { label: "6ヶ月以上の就労継続者なし", value: "1" },
  { label: "6ヶ月以上の就労継続者あり", value: "2" }
];

// 作業時間_刻む単位
export const UNIT_ENGRAVE = [
  { label: "選択してください", value: "0" },
  { label: "1分", value: "1" },
  { label: "5分", value: "5" },
  { label: "10分", value: "10" },
  { label: "15分", value: "15" },
  { label: "30分", value: "30" },
  { label: "60分", value: "60" }
];
// サービス提供の状況 (inout_statusと紐付けて表示に使う想定)
export const IAB_IN_OUT_RECORDS_STATUS_LIST: OptionInterface[] = [
  { label: "-", value: "1" },
  { label: "通所", value: "2" },
  { label: "施設外就労", value: "3" }, // ABのみ
  { label: "施設外支援", value: "4" }, // ABのみ
  { label: "欠席時対応", value: "5" },
  { label: "訪問", value: "6" },
  { label: "体験利用支援", value: "7" },
  { label: "移行準備支援体制加算(I)", value: "8" }, // Iのみ
  { label: "移行準備支援体制加算(II)", value: "9" }, // Iのみ
  { label: "欠席", value: "10" }
];

// 移行型サービス提供の状況 (SELECTフィールド利用想定)
export const IKOU_IN_OUT_RECORDS_STATUS_MODAL: OptionInterface[] = [
  { label: "-", value: "1" },
  { label: "通所", value: "2" },
  { label: "欠席時対応", value: "5" },
  { label: "訪問", value: "6" },
  { label: "体験利用支援", value: "7" },
  { label: "移行準備支援I", value: "8" },
  { label: "移行準備支援II", value: "9" },
  { label: "欠席（加算なし）", value: "10" }
];

// AB型サービス提供の状況 (SELECTフィールド利用想定)
export const AB_IN_OUT_RECORDS_STATUS_MODAL: OptionInterface[] = [
  { label: "-", value: "1" },
  { label: "通所", value: "2" },
  { label: "欠席時対応", value: "5" },
  { label: "訪問", value: "6" },
  { label: "体験利用支援", value: "7" },
  { label: "施設外就労", value: "3" },
  { label: "施設外支援", value: "4" },
  { label: "欠席（加算なし）", value: "10" }
];

// 利用状況の詳細モーダルで使用
export const IAB_SUMMARY_SERVICE_STATUS = {
  USUAL_PLACE: { label: "通所", value: 2 },
  OFFSITE_WORK: { label: "施設外就労", value: 3 },
  OFFSITE_SUPPORT: { label: "施設外支援", value: 4 },
  WHEN_ABSENT: { label: "欠席時対応", value: 5 },
  VISIT: { label: "訪問", value: 6 },
  TRIAL_USE_SUPPORT: { label: "体験利用支援", value: 7 },
  SUPPORT_IKOU_1: { label: "移行準備支援体制加算(I)", value: 8 },
  SUPPORT_IKOU_2: { label: "移行準備支援体制加算(II)", value: 9 },
  ABSENT: { label: "欠席", value: 10 }
};

// 各種提供サービスや作業時間を設定できるサービス提供の状況
export const IAB_OPTION_SERVICE_STATUS = [
  { label: "通所", value: 2 },
  { label: "施設外就労", value: 3 },
  { label: "施設外支援", value: 4 },
  { label: "移行準備支援Ⅰ", value: 8 },
  { label: "移行準備支援Ⅱ", value: 9 }
];

// 目標タイプ ( A 型専用 )
export enum SprintType {
  LONG = 1, // 長期
  SHORT = 2, // 短期
  INDIVIDUAL = 3 // 個別目標
}

// 振り返り目標達成度合い
export const ACHIEVEMENT_STATE = ["未達成", "達成", "一部達成"];

// 振り返りステータス
export const DONE_STATE = ["未実施", "実施", "一部実施"];
