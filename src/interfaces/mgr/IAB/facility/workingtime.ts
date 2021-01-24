/**
 * 事業所情報: 作業時間
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import { SelectValue, SwitchValue } from "@interfaces/ui/form";

interface Base<T> {
  workingTime: T;
}

interface Fields {
  unitEngrave: string;
  startHor: SelectValue;
  startMin: SelectValue;
  endHor: SelectValue;
  endMin: SelectValue;
  dayOfWeekFlag: SwitchValue;
  users: {
    id: number;
    recipient_number: string;
    name_sei: string;
    name_mei: string;
    def_record_work: string;
  }[];
  workBreakTimes: {
    index: number; // 番号表示用
    id: number | string;
    startTimeHour: SelectValue;
    startTimeMinute: SelectValue;
    endTimeHour: SelectValue;
    endTimeMinute: SelectValue;
    isDeleted: boolean;
  }[];
  workTimeItems: {
    id: number | string;
    day_of_the_week: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
    startTimeHour: SelectValue;
    startTimeMinute: SelectValue;
    endTimeHour: SelectValue;
    endTimeMinute: SelectValue;
    workBreakTimeItems: (string | number)[];
    // 復元用データ
    workBreakTimeMaster?: {
      id: number;
      facility_id: number;
      work_time_item_id: number;
      work_break_time_id: number;
      start_time: string;
      end_time: string;
      applied: number;
    }[];
  }[];
}

type Errors = ValidationErrors<Fields>;

export type WorkingTimeValues = Base<Fields>;
export type WorkingTimeErrors = Base<Errors>;
