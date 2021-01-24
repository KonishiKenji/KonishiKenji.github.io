/**
 * 数値の上限チェック、第三引数のフラグで小数点も扱う（float）
 * @param value 比較値
 * @param upperLimit 基準値
 * @param checkDecimal boolean
 */

const upperLimitNumber = (
  value: number,
  upperLimitValue: number
): string | undefined => {
  let errorMessage;
  if (value > upperLimitValue) {
    errorMessage = `${upperLimitValue}以下の数値を入力してください`;
  }
  return errorMessage;
};

const upperLimit = (
  value: string,
  upperLimitValue: number,
  checkDecimal = false
): string | undefined => {
  const num = checkDecimal ? parseFloat(value) : parseInt(value, 10);
  return upperLimitNumber(num, upperLimitValue);
};

export default upperLimit;
