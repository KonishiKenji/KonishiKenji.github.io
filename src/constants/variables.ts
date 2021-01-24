import { OptionInterface } from "@components/atoms/DropDown";
import { RadioItemInterface } from "@components/atoms/RadioButtons";

export const DEFAULT_RADIO_VALUE = "1";
export const DEFAULT_CHECKBOX_VALUE = false;
export const DEFAULT_SELECT_VALUE = "NOT_SELECTED";

export const INT_FALSE_FROM_API = 0;
export const INT_TRUE_FROM_API = 1;
export const STRING_FALSE_FROM_API = "0";
export const STRING_TRUE_FROM_API = "1";

export const DEFAULT_DROP_DOWN_OPTION: OptionInterface = {
  label: "選択してください",
  value: DEFAULT_SELECT_VALUE
};
export const DEFAULT_CITY_STATE = {
  label: DEFAULT_DROP_DOWN_OPTION.label,
  value: DEFAULT_SELECT_VALUE,
  cityCode: "",
  grade: 0
};
export const DEFAULT_SUBSIDIZED_UNIT = "1";

export enum FacilityType {
  A = "A",
  B = "B",
  IKOU = "I", // 移行
  GROUP_HOME = "G", //  グループホーム
  SEIKATSUKAIGO = "SEIKATSUKAIGO", // 生活介護
  SHUROTEICHAKU = "SHUROTEICHAKU", // 就労定着支援
  JIRITSUKUNRENSEIKATSU = "JIRITSUKUNREN_SEIKATSU", // 自立訓練（生活訓練）
  TANKINYUSHO = "TANKINYUSHO", // 短期入所
  SHISETSUNYUSHO = "SHISETSUNYUSHO" // 施設入所支援
}

// 施設区分
export enum GroupHomeType {
  "介護サービス包括型" = 1,
  "外部サービス利用型", // 2
  "日中サービス支援型" // 3
}

// 職員配置
export enum StaffPlacementTypes {
  "Ⅰ型（4：1）" = 1,
  "Ⅱ型（5：1）", // 2
  "Ⅲ型（6：1）", // 3
  "Ⅳ型（10：1）", // 4
  "日中支援Ⅰ型（3：1）", // 5
  "日中支援Ⅱ型（4：1）", // 6
  "日中支援Ⅲ型（5：1）" // 7
}

// 福祉専門職員配置等加算
export enum WelfareSpecialistPlacementTypes {
  "なし" = 1, // 1
  "福祉専門職員配置等加算 (Ⅰ)", // 2
  "福祉専門職員配置等加算 (Ⅱ)", // 3
  "福祉専門職員配置等加算 (Ⅲ)" // 4
}

// 福祉・介護職員処遇改善加算
export enum StaffTreatmentSystemTypes {
  "なし" = 1,
  "処遇改善加算（Ⅰ）", // 2
  "処遇改善加算（Ⅱ）", // 3
  "処遇改善加算（Ⅲ）", // 4
  "処遇改善加算（Ⅳ）", // 5
  "処遇改善加算（Ⅴ）", // 6
  "特別加算" // 7
}

// 福祉・介護職員等特定処遇改善加算
export enum StaffTreatmentSpecificSystemTypes {
  "なし" = 1,
  "特定処遇改善加算（Ⅰ）",
  "特定処遇改善加算（Ⅱ）"
}

// 福祉・介護職員等特定処遇改善加算
export enum specificBetterSupporterConditionTypes {
  "なし" = 1,
  "特定処遇改善加算（Ⅰ）", // 2
  "特定処遇改善加算（Ⅱ）" // 3
}
export enum FacilityGroupHomeType {
  NURSINGCARE = 1,
  DAYTIME,
  EXTERNALUSE
}

export enum ServiceTypes {
  A = "45", // 就労継続支援A型
  B = "46", // 就労継続支援B型
  IKOU = "43", // 就労移行支援
  GROUP_HOME = "33", //  共同生活援助
  SEIKATSUKAIGO = "22", // 生活介護
  SHUROTEICHAKU = "47", // 就労定着支援
  JIRITSUKUNRENSEIKATSU = "42", // 自立訓練（生活訓練）
  TANKINYUSHO = "24" // 短期入所
}

