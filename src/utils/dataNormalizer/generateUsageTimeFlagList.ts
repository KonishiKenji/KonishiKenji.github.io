interface UsageTimeFlagList {
  [key: number]: boolean[];
}

/**
 * 時間ごとに「利用している時間をtrueとして持つ配列」を持つオブジェクトを生成する（最大0-23）
 * @param unitEngrave 刻み時間、元がstringなので変換なしで渡したらこっちで処理する
 * @param targetTimes 指定時間（複数化）
 */
const generateUsageTimeFlagList = (
  unitEngrave: string | number,
  targetTimes: {
    startTimeHour: string;
    startTimeMinute: string;
    endTimeHour: string;
    endTimeMinute: string;
  }[]
): UsageTimeFlagList => {
  const flagList: UsageTimeFlagList = {};
  let useUnitEngrave =
    typeof unitEngrave === "string" ? Number(unitEngrave) : unitEngrave;
  useUnitEngrave = useUnitEngrave || 1;

  const minuteListLength = 60 / useUnitEngrave;

  // 重複を弾くために時間ごとに考慮済みの分の配列を作る
  targetTimes.forEach((time) => {
    // 入力途中を弾く
    if (
      !time.startTimeHour ||
      !time.startTimeMinute ||
      !time.endTimeHour ||
      !time.endTimeMinute
    ) {
      return;
    }

    // 不正なデータを計算に含めない
    const sh = Number(time.startTimeHour);
    const eh = Number(time.endTimeHour);
    if (sh > eh) {
      return;
    }

    // 「分」が何番目のkeyなのかを復元しておく
    const sm = Number(time.startTimeMinute);
    const em = Number(time.endTimeMinute);
    const smKey = (minuteListLength * sm) / 60;
    const emKey = (minuteListLength * em) / 60;

    // minの指定位置を元に休憩時間に含まれている分のリストを作る
    for (let i = sh; i <= eh; i += 1) {
      // 未設定ならfalseのリストを入れる
      const list = flagList[i] || Array(minuteListLength).fill(false);
      const res = list.map((flag, key) => {
        // 前回値がtrueならそのまま
        if (flag) {
          return true;
        }
        if (i === sh && i === eh) {
          return key >= smKey && key < emKey;
        }
        if (i === sh) {
          return key >= smKey;
        }
        if (i === eh) {
          return key < emKey;
        }
        return true;
      });
      flagList[i] = res;
    }
  });
  return flagList;
};

export default generateUsageTimeFlagList;
