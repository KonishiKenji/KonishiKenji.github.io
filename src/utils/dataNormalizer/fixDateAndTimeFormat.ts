/**
 * 統一されていない日時のフォーマットを各種ブラウザで扱える`yyyy/MM/dd HH:mm:ss`に変換・補完する
 * @param value "yyyy-MM-dd", "yyyy-MM", "yyyyMMdd", "yyyy-MM-dd HH:mm:ss", ”HH:mm:ss”
 */
const fixDateAndTimeFormat = (value: string): string => {
  let res = value.replace(/-/g, "/");

  if (/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.test(value)) {
    // yyyy-MM-dd
    res = `${res} 09:00:00`;
  } else if (/^([0-9]{4})-([0-9]{2})$/.test(value)) {
    // yyyy-MM
    res = `${res}/01 09:00:00`;
  } else if (/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/.test(value)) {
    // HH:mm:ss
    res = `2020/01/01 ${res}`;
  } else if (/^[0-9]{8}$/.test(value)) {
    // yyyyMMdd
    res = `${res.slice(0, 4)}/${res.slice(4, 6)}/${res.slice(6, 8)} 09:00:00`;
  }
  return res;
};

export default fixDateAndTimeFormat;
