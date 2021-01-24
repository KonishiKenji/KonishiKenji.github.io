import { FacilityType } from "@constants/variables";

export interface DownloadableFacility {
  typeService: FacilityType;
  name: string;
}

export interface DownloadableUser {
  id: number;
  recipientNumber: string;
  name: string;
  targetForUpLimit: boolean;
  targetForUserCostAmountList: boolean;
  none_recipient_number_flg: number;
}

export interface DownloadableResult {
  facility: DownloadableFacility;
  users: DownloadableUser[];
}

export interface DownloadableMonth {
  date: string;
  results: DownloadableResult[];
}

export interface DownloadableResponseResult {
  months: DownloadableMonth[];
}

export interface DownloadCsvResult {
  data: string;
  year: string;
  month: string;
}

// ダウンロード履歴
export interface HistoryResultData {
  id: number;
  facility_id: number;
  dataKey: string;
  target_date: string;
  file_target: string;
  display_flg: string;
  created_at: string;
}

export interface HistoryResult {
  data: HistoryResultData[];
}

// 実績記録票

export interface InvoiceRecordAdditions {
  isOutbound: boolean;
  isInbound: boolean;
  isSuppliedMeal: boolean;
  supportTime: number | null;
  supportSystem: number | null;
  supportOutOfFacility: any;
  supportMedical: any;
  isTrainCommute: boolean;
  trialUsage: string | null;
  supportDiffTime: number;
  supportSerious: boolean;
  provisionForm: number | null;
  shortStay: number | null;
}
export interface Record {
  day: number;
  dayOfWeek: string;
  serviceStatus: string | null;
  startTime: string;
  endTime: string | null;
  memo: string | null;
  sameCorporationMovementFlg: string | null;
  additions: InvoiceRecordAdditions;
}

// UsagePerformanceStatusType
export enum UsagePerformanceStatusType {
  STAY = 1,
  HOSPITALIZATION_FIRSTDAY,
  HOSPITALIZATION_MIDDLEDAY,
  HOSPITALIZATION_LASTDAY,
  OVERNIGHTSTAY_FIRSTDAY,
  OVERNIGHTSTAY_MIDDLEDAY,
  OVERNIGHTSTAY_LASTDAY,
  OVERNIGHTSTAY_FROM_HOSPITALIZATION,
  HOSPITALIZATION_FROM_OVERNIGHTSTAY,
  HOSPITALIZATION_COMMUNITY_OVERNIGHTSTAY,
  OVERNIGHTSTAY_COMMUNITY_HOSPITALIZATION,
  EXPERIENCE
}

export interface InvoiceUserUsagePerformance {
  id: number;
  users_in_facility_id: number;
  target_date: string;
  status_type: UsagePerformanceStatusType;
  day: number;
  day_of_week: string;
  night_support_type: number;
  hospitalization_support_type: number;
  get_home_support_type: number;
  daytime_support_type: number;
  medical_support_type: number;
  life_support_flg: number;
  remarks: null;
  isApplyDays: boolean;
  isOutbound: boolean;
  isInbound: boolean;
  isSuppliedMeal: boolean;
  isEmergencyInitialAdmission: boolean;
  overCapacity: number;
  overHours: number;
  severeDisabilitySupport: number;
  nightSupportSevereDisabilitySupport: number;
  hospitalStay: number;
  isRegionalTransition: boolean;
  isExperienceStay: boolean;
  isBreakfast: boolean;
  isLunch: boolean;
  isSupper: boolean;
  isUtilityfee: boolean;
}
export interface InvoiceUserUsageResults {
  day: number;
  day_of_week: string;
  isApplyDays: boolean;
  isSpecialArea: boolean;
  remarks: string;
}

