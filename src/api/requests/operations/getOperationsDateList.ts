import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetOperationsDateList {
  data: string[];
}

/**
 * 施設に所属する利用者のうち、全期間でinout_recordsに実績記録が存在する年月を取得する
 */
const getOperationsDateList = async (): Promise<
  AxiosResponse<GetOperationsDateList>
> => {
  const url = `${VERSION_URL}/operations/date_list`;
  return request.get<GetOperationsDateList>(url);
};

export default getOperationsDateList;
