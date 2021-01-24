import { OptionInterface } from "@components/atoms/DropDown";

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

// 福祉・介護職員処遇改善加算
export enum WelfareSpecialistPlacementTypes {
  "なし" = 1, // 1
  "福祉専門職員配置加算 (Ⅰ)", // 2
  "福祉専門職員配置加算 (Ⅱ)", // 3
  "福祉専門職員配置加算 (Ⅲ)" // 4
}

// 施設区分
export const JIRITSUKUNRENSEIKATSU_TYPE_LIST = [
  { label: "生活訓練", value: "1" },
  { label: "共生型生活訓練", value: "2" },
  { label: "基準該当生活訓練", value: "3" }
];

// 短期滞在加算
export enum shortStayTypes {
  "体制なし" = 0,
  "宿直体制", // 1
  "夜勤体制" // 2
}

// 精神障害者退院支援体制加算
export enum supportForMentallyIllDisChargeSystemTypes {
  "体制なし" = 0,
  "宿直体制", // 1
  "夜勤体制" // 2
}

// inOutRecordsのサービス提供状況
export enum JIRITSUKUNREN_IN_OUT_RECORDS_STATUS {
  // -
  NONE = "1",
  // 通所
  USUAL_PLACE = "2",
  // 欠席時対応
  WHEN_ABSENT = "5",
  // 訪問
  VISIT = "6",
  // 体験利用
  TRIAL_USE_SUPPORT = "7",
  // 欠席(加算なし)
  ABSENT = "10"
}

export const JIRITSUKUNRENSEIKATSU_IN_OUT_RECORDS_STATUS_LIST: OptionInterface[] = [
  { label: "-", value: "1" },
  { label: "通所", value: "2" },
  { label: "欠席時対応", value: "5" },
  { label: "訪問", value: "6" },
  { label: "体験利用", value: "7" },
  { label: "欠席", value: "10" }
];

export const JIRITSUKUNRENSEIKATSU_IN_OUT_RECORDS_STATUS_MODAL: OptionInterface[] = [
  { label: "-", value: "1" },
  { label: "通所", value: "2" },
  { label: "欠席時対応", value: "5" },
  { label: "訪問", value: "6" },
  { label: "体験利用", value: "7" },
  { label: "欠席（加算なし）", value: "10" }
];

export const JIRITSUKUNRENSEIKATSU_SUMMARY_SERVICE_STATUS = {
  USUAL_PLACE: { label: "通所", value: 2 },
  WHEN_ABSENT: { label: "欠席時対応", value: 5 },
  VISIT: { label: "訪問", value: 6 },
  TRIAL_USE_SUPPORT: { label: "体験利用支援", value: 7 },
  ABSENT: { label: "欠席（加算なし）", value: 10 }
};

export enum JIRITSUKUNRENSEIKATSU_VISIT_SUPPORT_VALUE {
  NONE = "0",
  LESS_ONE_HOUR = "1",
  OVER_ONE_HOUR = "2",
  PROFESSIONAL_TRAINING = "3"
}
// 自立訓練用訪問支援
export const JIRITSUKUNRENSEIKATSU_VISIT_SUPPORT = [
  { label: "-", value: JIRITSUKUNRENSEIKATSU_VISIT_SUPPORT_VALUE.NONE },
  {
    label: "1時間未満",
    value: JIRITSUKUNRENSEIKATSU_VISIT_SUPPORT_VALUE.LESS_ONE_HOUR
  },
  {
    label: "1時間以上",
    value: JIRITSUKUNRENSEIKATSU_VISIT_SUPPORT_VALUE.OVER_ONE_HOUR
  },
  {
    label: "視覚障害者に対する専門的訓練",
    value: JIRITSUKUNRENSEIKATSU_VISIT_SUPPORT_VALUE.PROFESSIONAL_TRAINING
  }
];
