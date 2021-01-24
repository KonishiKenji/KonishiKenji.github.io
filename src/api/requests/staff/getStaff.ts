import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetStaffResponse {
  data: {
    id: number;
    facility_id: number;
    role: string;
    name: string;
  }[];
  response: {
    code: number;
    msg: string;
  };
}

/**
 * ログインユーザに紐づく職員情報を取得する
 */
export const getStaff = async (): Promise<AxiosResponse<GetStaffResponse>> => {
  const url = `${VERSION_URL}/staffs`;
  return request.get<GetStaffResponse>(url);
};

export default getStaff;
