import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface PostStaffParams {
  id: number | string | null;
  name: string;
  role: string;
}

/**
 * 職員情報の更新、追加の保存
 * @param values PostStaffParams[]
 */
export const postStaffList = async (
  values: PostStaffParams[]
): Promise<AxiosResponse<unknown>[]> => {
  return request.postAll(
    values.map((value) => ({
      url: `${VERSION_URL}/staffs/${value.id}`,
      data: value
    }))
  );
};

export default postStaffList;
