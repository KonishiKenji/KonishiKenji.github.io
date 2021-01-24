import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 作業情報の削除
 * @param id number
 */
export const deleteWork = async (
  id: number
): Promise<AxiosResponse<unknown>> => {
  return request.delete(`${VERSION_URL}/works/${id}`);
};

export default deleteWork;
