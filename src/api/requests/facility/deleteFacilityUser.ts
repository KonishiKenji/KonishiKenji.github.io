import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 事業所から指定の利用者を削除
 */
export const deleteFacilityUser = async (
  uifId: number
): Promise<AxiosResponse<unknown>> => {
  const url = `${VERSION_URL}/facility/users/${uifId}`;
  return request.delete(url);
};

export default deleteFacilityUser;
