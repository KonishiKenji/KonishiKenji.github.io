import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { SprintType } from "@constants/mgr/IAB/variables";

export interface GetSupportPlanResponse {
  data: {
    id: number;
    support_begin_date: string | null;
    support_end_date: string | null;
    status_type: number;
    evaluation_status: number;
    user_request_type: number;
    details: string | null;
    user_request_text: string | null;
    income_status: string | null;
    user_issue: string | null;
    physical_condition: string | null;
    risk_factor: string | null;
    current_status: string | null;
    other_comment: string | null;
    staff_comment: string | null;
    minutes: string | null;
    minutes_date: string | null;
    participant:
      | {
          id: number;
          name: string;
          role: string;
          facility_id: number;
        }[]
      | [];
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
    creation_date: string | null;
    support_plan_goal: {
      id: number;
      number: number;
      sprint_type: SprintType;
      sprint_goal: string | null;
      adopt_info: string | null;
      support_info: string | null;
      user_comment: string | null;
      improvement_plan: string | null;
      sprint_start_date: string | null;
      sprint_end_date: string | null;
    }[];
    support_plan_program: {
      id?: number;
      number: number;
      scheduled_time: string;
      service_content: string;
      delete: boolean;
    }[];
    pickup: number;
    archive: boolean;
  }[];
  response: {
    code: number;
    msg: string;
  };
}

/**
 * 個別支援計画のデータ取得
 * @param uifId 事業所所属ユーザーのID
 */
const getSupportPlan = async (
  uifId: string
): Promise<AxiosResponse<GetSupportPlanResponse>> => {
  const url = `${VERSION_URL}/support_plan/${uifId}`;
  return request.get<GetSupportPlanResponse>(url);
};

export default getSupportPlan;
