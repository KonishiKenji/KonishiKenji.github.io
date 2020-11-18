export const REPEAT_DAILY = "reportDaily";
export const REPEAT_MONTHLY = "reportMonthly";

export type ReportType = typeof REPEAT_DAILY | typeof REPEAT_MONTHLY;

/**
 * ActionNames
 */
export const FETCH_TANKINYUSHO_DAILY_STARTED =
  "TANKINYUSHO/FETCH_DAILY_STARTED";
export const FETCH_TANKINYUSHO_DAILY_SUCCESS =
  "TANKINYUSHO/FETCH_DAILY_SUCCESS";
export const FETCH_TANKINYUSHO_DAILY_FAILED = "TANKINYUSHO/FETCH_DAILY_FAILED";
export const FETCH_TANKINYUSHO_MONTHLY_STARTED =
  "TANKINYUSHO/FETCH_MONTHLY_STARTED";
export const FETCH_TANKINYUSHO_MONTHLY_SUCCESS =
  "TANKINYUSHO/FETCH_MONTHLY_SUCCESS";
export const FETCH_TANKINYUSHO_MONTHLY_FAILED =
  "TANKINYUSHO/FETCH_MONTHLY_FAILED";
export const UPDATE_TANKINYUSHO_DAILY_USAGE_PERFORMANCE =
  "TANKINYUSHO/UPDATE_DAILY_USAGE_PERFORMANCE";
export const UPDATE_TANKINYUSHO_DAILY_USAGE_PERFORMANCE_TANKINYUSHO =
  "TANKINYUSHO/UPDATE_DAILY_USAGE_PERFORMANCE_TANKINYUSHO";
export const UPDATE_TANKINYUSHO_USAGE_PERFORMANCE_DAILY =
  "TANKINYUSHO/UPDATE_USAGE_PERFORMANCE_DAILY";
export const UPDATE_TANKINYUSHO_MONTHLY_USAGE_PERFORMANCE =
  "TANKINYUSHO/UPDATE_MONTHLY_USAGE_PERFORMANCE";
export const UPDATE_TANKINYUSHO_MONTHLY_USAGE_PERFORMANCE_TANKINYUSHO =
  "TANKINYUSHO/UPDATE_MONTHLY_USAGE_PERFORMANCE_TANKINYUSHO";
export const POST_TANKINYUSHO_REPORT_DAILY_STARTED =
  "TANKINYUSHO/POST_REPORT_DAILY_STARTED";
export const POST_TANKINYUSHO_REPORT_DAILY_SUCCESS =
  "TANKINYUSHO/POST_REPORT_DAILY_SUCCESS";
export const POST_TANKINYUSHO_REPORT_DAILY_FAILED =
  "TANKINYUSHO/POST_REPORT_DAILY_FAILED";
export const POST_TANKINYUSHO_REPORT_MONTHLY_STARTED =
  "TANKINYUSHO/POST_REPORT_MONTHLY_STARTED";
export const POST_TANKINYUSHO_REPORT_MONTHLY_SUCCESS =
  "TANKINYUSHO/POST_REPORT_MONTHLY_SUCCESS";
export const POST_TANKINYUSHO_REPORT_MONTHLY_FAILED =
  "TANKINYUSHO/POST_REPORT_MONTHLY_FAILED";
export const POST_TANKINYUSHO_BULK_REGISTRATION_DAILY_STARTED =
  "TANKINYUSHO/POST_BULK_REGISTRATION_DAILY_STARTED";
export const POST_TANKINYUSHO_BULK_REGISTRATION_DAILY_SUCCESS =
  "TANKINYUSHO/POST_BULK_REGISTRATION_DAILY_SUCCESS";
export const POST_TANKINYUSHO_BULK_REGISTRATION_DAILY_FAILED =
  "TANKINYUSHO/POST_BULK_REGISTRATION_DAILY_FAILED";
export const POST_TANKINYUSHO_BULK_REGISTRATION_MONTHLY_STARTED =
  "TANKINYUSHO/POST_BULK_REGISTRATION_MONTHLY_STARTED";
