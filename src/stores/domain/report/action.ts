import typescriptFsa from "typescript-fsa";
import {
  Report,
  ReportTypeInterface,
  ReportPerformanceDaily,
  ReportState,
  ReportPostDailyState
} from "@stores/domain/report/type";

const actionCreator = typescriptFsa("USER_IN_FACILITY");

export const fetchDaily = actionCreator.async<void, ReportState>("FETCH_DAILY");
export const fetchMonthly = actionCreator.async<void, ReportState>(
  "FETCH_MONTHLY"
);
export const postDaily = actionCreator.async<void, ReportPostDailyState>(
  "POST_DAILY"
);
export const postMonthly = actionCreator.async<void, Report[]>("POST_MONTHLY");
export const setBeforeToAfterDaily = actionCreator("SET_BEFORE_TO_AFTER_DAILY");
export const setBeforeToAfterMonthly = actionCreator(
  "SET_BEFORE_TO_AFTER_MONTHLY"
);

export const setBodyRestraintAbolitionUnexecutedFlg = actionCreator<{
  value: ReportPerformanceDaily["bodyRestraintAbolitionUnexecutedFlg"];
  type: ReportTypeInterface["type"];
}>("SET_BODY_RESTRAINT_ABOLITION_UNEXECUTED_FLG");
export const setStatusType = actionCreator<{
  value: Report["statusType"];
  type: ReportTypeInterface["type"];
  key: number;
}>("SET_STATUS_TYPE");

export const setNightSupportType = actionCreator<{
  value: Report["nightSupportType"];
  type: ReportTypeInterface["type"];
  key: number;
}>("SET_NIGHT_SUPPORT_TYPE");
export const setHospitalizationSupportType = actionCreator<{
  value: Report["hospitalizationSupportType"];
  type: ReportTypeInterface["type"];
  key: number;
}>("SET_HOSPITALIZATION_SUPPORT_TYPE");
export const setGetHomeSupportType = actionCreator<{
  value: Report["getHomeSupportType"];
  type: ReportTypeInterface["type"];
  key: number;
}>("SET_GET_HOME_SUPPORT_TYPE");
export const setDaytimeSupportType = actionCreator<{
  value: Report["daytimeSupportType"];
  type: ReportTypeInterface["type"];
  key: number;
}>("SET_");
export const setMedicalSupportType = actionCreator<{
  value: Report["medicalSupportType"];
  type: ReportTypeInterface["type"];
  key: number;
}>("SET_MEDICAL_SUPPORT_TYPE");
export const setLifeSupportFlg = actionCreator<{
  value: Report["lifeSupportFlg"];
  type: ReportTypeInterface["type"];
  key: number;
}>("SET_LIFE_SUPPORT_FLG");
export const setHomeCareFlg = actionCreator<{
  value: Report["homeCareFlg"];
  type: ReportTypeInterface["type"];
  key: number;
}>("SET_HOME_CARE_FLG");
export const setRemarks = actionCreator<{
  value: Report["remarks"];
  type: ReportTypeInterface["type"];
  key: number;
}>("SET_REMARKS");
export const setAllStatusTypeDaily = actionCreator<Report["statusType"]>(
  "SET_ALL_STATUS_TYPE_DAILY"
);
export const setAllStatusTypeMonthly = actionCreator<Report["statusType"]>(
  "SET_ALL_STATUS_TYPE_MONTHLY"
);
