import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

/**
 * 利用実績一覧(ユーザごと)APIresponse
 */
export interface GetInOutUserReportResponse {
  data: {
    counts: { numberOfAbsence: number };
    records: {
      uif_id: number;
      inoutRecordsId: number;
      name: string;
      target_date: string;
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
      helpSocialLifeFlg: string;
      sputumImplementationFlg: string;
      supportForMentallyIllDischarge: string;
      specialAreaFlg: string;
      is_holiday: boolean;
      is_severe_disability_support: number;
    }[];
  };
}
/**
 * 利用実績一覧(ユーザごと)を取得する
 * @param uifId
 * @param year yyyy
 * @param month mm
 */
export const getInOut = async (
  uifId: number,
  year: string,
  month: string
): Promise<AxiosResponse<GetInOutUserReportResponse>> => {
  const url = `${VERSION_URL}/inout/users/${uifId}/records/${year}/${month}`;
  return request.get<GetInOutUserReportResponse>(url);
};

export default getInOut;
