export const REPEAT_DAILY = "reportDaily";
export const REPEAT_USER = "reportUser";

export interface SEIKATSUKAIGOReportTypeInterface {
  type: "reportDaily" | "reportUser";
}

/**
 * ActionNames
 */
export const FETCH_SEIKATSUKAIGO_DAILY_STARTED =
  "SEIKATSUKAIGO/FETCH_DAILY_STARTED";
export const FETCH_SEIKATSUKAIGO_DAILY = "SEIKATSUKAIGO/FETCH_DAILY";
export const FETCH_SEIKATSUKAIGO_DAILY_FAILED = "SEIKATSUKAIGO/FETCH_FAILED";
export const FETCH_SEIKATSUKAIGO_USER_STARTED =
  "SEIKATSUKAIGO/FETCH_USER_STARTED";
export const FETCH_SEIKATSUKAIGO_USER = "SEIKATSUKAIGO/FETCH_USER";
export const FETCH_SEIKATSUKAIGO_USER_FAILED =
  "SEIKATSUKAIGO/FETCH_USER_FAILED";
export const FETCH_SEIKATSUKAIGO_DAILY_SUMMARY_STARTED =
  "SEIKATSUKAIGO/FETCH_DAILY_SUMMARY_STARTED";
export const FETCH_SEIKATSUKAIGO_DAILY_SUMMARY =
  "SEIKATSUKAIGO/FETCH_DAILY_SUMMARY";
export const FETCH_SEIKATSUKAIGO_DAILY_SUMMARY_FAILED =
  "SEIKATSUKAIGO/FETCH_DAILY_SUMMARY_FAILED";
export const UNSET_SEIKATSUKAIGO_DAILY_SUMMARY =
  "SEIKATSUKAIGO/UNSET_DAILY_SUMMARY";
export const FETCH_SEIKATSUKAIGO_USER_SUMMARY_STARTED =
  "SEIKATSUKAIGO/FETCH_USER_SUMMARY_STARTED";
export const FETCH_SEIKATSUKAIGO_USER_SUMMARY =
  "SEIKATSUKAIGO/FETCH_USER_SUMMARY";
export const FETCH_SEIKATSUKAIGO_USER_SUMMARY_FAILED =
  "SEIKATSUKAIGO/FETCH_USER_SUMMARY_FAILED";
export const PUT_SEIKATSUKAIGO_REPORT_STARTED =
  "SEIKATSUKAIGO/PUT_REPORT_STARTED";
export const PUT_SEIKATSUKAIGO_REPORT_DAILY = "SEIKATSUKAIGO/PUT_REPORT_DAILY";
export const POST_SEIKATSUKAIGO_IN_OUT_ALL_REPORT_STARTED =
  "POST_SEIKATSUKAIGO_IN_OUT_ALL_REPORT_STARTED";
export const POST_SEIKATSUKAIGO_IN_OUT_ALL_REPORT =
  "POST_SEIKATSUKAIGO_IN_OUT_ALL_REPORT";
export const POST_SEIKATSUKAIGO_IN_OUT_ALL_REPORT_FAILED =
  "POST_SEIKATSUKAIGO_IN_OUT_ALL_REPORT_FAILED";
export const PUT_SEIKATSUKAIGO_REPORT_USER = "SEIKATSUKAIGO/PUT_REPORT_USER";
export const PUT_SEIKATSUKAIGO_REPORT_FAILED =
  "SEIKATSUKAIGO/PUT_REPORT_FAILED";

/**
 * State
 */
export interface SEIKATSUKAIGOInOutReportState {
  SEIKATSUKAIGOReports: SEIKATSUKAIGOReportState;
  SEIKATSUKAIGOSummary: SEIKATSUKAIGOSummary;
}

export interface SEIKATSUKAIGOReportState {
  additionsDaily: SEIKATSUKAIGOReportAdditionsDaily;
  reportDaily: {
    reportList: SEIKATSUKAIGOReport[];
  };
  reportUser: {
    reportList: SEIKATSUKAIGOReport[];
    numberOfAbsence: number | undefined | null;
  };
}

export interface SEIKATSUKAIGOReportAdditionsDaily {
  // 身体拘束廃止未実施
  bodyRestrictedStillFlg: boolean;
  // 開所・短時間
  openShortTime: number;
  targetDate: string;
}
export interface SEIKATSUKAIGOSummary {
  serviceCounts: {
    // 送迎データ(片道)
    oneWayCount: number | undefined | null;
    // 送迎データ(往復)
    pickupCount: number | undefined | null;
    // 食事
    foodCount: number | undefined | null;
  };
  countsPerStatus: {
    // ステータス状況毎件数 : サービス提供状況
    status: number | undefined | null;
    // ステータス状況毎件数：件数
    count: number | undefined | null;
  }[];
  inoutRecords: DailyInOutRecords[] | UserInOutRecords[];
}

export interface DailyInOutRecords {
  // 作業実績：名前
  userName: string | undefined;
  // 作業実績：受給者証番号
  recipientNumber: string | undefined;
  // 作業実績：利用実績
  status: number | undefined | null;
}
export interface UserInOutRecords {
  // 作業実績：日
  date: string | undefined;
  // 作業実績：利用実績
  status: number | undefined | null;
}
export interface SEIKATSUKAIGOReport {
  // 施設利用者id
  uif_id: number | undefined | null;
  // inoutのid
  inoutRecordsId: number | undefined | null;
  // 利用者名
  name: string | undefined;
  // 日付（日・曜日）
  target_date: string | undefined;
  // サービス提供状況
  status: number | undefined | null;
  // 開始時間
  inTime: string | undefined | null;
  // 終了時間
  outTime: string | undefined | null;
  // 送迎
  travelTime: string | undefined | null;
  // 同一敷地内(送迎)
  pickupPremises: string | undefined | null;
  // 訪問支援
  visitSupport: number | undefined | null;
  // 食事提供
  didGetFood: string | undefined | null;
  // 体験利用支援種別
  trialUsageKind: string | undefined | null;
  // 地域生活支援拠点
  lifeSupportHubInDistrictFlg: string | undefined | null;
  // 延長時間
  extended: string | undefined | null;
  // 施設タイプ
  facilityType: string | undefined | null;
  // 休日フラグ
  is_holiday: boolean;
  // 備考
  memo: string | undefined | null;
  // 新規作成フラグ
  initialFlg: boolean | undefined;
  // 重度障害者支援（個別支援）フラグ
  severeDisabilitySupport: number | null;
  // 利用者の重度障害者支援（個別支援）フラグ
  is_severe_disability_support: number | null;
}
