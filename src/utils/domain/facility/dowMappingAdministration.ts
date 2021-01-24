/**
 * APIから取得できる曜日は省略形だが、営業スケジュールはそれを考慮した構造になっていないので吸収するための定義
 */

export type DowType = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export const dowMappingSchedule = {
  mon: "mondaySchedule",
  tue: "tuesdaySchedule",
  wed: "wednesdaySchedule",
  thu: "thursdaySchedule",
  fri: "fridaySchedule",
  sat: "saturdaySchedule",
  sun: "sundaySchedule"
} as const;
