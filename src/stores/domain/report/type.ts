import { GetUsagePerformanceMonthlyParams } from "@api/requests/usagePerformance/getUsagePerformanceMonthly";
import { OptionInterface } from "@components/atoms/DropDown";

export const REPEAT_DAILY = "reportDaily";
export const REPEAT_MONTHLY = "reportMonthly";
export const REPEAT_USER = "reportUser";

export interface ReportTypeInterface {
  type: "reportDaily" | "reportMonthly" | "reportUser";
}

export interface ReportState {
  performanceDaily: {
    before: ReportPerformanceDaily;
    after: ReportPerformanceDaily;
  };
  reportDaily: {
    before: Report[];
    after: Report[];
  };
  reportMonthly: {
    before: Report[];
    after: Report[];
  };
}

export interface ReportPostDailyState {
  performanceDaily: ReportPerformanceDaily;
  reportList: Report[];
}

export interface ReportPerformanceDaily {
  // 身体拘束廃止未実施
  bodyRestraintAbolitionUnexecutedFlg: boolean;
  targetDate: string;
}

export interface Report {
  id: number;
  usersInFacilityId: number;
  // 日付（日・曜日）
  targetDate: string;
  // 利用者性
  nameSei: string;
  // 利用者名
  nameMei: string;
  // サービス提供の状況
  statusType: string;
  // 夜間支援
  nightSupportType: string;
  // 夜間支援体制加算の設定がされている場合の初期値
  defNightSupportType: string;
  // 入院時支援
  hospitalizationSupportType: string;
  // 帰宅支援
  getHomeSupportType: string;
  // 日中支援
  daytimeSupportType: string;
  // 医療連携
  medicalSupportType: string;
  // 自立支援
  lifeSupportFlg: string;
  // 居宅介護
  homeCareFlg: string;
  // 備考
  remarks: string;
  // 祝日
  isHoliday: boolean;
  // サービス提供が終了しているか(0=サービス提供終了,1=サービス提供中,2=サービス提供終了後30日以内)
  isServiceEnd: number;
}

/* API */
export interface ReportResultUsagePerformanceDaily {
  target_date: string;
  body_restraint_abolition_unexecuted_flg: number;
}

export interface ReportResultUsagePerformance {
  id: number;
  users_in_facility_id: number;
  target_date: string;
  name_sei: string;
  name_mei: string;
  status_type: number | null;
  night_support_type: number | null;
  def_night_support_type: number | null; // monthly側にはない
  hospitalization_support_type: number | null;
  get_home_support_type: number | null;
  daytime_support_type: number | null;
  medical_support_type: number | null;
  life_support_flg: number | null;
  home_care_flg: number | null;
  remarks: string | null;
  is_holiday: boolean;
  is_service_end: number;
}

export interface ReportResultAPI {
  usage_performance_daily?: ReportResultUsagePerformanceDaily;
  usage_performance: { [key: string]: ReportResultUsagePerformance };
  def_night_support_type?: GetUsagePerformanceMonthlyParams["data"]["def_night_support_type"]; // dailyにはない
}
export interface ReportResultPostAPI {
  usage_performance_daily?: ReportResultUsagePerformanceDaily;
  usage_performance: ReportResultUsagePerformance[];
}

export interface ParamsForGenerateCell {
  index: number;
  type: string;
  name: string;
  value: string;
  style: string;
  size?:
    | "textFieldSuperSmall"
    | "textFieldSmall"
    | "textFieldMedium"
    | "textFieldLong"
    | "textFieldSuperLong"
    | "textFieldFullSize";
  options?: OptionInterface[];
  disabled?: boolean;
}

// 本来ここに記載されている型定義はGH専用だが、以降の型定義はGHで使用されていない
// uiディレクトリに配置するのがbetter
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

export interface InOutReportState {
  reports: {
    additionsDaily: {
      // 身体拘束廃止未実施
      bodyRestrictedStillFlg: boolean;
      targetDate: string;
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
    inoutRecords: DailyInOutRecords[] | UserInOutRecords[];
  };
}
