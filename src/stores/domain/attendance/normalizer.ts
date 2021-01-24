import {
  AttendanceListResultAPI,
  AttendanceResultAPI,
  AttendanceList,
  Attendance
} from "@stores/domain/attendance/type";
import { dateToLocalisedString } from "@utils/date";

import { SERVICE_STATUS } from "@constants/variables";

export const normalizeAttendanceListFromAPI = (
  result: AttendanceListResultAPI
): AttendanceList => {
  const normalized: AttendanceList = result.data.map(target => {
    const inTime = target.inTime
      ? dateToLocalisedString(`${target.inTime}:00`, "HH:mm")
      : undefined;
    const outTime = target.outTime
      ? dateToLocalisedString(`${target.outTime}:00`, "HH:mm")
      : undefined;
    return {
      ...target,
      inTime,
      outTime,
      attendanceStatus: getAttendanceStatus(
        target.status || 1,
        target.inTime || "",
        target.outTime || ""
      )
    };
  });
  return normalized;
};

export const normalizeAttendanceFromAPI = (
  result: AttendanceResultAPI,
  id: number
): Attendance => {
  const inout = result.inout;
  const previous = result.previous;

  const inTime =
    inout && inout.inTime
      ? dateToLocalisedString(`${inout.inTime}:00`, "HH:mm")
      : undefined;
  const outTime =
    inout && inout.outTime
      ? dateToLocalisedString(`${inout.outTime}:00`, "HH:mm")
      : undefined;
  const previousOutTime =
    previous && previous.outTime
      ? dateToLocalisedString(`${previous.outTime}:00`, "HH:mm")
      : undefined;

  const normalized = {
    inTime,
    outTime,
    previousOutTime,
    uif_id: id,
    displayName: "",
    kanaName: "",
    attendanceStatus: getAttendanceStatus(
      inout && inout.status ? inout.status : 1,
      inout && inout.inTime ? inout.inTime : "",
      inout && inout.outTime ? inout.outTime : ""
    ),
    status: inout && inout.status ? inout.status : undefined,
    previousInTime: previous && previous.inTime ? previous.inTime : undefined,
    previousStatus: previous && previous.status ? previous.status : undefined
  };
  return normalized;
};

const getAttendanceStatus = (
  status: number,
  inTime: string,
  outTime: string
): "before" | "working" | "after" => {
  const targetServiceStatus = SERVICE_STATUS.find(target => {
    return target.value === status;
  });
  if (!targetServiceStatus || targetServiceStatus.notAttended) {
    return "before";
  }
  return !inTime ? "before" : !outTime ? "working" : "after";
};
