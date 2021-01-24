import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 利用実績集計(ユーザごと)APIResponse
 */
export interface GetInOutUserSummaryResponse {
  data: {
    summary: {
      serviceCounts: {
        oneWayCount: number;
        pickupCount: number;
        foodCount: number;
        medicalSupportCount: number;
        shortStayCount: number;
        transitionPreparationSupportCount: number;
        offsiteSupportCount: number;
      };
      countsPerStatus: {
        status: number;
        count: number;
      }[];
    };
    inoutRecords: {
      date: string;
      status: number;
    }[];
  };
}
/**
 * 利用実績集計(ユーザごと)を取得する
 * @param uifId
 * @param year yyyy
 * @param month mm
 */
export const getInOutUserSummary = async (
  uifId: number,
  year: string,
  month: string
): Promise<AxiosResponse<GetInOutUserSummaryResponse>> => {
  const url = `${VERSION_URL}/inout/summary/user/${uifId}/${year}/${month}`;
  return request.get<GetInOutUserSummaryResponse>(url);
};

export default getInOutUserSummary;
