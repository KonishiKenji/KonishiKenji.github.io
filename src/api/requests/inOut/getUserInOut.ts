import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { AttendanceResultAPI } from "@stores/domain/attendance/type";

type GetUserInOutResponse = {
  data: AttendanceResultAPI;
};

/**
 * IDと日付に紐づくタイムカード情報を取得する
 * @param id
 * @param date YYYYMMDD
 */
export const getUserInOut = async (
  id: number,
  date: string
): Promise<AxiosResponse<GetUserInOutResponse>> => {
  const url = `${VERSION_URL}/inout/users/${id}/date/${date}/`;
  return request.get<GetUserInOutResponse>(url);
};

export default getUserInOut;
