import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface PostSupportPlanUpdateParams {
  id: number;
  creation_date?: string; // 計画作成日
  previous_creation_date: string | null; // 前回作成日
  support_begin_date: string; // 支援開始日
  support_end_date: string; // 支援終了日
  details: string | null; // 本人情報・就労継続支援A型利用までの経緯（活動歴や病歴など）
  user_request_text: string | null; // 本人の希望（業務内容、労働時間、賃金、一般就労の希望有無など）（元・本人・家族の意向）
  income_status: string | null; // 本人の障害基礎年金などの有無や収入状況
  user_issue: string | null; // 本人の生産活動を行う際の課題
  physical_condition: string | null; // 健康状態（病名、服薬状況など）
  risk_factor: string | null; // 生産活動や支援で留意する医学的リスクなど
  current_status: string | null; //  生活環境や自宅での役割などの本人の生活状況（元・本人の現状）
  // 短期目標
  support_plan_goal?: {
    id?: number;
    number: number; // 短期目標番号
    sprint_type: string; // 目標種別
    sprint_goal?: string | null; // 目標
    adopt_info?: string | null; // 本人の取り組み内容
    support_info?: string | null; // 職員の支援内容
    sprint_start_date?: string | null; // 設定日
    sprint_end_date?: string | null; // 達成予定日
  }[];
  support_plan_program: {
    id?: number; // 個別支援計画書のプログラムごとに紐付くID 新規の時はidキーごと無し
    number: number; // 親データに紐づいて付く連番（データソート用）
    scheduled_time: string | null; // 予定時間
    service_content: string | null; // サービス内容
    delete: boolean; // 削除パラメータ
  }[];
  pickup: number; // 送迎
  remarks?: string | null; // 特記事項
  staff_comment?: string | null; // 職員コメント
  author?: number; // 作成者
  minutes_date?: string | null; // 実施日
  participant?: number[]; // 参加者
  minutes?: string | null; // 会議議事録
  status_type?: number; // 承認ステータス
  authorizer?: number; // 承認者
}

/**
 * 支援記録を更新する
 * @param uifId 事業所所属ユーザーのID
 * @param params 更新データ
 */
const postSupportPlan = async (
  uifId: string,
  params: PostSupportPlanUpdateParams
): Promise<AxiosResponse<void>> => {
  const url = `${VERSION_URL}/support_plan/${uifId}`;
  return request.post(url, params);
};

export default postSupportPlan;
