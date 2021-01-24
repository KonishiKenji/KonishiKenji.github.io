import { AxiosResponse } from "axios";
import request from "@api/index";
import { COMMON_VERSION_URL } from "@config";

/**
 * 仮パスワード発行
 * @param email :仮パスワードを発行するメールアドレス
 */
export const postTemporaryPassword = async (
  email: string
): Promise<AxiosResponse<unknown>> => {
  const url = `${COMMON_VERSION_URL}/temporary_password/${email}`;
  return request.post(url, {});
};

export default postTemporaryPassword;
