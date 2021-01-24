/**
 * ActionNames
 */
export const FETCH_STARTED = "SHUROTEICHAKU/FETCH_STARTED";
export const FETCH = "SHUROTEICHAKU/FETCH";
export const FETCH_FAILED = "SHUROTEICHAKU/FETCH_FAILED";
export const POST_STARTED = "SHUROTEICHAKU/POST_STARTED";
export const POST = "SHUROTEICHAKU/POST";
export const POST_FAILED = "SHUROTEICHAKU/POST_FAILED";

/**
 * State
 */
export interface UsageResultsState {
  usageResults: UsageResult[];
}
export interface UsageResult {
  // 利用者ID
  uifId: number | null;
  // 姓
  nameSei: string | null;
  // 名
  nameMei: string | null;
  // 対象年月日
  targetDate: string | null;
  // サービス提供の状況
  statusType: number | null;
  // 特別地域加算
  specialAreaFlg: number | null;
  // 備考
  remarks: string | null;
  // 休日判定
  isHoliday: boolean | null;
}