// 都道府県
export const PREFECTURES_LIST: OptionInterface[] = [
  DEFAULT_DROP_DOWN_OPTION,
  { label: "北海道", value: "北海道" },
  { label: "青森県", value: "青森県" },
  { label: "岩手県", value: "岩手県" },
  { label: "宮城県", value: "宮城県" },
  { label: "秋田県", value: "秋田県" },
  { label: "山形県", value: "山形県" },
  { label: "福島県", value: "福島県" },
  { label: "茨城県", value: "茨城県" },
  { label: "栃木県", value: "栃木県" },
  { label: "群馬県", value: "群馬県" },
  { label: "埼玉県", value: "埼玉県" },
  { label: "千葉県", value: "千葉県" },
  { label: "東京都", value: "東京都" },
  { label: "神奈川県", value: "神奈川県" },
  { label: "新潟県", value: "新潟県" },
  { label: "富山県", value: "富山県" },
  { label: "石川県", value: "石川県" },
  { label: "福井県", value: "福井県" },
  { label: "山梨県", value: "山梨県" },
  { label: "長野県", value: "長野県" },
  { label: "岐阜県", value: "岐阜県" },
  { label: "静岡県", value: "静岡県" },
  { label: "愛知県", value: "愛知県" },
  { label: "三重県", value: "三重県" },
  { label: "滋賀県", value: "滋賀県" },
  { label: "京都府", value: "京都府" },
  { label: "大阪府", value: "大阪府" },
  { label: "兵庫県", value: "兵庫県" },
  { label: "奈良県", value: "奈良県" },
  { label: "和歌山県", value: "和歌山県" },
  { label: "鳥取県", value: "鳥取県" },
  { label: "島根県", value: "島根県" },
  { label: "岡山県", value: "岡山県" },
  { label: "広島県", value: "広島県" },
  { label: "山口県", value: "山口県" },
  { label: "徳島県", value: "徳島県" },
  { label: "香川県", value: "香川県" },
  { label: "愛媛県", value: "愛媛県" },
  { label: "高知県", value: "高知県" },
  { label: "福岡県", value: "福岡県" },
  { label: "佐賀県", value: "佐賀県" },
  { label: "長崎県", value: "長崎県" },
  { label: "熊本県", value: "熊本県" },
  { label: "大分県", value: "大分県" },
  { label: "宮崎県", value: "宮崎県" },
  { label: "鹿児島県", value: "鹿児島県" },
  { label: "沖縄県", value: "沖縄県" }
];

// 負担上限額
export const INCOME_KIND_LIST: RadioItemInterface[] = [
  { label: "0円", value: "1" },
  { label: "4,600円", value: "6" },
  { label: "9,300円", value: "3" },
  { label: "18,600円", value: "5" },
  { label: "37,200円", value: "4" }
];

// 所得区分
export const INCOME_KIND_TYPE_LIST: OptionInterface[] = [
  { label: "選択してください", value: "0" },
  { label: "生活保護", value: "1" },
  { label: "低所得", value: "2" }
];

export const INCOME_KIND_TYPE_LIST_NON_SELECT: OptionInterface[] = [
  { label: "生活保護", value: "1" },
  { label: "低所得", value: "2" }
];

// 助成金額の単位
export const SUBSIDIZED_UNIT_LIST: OptionInterface[] = [
  { label: "%", value: DEFAULT_SUBSIDIZED_UNIT },
  { label: "円", value: "2" }
];

export const UPLIMIT_CONT_ROLLED_BY_LIST: OptionInterface[] = [
  { label: "自事業所が上限管理", value: "1" },
  { label: "他事業所が上限管理", value: "2" }
];

export const RESULT_OF_MANAGEMENT_LIST: RadioItemInterface[] = [
  {
    label:
      "管理事業所で利用者負担額を充当したため、他事業所の利用者負担は発生しない",
    value: "1"
  },
  {
    label: "利用者負担額の合算額が、負担上限月額以下のため、調整事務は行わない",
    value: "2"
  },
  {
    label:
      "利用者負担額の合算額が、負担上限月額を超過するため、下記の通り調整した",
    value: "3"
  }
];

// 障害支援区分コードに対応する名前
// TODO: KNOWBE2-306対応後、21を区分1に変更
export const DISABILITY_CLASS_CODE_NAME_LIST = {
  "99": "区分なし",
  "21": "区分1",
  "22": "区分2",
  "23": "区分3",
  "24": "区分4",
  "25": "区分5",
  "26": "区分6"
};

