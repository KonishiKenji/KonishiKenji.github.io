import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { AttendanceListResultAPI } from "@stores/domain/attendance/type";

/**
 * タイムカード一覧を取得する
 * @param date YYYYMMDD
 */
export const getInOutList = async (
  date: string
): Promise<AxiosResponse<AttendanceListResultAPI>> => {
  const url = `${VERSION_URL}/inout/list/${date}`;
  return request.get<AttendanceListResultAPI>(url);
};

export default getInOutList;
