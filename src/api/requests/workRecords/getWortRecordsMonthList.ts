import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 作業時間サマリの対象年月リストAPIresponse
 */
export interface GetWorkRecordsMonthListResponse {
  data: string[];
}

/**
 * 作業時間サマリの対象年月リストを取得する
 */
export const getWortRecordsMonthList = async (): Promise<
  AxiosResponse<GetWorkRecordsMonthListResponse>
> => {
  const url = `${VERSION_URL}/work-records/date_list`;
  return request.get<GetWorkRecordsMonthListResponse>(url);
};

export default getWortRecordsMonthList;
