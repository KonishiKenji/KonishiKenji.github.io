import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 対象年月の作業時間サマリAPIresponse
 */
export interface GetWorkRecordsResponse {
  data: {
    dateFrom: string;
    dateTo: string;
    summary: {
      uifId: number;
      userName: string;
      recipientNumber: string;
      totalWorkTime: string;
      totalBreakTime: string;
      useCounts: number;
      foodCounts: number;
      workTimeDetails: {
        status: number;
        totalWorkTime: string;
      }[];
    }[];
    details: {
      uifId: number;
      status: number;
      userName: string;
      recipientNumber: string;
      date: string;
      inoutStartTime: string;
      inoutEndTime: string;
      food: number;
      workStartTime: string | null;
      workEndTime: string | null;
      totalWorkTime: string | null;
      totalBreakTime: string | null;
      memo: string | null;
      targetDate: string;
    }[];
    warnings: {
      uifId: number;
      message: string;
    }[];
  };
}

/**
 * 対象年月の作業時間サマリを取得する
 * @param startDate YYYYMMDD
 * @param endDate YYYYMMDD
 */
export const getWorkRecords = async (
  startDate: string,
  endDate: string
): Promise<AxiosResponse<GetWorkRecordsResponse>> => {
  const url = `${VERSION_URL}/work-records/download?from=${startDate}&to=${endDate}`;
  return request.get<GetWorkRecordsResponse>(url);
};

export default getWorkRecords;
