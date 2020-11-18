/**
 * string なら trim() 処理、null, undefined なら空文字列にして返す
 *
 * @see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/trim
 * @see https://caniuse.com/#search=trim
 */
const trimString = (value: string | null | undefined): string => {
  if (value === undefined || value === null) {
    return "";
  }
  // 半角・全角ブランクを間引く
  return value.trim();
};

export default trimString;
