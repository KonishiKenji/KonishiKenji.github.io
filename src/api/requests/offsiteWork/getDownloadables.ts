import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface GetDownloadablesResponse {
  months: { date: string }[];
}

/**
 * 施設外就労実施報告書を出力できる年月を取得
 */
const getDownloadables = async (): Promise<
  AxiosResponse<GetDownloadablesResponse>
> => {
  const url = `${VERSION_URL}/offsite_work/downloadables`;
  return request.get<GetDownloadablesResponse>(url);
};

export default getDownloadables;
