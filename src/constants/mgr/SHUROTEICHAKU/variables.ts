import { OptionInterface } from "@components/atoms/DropDown";
import { RadioItemInterface } from "@components/atoms/RadioButtons";

// 担当者_関係性
export const STAFF_RELATIONSHIP_ITEMS: OptionInterface[] = [
  { label: "上司", value: "0" },
  { label: "先輩", value: "1" },
  { label: "同僚", value: "2" },
  { label: "後輩", value: "3" },
  { label: "部下", value: "4" },
  { label: "担当窓口", value: "5" },
  { label: "その他", value: "9" }
];

export const RATE_GET_JOB_ITEMS: RadioItemInterface[] = [
  { label: "9割以上", value: "1" },
  { label: "8割以上9割未満", value: "2" },
  { label: "7割以上8割未満", value: "3" },
  { label: "5割以上7割未満", value: "4" },
  { label: "3割以上5割未満", value: "5" },
  { label: "1割以上3割未満", value: "6" },
  { label: "1割未満", value: "7" }
];
