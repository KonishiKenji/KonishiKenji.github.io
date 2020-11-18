import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetReportUsersResponse {
  facility: {
    typeService: string;
  };
  users: {
    id: number | string;
    recipientNumber: string;
    name: string;
    targetForUpLimit: boolean;
    targetForUserCostAmountList: boolean;
  }[];
  response: {
    code: number;
    msg: string;
  };
}

// 年月に対応するユーザー一覧取得
const getReportUsers = async (
  target: string,
  month: string
): Promise<AxiosResponse<GetReportUsersResponse>> => {
  const url = `${VERSION_URL}/report/${target}/${month}`;
  return request.get<GetReportUsersResponse>(url);
};

export default getReportUsers;
