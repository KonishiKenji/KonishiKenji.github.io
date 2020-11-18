import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 職員情報の削除
 * @param id number
 */
export const deleteStaff = async (
  id: number
): Promise<AxiosResponse<unknown>> => {
  return request.delete(`${VERSION_URL}/staffs/${id}`);
};

export default deleteStaff;