export const POST_TANKINYUSHO_BULK_REGISTRATION_MONTHLY_SUCCESS =
  "TANKINYUSHO/POST_BULK_REGISTRATION_MONTHLY_SUCCESS";
export const POST_TANKINYUSHO_BULK_REGISTRATION_MONTHLY_FAILED =
  "TANKINYUSHO/POST_BULK_REGISTRATION_MONTHLY_FAILED";
export const UPDATE_TANKINYUSHO_ALL_STATUS_TYPE =
  "TANKINYUSHO/UPDATE_ALL_STATUS_TYPE";
export const RESET_TANKINYUSHO_USAGE_PERFORMANCE =
  "TANKINYUSHO/RESET_USAGE_PERFORMANCE";

export interface ReportState {
  reportDaily: {
    usagePerformanceDaily: {
      before: {
        // 施設利用者全体の実績記録：id
        id?: number | null;
        // 施設利用者全体の実績記録：対象年月日
        targetDate?: string;
        // 施設利用者全体の実績記録：身体拘束廃止未実施
        bodyRestraintAbolitionUnexecutedFlg?: boolean;
      };
      after: {
        // 施設利用者全体の実績記録：id
        id?: number | null;
        // 施設利用者全体の実績記録：対象年月日
        targetDate?: string;
        // 施設利用者全体の実績記録：身体拘束廃止未実施
        bodyRestraintAbolitionUnexecutedFlg?: boolean;
      };
    };
    usagePerformance: {
      before: {
        [key: string]: {
          // 施設利用者の実績記録：id
          id: number;
          // 施設利用者の実績記録：利用者ID
          usersInFacilityId: number;
          // 姓
          nameSei: string;
          // 名
          nameMei: string;
          // 対象年月日
          targetDate: string;
          // サービス提供の状況
          statusType: number;
          // 医療連携体制加算
          medicalSupportType: number | null;
          // 備考
          remarks: string | null;
          // 休日判定
          isHoliday: boolean | null;
          /**
           * 退去判定
           * 0: 退去済み
           * 1: 未退去
           * 2: 退去後30日未満
           */
          isServiceEnd: number;
        };
      };
      after: {
        [key: string]: {
          // 施設利用者の実績記録：id
          id: number;
          // 施設利用者の実績記録：利用者ID
          usersInFacilityId: number;
          // 姓
          nameSei: string;
          // 名
          nameMei: string;
          // 対象年月日
          targetDate: string;
          // サービス提供の状況
          statusType: number;
          // 医療連携体制加算
          medicalSupportType: number | null;
          // 備考
          remarks: string | null;
          // 休日判定
          isHoliday: boolean | null;
          /**
           * 退去判定
           * 0: 退去済み
           * 1: 未退去
           * 2: 退去後30日未満
           */
          isServiceEnd: number;
        };
      };
    };
    usagePerformanceTANKINYUSHO: {
      before: {
        [key: string]: {
          // 施設利用者全体の実績記録：id
          id: number;
          // 施設利用者の実績記録：利用者ID
          usersInFacilityId: number;
          // 対象年月日
          targetDate: string;
          // 生活介護等または指定通所支援等を実施
          otherSupport: number;
          // 送迎
          pickup: number;
          // 同一敷地内（送迎）
          pickupPremises: number;
          // 食事提供
          food: number;
          // 緊急短期入所受入フラグ
          emergencyShortterm: number;
          // 単独型18時間以上
          overHours: number;
          // 定員超過特例
          capacityOverrunException: number;
          // 喀痰吸引等実施フラグ
          sputumImplementation: number;
          // 重度障害者支援（研修者）
          severeDisabilitySupport: number;
        };
      };
      after: {
        [key: string]: {
          // 施設利用者全体の実績記録：id
          id: number;
          // 施設利用者の実績記録：利用者ID
          usersInFacilityId: number;
          // 対象年月日
          targetDate: string;
          // 生活介護等または指定通所支援等を実施
          otherSupport: number;
          // 送迎
          pickup: number;
          // 同一敷地内（送迎）
          pickupPremises: number;
          // 食事提供
          food: number;
          // 緊急短期入所受入フラグ
          emergencyShortterm: number;
          // 単独型18時間以上
          overHours: number;
          // 定員超過特例
          capacityOverrunException: number;
          // 喀痰吸引等実施フラグ
          sputumImplementation: number;
          // 重度障害者支援（研修者）
          severeDisabilitySupport: number;
        };
      };
    };
  };
  reportMonthly: {
    usagePerformance: {
      before: {
        [key: string]: {
          // 施設利用者の実績記録：id
          id: number;
          // 施設利用者の実績記録：利用者ID
          usersInFacilityId: number;
          // 姓
          nameSei: string;
          // 名
          nameMei: string;
          // 対象年月日
          targetDate: string;
          // サービス提供の状況
          statusType: number;
          // 医療連携体制加算
          medicalSupportType: number | null;
          // 備考
          remarks: string | null;
          // 休日判定
          isHoliday: boolean | null;
          /**
           * 退去判定
           * 0: 退去済み
           * 1: 未退去
           * 2: 退去後30日未満
           */
          isServiceEnd: number;
        };
      };
      after: {
        [key: string]: {
          // 施設利用者の実績記録：id
          id: number;
          // 施設利用者の実績記録：利用者ID
          usersInFacilityId: number;
          // 姓
          nameSei: string;
          // 名
          nameMei: string;
          // 対象年月日
          targetDate: string;
          // サービス提供の状況
          statusType: number;
          // 医療連携体制加算
          medicalSupportType: number | null;
          // 備考
          remarks: string | null;
          // 休日判定
          isHoliday: boolean | null;
          /**
           * 退去判定
           * 0: 退去済み
           * 1: 未退去
           * 2: 退去後30日未満
           */
          isServiceEnd: number;
        };
      };
    };
    usagePerformanceTANKINYUSHO: {
      before: {
        [key: string]: {
          // 施設利用者全体の実績記録：id
          id: number;
          // 施設利用者の実績記録：利用者ID
          usersInFacilityId: number;
          // 対象年月日
          targetDate: string;
          // 生活介護等または指定通所支援等を実施
          otherSupport: number;
          // 送迎
          pickup: number;
          // 同一敷地内（送迎）
          pickupPremises: number;
          // 食事提供
          food: number;
          // 緊急短期入所受入フラグ
          emergencyShortterm: number;
          // 単独型18時間以上
          overHours: number;
          // 定員超過特例
          capacityOverrunException: number;
          // 喀痰吸引等実施フラグ
          sputumImplementation: number;
          // 重度障害者支援（研修者）
          severeDisabilitySupport: number;
        };
      };
      after: {
        [key: string]: {
          // 施設利用者全体の実績記録：id
          id: number;
          // 施設利用者の実績記録：利用者ID
          usersInFacilityId: number;
          // 対象年月日
          targetDate: string;
          // 生活介護等または指定通所支援等を実施
          otherSupport: number;
          // 送迎
          pickup: number;
          // 同一敷地内（送迎）
          pickupPremises: number;
          // 食事提供
          food: number;
          // 緊急短期入所受入フラグ
          emergencyShortterm: number;
          // 単独型18時間以上
          overHours: number;
          // 定員超過特例
          capacityOverrunException: number;
          // 喀痰吸引等実施フラグ
          sputumImplementation: number;
          // 重度障害者支援（研修者）
          severeDisabilitySupport: number;
        };
      };
    };
  };
}

// 実績 usagePerformance型
export type UsagePerformanceType =
  | ReportState["reportDaily"]["usagePerformance"]["before"]["0"]
  | ReportState["reportMonthly"]["usagePerformance"]["before"]["0"];

// 実績 usagePerformanceDaily型
export type UsagePerformanceDailyType = ReportState["reportDaily"]["usagePerformanceDaily"]["before"];

// 実績 usagePerformanceTANKINYUSHO型
export type UsagePerformanceTANKINYUSHOType =
  | ReportState["reportDaily"]["usagePerformanceTANKINYUSHO"]["before"]["0"]
  | ReportState["reportMonthly"]["usagePerformanceTANKINYUSHO"]["before"]["0"];
