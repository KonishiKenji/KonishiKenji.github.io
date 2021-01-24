/**
 * 区切り文字なしのフォーマット(YYYYMMDD)をDateにして返す
 */
const convertBlankSeparatorFormatToDate = (dateString: string): Date => {
  if (dateString.length !== 8) {
    console.error("only allow 8digit string");
  }
  const y = +dateString.slice(0, 4);
  const m = +dateString.slice(4, 6);
  const d = +dateString.slice(6, 8);
  return new Date(y, m - 1, d);
};

export default convertBlankSeparatorFormatToDate;
