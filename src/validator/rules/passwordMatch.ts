/**
 * パスワードの一致チェック
 * @param value
 */
const passwordMatch = (value: string, matchValue: string) => {
  let errorMessage;
  if (value !== matchValue) {
    errorMessage = "パスワードが一致しません";
  }
  return errorMessage;
};

export default passwordMatch;
