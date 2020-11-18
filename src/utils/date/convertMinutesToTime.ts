/**
 * 数値を時間と分にして返す
 * @param minutes 分
 */
const convertMinutesToTime = (
  minutes: number
): { hour: string; minutes: string } => {
  let hh = 0;
  let mm = minutes;
  if (minutes >= 60) {
    hh = Math.floor(minutes / 60);
    mm = Math.floor(minutes % 60);
  }
  return { hour: `${hh}`, minutes: `${mm}`.padStart(2, "0") };
};

export default convertMinutesToTime;
