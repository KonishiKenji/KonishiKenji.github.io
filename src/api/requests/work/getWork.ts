import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetWorkResponse {
  data: {
    id: number;
    items: {
      category_id: number;
      facility_id: number;
      id: number;
      name: string;
    }[];
    name: string;
  }[];
  response: {
    code: number;
    msg: string;
  };
}

/**
 * ログインユーザに紐づく作業情報を取得する
 */
export const getWork = async (): Promise<AxiosResponse<GetWorkResponse>> => {
  const url = `${VERSION_URL}/works`;
  return request.get<GetWorkResponse>(url);
};

export default getWork;
