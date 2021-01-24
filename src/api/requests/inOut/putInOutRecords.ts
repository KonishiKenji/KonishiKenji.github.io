import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";

export interface RequestParam {
  yyyymmdd: number | null;
  uif_id: number | null;
  otherParam: {
    facilityType: string | null;
    status?: number | null;
    inTime?: string | null;
    outTime?: string | null;
    restTime: 60;
    travelTime: string | null;
    didGetFood?: string | null;
    visitSupport?: string | null;
    lifeSupportHubInDistrictFlg?: string | null;
    memo?: string | null;
    trialUsageKind?: string | null;
    pickupPremises: string;
    medicalCooperation?: string | null;
    extended?: string | null;
    shortStay?: string | null;
    helpSocialLifeFlg?: string | null;
    sputumImplementationFlg?: string | null;
    supportForMentallyIllDischarge?: string | null;
    specialAreaFlg?: string | null;
    severeDisabilitySupport?: number | null;
    helpInhouseLifeFlg?: string | null;
    trainCommuteFlg?: string | null;
    workRecord?: {
      id: number | null;
      inoutRecordsId: number | null;
      worked: number | null;
      startTime: string | null;
      endTime: string | null;
      breakTime: string | null;
      memo: string | null;
    };
  };
}

/**
 * 対象利用者の利用実績を登録する
 * @param data param
 */
export const putInOutRecords = async (
  data: RequestParam
): Promise<AxiosResponse<unknown>> => {
  const url = `${VERSION_URL}/inout/${data.yyyymmdd}/${data.uif_id}`;
  return request.put(url, data.otherParam);
};

export default putInOutRecords;
