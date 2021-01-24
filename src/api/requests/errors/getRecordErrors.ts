import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { FacilityType } from "@constants/variables";

export interface GetRecordErrorsResponse {
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
 * 全ての個別支援計画のエラー一覧を取得する
 */
export const getRecordErrors = async (): Promise<
  AxiosResponse<GetRecordErrorsResponse>
> => {
  const url = `${VERSION_URL}/errors/records`;
  return request.get<GetRecordErrorsResponse>(url);
};

export default getRecordErrors;
