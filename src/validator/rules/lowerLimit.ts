/**
 * 数値の下限チェック、第三引数のフラグで小数点も扱う（float）
 * @param value 比較値
 * @param lowerLimit 基準値
 * @param checkDecimal boolean
 */

const lowerLimitNumber = (
  value: number,
  lowerLimitValue: number
): string | undefined => {
  let errorMessage;
  if (value < lowerLimitValue) {
    errorMessage = `${lowerLimitValue}以上の数値を入力してください`;
  }
  return errorMessage;
};

const lowerLimit = (
  value: string,
  lowerLimitValue: number,
  checkDecimal = false
): string | undefined => {
  const num = checkDecimal ? parseFloat(value) : parseInt(value, 10);
  return lowerLimitNumber(num, lowerLimitValue);
};

export default lowerLimit;
