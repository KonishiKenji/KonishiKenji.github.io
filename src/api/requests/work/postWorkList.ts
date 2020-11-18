import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface PostWorkParams {
  id: number | string | null;
  category_id: number;
  name: string;
}

/**
 * 作業情報の更新、追加の保存
 * @param values PostWorksParams[]
 */
export const postWorkList = async (
  values: PostWorkParams[]
): Promise<AxiosResponse<unknown>[]> => {
  return request.postAll(
    values.map((value) => ({
      url: `${VERSION_URL}/works/${value.id}`,
      data: value
    }))
  );
};

export default postWorkList;
