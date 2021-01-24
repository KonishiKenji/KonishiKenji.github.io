import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetDownloadResponse {
  data: {
    facility: {
      name: string;
      full_address: string;
      responsible_person: string;
      gov_facility_number: string;
      type_service: string;
      capacity: number;
    };
    report: {
      offsite_worker_count: number;
      name: string;
      full_address: string;
      contract_begin_date: string;
      contract_end_date: string;
      working_day: string;
      working_time: string;
      working_description: string;
      other: string;
      remarks: string;
      to_address: string;
      users: {
        name_sei: string;
        name_mei: string;
        recipient_number: string;
        city: string;
        inout_sum: string;
        daily: string[];
      }[];
      staffs: {
        staff_name: string;
        operation_sum: string;
        daily: string[];
      }[];
    }[];
  };
}

/**
 * 指定月の施設外就労の詳細データを取得
 * @param year 対象年
 * @param month 対象月
 */
const getDownload = async (
  year: string,
  month: string
): Promise<AxiosResponse<GetDownloadResponse>> => {
  const url = `${VERSION_URL}/offsite_work/download/${year}/${month}`;
  return request.get<GetDownloadResponse>(url);
};

export default getDownload;
