/**
 * パスワードチェック(半角英数記号を使って8文字以上)
 * @param value
 */
const password = (value: string) => {
  let errorMessage;
  if (
    value !== "" &&
    !/^(?=.*?[a-z])(?=.*?\d)(?=.*?[!-\/:-@[-`{-~])[!-~]{8,100}$/.test(value)
  ) {
    errorMessage =
      "パスワードは、半角英数記号を使って8文字以上で設定してください";
  }
  return errorMessage;
};

export default password;
