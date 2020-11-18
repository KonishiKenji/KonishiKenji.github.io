import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { ReportResultPostAPI } from "@stores/domain/report/type";

export const postSetUsagePerformanceDaily = async (
  values: ReportResultPostAPI
): Promise<AxiosResponse<unknown>> => {
  const url = `${VERSION_URL}/usage_performance/daily/set`;
  return request.post(url, values);
};

export default postSetUsagePerformanceDaily;
