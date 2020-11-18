export const REPEAT_DAILY = "reportDaily";
export const REPEAT_MONTHLY = "reportMonthly";

export interface IABReportTypeInterface {
  type: "reportDaily" | "reportMonthly";
}

/**
 * ActionNames
 */
export const FETCH_IAB_DAILY_STARTED = "IAB/FETCH_DAILY_STARTED";
export const FETCH_IAB_DAILY = "IAB/FETCH_DAILY";
export const FETCH_IAB_DAILY_FAILED = "IAB/FETCH_FAILED";
export const FETCH_IAB_USER_STARTED = "IAB/FETCH_USER_STARTED";
export const FETCH_IAB_USER = "IAB/FETCH_USER";
export const FETCH_IAB_USER_FAILED = "IAB/FETCH_USER_FAILED";
export const FETCH_IAB_DAILY_SUMMARY_STARTED =
  "IAB/FETCH_DAILY_SUMMARY_STARTED";
export const FETCH_IAB_DAILY_SUMMARY = "IAB/FETCH_DAILY_SUMMARY";
export const FETCH_IAB_DAILY_SUMMARY_FAILED = "IAB/FETCH_DAILY_SUMMARY_FAILED";
export const UNSET_IAB_DAILY_SUMMARY = "IAB/UNSET_DAILY_SUMMARY";
export const FETCH_IAB_USER_SUMMARY_STARTED = "IAB/FETCH_USER_SUMMARY_STARTED";
export const FETCH_IAB_USER_SUMMARY = "IAB/FETCH_USER_SUMMARY";
export const FETCH_IAB_USER_SUMMARY_FAILED = "IAB/FETCH_USER_SUMMARY_FAILED";
export const PUT_IAB_REPORT_STARTED = "IAB/PUT_REPORT_STARTED";
export const PUT_IAB_REPORT_DAILY = "IAB/PUT_REPORT_DAILY";
export const POST_IAB_IN_OUT_ALL_REPORT_STARTED =
  "POST_IAB_IN_OUT_ALL_REPORT_STARTED";
export const POST_IAB_IN_OUT_ALL_REPORT = "POST_IAB_IN_OUT_ALL_REPORT";
export const POST_IAB_IN_OUT_ALL_REPORT_FAILED =
  "POST_IAB_IN_OUT_ALL_REPORT_FAILED";
export const PUT_IAB_REPORT_USER = "IAB/PUT_REPORT_USER";
export const PUT_IAB_REPORT_FAILED = "IAB/PUT_REPORT_FAILED";

/**
 * State
 */
export interface IABInOutReportState {
  IABReports: IABReportState;
  IABSummary: IABSummary;
}

export interface IABReportState {
  additionsDaily: IABReportAdditionsDaily;
  reportDaily: {
    reportList: IABReport[];
  };
  reportUser: {
    reportList: IABReport[];
    numberOfAbsence: number | undefined | null;
  };
}

export interface IABReportAdditionsDaily {
  // 身体拘束廃止未実施
  bodyRestrictedStillFlg: boolean;
  // 開所・短時間
  openShortTime: number;
  targetDate: string;
}
export interface IABSummary {
  serviceCounts: {
    // 送迎データ(片道)
    oneWayCount: number | undefined | null;
    // 送迎データ(往復)
    pickupCount: number | undefined | null;
    // 食事
    foodCount: number | undefined | null;
    // 医療連携
    medicalSupportCount: number | undefined | null;
    // 移行準備支援Ⅰ
    transitionPreparationSupportCount: number | undefined | null;
    // 施設外支援
    offsiteSupportCount: number | undefined | null;
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
export interface IABReport {
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
  // 医療連携
  medicalCooperation: string | undefined | null;
  // 地域生活支援拠点
  lifeSupportHubInDistrictFlg: string | undefined | null;
  // 延長時間
  extended: string | undefined | null;
  // 施設タイプ
  facilityType: string | undefined | null;
  // 休日フラグ
  is_holiday: boolean;
  // 作業時間自動入力フラグ
  defRecordWork: string;
  // 備考
  memo: string | undefined | null;
  // 新規作成フラグ
  initialFlg: boolean | undefined;
  // その他：在宅時生活支援
  helpInhouseLifeFlg: string | undefined | null;
  // その他：社会生活支援
  helpSocialLifeFlg: string | undefined | null;
  // その他：通勤訓練
  trainCommuteFlg: string | undefined | null;

  // 作業時間関連項目
  workRecord: {
    // 作業時間のID（新規の場合はnull）
    id: number | null;
    // inoutRecordのID（新規の場合はnull）
    inoutRecordsId: number | null;
    // 作業を実施した
    worked: number | undefined | null;
    // 作業開始時間
    startTime: string | undefined | null;
    // 作業終了時間
    endTime: string | undefined | null;
    // 休憩時間
    breakTime: string | undefined | null;
    // 作業合計時間
    totalTime: string | undefined | null;
    // メモ
    memo: string | undefined | null;
    histories?: {
      id: number | undefined | null;
      workRecordsId: number | undefined | null;
      updatedDate: string | undefined | null;
      columnName: string | undefined | null;
      beforeValue: string | undefined | null;
      afterValue: string | undefined | null;
    }[];
  };
}