// 障害区分
export const DISABILITY_CLASS_LIST: RadioItemInterface[] = [
  { label: "なし", value: "0" },
  { label: "区分1", value: "1" },
  { label: "区分2", value: "2" },
  { label: "区分3", value: "3" },
  { label: "区分4", value: "4" },
  { label: "区分5", value: "5" },
  { label: "区分6", value: "6" }
];

export const REGIONAL_TRANSFER_FOR_STRONG_BEHAVIOR_TYPE_LIST: RadioItemInterface[] = [
  { label: "なし", value: "1" },
  { label: "強度行動障害者地域移行特別加算", value: "2" },
  { label: "重度障害者支援加算", value: "3" }
];

export const MENTAL_DISORDER_SUPPORT_TYPE_LIST: RadioItemInterface[] = [
  { label: "なし", value: "1" },
  { label: "地域生活移行個別支援特別加算", value: "2" },
  { label: "精神障害者地域移行特別加算", value: "3" }
];

// 契約支給量
export const AGREED_BY_CONTRACT_LIST: RadioItemInterface[] = [
  { label: "原則日数（該当月の日数から8日を控除した日数）", value: "1" },
  { label: "契約支給量", value: "2" }
];

// 食事提供サービス
export const SUPPLY_FOOD_SERVICE: OptionInterface[] = [
  { label: "提供なし", value: "0" },
  { label: "提供あり", value: "1" }
];

// 同一敷地内送迎 0:なしの場合
export const PICKUP_PREMISES_CASE_0: OptionInterface[] = [
  { label: "-", value: "0" }
];

// 同一敷地内送迎 1:往の場合
export const PICKUP_PREMISES_CASE_1: OptionInterface[] = [
  { label: "-", value: "0" },
  { label: "あり", value: "1" }
];

// 同一敷地内送迎 2:復の場合
export const PICKUP_PREMISES_CASE_2: OptionInterface[] = [
  { label: "-", value: "0" },
  { label: "あり", value: "2" }
];

// 同一敷地内送迎 3:往復の場合
export const PICKUP_PREMISES_CASE_3: OptionInterface[] = [
  { label: "-", value: "0" },
  { label: "往のみ", value: "1" },
  { label: "復のみ", value: "2" },
  { label: "往復", value: "3" }
];

// Checkboxの値
export const enum Checkbox {
  OFF = "0",
  ON = "1"
}

// 延長支援サービス
export enum SupplyExtendedServiceList {
  "-" = "0",
  "延長（１時間未満）" = "1",
  "延長（１時間以上）" = "2"
}

export const SUPPLY_EXTENDED_SERVICE_LIST = [
  { label: "-", value: "0" },
  { label: "延長（１時間未満）", value: "1" },
  { label: "延長（１時間以上）", value: "2" }
];

// 食事提供サービス
export enum SupplyFoodsServiceList {
  "-" = "0",
  "あり" = "1"
}

export const SUPPLY_FOOD_SERVICE_LIST = [
  { label: "提供なし", value: "0" },
  { label: "提供あり", value: "1" }
];

// 送迎サービス
export enum SupplyPickupServiceList {
  "-" = "0",
  "往" = "1",
  "復" = "2",
  "往復" = "3"
}

export const SUPPLY_PICKUP_SERVICE_LIST = [
  { label: "-", value: "0" },
  { label: "往", value: "1" },
  { label: "復", value: "2" },
  { label: "往復", value: "3" }
];
export const SUPPLY_PICKUP_SERVICE_LIST2 = [
  { label: "送迎なし", value: "0" },
  { label: "往", value: "1" },
  { label: "復", value: "2" },
  { label: "往復", value: "3" }
];

// 同一敷地内送迎サービス
export enum SupplyPickupPremisesServiceList {
  "-" = "",
  "同一敷地内ではない" = "0",
  "往路が同一敷地内" = "1",
  "復路が同一敷地内" = "2",
  "往復ともに同一敷地内" = "3"
}

export const SUPPLY_PICKUP_PREMISES_SERVICE_LIST0 = [
  { label: "-", value: "0" }
];
export const SUPPLY_PICKUP_PREMISES_SERVICE_LIST1 = [
  { label: "-", value: "0" },
  { label: "あり", value: "1" }
];
export const SUPPLY_PICKUP_PREMISES_SERVICE_LIST2 = [
  { label: "-", value: "0" },
  { label: "あり", value: "2" }
];
export const SUPPLY_PICKUP_PREMISES_SERVICE_LIST3 = [
  { label: "-", value: "0" },
  { label: "往のみ", value: "1" },
  { label: "復のみ", value: "2" },
  { label: "往復", value: "3" }
];

