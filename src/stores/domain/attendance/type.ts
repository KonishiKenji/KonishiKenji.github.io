export interface Attendance {
  uif_id: number;
  displayName: string;
  kanaName: string;
  attendanceStatus: "before" | "working" | "after";
  inTime?: string;
  outTime?: string;
  status?: number;
  previousInTime?: string;
  previousOutTime?: string;
  previousStatus?: number;
}

export type AttendanceList = Attendance[];

export interface FormatedAttendance {
  viewKana: string;
  attendance: Attendance[];
}

export type FormatedAttendanceList = FormatedAttendance[];

/**
 * 管理する値
 */
export interface AttendanceState {
  attendanceList: Attendance[];
}

export interface AttendanceListResultAPI {
  data: Attendance[];
}

export interface AttendanceResultAPI {
  inout?: { inTime?: string; outTime?: string; status: number };
  previous?: { inTime?: string; outTime?: string; status: number };
}
