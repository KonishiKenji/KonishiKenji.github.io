import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface PostOperationsAndSupportsParams {
  operation: {
    target_date: string;
    operation_in_the_morning: string | null;
    operation_in_the_afternoon: string | null;
    staff_id: number | string | null;
    staff_name: string | null;
    operation_other_comment: string | null;
    operation_work_history: {
      operation_record_id: number | null; // 新規はnull
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
  } | null;
  support: {
    id: number | null;
    inout_record_id: number;
    user_status: string;
    interview_flg: string;
    interview_start_time: string | null;
    interview_end_time: string | null;
    interview_comment: string;
    staff_comment: string;
    other_comment: string;
    absence_reason: string;
    support_content: string;
    correspondent_staff_id: number | string | null;
    correspondent_staff_name: string | null;
    staff_id: number | string | null;
    staff_name: string | null;
    uif_id: number | string;
    workplace_company_id: number | string | null;
    support_work_history: {
      inout_record_id: number | null;
      category_id: number;
      item_id: number;
      item_name: string;
      is_delete: number | null;
    }[];
  }[];
}

/**
 * 指定日の業務記録と支援記録を同時に更新する
 * 更新しないデータにはnullを送る
 * @param yyyymmdd 日付
 * @param params 更新データ
 */
const postOperationsAndSupports = async (
  yyyymmdd: string,
  params: PostOperationsAndSupportsParams
): Promise<AxiosResponse<unknown>> => {
  const url = `${VERSION_URL}/operations/${yyyymmdd}`;
  return request.post(url, params);
};

export default postOperationsAndSupports;
