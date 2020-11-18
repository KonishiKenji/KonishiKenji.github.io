import convertMinutesToTime from "@utils/date/convertMinutesToTime";

const formatMinutes = (minutes: number) => {
  const time = convertMinutesToTime(minutes);
  return time
    ? Number(time.hour) > 0
      ? `${time.hour}時間${time.minutes}分`
      : `${time.minutes}分`
    : "";
};

export default formatMinutes;
