import { AxiosResponse } from "axios";
import request from "@api/index";
import { VERSION_URL } from "@config";
import { ReportResultPostAPI } from "@stores/domain/report/type";

export const postSetUsagePerformanceMonthly = async (
  values: ReportResultPostAPI
): Promise<AxiosResponse<unknown>> => {
  const url = `${VERSION_URL}/usage_performance/monthly/set`;
  return request.post(url, values);
};

export default postSetUsagePerformanceMonthly;