export const NURSING_SUPPORT_RADIO_ITEMS = [
  { label: "なし", value: "1" },
  { label: "看護職員配置体制加算", value: "2" },
  { label: "医療連携体制加算（ Ⅴ ）", value: "3" }
];

// 短期滞在
export const SHORT_STAY_LIST = [
  { label: "-", value: Checkbox.OFF },
  { label: "実施", value: Checkbox.ON }
];

export enum ReportTabInfo {
  DAILY = 0,
  MONTHLY = 1
}

export const REPORT_TABS_INFO = [
  { label: "日ごと", value: ReportTabInfo.DAILY },
  { label: "月ごと", value: ReportTabInfo.MONTHLY }
];

export const USAGE_PERFORMANCE_STATUS_TYPE: OptionInterface[] = [
  { label: "-", value: "0" },
  { label: "宿泊", value: "1" },
  { label: "入院（初日）", value: "2" },
  { label: "入院（中日）", value: "3" },
  { label: "入院（最終日）", value: "4" },
  { label: "入院→外泊", value: "8" },
  { label: "入院→共同生活住居に戻る→外泊", value: "10" },
  { label: "外泊（初日）", value: "5" },
  { label: "外泊（中日）", value: "6" },
  { label: "外泊（最終日）", value: "7" },
  { label: "外泊→入院", value: "9" },
  { label: "外泊→共同生活住居に戻る→入院", value: "11" },
  { label: "体験利用", value: "12" }
];

export const USAGE_PERFORMANCE_STATUS_TYPE_END_IN_30_DAY: OptionInterface[] = [
  { label: "-", value: "0" },
  { label: "退去後加算", value: "91" }
];

export const USAGE_PERFORMANCE_STATUS_TYPE_FULL: OptionInterface[] = [
  { label: "-", value: "0" },
  { label: "宿泊", value: "1" },
  { label: "入院（初日）", value: "2" },
  { label: "入院（中日）", value: "3" },
  { label: "入院（最終日）", value: "4" },
  { label: "入院→外泊", value: "8" },
  { label: "入院→共同生活住居に戻る→外泊", value: "10" },
  { label: "外泊（初日）", value: "5" },
  { label: "外泊（中日）", value: "6" },
  { label: "外泊（最終日）", value: "7" },
  { label: "外泊→入院", value: "9" },
  { label: "外泊→共同生活住居に戻る→入院", value: "11" },
  { label: "体験利用", value: "12" },
  { label: "退去後加算", value: "91" }
];

export const USAGE_PERFORMANCE_NIGHT_SUPPORT_TYPE: OptionInterface[] = [
  { label: "-", value: "1" },
  { label: "Ⅰ", value: "2" },
  { label: "Ⅱ", value: "3" },
  { label: "Ⅲ", value: "4" }
];

export const USAGE_PERFORMANCE_HOSPITALIZATION_SUPPORT_TYPE: OptionInterface[] = [
  { label: "-", value: "1" },
  { label: "入院時支援特別加算", value: "2" },
  { label: "長期入院時支援特別加算", value: "3" }
];

export const USAGE_PERFORMANCE_GET_HOME_SUPPORT_TYPE: OptionInterface[] = [
  { label: "-", value: "1" },
  { label: "帰宅時支援加算", value: "2" },
  { label: "長期帰宅時支援加算", value: "3" }
];

export const USAGE_PERFORMANCE_DAYTIME_SUPPORT_TYPE: OptionInterface[] = [
  { label: "-", value: "1" },
  { label: "Ⅰ", value: "2" },
  { label: "Ⅱ", value: "3" }
];

export const USAGE_PERFORMANCE_MEDICAL_SUPPORT_TYPE: OptionInterface[] = [
  { label: "-", value: "1" },
  { label: "Ⅰ,Ⅲ", value: "2" },
  { label: "Ⅱ", value: "3" },
  { label: "Ⅳ", value: "4" }
];

/* 医療連携のIAB用（項目名が同じなのにGHと値が違う） */
export const IAB_USAGE_PERFORMANCE_MEDICAL_SUPPORT_TYPE: OptionInterface[] = [
  { label: "-", value: "0" },
  { label: "Ⅰ,Ⅲ", value: "1" },
  { label: "Ⅱ", value: "2" },
  { label: "Ⅳ", value: "3" }
];

