import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 利用実績一覧(日ごと)APIresponse
 */
export interface GetInOutDailyReportResponse {
  data: {
    additions: { bodyRestrictedStillFlg: number; openShortTime: number };
    users: {
      uif_id: number;
      inoutRecordsId: number;
      name: string;
      status: number;
      inTime: string;
      outTime: string;
      travelTime: string;
      pickupPremises: string;
      visitSupport: number;
      didGetFood: string;
      trialUsageKind: string;
      lifeSupportHubInDistrictFlg: string;
      medicalCooperation: string;
      extended: string;
      shortStayFlg: string;
      helpInhouseLifeFlg: string;
      helpSocialLifeFlg: string;
      trainCommuteFlg: string;
      sputumImplementationFlg: string;
      supportForMentallyIllDischarge: string;
      specialAreaFlg: string;
      is_severe_disability_support: number;
      workRecord?: {
        id: number;
        inoutRecordsId: number;
        worked: number;
        startTime: string;
        endTime: string;
        breakTime: string;
        memo: string;
        histories?: {
          id: number;
          workRecordsId: number;
          updatedDate: string;
          columnName: string;
          beforeValue: string;
          afterValue: string;
        }[];
      };
    }[];
  };
}

/**
 * 利用実績一覧(日ごと)を取得する
 * @param date YYYYMMDD
 */
export const getInOut = async (
  date: string
): Promise<AxiosResponse<GetInOutDailyReportResponse>> => {
  const url = `${VERSION_URL}/inout/${date}`;
  return request.get<GetInOutDailyReportResponse>(url);
};

export default getInOut;
