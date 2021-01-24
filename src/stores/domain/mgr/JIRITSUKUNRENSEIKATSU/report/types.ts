import { ReportInterface } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/report/interfaces/reportInterface";

export const REPEAT_DAILY = "reportDaily";
export const REPEAT_USER = "reportUser";

export type ReportType = typeof REPEAT_DAILY | typeof REPEAT_USER;

/**
 * ActionNames
 */
export const FETCH_JIRITSUKUNRENSEIKATSU_DAILY_STARTED =
  "JIRITSUKUNRENSEIKATSU/FETCH_DAILY_STARTED";
export const FETCH_JIRITSUKUNRENSEIKATSU_DAILY =
  "JIRITSUKUNRENSEIKATSU/FETCH_DAILY";
export const FETCH_JIRITSUKUNRENSEIKATSU_DAILY_FAILED =
  "JIRITSUKUNRENSEIKATSU/FETCH_FAILED";
export const FETCH_JIRITSUKUNRENSEIKATSU_USER_STARTED =
  "JIRITSUKUNRENSEIKATSU/FETCH_USER_STARTED";
export const FETCH_JIRITSUKUNRENSEIKATSU_USER =
  "JIRITSUKUNRENSEIKATSU/FETCH_USER";
export const FETCH_JIRITSUKUNRENSEIKATSU_USER_FAILED =
  "JIRITSUKUNRENSEIKATSU/FETCH_USER_FAILED";
export const FETCH_JIRITSUKUNRENSEIKATSU_DAILY_SUMMARY_STARTED =
  "JIRITSUKUNRENSEIKATSU/FETCH_DAILY_SUMMARY_STARTED";
export const FETCH_JIRITSUKUNRENSEIKATSU_DAILY_SUMMARY =
  "JIRITSUKUNRENSEIKATSU/FETCH_DAILY_SUMMARY";
export const FETCH_JIRITSUKUNRENSEIKATSU_DAILY_SUMMARY_FAILED =
  "JIRITSUKUNRENSEIKATSU/FETCH_DAILY_SUMMARY_FAILED";
export const FETCH_JIRITSUKUNRENSEIKATSU_USER_SUMMARY_STARTED =
  "JIRITSUKUNRENSEIKATSU/FETCH_USER_SUMMARY_STARTED";
export const FETCH_JIRITSUKUNRENSEIKATSU_USER_SUMMARY =
  "JIRITSUKUNRENSEIKATSU/FETCH_USER_SUMMARY";
export const FETCH_JIRITSUKUNRENSEIKATSU_USER_SUMMARY_FAILED =
  "JIRITSUKUNRENSEIKATSU/FETCH_USER_SUMMARY_FAILED";
export const PUT_JIRITSUKUNRENSEIKATSU_REPORT_STARTED =
  "JIRITSUKUNRENSEIKATSU/PUT_REPORT_STARTED";
export const PUT_JIRITSUKUNRENSEIKATSU_REPORT_DAILY =
  "JIRITSUKUNRENSEIKATSU/PUT_REPORT_DAILY";
export const POST_JIRITSUKUNRENSEIKATSU_IN_OUT_ALL_REPORT_STARTED =
  "POST_JIRITSUKUNRENSEIKATSU_IN_OUT_ALL_REPORT_STARTED";
export const POST_JIRITSUKUNRENSEIKATSU_IN_OUT_ALL_REPORT =
  "POST_JIRITSUKUNRENSEIKATSU_IN_OUT_ALL_REPORT";
export const POST_JIRITSUKUNRENSEIKATSU_IN_OUT_ALL_REPORT_FAILED =
  "POST_JIRITSUKUNRENSEIKATSU_IN_OUT_ALL_REPORT_FAILED";
export const PUT_JIRITSUKUNRENSEIKATSU_REPORT_USER =
  "JIRITSUKUNRENSEIKATSU/PUT_REPORT_USER";
export const PUT_JIRITSUKUNRENSEIKATSU_REPORT_FAILED =
  "JIRITSUKUNRENSEIKATSU/PUT_REPORT_FAILED";
export const SET_BEFORE_TO_AFTER_JIRITSUKUNRENSEIKATSU_DAILY =
  "JIRITSUKUNRENSEIKATSU/SET_BEFORE_TO_AFTER_DAILY";
export const SET_BEFORE_TO_AFTER_JIRITSUKUNRENSEIKATSU_USER =
  "JIRITSUKUNRENSEIKATSU/SET_BEFORE_TO_AFTER_USER";
export const SET_JIRITSUKUNRENSEIKATSU_BODY_RESTRICTED_STILL_FLG =
  "JIRITSUKUNRENSEIKATSU/SET_BODY_RESTRICTED_STILL_FLG";

/**
 * State
 */
export interface InOutReportState {
  reports: {
    additionsDaily: {
      // 身体拘束廃止未実施
      bodyRestrictedStillFlg: boolean;
      targetDate: string;
    };
    reportDaily: {
      reportList: ReportInterface[];
    };
    reportUser: {
      reportList: ReportInterface[];
      numberOfAbsence: number | undefined | null;
    };
  };
  summary: {
    serviceCounts: {
      // 送迎データ(片道)
      oneWayCount: number | undefined | null;
      // 送迎データ(往復)
      pickupCount: number | undefined | null;
      // 食事
      foodCount: number | undefined | null;
      // 短期滞在件数
      shortStayCount: number | undefined | null;
    };
    // 実績集計データ
    countsPerStatus: {
      // ステータス状況毎件数 : サービス提供状況
      status: number | undefined | null;
      // ステータス状況毎件数：件数
      count: number | undefined | null;
    }[];
    inoutRecords: {
      // 日ごと集計データ
      dailyInOutRecords: {
        // 作業実績：名前
        userName: string | undefined;
        // 作業実績：受給者証番号
        recipientNumber: string | undefined;
        // 作業実績：利用実績
        status: number | undefined | null;
      }[];
      // 利用者ごと集計データ
      userInOutRecords: {
        // 作業実績：日
        date: string | undefined;
        // 作業実績：利用実績
        status: number | undefined | null;
      }[];
    };
  };
}

// 日ごと集計データtype
export type DailyInOutRecordsType = InOutReportState["summary"]["inoutRecords"]["dailyInOutRecords"][0];

// 利用者ごと集計データtype
export type UserInOutRecordsType = InOutReportState["summary"]["inoutRecords"]["userInOutRecords"][0];