export const LIFE_SUPPORT_FLG: OptionInterface[] = [
  { label: "-", value: "0" },
  { label: "あり", value: "1" }
];

export const FACILITY_TYPE_NAME_LIST: OptionInterface[] = [
  { label: "就労継続支援A型", value: FacilityType.A },
  { label: "就労継続支援B型", value: FacilityType.B },
  { label: "就労移行支援", value: FacilityType.IKOU },
  { label: "共同生活援助", value: FacilityType.GROUP_HOME },
  { label: "生活介護", value: FacilityType.SEIKATSUKAIGO },
  { label: "就労定着支援", value: FacilityType.SHUROTEICHAKU },
  { label: "自立訓練（生活訓練）", value: FacilityType.JIRITSUKUNRENSEIKATSU },
  { label: "短期入所", value: FacilityType.TANKINYUSHO },
  { label: "施設入所支援", value: FacilityType.SHISETSUNYUSHO }
];

export const GROUP_HOME_TYPE_LIST = [
  { label: "介護サービス包括型", value: "1" },
  { label: "日中サービス型", value: "2" },
  { label: "外部サービス利用型", value: "3" }
];

export const CONTACT_OVERVIEW_LIST = [
  { label: "選択してください", value: "" },
  { label: "操作に関するお問い合わせ", value: "操作に関するお問い合わせ" },
  { label: "動作不良・エラーについて", value: "動作不良・エラーについて" },
  { label: "取込送信システムについて", value: "取込送信システムについて" },
  { label: "その他", value: "その他" }
];

export const TRAIL_USAGE_KIND = [
  { label: "障害福祉サービスの体験利用支援加算(I)", value: "1" },
  { label: "障害福祉サービスの体験利用支援加算(Ⅱ)", value: "2" }
];

/**
 * notAttended : 未通所の場合true
 * notInout: trueの場合通所ボタン表示不可
 * isView: trueの場合前回の利用に表示
 */
export const SERVICE_STATUS = [
  { label: "-", value: 1, notAttended: true, notInOut: false, isView: false },
  {
    label: "通所",
    value: 2,
    notAttended: false,
    notInOut: false,
    isView: true
  },
  {
    label: "施設外就労",
    value: 3,
    notAttended: false,
    notInOut: false,
    isView: false
  },
  {
    label: "施設外支援",
    value: 4,
    notAttended: false,
    notInOut: false,
    isView: false
  },
  {
    label: "欠席時対応",
    value: 5,
    notAttended: false,
    notInOut: true,
    isView: false
  },
  {
    label: "訪問",
    value: 6,
    notAttended: true,
    notInOut: true,
    isView: false
  },
  {
    label: "体験利用支援",
    value: 7,
    notAttended: true,
    notInOut: true,
    isView: true
  },
  {
    label: "移行準備支援Ⅰ",
    value: 8,
    notAttended: false,
    notInOut: false,
    isView: true
  },
  {
    label: "移行準備支援Ⅱ",
    value: 9,
    notAttended: false,
    notInOut: false,
    isView: true
  },
  {
    label: "欠席",
    value: 10,
    notAttended: true,
    notInOut: true,
    isView: false
  }
];

// 業務日誌（日々の記録-業務日誌）_利用状況の詳細モーダル
export const INOUT_DETAIL_HEADER_LIST = [
  { label: "-", value: 1 },
  {
    label: "通所",
    value: 2
  },
  {
    label: "施設外就労",
    value: 3
  },
  {
    label: "施設外支援",
    value: 4
  },
  {
    label: "欠席時対応",
    value: 5
  },
  {
    label: "訪問",
    value: 6
  },
  {
    label: "体験利用支援",
    value: 7
  },
  {
    label: "移行準備支援体制加算 I",
    value: 8
  },
  {
    label: "移行準備支援体制加算 Ⅱ",
    value: 9
  },
  {
    label: "欠席",
    value: 10
  }
];

/**
 * サービス提供が終了しているか
 * 0 = サービス提供終了, 1 = サービス提供中, 2 = サービス提供終了後30日以内
 */
export const SERVICE_END_STATUS = {
  SERVICE_END: 0,
  SERVICE_USE: 1,
  SERVICE_END_IN_30_DAY: 2
};

