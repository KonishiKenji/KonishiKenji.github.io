/**
 * 自然数チェック（0含む）、空文字は判定しない
 * @param value
 */
const naturalNumber = (value: string) => {
  let errorMessage;
  if (value !== "" && !/^[0-9]+$/.test(value)) {
    errorMessage = "半角数字を入力してください";
  }
  return errorMessage;
};

export default naturalNumber;