export interface InvoiceUser {
  uifId: number;
  recipientNo: string;
  recipientName: string;
  payment: string;
  dateBeginService: string;
  dateAfter30Days: string;
  cntDaysInitApply: number;
  cntPickup: number;
  cntVisit: number;
  cntFood: number;
  cntSupportSystem1: number;
  cntSupportOutOfFacility: number;
  cntSupportSystem1Total: number;
  cntSupportOutOfFacilityTotal: number;
  cntSupportMedical: number;
  cntTrainCommute: number;
  cntTrialUsage: number;
  cntShortStay: number;
  cntCome: number;
  cntVisitLess: number;
  cntVisitMore: number;
  records: Record[];
  usage_performances: InvoiceUserUsagePerformance[];
  usage_results: InvoiceUserUsageResults[];
  dateEndService?: string;
  lastLifeSupportTargetDate?: string;
  applyDays?: number;
  cntSpecialArea?: number;
  emergencyInitialAdmission?: number;
  overCapacity?: number;
  benefit: string;
  benefitAmount: number;
  cntFoodBreakfast: number;
  cntFoodLunch: number;
  cntFoodSupper: number;
  cntUtilityfee: number;
  costFood: string;
  costUtilityfee: string;
  costSum: string;
  unitBreakfast: string;
  unitLunch: string;
  unitSupper: string;
  unitFood: string;
  unitUtilityfeeDay: string;
  unitUtilityfeeMonth: string;
  hospitalStay: number;
  regionalTransition: number;
  experienceStay: number;
  regionalTransitionEndDate: string;
  regionalTransitionAfterDate: string;
  cntHospitalizationSupportType: number;
}

export interface Facility {
  officeNo: string | null;
  officeName: string | null;
  kindService: FacilityType;
}

export interface InvoiceDate {
  year: string;
  month: string;
}

export interface InvoiceData {
  date: InvoiceDate;
  facility: Facility;
  users: InvoiceUser[];
}

export interface InvoiceDataResult {
  data: InvoiceData[];
}

/**
 * 請求書インターフェース
 */

// td_demand_info (請求書 明細情報レコード) の結果
export interface SeikyuTypeService {
  t01: string; // サービス種類コード の名称
  t02: string; // 件数
  t03: string; // 単位数
  t04: string; // 費用合計
  t05: string; // 給付費請求額
  t06: string; // 利用者負担額
  t07: string; // 自治体助成額
}

interface SummaryByMonthDetail {
  municipalityName: string;
  count: string;
  amount: string;
  benefitCostsClaim: string;
  userBurden: string;
  municipalitySubsidy: string;
}

export interface SummaryByMonth {
  totalInvoiceAmount: string;
  date: {
    year: string;
    month: string;
  };
  facility: {
    c01: string; // 施設ID
    c02: string; // ビジネスオーナー
  };
  detail: SummaryByMonthDetail[];
  total: {
    municipalityCount: string;
    count: string;
    amount: string;
    benefitCostsClaim: string;
    userBurden: string;
    municipalitySubsidy: string;
  };
}

export interface SeikyuDetailUserServiceType {
  s01: string; // サービス種類コード
  s02: string; // サービス開始 年
  s03: string; // サービス開始 月
  s04: string; // サービス開始 日
  s05: string; // サービス終了 年
  s06: string; // サービス終了 月
  s07: string; // サービス終了 日
  s08: number; // サービス利用日数
  s09: string; // 空白
}

export interface SeikyuDetailUserServiceContent {
  c01: string; // サービス名
  c02: string; // tc_detail_info サービスコード
  c03: string; // tc_detail_info 単位数
  c04: string; // tc_detail_info 回数
  c05: string; // tc_detail_info サービス単位数
  c06: string; // 空白
}

export interface SeikyuDetailUserServiceSummary {
  d01: string; // サービス種別コード
  d02: string; // サービス種別名
  d03: number; // 請求額集計　給付単位数
  d04: string; // 請求額集計　単位数単価
  d05: number; // 請求額集計　給付率
  d06: string; // 請求額集計　総費用額
  d07: string; // 請求額集計　1割相当額
  d08: string; // 請求額集計　利用者負担額②
  d09: string; // 請求額集計　上限月額調整
  d10: string; // 請求額集計　A型減免　事業者減免額
  d11: string; // 請求額集計　A型減免　減免後利用者負担額
  d12: string; // 請求額集計　調整後利用者負担額
  d13: string; // 請求額集計　上限管理後利用者負担額
  d14: string; // 請求額集計　請求額　給付費
  d15: string; // 請求額集計　請求額　給付費
  d16: string; // 請求額集計　自治体助成分請求額
}

