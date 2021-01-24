import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 利用実績集計(日ごと)APIReponse
 */
export interface GetInOutDailySummaryResponse {
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
      userName: string;
      recipientNumber: string;
      status: number;
    }[];
  };
}
/**
 * 利用実績集計(日ごと)を取得する
 * @param date YYYYMMDD
 */
export const getInOutSummary = async (
  date: string
): Promise<AxiosResponse<GetInOutDailySummaryResponse>> => {
  const url = `${VERSION_URL}/inout/summary/date/${date}`;
  return request.get<GetInOutDailySummaryResponse>(url);
};

export default getInOutSummary;
