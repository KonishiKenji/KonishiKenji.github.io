import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { SprintType } from "@constants/mgr/IAB/variables";

export interface GetSupportPlanOnceResponse {
  data: {
    id: number;
    support_begin_date: string | null;
    support_end_date: string | null;
    status_type: number;
    evaluation_status: number;
    evaluation_minutes_status: number | null;
    user_request_type: number;
    details: string | null;
    user_request_text: string | null;
    income_status: string | null;
    user_issue: string | null;
    physical_condition: string | null;
    risk_factor: string | null;
    after_summary: string;
    current_status: string | null;
    other_comment: string | null;
    staff_comment: string | null;
    minutes: string | null;
    minutes_date: string | null;
    evaluation_minutes: string | null;
    evaluation_date: string | null;
    participant: {
      id: number;
      name: string;
      role: string;
      facility_id: number;
    }[];
    participant_history: {
      id: number;
      name: string;
      role: string;
      facility_id: number;
    }[];
    participant_name: string | null;
    remarks: string | null;
    author:
      | {
          id: number;
          name: string;
          role: string;
          facility_id: number;
          snapshot_name: string;
          snapshot_role: string;
        }
      | number;
    authorizer:
      | {
          id: number;
          name: string;
          role: string;
          facility_id: number;
          snapshot_name: string;
          snapshot_role: string;
        }
      | number;
    revaluation_date: string | null;
    evaluation_authorizer:
      | {
          id: number;
          name: string;
          role: string;
          facility_id: number;
          snapshot_name: string;
          snapshot_role: string;
        }
      | number;
    creation_date: string | null;
    previous_creation_date: string | null;
    created_at: string | null;
    updated_at: string | null;
    support_plan_goal: {
      id: number;
      number: number;
      sprint_type: SprintType;
      sprint_goal: string;
      adopt_info: string;
      support_info: string;
      user_comment: string | null;
      improvement_plan: string | null;
      sprint_start_date: string | null;
      sprint_end_date: string | null;
      sprint_result: number | null;
      sprint_review: string | null;
      sprint_user_evaluation: number | null;
      sprint_user_review: string | null;
      sprint_staff_evaluation: number | null;
      sprint_staff_review: string | null;
    }[];
    support_plan_program: {
      id: number;
      number: number;
      scheduled_time: string | null;
      service_content: string | null;
    }[];
    pickup: number;
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
