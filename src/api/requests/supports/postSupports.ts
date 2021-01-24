import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface PostSupportsParams {
  support: {
    id: number | null;
    inout_record_id: number;
    uif_id: number | string;
    user_status?: string;
    interview_flg?: string;
    interview_start_time?: string | null;
    interview_end_time?: string | null;
    interview_comment?: string;
    staff_comment?: string;
    other_comment?: string;
    absence_reason?: string;
    support_content?: string;
    correspondent_staff_id?: number | string | null;
    correspondent_staff_name?: string | null;
    staff_id?: number | string | null;
    staff_name?: string | null;
    workplace_company_id?: number | string | null;
    support_work_history?: {
      inout_record_id: number | null;
      category_id: number;
      item_id: number;
      item_name: string;
      is_delete: number | null;
    }[];
  }[];
}

/**
 * 支援記録を更新をする
 * @param uifId 事業所所属ユーザーのID
 * @param params 更新データ
 */
const postSupports = async (
  uifId: string,
  params: PostSupportsParams
): Promise<AxiosResponse<unknown>> => {
  const url = `${VERSION_URL}/supports/users/${uifId}`;
  return request.post(url, params);
};

export default postSupports;
