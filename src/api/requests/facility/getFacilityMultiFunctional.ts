import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetFacilityMultiFunctionalResponse {
  data: {
    facility: {
      id: number;
      type_service: string;
      name: string;
      gov_facility_number: string;
      gov_business_owner: string;
      responsible_person: string;
      test_facility_flg: number;
    };
    multipleFacilities: {
      id: number;
      type_service: string;
      name: string;
      gov_facility_number: string;
      gov_business_owner: string;
      responsible_person: string;
      test_facility_flg: number;
    }[];
  };
}

/**
 * 施設(事業所)多機能情報を取得する。
 */
export const getFacilityMultiFunctional = async (): Promise<
  AxiosResponse<GetFacilityMultiFunctionalResponse>
> => {
  const url = `${VERSION_URL}/facility/multifunctional`;
  return request.get<GetFacilityMultiFunctionalResponse>(url);
};

export default getFacilityMultiFunctional;
