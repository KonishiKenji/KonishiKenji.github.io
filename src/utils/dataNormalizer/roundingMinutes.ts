/**
 * 刻み時間に応じた分の丸め処理を行う
 * 開始は切り上げ、終了は切り捨てを行う
 * timeのフォーマットチェックは利用する側が行うこと
 * time: 00:00形式
 * unitEngrave: 刻み時間
 */
const roundingMinutes = (
  time: string,
  unitEngrave: string | number,
  format: "start" | "end"
): string => {
  let result = time;
  if (unitEngrave) {
    let hour = Number(time.substr(0, 2));
    let min = Number(time.substr(3));

    // minの丸め処理
    const unit = Number(unitEngrave);
    min =
      format === "start"
        ? Math.ceil(min / unit) * unit
        : Math.floor(min / unit) * unit;

    // 切り上げで時間が加算の必要があるかのチェック
    if (min >= 60) {
      hour += Math.floor(min / 60);
      min %= 60;
    }

    // 00:00形式に戻す
    const resultHour = `${hour}`.padStart(2, "0");
    const resultMin = `${min}`.padStart(2, "0");
    result = `${resultHour}:${resultMin}`;
  }
  return result;
};

export default roundingMinutes;
