/**
 * 時間形式できた値を時と分で合算した値にして返す
 * 形式が条件を満たしていないと引数の値をそのまま返す
 * @param time hh:mm形式の値
 */
const convertHHMMToMinutes = (time: string) => {
  if (!/^[0-9]{2}:[0-9]{2}/.test(time)) {
    return time;
  }
  const [hour, minute] = time.split(":");
  let resHour = 0;
  let resMinute = 0;
  if (typeof hour === "string") {
    resHour = parseInt(hour, 10);
  }
  if (typeof minute === "string") {
    resMinute = parseInt(minute, 10);
  }
  return resHour * 60 + resMinute;
};

export default convertHHMMToMinutes;
