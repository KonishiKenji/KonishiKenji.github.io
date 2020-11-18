/**
 * 自然数チェック（0含む）、空文字は判定しない、小数点を考慮する（）
 * @param value
 */
const regularExpressionDecimal = (value: string) => {
  let errorMessage;
  if (value !== "" && !/^([1-9][0-9]{0,10}|0)(\.[0-9]{1})?$/.test(value)) {
    errorMessage = "半角数字を入力してください";
  }
  return errorMessage;
};

export default regularExpressionDecimal;
