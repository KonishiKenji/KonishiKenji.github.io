import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { FacilityType } from "@constants/variables";

export interface GetPlanErrorsResponse {
  data: {
    facility: {
      name: string;
      type_service: FacilityType;
    };
    errors: {
      type: string;
      target: string;
      relation: {
        key: string;
        value: string | number;
      };
      content: string;
    }[];
  }[];
  response: {
    code: number;
    msg: string;
  };
}

/**
 * 利用者個別に個別支援計画のエラー一覧を取得する
 * @param uifId
 */
export const getPlanErrors = async (
  uifId: string
): Promise<AxiosResponse<GetPlanErrorsResponse>> => {
  const url = `${VERSION_URL}/errors/plan?users_in_facility_id=${uifId}`;
  return request.get<GetPlanErrorsResponse>(url);
};

export default getPlanErrors;
