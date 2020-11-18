// 作業時間_作業時間（分）
const createMinutesArray = (step = 1) => {
  const _step = !step ? 1 : step;
  // 00-60
  return Array(60)
    .fill(0)
    .map((e, index) => index)
    .filter(e => !(e % _step))
    .map(e => {
      const padding = e.toString().padStart(2, "0");
      return { label: `${padding}分`, value: padding };
    });
};

export default createMinutesArray;
