/**
 * 文字列の桁数以内チェック
 * @param value テキスト
 * @param length 許容する最大桁数
 */
const checkCharacterLength = (
  value: string,
  length: number
): string | undefined => {
  let errorMessage;
  if (value.length > length) {
    errorMessage = `全半角${length}文字以内で入力してください`;
  }

  return errorMessage;
};

export default checkCharacterLength;
