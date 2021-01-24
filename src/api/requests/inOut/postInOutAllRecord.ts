import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

type RequestParam = {
  bodyRestrictedStillFlg: number;
  openShortTime: number;
};

/**
 * 対象年月日の利用実績（inout_all_records）を登録/更新する。
 * @param date yyyymmdd
 * @param param param
 */
export const postInOutAllRecord = async (
  date: string,
  param: RequestParam
): Promise<AxiosResponse<unknown>> => {
  const url = `${VERSION_URL}/inout/${date}`;
  return request.post(url, param);
};

export default postInOutAllRecord;
