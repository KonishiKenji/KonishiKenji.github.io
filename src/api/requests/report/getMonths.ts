import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetReportMonthsResponse {
  months: string[];
  response: {
    code: number;
    msg: string;
  };
}

// 記録の存在する年月一覧取得
const getReportMonths = async (
  target: string
): Promise<AxiosResponse<GetReportMonthsResponse>> => {
  const url = `${VERSION_URL}/report/${target}/months`;
  return request.get<GetReportMonthsResponse>(url);
};

export default getReportMonths;
