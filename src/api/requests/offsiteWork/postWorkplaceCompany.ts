import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface PostWorkplaceCompanyBody {
  workplace_company?: Partial<{
    id: number;
    name: string;
    address: string;
    postal_code: string;
    city_id: number;
    tel: string;
    contract_begin_date: string | null;
    contract_end_date: string | null;
    working_day: string;
    working_time: string;
    working_description: string;
    other?: string;
    remarks: string;
    prefecture_name?: string;
  }>;
  users_in_facility_workplace_company?: {
    users_in_facility_id: number;
  }[];
}
/**
 * 施設外就労の詳細データの登録・もしくは更新
 */
const postWorkplaceCompany = async (
  data: PostWorkplaceCompanyBody
): Promise<AxiosResponse<unknown>> => {
  const url = `${VERSION_URL}/offsite_work/workplace_company`;
  return request.post(url, data);
};

export default postWorkplaceCompany;
