import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetWorkplaceCompanyListResponse {
  data: {
    workplace_company: {
      workplace_company_id: number;
      name: string;
      full_address: string;
      contract_begin_date: string;
      contract_end_date: string;
      user_count: number;
      is_valid: boolean;
    }[];
  };
}

/**
 * 指定月の施設外就労の詳細データの取得
 */
const getWorkplaceCompanyList = async (): Promise<
  AxiosResponse<GetWorkplaceCompanyListResponse>
> => {
  const url = `${VERSION_URL}/offsite_work/workplace_company_list`;
  return request.get<GetWorkplaceCompanyListResponse>(url);
};

export default getWorkplaceCompanyList;
