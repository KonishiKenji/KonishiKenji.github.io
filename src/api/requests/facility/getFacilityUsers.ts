import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { dateToLocalisedString } from "@utils/date";

export interface GetFacilityUsersResponse {
  data: {
    uif_id: number;
    displayName: string;
    kanaName: string;
    date_end_in_service: string;
    status: number;
    in_time: string;
    out_time: string;
  }[];
}

/**
 * 事業所に紐づくユーザー一覧を取得する。年月を指定した場合、指定した年月で絞り込む
 * @param date Date
 */
export const getFacilityUsers = async (
  date?: Date
): Promise<AxiosResponse<GetFacilityUsersResponse>> => {
  const targetDate = date
    ? `?date=${dateToLocalisedString(date, "YYYY-MM")}`
    : "";
  const url = `${VERSION_URL}/facility/users${targetDate}`;
  return request.get<GetFacilityUsersResponse>(url);
};

export default getFacilityUsers;
