import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetSupportPlanOnceResponse {
  data: {
    id: number;
    support_begin_date: string | null;
    support_end_date: string | null;
    status_type: number;
    user_request_type: number;
    user_request_text: string;
    current_status: string;
    long_term_goal: string;
    other_comment: string | null;
    staff_comment: string | null;
    minutes: string | null;
    minutes_date: string | null;
    participant: {
      id: number;
      name: string;
      role: string;
      facility_id: number;
    }[];
    remarks: string | null;
    author:
      | {
          id: number;
          name: string;
          role: string;
          facility_id: number;
        }
      | number;
    authorizer:
      | {
          id: number;
          name: string;
          role: string;
          facility_id: number;
        }
      | number;
    creation_date: string | null;
    created_at: string | null;
    updated_at: string | null;
    support_plan_goal: {
      id: number;
      number: number;
      sprint_goal: string;
      adopt_info: string;
      support_info: string;
      user_comment: string | null;
      improvement_plan: string | null;
    }[];
    // archive: boolean;
  };
}

/**
 * 指定IDの個別支援計画のデータ取得
 * @param uifId 事業所所属ユーザーのID
 * @param supportPlanId 個別支援計画書ID
 */
const getSupportPlanOnce = async (
  uifId: string,
  supportPlanId: string
): Promise<AxiosResponse<GetSupportPlanOnceResponse>> => {
  const url = `${VERSION_URL}/support_plan/${uifId}/${supportPlanId}`;
  return request.get<GetSupportPlanOnceResponse>(url);
};

export default getSupportPlanOnce;
