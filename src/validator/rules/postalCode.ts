/**
 * 郵便番号（ハイフン含む7桁）
 * @param value
 */
const postalCode = (value: string) => {
  let errorMessage;
  if (value !== "" && !/^\d{3}[-]\d{4}$/.test(value)) {
    errorMessage = "郵便番号形式で入力してください";
  }
  return errorMessage;
};

export default postalCode;
