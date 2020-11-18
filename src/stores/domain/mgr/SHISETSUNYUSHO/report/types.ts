export const REPEAT_DAILY = "reportDaily";
export const REPEAT_USERS = "reportUsers";

export type ReportType = typeof REPEAT_DAILY | typeof REPEAT_USERS;

/**
 * ActionNames
 */
// 日ごと用のaction名
export const FETCH_SHISETSUNYUSHO_DAILY_STARTED =
  "SHISETSUNYUSHO/FETCH_DAILY_STARTED";
export const FETCH_SHISETSUNYUSHO_DAILY_SUCCESS =
  "SHISETSUNYUSHO/FETCH_DAILY_SUCCESS";
export const FETCH_SHISETSUNYUSHO_DAILY_FAILED =
  "SHISETSUNYUSHO/FETCH_DAILY_FAILED";
export const UPDATE_SHISETSUNYUSHO_USAGE_PERFORMANCE_PARAMS_DAILY =
  "SHISETSUNYUSHO/UPDATE_USAGE_PERFORMANCE_PARAMS_DAILY";
export const UPDATE_SHISETSUNYUSHO_USAGE_PERFORMANCE_SHISETSUNYUSHO_DAILY =
  "SHISETSUNYUSHO/UPDATE_USAGE_PERFORMANCE_SHISETSUNYUSHO_DAILY";
export const UPDATE_SHISETSUNYUSHO_USAGE_PERFORMANCE_DAILY =
  "SHISETSUNYUSHO/UPDATE_USAGE_PERFORMANCE_DAILY";
export const POST_SHISETSUNYUSHO_BULK_REGISTRATION_DAILY_STARTED =
  "SHISETSUNYUSHO/POST_BULK_REGISTRATION_DAILY_STARTED";
export const POST_SHISETSUNYUSHO_BULK_REGISTRATION_DAILY_SUCCESS =
  "SHISETSUNYUSHO/POST_BULK_REGISTRATION_DAILY";
export const POST_SHISETSUNYUSHO_BULK_REGISTRATION_DAILY_FAILED =
  "SHISETSUNYUSHO/POST_BULK_REGISTRATION_DAILY_FAILED";
export const UPDATE_SHISETSUNYUSHO_ALL_STATUS_TYPE_DAILY =
  "SHISETSUNYUSHO/UPDATE_ALL_STATUS_TYPE_DAILY";
export const POST_SHISETSUNYUSHO_REPORT_DAILY_STARTED =
  "SHISETSUNYUSHO/POST_REPORT_DAILY_STARTED";
export const POST_SHISETSUNYUSHO_REPORT_DAILY_SUCCESS =
  "SHISETSUNYUSHO/POST_REPORT_DAILY_SUCCESS";
export const POST_SHISETSUNYUSHO_REPORT_DAILY_FAILED =
  "SHISETSUNYUSHO/POST_REPORT_DAILY_FAILED";
// 利用者ごと用のaction名
export const FETCH_SHISETSUNYUSHO_USERS_STARTED =
  "SHISETSUNYUSHO/FETCH_USERS_STARTED";
export const FETCH_SHISETSUNYUSHO_USERS_SUCCESS =
  "SHISETSUNYUSHO/FETCH_USERS_SUCCESS";
export const FETCH_SHISETSUNYUSHO_USERS_FAILED =
  "SHISETSUNYUSHO/FETCH_USERS_FAILED";
export const UPDATE_SHISETSUNYUSHO_USAGE_PERFORMANCE_PARAMS_USERS =
  "SHISETSUNYUSHO/UPDATE_USAGE_PERFORMANCE_PARAMS_USERS";
export const UPDATE_SHISETSUNYUSHO_USAGE_PERFORMANCE_SHISETSUNYUSHO_USERS =
  "SHISETSUNYUSHO/UPDATE_USAGE_PERFORMANCE_SHISETSUNYUSHO_USERS";
export const UPDATE_SHISETSUNYUSHO_USAGE_PERFORMANCE_USERS =
  "SHISETSUNYUSHO/UPDATE_USAGE_PERFORMANCE_USERS";
export const POST_SHISETSUNYUSHO_BULK_REGISTRATION_USERS_STARTED =
  "SHISETSUNYUSHO/POST_BULK_REGISTRATION_USERS_STARTED";
export const POST_SHISETSUNYUSHO_BULK_REGISTRATION_USERS_SUCCESS =
  "SHISETSUNYUSHO/POST_BULK_REGISTRATION_USERS";
export const POST_SHISETSUNYUSHO_BULK_REGISTRATION_USERS_FAILED =
  "SHISETSUNYUSHO/POST_BULK_REGISTRATION_USERS_FAILED";
export const UPDATE_SHISETSUNYUSHO_ALL_STATUS_TYPE_USERS =
  "SHISETSUNYUSHO/UPDATE_ALL_STATUS_TYPE_USERS";
