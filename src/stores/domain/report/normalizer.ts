import deepEqual from "fast-deep-equal";
import {
  Report,
  ReportResultAPI,
  ReportResultUsagePerformance,
  ReportResultUsagePerformanceDaily,
  ReportState,
  ReportPerformanceDaily,
  ReportResultPostAPI,
  REPEAT_DAILY,
  REPEAT_MONTHLY
} from "@stores/domain/report/type";

import { dateInHyphenYYYYMMDDFormat } from "@utils/date";

const createResultUsagePerformanceDaily = (
  result: ReportPerformanceDaily
): ReportResultUsagePerformanceDaily => {
  return {
    target_date: result.targetDate,
    body_restraint_abolition_unexecuted_flg: Number(
      result.bodyRestraintAbolitionUnexecutedFlg
    )
  };
};

const createResultUsagePerformance = (
  result: Report[]
): ReportResultUsagePerformance[] => {
  const dataList: ReportResultUsagePerformance[] = [];
  result.forEach(target => {
    dataList.push({
      id: target.id,
      users_in_facility_id: target.usersInFacilityId,
      target_date: target.targetDate,
      name_sei: target.nameSei,
      name_mei: target.nameMei,
      status_type: target.statusType ? Number(target.statusType) : null,
      night_support_type: target.nightSupportType
        ? Number(target.nightSupportType)
        : null,
      def_night_support_type: target.defNightSupportType
        ? Number(target.defNightSupportType)
        : null,
      hospitalization_support_type: target.hospitalizationSupportType
        ? Number(target.hospitalizationSupportType)
        : null,
      get_home_support_type: target.getHomeSupportType
        ? Number(target.getHomeSupportType)
        : null,
      daytime_support_type: target.daytimeSupportType
        ? Number(target.daytimeSupportType)
        : null,
      medical_support_type: target.medicalSupportType
        ? Number(target.medicalSupportType)
        : null,
      life_support_flg: target.lifeSupportFlg
        ? Number(target.lifeSupportFlg)
        : null,
      home_care_flg: target.homeCareFlg ? Number(target.homeCareFlg) : null,
      remarks: target.remarks || null,
      is_holiday: target.isHoliday,
      is_service_end: target.isServiceEnd
    });
  });
  return dataList;
};

const removeNoChangeData = (
  beforeList: Report[],
  afterList: Report[]
): Report[] => {
  const resultList = afterList.filter((after, idx) => {
    return !deepEqual(after, beforeList[idx]);
  });
  return resultList;
};

export const normalizeReportDataFromAPI = (
  result: ReportResultAPI,
  from: typeof REPEAT_DAILY | typeof REPEAT_MONTHLY,
  targetDate?: Date
): ReportState => {
  const formatedDate = !targetDate
    ? ""
    : dateInHyphenYYYYMMDDFormat(targetDate);
  const reportList: Report[] = [];
  Object.keys(result.usage_performance).forEach(key => {
    const target = result.usage_performance[key];
    const defNightSupportType =
      from === REPEAT_DAILY
        ? target.def_night_support_type
        : result.def_night_support_type;
    reportList.push({
      id: target.id,
      usersInFacilityId: target.users_in_facility_id,
      nameSei: target.name_sei || "",
      nameMei: target.name_mei || "",
      targetDate: target.target_date || formatedDate,
      statusType: target.status_type ? target.status_type.toString() : "",
      nightSupportType: target.night_support_type
        ? target.night_support_type.toString()
        : "",
      defNightSupportType:
        typeof defNightSupportType === "number" ? `${defNightSupportType}` : "",
      hospitalizationSupportType: target.hospitalization_support_type
        ? target.hospitalization_support_type.toString()
        : "",
      getHomeSupportType: target.get_home_support_type
        ? target.get_home_support_type.toString()
        : "",
      daytimeSupportType: target.daytime_support_type
        ? target.daytime_support_type.toString()
        : "",
      medicalSupportType: target.medical_support_type
        ? target.medical_support_type.toString()
        : "",
      lifeSupportFlg: target.life_support_flg
        ? target.life_support_flg.toString()
        : "",
      homeCareFlg: target.home_care_flg ? target.home_care_flg.toString() : "",
      remarks: target.remarks ? target.remarks.toString() : "",
      isHoliday: target.is_holiday,
      isServiceEnd: target.is_service_end
    });
  });

  const normalized: ReportState = {
    performanceDaily: {
      before: {
        bodyRestraintAbolitionUnexecutedFlg: result.usage_performance_daily
          ? Boolean(
              result.usage_performance_daily
                .body_restraint_abolition_unexecuted_flg
            )
          : false,
        targetDate: result.usage_performance_daily
          ? result.usage_performance_daily.target_date
          : formatedDate
      },
      after: {
        bodyRestraintAbolitionUnexecutedFlg: result.usage_performance_daily
          ? Boolean(
              result.usage_performance_daily
                .body_restraint_abolition_unexecuted_flg
            )
          : false,
        targetDate: result.usage_performance_daily
          ? result.usage_performance_daily.target_date
          : formatedDate
      }
    },
    reportDaily: {
      before: JSON.parse(JSON.stringify(reportList)),
      after: JSON.parse(JSON.stringify(reportList))
    },
    reportMonthly: {
      before: JSON.parse(JSON.stringify(reportList)),
      after: JSON.parse(JSON.stringify(reportList))
    }
  };
  return normalized;
};

export const normalizeReportDailyDataToAPI = (
  reportListBefore: Report[],
  reportListAfter: Report[],
  reportDaily: ReportPerformanceDaily
): ReportResultPostAPI => {
  const targetReportList: Report[] = removeNoChangeData(
    reportListBefore,
    reportListAfter
  );
  const normalized = {
    usage_performance_daily: createResultUsagePerformanceDaily(reportDaily),
    usage_performance: createResultUsagePerformance(targetReportList)
  };
  return normalized;
};

export const normalizeReportMonthlyDataToAPI = (
  reportListBefore: Report[],
  reportListAfter: Report[]
): ReportResultPostAPI => {
  const targetReportList: Report[] = removeNoChangeData(
    reportListBefore,
    reportListAfter
  );
  const normalized = {
    usage_performance: createResultUsagePerformance(targetReportList)
  };
  return normalized;
};
