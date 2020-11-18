import { AxiosResponse } from "axios";
import request from "@api/index";
import { COMMON_VERSION_URL } from "@config";

import { ChangePassword } from "@stores/auth/type";

/**
 * パスワード忘れ or パスワード変更催促時のパスワード変更
 * @param data
 */
export const postPasswordChange = async (
  data: ChangePassword
): Promise<AxiosResponse<unknown>> => {
  const url = `${COMMON_VERSION_URL}/password_change/`;
  return request.post(url, data);
};

export default postPasswordChange;
