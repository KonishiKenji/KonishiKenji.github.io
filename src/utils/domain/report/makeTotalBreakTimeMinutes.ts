import generateUsageTimeFlagList from "@utils/dataNormalizer/generateUsageTimeFlagList";

/**
 * 作業開始時間と作業終了時間の間に、休憩時間が何分含まれているかを算出する
 * ※ unitEngraveを基準にした時刻でないとズレが生じる
 * ※ ここのstringは全て`00:00`形式のことを指す
 */
const makeTotalBreakTimeMinutes = (
  workStartTime: string,
  workEndTime: string,
  breakTimeItems: { start_time: string; end_time: string }[],
  unitEngrave = "1"
): number => {
  // 休憩時間を変換して有効な時刻フラグを生成する
  const targetTimes = breakTimeItems.map((breakTime) => ({
    startTimeHour: breakTime.start_time.slice(0, 2),
    startTimeMinute: breakTime.start_time.slice(3, 5),
    endTimeHour: breakTime.end_time.slice(0, 2),
    endTimeMinute: breakTime.end_time.slice(3, 5)
  }));
  const useUnitEngrave = Number(unitEngrave);
  const breakTimeFlagList = generateUsageTimeFlagList(unitEngrave, targetTimes);

  // 開始-終了に収まっている合計分を計算する
  const [startHour, startMin] = workStartTime.split(":");
  const [endHour, endMin] = workEndTime.split(":");
  const totalMin = Object.keys(breakTimeFlagList).reduce(
    (accumulator, currentHour) => {
      // 計算で使用する値の型を数字で統一
      const numberStartHour = Number(startHour);
      const numberStartMin = Number(startMin);
      const numberEndHour = Number(endHour);
      const numberEndMin = Number(endMin);
      const numberCurrentHour = Number(currentHour);

      // 含まれている時間考慮
      if (
        numberStartHour > numberCurrentHour ||
        numberCurrentHour > numberEndHour
      ) {
        return accumulator;
      }

      // 含めて良い分のレンジ決定
      const start = numberStartHour === numberCurrentHour ? numberStartMin : 0;
      const end = numberEndHour === numberCurrentHour ? numberEndMin : 60;
      const flagList: boolean[] = breakTimeFlagList[currentHour];
      const targetMin = flagList.reduce((acc, flag, index) => {
        const currentMin = useUnitEngrave * (index + 1);
        if (start >= currentMin || currentMin > end) {
          return acc;
        }
        const min = flag ? useUnitEngrave : 0;
        return acc + min;
      }, 0);
      return accumulator + targetMin;
    },
    0
  );

  return totalMin;
};

export default makeTotalBreakTimeMinutes;
