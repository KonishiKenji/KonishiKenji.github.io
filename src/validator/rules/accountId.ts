/**
 * アカウントIDチェック(半角英数記号8文字以上)
 * @param value
 */
const accountId = (value: string) => {
  let errorMessage;
  if (value !== "" && !/^[ -~]{8,100}$/.test(value)) {
    errorMessage =
      "タイムカードアカウントは半角英数8文字以上である必要があります";
  }
  return errorMessage;
};

export default accountId;