export interface SeikyuDetailUser {
  m01: string; // 市町村番号
  m02: string; // 助成自治体番号
  m05: string; // 受給者証番号
  m06: string; // 姓名
  m07: string; // 空白
  m12: string; // 利用者負担上限月額①
  m13: string; // 就労継続支援A型減免対象者 が有りか無しか
  m14: string; // 上限額管理事業所 - 指定事業所番号
  m15: string; // 上限額管理事業所 - 管理結果
  m16: string; // 上限額管理事業所 - 管理結果額
  m17: string; // uplimit_facility_flg が1の場合、uplimit_controlled_byが1ならば、ビジネスオーナー。そうじゃなければ上限施設名
  serviceTypes: SeikyuDetailUserServiceType[];
  serviceContents: SeikyuDetailUserServiceContent[];
  summaries: SeikyuDetailUserServiceSummary[];
  t01: string; // 請求額集計　単位数単価 の合計
  t02: string; // 請求額集計　総費用額
  t03: string; // 請求額集計　上限月額調整
  t04: string; // 請求額集計　A型減免　事業者減免額
  t05: string; // 請求額集計　A型減免　減免後利用者負担額
  t06: string; // 請求額集計　調整後利用者負担額
  t07: string; // 請求額集計　上限管理後利用者負担額
  t08: string; // 請求額集計　決定利用者負担額
  t09: string; // 請求額集計　請求額　給付費
  t10: string; // 請求額集計　自治体助成分請求額
  h01: string; // 空白
  h02: string; // 空白
  h03: string; // 空白
  h04: string; // 空白
}

export interface SeikyuDetail {
  date: {
    m03: string; // 年
    m04: string; // 月
  };
  facility: {
    m08: string; // 事業所番号
    m09: string; // ビジネスオーナー
    m10: string; // 住所
    m11: string; // A型事業者負担減免割合 があるならば あり/なし
  };
  users: SeikyuDetailUser[];
}

export interface SummaryByCityBill {
  r03: string; // 請求金額
  typeServices: SeikyuTypeService[];
  subTotal: {
    s02: string; // 小計 件数
    s03: string; // 小計 単位数
    s04: string; // 小計 費用合計
    s05: string; // 小計 給付費請求額
    s06: string; // 小計 特別対応請求額
    s07: string; // 小計 自治体助成額
  };
  specialHandicapped: {
    h02?: any; // null
    h04?: any; // null
    h05?: any; // null
    h07?: any; // null
  };
  total: {
    w02: string; // 合計 件数
    w03: string; // 合計 単位数
    w04: string; // 合計 費用合計
    w05: string; // 合計 給付費請求額
    w06: string; // 合計 利用者負担額
    w07: string; // 合計 自治体助成額
  };
}

export interface SummaryByCity {
  demand: string; // 都市名
  date: {
    createdAt: {
      h01: string; // year
      h02: string; // month
      h03: string; // day
    };
    bill: {
      r01: string; // year
      r02: string; // month
    };
  };
  facility: {
    c01: string; // 事業所番号
    c02: string; // 郵便番号
    c03: string; // 住所
    c04: string; // 電話番号
    c05: string; // ビジネスオーナー
    c06: string; // 責任者
  };
  bill: SummaryByCityBill;
  detail: SeikyuDetail;
}

export interface InvoiceSeikyuData {
  summaryByMonth: SummaryByMonth;
  summaryByCity: SummaryByCity[];
}