export enum SEIKATSUKAIGOReportTabInfo {
  DAILY = 0,
  USERS = 1
}

export enum JIRITSUKUNRENSEIKATSUReportTabInfo {
  DAILY = 0,
  USERS = 1
}

export const SEIKATSUKAIGO_REPORT_TABS_INFO = [
  { label: "日ごと", value: SEIKATSUKAIGOReportTabInfo.DAILY },
  { label: "利用者ごと", value: SEIKATSUKAIGOReportTabInfo.USERS }
];

export const JIRITSUKUNRENSEIKATSU_REPORT_TABS_INFO = [
  { label: "日ごと", value: JIRITSUKUNRENSEIKATSUReportTabInfo.DAILY },
  { label: "利用者ごと", value: JIRITSUKUNRENSEIKATSUReportTabInfo.USERS }
];

export const VISIT_SUPPORT = [
  { label: "-", value: "0" },
  { label: "1時間未満", value: "1" },
  { label: "1時間以上", value: "2" }
];

export const TRIAL_USAGE_KIND = [
  { label: "-", value: "0" },
  { label: "Ⅰ", value: "1" },
  { label: "Ⅱ", value: "2" }
];

export const SUPPLY_PICKUP_SERVICE: OptionInterface[] = [
  { label: "-", value: "0" },
  { label: "往", value: "1" },
  { label: "復", value: "2" },
  { label: "往復", value: "3" }
];

export const SUPPLY_FOODS_SERVICE: OptionInterface[] = [
  { label: "-", value: "0" },
  { label: "あり", value: "1" }
];

export const MEDICAL_COOPERATION = [
  { label: "-", value: "0" },
  { label: "Ⅰ", value: "1" },
  { label: "Ⅱ", value: "2" },
  { label: "Ⅲ,Ⅳ", value: "4" }
];

export const MEDICAL_COOPERATION_TEXT = [
  { label: "加算なし", value: "0" },
  { label: "医療連携体制加算（Ⅰ）", value: "1" },
  { label: "医療連携体制加算（Ⅱ）", value: "2" },
  { label: "医療連携体制加算（Ⅲ,Ⅳ）", value: "4" }
];
export const SEIKATSUKAIGO_IN_OUT_RECORDS_STATUS: OptionInterface[] = [
  { label: "-", value: "1" },
  { label: "通所", value: "2" },
  { label: "欠席時対応", value: "5" },
  { label: "訪問", value: "6" },
  { label: "体験利用", value: "7" },
  { label: "欠席（加算なし）", value: "10" }
];

export const SEIKATSUKAIGO_SUMMARY_SERVICE_STATUS = {
  USUAL_PLACE: { label: "通所", value: 2 },
  WHEN_ABSENT: { label: "欠席時対応", value: 5 },
  VISIT: { label: "訪問", value: 6 },
  TRIAL_USE_SUPPORT: { label: "体験利用支援", value: 7 },
  ABSENT: { label: "欠席（加算なし）", value: 10 }
};

// 請求書 請求 サービス区分 変換
export enum BillServiceTypes {
  A = "就労継続支援A型", // 45
  B = "就労継続支援B型", // 46
  IKOU = "就労移行支援", // 43
  GROUP_HOME = "共同生活援助", // 33
  SEIKATSUKAIGO = "生活介護", // 22
  SHUROTEICHAKU = "就労定着支援", // 47
  JIRITSUKUNRENSEIKATSU = "自立訓練(生活訓練)", // 42
  TANKINYUSHO = "短期入所", // 24
  SHISETSUNYUSHO = "施設入所支援" // 32
}

// 介護給付費・訓練費請求書 介護給付費表示 区分
export const DISPLAY_INVOICE_SUMMARY_CITY_BILL_KAIGO_KYUHU = [
  BillServiceTypes.SEIKATSUKAIGO.toString(),
  BillServiceTypes.TANKINYUSHO.toString(),
  BillServiceTypes.SHISETSUNYUSHO.toString()
];

// 介護給付費・訓練費請求書 訓練給付費表示 区分
export const DISPLAY_INVOICE_SUMMARY_CITY_BILL_KUNREN_KYUHU = [
  BillServiceTypes.A.toString(),
  BillServiceTypes.B.toString(),
  BillServiceTypes.IKOU.toString(),
  BillServiceTypes.GROUP_HOME.toString(),
  BillServiceTypes.SHUROTEICHAKU.toString(),
  BillServiceTypes.JIRITSUKUNRENSEIKATSU.toString()
];

