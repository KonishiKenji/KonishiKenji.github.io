/**
 * 必須チェック
 * @param value
 */
const required = (value: string) => {
  let errorMessage;
  if (value === "") {
    errorMessage = "必須です";
  }
  return errorMessage;
};

export default required;