// 利用者負担上限額一覧表
export interface InvoiceCostAmountListServices {
  type_service: string;
  service_name: string;
}
export interface InvoiceCostAmountListUsers {
  index: number;
  city_code: string;
  recipient_number: string;
  name: string;
  total_cost: string;
  user_cost: string;
  services: InvoiceCostAmountListServices[];
}
export interface InvoiceCostAmountListBillContents {
  uplimit_facility_number: string;
  uplimit_facility_name: string;
  users: InvoiceCostAmountListUsers[];
}
export interface InvoiceCostAmountListData {
  date: {
    createdAt: {
      year: string;
      month: string;
      day: string;
    };
    bill: {
      year: string;
      month: string;
    };
  };
  facility: {
    gov_facility_number: string;
    postal_code: string;
    address: string;
    tel: string;
    gov_business_owner: string;
  };
  bill_contents: InvoiceCostAmountListBillContents[];
}

// 利用者負担上限額管理結果票
export interface InvoiceUplimitFacilities {
  index: string;
  uplimit_facility_number: string;
  uplimit_facility_name: string;
  uplimit_total_yen: string;
  uplimit_user_load_yen: string;
  uplimit_yen: string;
}
export interface InvoiceUplimitSummary {
  uplimit_total_yen: string;
  uplimit_user_load_yen: string;
  uplimit_yen: string;
}
export interface InvoiceUplimtUsers {
  city_code: string;
  recipient_number: string;
  name: string;
  children_name: string;
  income_kind: string;
  result_of_management: string;
  uplimitFacilities: InvoiceUplimitFacilities[];
  summary?: InvoiceUplimitSummary;
}
export interface InvoiceUplimitData {
  date: {
    year: string;
    month: string;
  };
  facility: {
    gov_facility_number: string;
    gov_business_owner: string;
  };
  users: InvoiceUplimtUsers[];
}

// 履歴 > 請求書

export interface InvoiceUserSeikyuData {
  date: {
    start_of_month: string;
    end_of_month: string;
  };
  facility: {
    gov_business_owner: string;
    name: string;
    type_service: string;
    unit_per_yen: string;
  };
  users: {
    billing_amount: string;
    grant_amount: string;
    name_mei: string;
    name_sei: string;
    payment_cost: string;
    recipient_number: string;
    service_contents: {
      service_name: string;
      service_unit: string;
      times: string;
      units: string;
    }[];
    subtotal_unit: string;
    subtotal_yen: string;
    user_cost_amount: string;
  }[];
}

export interface InvoiceUserReceiptDataUser {
  name_mei: string;
  name_sei: string;
  recipient_number: string;
  user_cost_amount?: string; // 通常請求書のみ
  payment_cost_amount?: string; // 代理受領書のみ
  city_name?: string; // 代理受領書のみ
}

// 請求書・代理受領書 共通
export interface InvoiceUserReceiptData {
  date: {
    start_of_month: string;
    end_of_month: string;
  };
  facility: {
    gov_business_owner: string;
    name: string;
    type_service: string;
  };
  users: InvoiceUserReceiptDataUser[];
}

export interface MainFacility {
  id: number;
  type_service: string;
  name: string;
  gov_facility_number: string;
  gov_business_owner: string;
  responsible_person: string;
  test_facility_flg: number;
}

export interface MultipleFacilities {
  id: number;
  type_service: string;
  name: string;
  gov_facility_number: string;
  gov_business_owner: string;
  responsible_person: string;
  test_facility_flg: number;
}

// 多機能情報
export interface FacilityMultiFunctional {
  facility: MainFacility;
  multipleFacilities: MultipleFacilities[];
}

export interface InvoiceState {
  downloadable: DownloadableResponseResult;
  history: HistoryResultData[];
  invoiceData: InvoiceDataResult;
  invoiceCostAmountListData: InvoiceCostAmountListData;
  invoiceSeikyuData: InvoiceSeikyuData;
  invoiceUplimitData: InvoiceUplimitData[];
  invoiceUserSeikyuData: InvoiceUserSeikyuData[];
  invoiceUserReceiptData: InvoiceUserReceiptData[];
  invoiceUserAgencyReceiptData: InvoiceUserReceiptData[];
  facilityMultiFunctional: FacilityMultiFunctional;
}
