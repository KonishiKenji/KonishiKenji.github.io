/**
 * 自然数チェック（0単体を含む）、空文字は判定しない、先頭０の数字を含まない
 * @param value
 */
const naturalNumberNonZero = (value: string) => {
  let errorMessage;
  if (value !== "" && !/^0$|^[1-9][0-9]*$/.test(value)) {
    errorMessage = "半角数字を入力してください";
  }
  return errorMessage;
};

export default naturalNumberNonZero;
