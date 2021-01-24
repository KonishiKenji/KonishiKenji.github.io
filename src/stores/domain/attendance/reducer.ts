import * as action from "@stores/domain/attendance/action";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { AttendanceState, Attendance } from "./type";

const initialState: AttendanceState = {
  attendanceList: []
};

const fetchAttendanceList = (state: AttendanceState, data: Attendance[]) => ({
  ...state,
  attendanceList: data
});

const fetchAttendance = (state: AttendanceState, payload: Attendance) => {
  const result = state.attendanceList.map(target => {
    if (target.uif_id !== payload.uif_id) {
      return target;
    }
    return {
      ...target,
      inTime: payload.inTime || undefined,
      outTime: payload.outTime || undefined,
      status: payload.status || undefined,
      attendanceStatus: payload.attendanceStatus || undefined,
      previousInTime: payload.previousInTime || undefined,
      previousOutTime: payload.previousOutTime || undefined,
      previousStatus: payload.previousStatus || undefined
    };
  });
  return {
    ...state,
    attendanceList: result
  };
};

export default reducerWithInitialState(initialState)
  .case(action.fetchAttendanceList, fetchAttendanceList)
  .case(action.fetchAttendance, fetchAttendance);
