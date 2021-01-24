/**
 * 全角カナチェック
 * @param value
 */
const kana = (value: string) => {
  let errorMessage;
  if (value !== "" && !/^[\u30A0-\u30FF]+$/.test(value)) {
    errorMessage = "全角カタカナで入力してください";
  }
  return errorMessage;
};

export default kana;
