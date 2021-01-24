import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { FacilityType } from "@constants/variables";

export interface GetInOutErrorsResponse {
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
 * 実績のエラー一覧を取得する
 * @param year
 * @param month
 */
export const getInOutErrors = async (
  year: string,
  month: string
): Promise<AxiosResponse<GetInOutErrorsResponse>> => {
  const url = `${VERSION_URL}/errors/inout?year=${year}&month=${month}`;
  return request.get<GetInOutErrorsResponse>(url);
};

export default getInOutErrors;
