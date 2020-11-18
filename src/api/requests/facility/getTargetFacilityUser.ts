import { AxiosResponse } from "axios";
import request from "@api/index";
import { COMMON_VERSION_URL } from "@config";
import { FacilityUser } from "@stores/domain/account/type";

/**
 * 事業所に紐づくユーザーアカウントを取得する。
 */
export const getTargetFacilityUser = async (): Promise<
  AxiosResponse<FacilityUser[]>
> => {
  const url = `${COMMON_VERSION_URL}/facility_user`;
  return request.get<FacilityUser[]>(url);
};

export default getTargetFacilityUser;
