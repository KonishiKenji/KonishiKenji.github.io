import { AxiosRequestConfig, AxiosResponse } from "axios";
import request from "@api/index";
import { COMMON_VERSION_URL } from "@config";
import { NewAccountParams } from "@stores/domain/account/type";

/**
 * アカウントの新規登録
 */
export const postActivate = async (
  data: NewAccountParams,
  verificationToken: string
): Promise<AxiosResponse<unknown>> => {
  const requestParams: AxiosRequestConfig = {
    headers: {
      "VERIFICATION-TOKEN": verificationToken
    }
  };
  const url = `${COMMON_VERSION_URL}/auth/activate`;
  return request.post(url, data, requestParams);
};

export default postActivate;
