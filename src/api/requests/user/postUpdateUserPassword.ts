import { AxiosResponse } from "axios";
import request from "@api/index";
import { COMMON_VERSION_URL } from "@config";
import { UpdatePasswordParams } from "@stores/domain/account/type";

/**
 * 事業所に紐づくアカウントのパスワードを変更する(ログイン後、adminとuser共通)
 * @param data
 */
export const postUpdateUserPassword = async (
  data: UpdatePasswordParams
): Promise<AxiosResponse<unknown>> => {
  const url = `${COMMON_VERSION_URL}/user/password`;
  return request.post(url, data);
};

export default postUpdateUserPassword;
