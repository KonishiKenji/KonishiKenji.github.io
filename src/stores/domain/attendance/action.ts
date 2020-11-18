import typescriptFsa from "typescript-fsa";
import { Attendance } from "@stores/domain/attendance/type";

const actionCreator = typescriptFsa("ATTENDANCE");

export const fetchAttendanceList = actionCreator<Attendance[]>(
  "FETCH_ATTENDANCE_LIST"
);

export const fetchAttendance = actionCreator<Attendance>("FETCH_ATTENDANCE");
