import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface PostOperationsParams {
  operation:
    | {
        target_date: string; // yyyy-mm-dd
        operation_in_the_morning: string | null;
        operation_in_the_afternoon: string | null;
        staff_id: string | number | null;
        staff_name: string | null;
        operation_other_comment: string | null;
        operation_work_history: {
          operation_record_id: number | null;
          category_id: number;
          item_id: number;
          item_name: string;
          is_delete: number | null;
        }[];
        workplace_company:
          | {
              operation_record_id: number;
              workplace_company_id: number;
              staffs:
                | {
                    workplace_company_operation_id: number | undefined;
                    staffs_in_facility_id: number | null;
                    working_hours: string | number | null;
                    staff_name: string | null;
                    display_order: number;
                  }[]
                | null;
            }[]
          | null;
      }[]
    | null;
}

/**
 * 指定日の業務記録を更新する
 */
const postOperations = async (
  params: PostOperationsParams
): Promise<AxiosResponse<unknown>> => {
  const url = `${VERSION_URL}/operations/`;
  return request.post(url, params);
};

export default postOperations;
