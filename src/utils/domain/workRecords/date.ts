/**
 * HH:MM:SS の時刻からHH:MMに変換
 * @param time
 */
// eslint-disable-next-line import/prefer-default-export
export function formatHourAndMinutes(time: string): string {
  const hm = time.includes(" ") ? time.split(" ")[1] : time;
  const [hour, minutes] = hm.split(":");

  return `${hour}:${minutes}`;
}
