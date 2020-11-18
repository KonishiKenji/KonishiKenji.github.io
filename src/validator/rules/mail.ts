/**
 * メールアドレス
 * @param value
 */
const email = (value: string) => {
  let errorMessage;
  const mail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (value !== "" && !value.match(mail)) {
    errorMessage = "メール形式で入力してください";
  }
  return errorMessage;
};

export default email;
