import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { UserResult } from "@stores/domain/user/type";

type GetUserResponse = {
  data: UserResult;
};

/**
 * ログイン情報に紐づくユーザー情報を取得する
 */
export const getUser = async (): Promise<AxiosResponse<GetUserResponse>> => {
  const url = `${VERSION_URL}/user`;
  return request.get<GetUserResponse>(url);
};

export default getUser;
