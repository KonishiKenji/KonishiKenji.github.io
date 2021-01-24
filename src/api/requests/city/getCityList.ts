import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { CityState } from "@stores/domain/city/type";

type GetCityListResponse = {
  data: CityState[];
};

/**
 * 市区町村に一覧を取得する
 * @param prefectureName 都道府県名
 */
export const getCityList = async (
  prefectureName: string
): Promise<AxiosResponse<GetCityListResponse>> => {
  const url = `${VERSION_URL}/city/${prefectureName}`;
  return request.get<GetCityListResponse>(url);
};

export default getCityList;
