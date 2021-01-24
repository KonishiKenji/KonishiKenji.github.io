export enum DownloadFileType {
  NONE = 0,
  JISSEKI_CSV,
  SEIKYU_CSV,
  UPLIMIT_CSV,
  JISSEKI_PRINT,
  SEIKYU_PRINT,
  UPLIMIT_PRINT,
  USER_COST_AMOUNT_LIST_PRINT
}

export interface AppDownloadState {
  targetYearMonth: string; // 年月選択
  targetYear: string; // targetYearMonthの年だけ
  targetMonth: string; // targetYearMonthの月だけ
  isDisableDownloadButton: boolean; // ダウンロードボタンのdisable
  isDisableExcludedUsersButton: boolean; // ユーザー絞り込みボタンのdisable
  downloadReadyFileType: DownloadFileType; // ダウンロードしたい書類の種類
  isOpenUserModal: boolean; // ユーザー一覧モーダル表示
  tmpExcludedUserIds: number[]; // 請求書除外しているユーザー(編集中)
  excludedUserIds: number[]; // 請求書除外しているユーザー
}
