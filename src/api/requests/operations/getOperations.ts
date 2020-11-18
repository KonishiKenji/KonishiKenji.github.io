import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetOperations {
  data: {
    operation: {
      date: string; // yyyy-mm-dd
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
        // target_date: string;
        operation_in_the_morning: string | null;
        operation_in_the_afternoon: string | null;
        staff_id: number | null;
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
          staff_name: string | null;
          working_hours: number | null;
          display_order: number;
        }[];
      }[];
      service_users: string[];
    }[];
    created_at: string | null;
    updated_at: string | null;
  };
}

/**
 * 指定月の業務記録を取得する
 * @param year 年
 * @param month 月
 */
const getOperations = async (
  year: string,
  month: string
): Promise<AxiosResponse<GetOperations>> => {
  const url = `${VERSION_URL}/operations/${year}/${month}`;
  return request.get<GetOperations>(url);
};

export default getOperations;
