import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetSupportsDateListResponse {
  data: string[]; // YYYY-MM形式
}

/**
 * 支援記録のある日付を取得する
 * @param uifId 事業所所属ユーザーのID
 */
const getSupportsUifIdDateList = async (
  uifId: string
): Promise<AxiosResponse<GetSupportsDateListResponse>> => {
  const url = `${VERSION_URL}/supports/users/${uifId}/date_list`;
  return request.get<GetSupportsDateListResponse>(url);
};

export default getSupportsUifIdDateList;
