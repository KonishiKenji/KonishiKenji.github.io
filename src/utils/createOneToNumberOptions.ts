/**
 * 1から指定数値までのOptionsを生成 (月/日のOptions)
 */
const createOneToNumberOptions = (
  to: number,
  format: string,
  hasDefault = true
): { label: string; value: string }[] => {
  const options = hasDefault ? [{ label: "選択してください", value: "" }] : [];
  if (to) {
    for (let i = 1; i <= to; i += 1) {
      options[i] = { label: `${i} ${format}`, value: `${i}` };
    }
  }
  return options;
};

export default createOneToNumberOptions;