export const POST_SHISETSUNYUSHO_REPORT_USERS_STARTED =
  "SHISETSUNYUSHO/POST_REPORT_USERS_STARTED";
export const POST_SHISETSUNYUSHO_REPORT_USERS_SUCCESS =
  "SHISETSUNYUSHO/POST_REPORT_USERS_SUCCESS";
export const POST_SHISETSUNYUSHO_REPORT_USERS_FAILED =
  "SHISETSUNYUSHO/POST_REPORT_USERS_FAILED";
// 共通のstoreリセット用のaction名
export const RESET_SHISETSUNYUSHO_USAGE_PERFORMANCE =
  "SHISETSUNYUSHO/RESET_USAGE_PERFORMANCE";

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
          // 初回フラグ
          initialFlg: boolean;
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
          // 初回フラグ
          initialFlg: boolean;
        };
      };
    };
    usagePerformanceSHISETSUNYUSHO: {
      before: {
        [key: string]: {
          // 施設利用者全体の実績記録：id
          id: number;
          // 施設利用者の実績記録：利用者ID
          usersInFacilityId: number;
          // 対象年月日
          targetDate: string;
          // 入院・外泊時加算
          hospitalizationOvernightStay: number;
          // 地域移行加算フラグ
          regionalTransition: number;
          // 経口移行加算フラグ
          oralTransition: number;
          // 経口維持加算
          oralPreservation: number;
          // 療養食フラグ
          medicalFoods: number;
          // 栄養マネジメント加算
          nutritionManagement: number;
          // 光熱水費徴収
          collectionOfUtilityFee: number;
          // 食事提供（朝）
          foodBreakfast: number;
          // 食事提供（昼）
          foodLunch: number;
          // 食事提供（夜）
          foodSupper: number;
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
          // 入院・外泊時加算
          hospitalizationOvernightStay: number;
          // 地域移行加算フラグ
          regionalTransition: number;
          // 経口移行加算フラグ
          oralTransition: number;
          // 経口維持加算
          oralPreservation: number;
          // 療養食フラグ
          medicalFoods: number;
          // 栄養マネジメント加算
          nutritionManagement: number;
          // 光熱水費徴収
          collectionOfUtilityFee: number;
          // 食事提供（朝）
          foodBreakfast: number;
          // 食事提供（昼）
          foodLunch: number;
          // 食事提供（夜）
          foodSupper: number;
          // 重度障害者支援（研修者）
          severeDisabilitySupport: number;
        };
      };
    };
  };
  reportUsers: {
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
          // 初回フラグ
          initialFlg: boolean;
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
          // 初回フラグ
          initialFlg: boolean;
        };
      };
    };
    usagePerformanceSHISETSUNYUSHO: {
      before: {
        [key: string]: {
          // 施設利用者全体の実績記録：id
          id: number;
          // 施設利用者の実績記録：利用者ID
          usersInFacilityId: number;
          // 対象年月日
          targetDate: string;
          // 入院・外泊時加算
          hospitalizationOvernightStay: number;
          // 地域移行加算フラグ
          regionalTransition: number;
          // 経口移行加算フラグ
          oralTransition: number;
          // 経口維持加算
          oralPreservation: number;
          // 療養食フラグ
          medicalFoods: number;
          // 栄養マネジメント加算
          nutritionManagement: number;
          // 光熱水費徴収
          collectionOfUtilityFee: number;
          // 食事提供（朝）
          foodBreakfast: number;
          // 食事提供（昼）
          foodLunch: number;
          // 食事提供（夜）
          foodSupper: number;
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
          // 入院・外泊時加算
          hospitalizationOvernightStay: number;
          // 地域移行加算フラグ
          regionalTransition: number;
          // 経口移行加算フラグ
          oralTransition: number;
          // 経口維持加算
          oralPreservation: number;
          // 療養食フラグ
          medicalFoods: number;
          // 栄養マネジメント加算
          nutritionManagement: number;
          // 光熱水費徴収
          collectionOfUtilityFee: number;
          // 食事提供（朝）
          foodBreakfast: number;
          // 食事提供（昼）
          foodLunch: number;
          // 食事提供（夜）
          foodSupper: number;
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
  | ReportState["reportUsers"]["usagePerformance"]["before"]["0"];

// 実績 usagePerformanceDaily型
export type UsagePerformanceDailyType = ReportState["reportDaily"]["usagePerformanceDaily"]["before"];

// 実績 usagePerformanceSHISETSUNYUSHO型
export type UsagePerformanceSHISETSUNYUSHOType =
  | ReportState["reportDaily"]["usagePerformanceSHISETSUNYUSHO"]["before"]["0"]
  | ReportState["reportUsers"]["usagePerformanceSHISETSUNYUSHO"]["before"]["0"];
