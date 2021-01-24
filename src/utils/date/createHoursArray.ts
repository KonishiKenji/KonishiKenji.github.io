// 作業時間_作業時間（時）
const createHoursArray = () => {
  return Array(24)
    .fill(0)
    .map((e, index) => index)
    .map(e => {
      const padding = e.toString().padStart(2, "0");
      return { label: `${padding}時`, value: padding };
    });
};

export default createHoursArray;
