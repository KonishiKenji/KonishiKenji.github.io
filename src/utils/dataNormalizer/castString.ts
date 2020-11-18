/**
 * numberならstringに変換して、null,undefinedなら空文字列にして返す
 */
const castString = (value: number | null | undefined) => {
  if (value === undefined || value === null) {
    return "";
  }
  return `${value}`;
};

export default castString;
