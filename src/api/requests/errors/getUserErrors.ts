import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { FacilityType } from "@constants/variables";

export interface GetUserErrorsResponse {
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
 * ユーザーのエラー一覧を取得する
 */
export const getUserErrors = async (): Promise<
  AxiosResponse<GetUserErrorsResponse>
> => {
  const url = `${VERSION_URL}/errors/users`;
  return request.get<GetUserErrorsResponse>(url);
};

export default getUserErrors;
