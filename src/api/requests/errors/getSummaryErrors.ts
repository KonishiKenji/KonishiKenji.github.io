import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetSummaryErrorsResponse {
  data: {
    facility: {
      hasError: boolean;
    };
    users: {
      hasError: boolean;
    };
    records: {
      hasError: boolean;
    };
  };
  response: {
    code: number;
    msg: string;
  };
}

/**
 * サマリーのエラー一覧を取得する
 */
export const getSummaryErrors = async (): Promise<
  AxiosResponse<GetSummaryErrorsResponse>
> => {
  const url = `${VERSION_URL}/errors/summary`;
  return request.get<GetSummaryErrorsResponse>(url);
};

export default getSummaryErrors;
