import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { FacilityType } from "@constants/variables";

export interface GetInvoiceErrorsResponse {
  data: {
    facility: {
      name: string;
      type_service: FacilityType;
    };
    errors: {
      type: string;
      target: string;
      relation: {
        key: string;
        value: string | number;
      };
      content: string;
    }[];
  }[];
  response: {
    code: number;
    msg: string;
  };
}

/**
 * 請求のエラー一覧を取得する
 * @param year
 * @param month
 * @param userIds
 */
export const getInvoiceErrors = async (
  year: string,
  month: string,
  userIds: number[]
): Promise<AxiosResponse<GetInvoiceErrorsResponse>> => {
  const url = `${VERSION_URL}/errors/invoice?year=${year}&month=${month}&excluded_user_ids=${userIds.join(
    ","
  )}`;
  return request.get<GetInvoiceErrorsResponse>(url);
};

export default getInvoiceErrors;
