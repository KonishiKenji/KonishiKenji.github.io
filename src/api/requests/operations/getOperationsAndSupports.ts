import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetOperationsAndSupports {
  data: {
    operation: {
      // date: string; // yyyy-mm-dd
      counts: {
        numberOfUsers: number;
        numberOfUsingServiceUsers: number;
        numberOfAbsence: number;
        numberOfSupportIkou1: number;
        numberOfSupportOutOfFacility: number;
        numberOfHavingInterview: number;
        totalInterviewMinutes: number;
      };
      record: {
        target_date: string | null;
        operation_in_the_morning: string | null;
        operation_in_the_afternoon: string | null;
        staff_id: number | string | null;
        staff_name: string | null;
        operation_other_comment: string | null;
      } | null;
      operation_work_history: {
        operation_record_id: number;
        category_id: number;
        item_id: number;
        item_name: string;
        is_delete: number | null;
      }[];
      // 施設外就労就労先企業
      workplace_company: {
        operation_record_id: number;
        workplace_company_id: number;
        workplace_name: string;
        staffs: {
          workplace_company_operation_id: number;
          staffs_in_facility_id: number;
          staff_name: string;
          working_hours: number;
          display_order: number;
        }[];
      }[];
    };
    support:
      | {
          inout: {
            id: number;
            uif_id: number;
            name: string;
            target_date: string; // yyyy-mm-dd
            status: number;
            in_time: string | null; // yyyy-mm-dd hh:mm:ss
            out_time: string | null; // yyyy-mm-dd hh:mm:ss
            pickup: string | null;
            food: string | null;
          };
          record: {
            id: number;
            inout_record_id: number | null;
            user_status: string | null;
            interview_flg: string | null;
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
          support_work_history: {
            inout_record_id: number;
            category_id: number;
            item_id: number;
            item_name: string;
            is_delete: number | null;
          }[];
        }[]
      | null;
    created_at: string | null;
    updated_at: string | null;
  };
}

/**
 * 指定日の業務記録と支援記録を取得する
 * @param yyyymmdd 日付
 */
const getOperationsAndSupports = async (
  yyyymmdd: string
): Promise<AxiosResponse<GetOperationsAndSupports>> => {
  const url = `${VERSION_URL}/operations/${yyyymmdd}`;
  return request.get<GetOperationsAndSupports>(url);
};

export default getOperationsAndSupports;
