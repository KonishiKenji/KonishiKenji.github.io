import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { FacilityType } from "@constants/variables";

export interface GetOffsiteWorkErrorsResponse {
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
 * 施設外就労実施報告書の作成
 */
export const getOffsiteWorkErrors = async (
  year: string,
  month: string
): Promise<AxiosResponse<GetOffsiteWorkErrorsResponse>> => {
  const url = `${VERSION_URL}/errors/offsite_work?year=${year}&month=${month}`;
  return request.get<GetOffsiteWorkErrorsResponse>(url);
};

export default getOffsiteWorkErrors;
