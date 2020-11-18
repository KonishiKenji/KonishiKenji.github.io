import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 施設外就労企業データを削除する
 */
const deleteWorkplaceCompany = async (
  id: string
): Promise<AxiosResponse<unknown>> => {
  const url = `${VERSION_URL}/offsite_work/workplace_company/${id}`;
  return request.delete(url);
};

export default deleteWorkplaceCompany;
