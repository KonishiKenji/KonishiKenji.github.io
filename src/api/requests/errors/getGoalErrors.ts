import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { FacilityType } from "@constants/variables";

export interface GetGoalErrorsResponse {
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
 * 利用者個別に個別支援計画 評価・振り返りのエラー一覧を取得する
 * @param uifId
 */
export const getGoalErrors = async (
  uifId: string
): Promise<AxiosResponse<GetGoalErrorsResponse>> => {
  const url = `${VERSION_URL}/errors/goal?users_in_facility_id=${uifId}`;
  return request.get<GetGoalErrorsResponse>(url);
};

export default getGoalErrors;
