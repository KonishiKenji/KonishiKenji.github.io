import { GetFacilityResponse } from "@api/requests/facility/getFacility";
import { dayOfTheWeekLabels } from "@utils/date";
import convertHHMMSSToHHMM from "@utils/date/convertHHMMSSToHHMM";
import { dowMappingSchedule, DowType } from "./dowMappingAdministration";

// FacilityStateの中にある、ここで必要なものだけ定義
interface PickFacilityState {
  mondaySchedule: boolean;
  tuesdaySchedule: boolean;
  wednesdaySchedule: boolean;
  thursdaySchedule: boolean;
  fridaySchedule: boolean;
  saturdaySchedule: boolean;
  sundaySchedule: boolean;
  workBreakTimes: GetFacilityResponse["data"]["workBreakTimes"];
  workBreakTimeItems: GetFacilityResponse["data"]["workBreakTimeItems"];
  workTimeItems: GetFacilityResponse["data"]["workTimeItems"];
}
type BreakTimes = {
  id: number;
  facility_id: number;
  start_time: string;
  end_time: string;
}[];

/**
 * 営業日・曜日ごとの設定などを考慮して作業開始日・作業終了日・休憩の開始/終了リストを返却する
 */
const getCorrectWorkRecordTimes = (
  facility: PickFacilityState,
  targetDate: string | Date
): {
  start_time: string;
  end_time: string;
  break_times: BreakTimes;
} => {
  let start_time = "";
  let end_time = "";
  let break_times: BreakTimes = [];

  if (targetDate) {
    const date =
      typeof targetDate === "string" ? new Date(targetDate) : targetDate;
    const weekLabel: DowType = dayOfTheWeekLabels[date.getDay()];
    const scheduleName = dowMappingSchedule[weekLabel];
    // 営業日かどうか
    if (facility[scheduleName]) {
      // 曜日ごとの設定の存在確認
      if (facility.workTimeItems && facility.workTimeItems.length > 0) {
        // 曜日の休憩時間
        const workTimeItems = facility.workTimeItems.find(
          (v) => v.day_of_the_week === weekLabel
        );
        // findによる存在チェックは要るがここまできた時点で必ず存在しているはず
        if (workTimeItems) {
          start_time = workTimeItems.start_time || "";
          end_time = workTimeItems.end_time || "";
          // 有効な休憩時間
          const workBreakTimeItems = facility.workBreakTimeItems.filter(
            (v) => v.applied && v.work_time_item_id === workTimeItems.id
          );
          break_times = workBreakTimeItems.map((v) => ({
            id: v.id,
            facility_id: v.facility_id,
            start_time: convertHHMMSSToHHMM(v.start_time),
            end_time: convertHHMMSSToHHMM(v.end_time)
          }));
        }
      }
    }
  }

  return {
    break_times,
    start_time: convertHHMMSSToHHMM(start_time),
    end_time: convertHHMMSSToHHMM(end_time)
  };
};

export default getCorrectWorkRecordTimes;
