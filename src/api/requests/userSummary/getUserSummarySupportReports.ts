import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetUserSummarySupportReports {
  supportRecords: {
    counts: {
      numberOfAbsence: number;
      numberOfHavingInterview: number;
      numberOfServiceUsage: number;
      numberOfSupportIkou1: number;
      numberOfSupportOutOfFacility: number;
      supportDays: number;
      totalInterviewMinutes: number;
    };
    support: {
      inout: {
        id: number;
        uif_id: number;
        name: string;
        recipientNumber: string;
        target_date: string;
        status: number;
        in_time: string | null;
        out_time: string | null;
        pickup: string | null;
        food: string | null;
      };
      record: {
        id: number;
        inout_record_id: number;
        user_status: string | null;
        interview_flg: string;
        interview_start_time: string | null;
        interview_end_time: string | null;
        interview_comment: string | null;
        staff_comment: string | null;
        other_comment: string | null;
        absence_reason: string | null;
        support_content: string | null;
        correspondent_staff_id: number | null;
        correspondent_staff_name: string | null;
        staff_id: number | null;
        staff_name: string | null;
        workplace_company: {
          workplace_company_id: number;
          workplace_name: string;
          is_checked: boolean;
        }[];
      } | null;
      support_work_history:
        | {
            inout_record_id: number;
            category_id: number;
            item_id: number;
            item_name: string;
            is_delete: number | null;
          }[]
        | [];
    }[];
    work_summary: {
      category: {
        id: number;
        name: string;
      };
      item: {
        id: number;
        name: string;
      };
      count: number;
      records: string[]; // YYYY-MM形式
    }[];
    created_at: string | null;
    updated_at: string | null;
  }[];
}

/**
 * 指定された利用者分の支援記録のデータを取得する
 * @param year 年
 * @param month 月(MM)
 * @param excludedUserIds 指定された事業所所属ユーザーのID
 */
const getUserSummarySupportReports = async (
  year: string,
  month: string,
  excludedUserIds?: string
): Promise<AxiosResponse<GetUserSummarySupportReports>> => {
  const url = `${VERSION_URL}/supports/users/records/${year}/${month}`;
  const query = excludedUserIds ? `?excluded_user_ids=${excludedUserIds}` : "";
  return request.get<GetUserSummarySupportReports>(url + query);
};

export default getUserSummarySupportReports;