// 福祉・介護職員等特定処遇改善加算の表示条件
export const ENABLE_SPECIFIC_BETTER_SUPORTER_CONDITION_TYPES = [
  `${WelfareSpecialistPlacementTypes["処遇改善加算（Ⅰ）"]}`,
  `${WelfareSpecialistPlacementTypes["処遇改善加算（Ⅱ）"]}`,
  `${WelfareSpecialistPlacementTypes["処遇改善加算（Ⅲ）"]}`
];

// 支援記録のinout.statusに応じた項目
export const SUPPORT_RECORD_KEY_LABEL = {
  1: [],
  2: [
    { key: "support_work_history", label: "作業" },
    { key: "user_status", label: "利用者状態" },
    { key: "staff_comment", label: "職員考察" },
    { key: "interview_flg", label: "面談" },
    { key: "other_comment", label: "その他" }
  ],
  3: [
    { key: "workplace_company_id", label: "就労先企業" },
    { key: "support_work_history", label: "作業" },
    { key: "user_status", label: "利用者状態" },
    { key: "staff_comment", label: "職員考察" },
    { key: "interview_flg", label: "面談" },
    { key: "other_comment", label: "その他" }
  ],
  4: [
    { key: "support_work_history", label: "作業" },
    { key: "staff_comment", label: "職員考察" },
    { key: "interview_flg", label: "面談" },
    { key: "other_comment", label: "その他" }
  ],
  5: [
    { key: "correspondent_staff_id", label: "対応職員" },
    { key: "absence_reason", label: "欠席理由・支援内容" }
  ],
  6: [
    { key: "correspondent_staff_id", label: "対応職員" },
    { key: "support_content", label: "支援内容" }
  ],
  7: [
    { key: "staff_comment", label: "職員考察" },
    { key: "interview_flg", label: "面談" },
    { key: "other_comment", label: "その他" }
  ],
  8: [
    { key: "support_work_history", label: "作業" },
    { key: "staff_comment", label: "職員考察" },
    { key: "interview_flg", label: "面談" },
    { key: "other_comment", label: "その他" }
  ],
  9: [
    { key: "workplace_company_id", label: "就労先企業" },
    { key: "support_work_history", label: "作業" },
    { key: "user_status", label: "利用者状態" },
    { key: "staff_comment", label: "職員考察" },
    { key: "interview_flg", label: "面談" },
    { key: "other_comment", label: "その他" }
  ],
  10: [
    { key: "correspondent_staff_id", label: "対応職員" },
    { key: "absence_reason", label: "欠席理由・支援内容" }
  ]
};

// 初期設定ページが存在するfacilityTYpe
export const EXIST_INITIAL_PAGE = [
  FacilityType.SEIKATSUKAIGO,
  FacilityType.JIRITSUKUNRENSEIKATSU,
  FacilityType.IKOU,
  FacilityType.A,
  FacilityType.B,
  FacilityType.TANKINYUSHO,
  FacilityType.SHISETSUNYUSHO
];

// 福祉・介護職員等特定処遇改善加算のチェックが出来るようになる、福祉・介護職員処遇改善加算の値
export const ENABLE_SPECIFIC_BETTER_SUPPORTER_CONDITION_VALUES = [
  "2",
  "3",
  "4"
];

// 取得する記録内容を選択
export const RECORD_TYPE = {
  SUPPORT_PLAN: "support-plan",
  SUPPORT: "support",
  WORK: "work",
  INTERVIEW: "interview"
};

// 大規模住居等減算
export const SUBTRACTION_OF_LARGE_SCALE_HOUSING = [
  { label: "入居定員が8名以上", value: "1" },
  { label: "入居定員が21名以上", value: "2" },
  {
    label: "一体的な運営が行われている共同生活住居の入居定員の合計数が21名以上",
    value: "3"
  }
];

// 記録のモーダルタイプ
export enum RECORD_MODAL_TYPE {
  "daily" = 1,
  "interview", // 2
  "support", // 3
  "work", // 4
  "supportPinUser" // 5
}

// 食事・送迎項目が不要なステータス
// "1": "-", "5": "欠席時対応", "6": "訪問", "7": "体験利用支援", "10": "欠席"
export const NOT_ACCEPT_FOOD_TRANSFER_IN_STATUSES = ["1", "5", "6", "7", "10"];
