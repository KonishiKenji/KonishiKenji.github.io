import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface PostSupportPlanParams {
  creation_date: string; // 計画作成日
  support_begin_date: string; // 支援開始日
  support_end_date: string; // 支援終了日
  user_request_text: string | null; // 本人・家族の意向
  current_status: string | null; // 本人の現状
  long_term_goal: string | null; // 長期目標
  // 短期目標
  support_plan_goal: {
    number: number; // 短期目標番号
    sprint_goal?: string; // 目標
    adopt_info?: string; // 本人の取り組み内容
    support_info?: string; // 職員の支援内容
  }[];
  remarks: string | null; // 備考欄
  staff_comment: string | null; // 職員コメント
  author: number; // 作成者
  minutes_date: string | null; // 実施日
  participant: number[]; // 参加者
  minutes: string | null; // 会議議事録
  status_type: number; // 承認ステータス
  authorizer: number; // 承認者
}

/**
 * 支援記録を新規作成する
 * @param uifId 事業所所属ユーザーのID
 * @param params 更新データ
 */
const postSupportPlan = async (
  uifId: string,
  params: PostSupportPlanParams
): Promise<AxiosResponse<unknown>> => {
  const url = `${VERSION_URL}/support_plan/${uifId}`;
  return request.post(url, params);
};

export default postSupportPlan;
