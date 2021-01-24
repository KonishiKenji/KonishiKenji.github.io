import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { ContactValues } from "@interfaces/contact/contact";
import { normalizeContactDataToAPI } from "@stores/domain/contact/normalizer";

/**
 * お問い合わせ情報送信
 * @param values ContactValues
 */
export const postContact = async (
  values: ContactValues
): Promise<AxiosResponse<unknown>> => {
  const url = `${VERSION_URL}/contact`;
  return request.post(url, normalizeContactDataToAPI(values));
};

export default postContact;
