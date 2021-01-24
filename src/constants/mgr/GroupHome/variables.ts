import { FieldItem } from "@interfaces/ui/form";

/**
 * 夜間支援体制加算
 * constants/variablesの`USAGE_PERFORMANCE_NIGHT_SUPPORT_TYPE`とは「-」が選べず、ラベルが違う
 */
export const NIGHT_SUPPORT_TYPE_OPTIONS: FieldItem[] = [
  {
    value: "2",
    label: "夜間支援体制加算（Ⅰ）"
  },
  {
    value: "3",
    label: "夜間支援体制加算（Ⅱ）"
  },
  {
    value: "4",
    label: "夜間支援体制加算（Ⅲ）"
  }
];

/**
 * 夜間支援体制加算
 * 未設定を許容するパターンで使う想定
 */
export const NIGHT_SUPPORT_TYPE_ALL_OPTIONS: FieldItem[] = [
  {
    value: "1",
    label: "なし"
  },
  ...NIGHT_SUPPORT_TYPE_OPTIONS
];

/**
 * 居宅介護
 */
export const HOME_CARE_FLG: FieldItem[] = [
  { label: "-", value: "0" },
  { label: "あり", value: "1" }
];
