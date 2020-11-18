import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetWorkplaceCompanyResponse {
  data: {
    workplace_company: {
      id: number;
      facility_id: number;
      name: string;
      address: string;
      postal_code: string;
      city_id: number;
      tel: string;
      contract_begin_date: string;
      contract_end_date?: string;
      working_day: string;
      working_time: string;
      working_description: string;
      other?: string;
      remarks: string;
      prefecture_name: string;
    };
    users_in_facility: {
      users_in_facility_id: number;
      name_sei: string;
      name_mei: string;
      recipient_number: string;
      is_checked: boolean;
    }[];
  };
}
/**
 * 施設外就労の詳細データを取得
 */
const getWorkplaceCompany = async (
  id: string
): Promise<AxiosResponse<GetWorkplaceCompanyResponse>> => {
  const url = `${VERSION_URL}/offsite_work/workplace_company/${id}`;
  return request.get<GetWorkplaceCompanyResponse>(url);
};

export default getWorkplaceCompany;
