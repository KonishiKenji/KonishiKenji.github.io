import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetAssociatedFacilitiesResponse {
  data: {
    id: number;
    name: string;
    selected: boolean;
  }[];
}

/**
 * 事業所情報を取得する
 */
export const getFacilities = async (): Promise<
  AxiosResponse<GetAssociatedFacilitiesResponse>
> => {
  const url = `${VERSION_URL}/facilities`;
  return request.get<GetAssociatedFacilitiesResponse>(url);
};

export default getFacilities;
