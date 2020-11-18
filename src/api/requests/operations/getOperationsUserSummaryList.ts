import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetOperationsUserSummaryList {
  data: {
    users: {
      status: number;
      name: string;
      recipientNumber: string;
    }[];
    status_summary: {
      [key: string]: number; // key: ステータスの値, value: ステータスの該当人数
    };
  };
}

/**
 * 指定日の利用者のステータスの状態を返す
 */
const getOperationsUserSummaryList = async (
  yyyymmdd: string
): Promise<AxiosResponse<GetOperationsUserSummaryList>> => {
  const url = `${VERSION_URL}/operations/user_summary_list/${yyyymmdd}`;
  return request.get<GetOperationsUserSummaryList>(url);
};

export default getOperationsUserSummaryList;
