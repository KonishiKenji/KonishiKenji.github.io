/**
 * 文字列の固定桁数チェック
 * @param value テキスト
 * @param length 指定桁数
 */
const checkDigits = (value: string, length: number): string | undefined => {
  let errorMessage;
  if (value !== "" && value.length !== length) {
    errorMessage = `${length}桁で入力してください`;
  }
  return errorMessage;
};

export default checkDigits;
