/**
 * セレクトボックスの変更チェック
 * @param value
 */
const required = (value: string, defaultValue: string) => {
  let errorMessage;
  if (value === defaultValue) {
    errorMessage = "必須です";
  }
  return errorMessage;
};

export default required;
