/**
 * 00:00形式と00:00:00形式が入れ混じることがあるので00:00に修正する
 * 00:00:00形式以外では何もしない
 * 正確な時刻フォーマットチェックは別で行うこと（59分までチェック等）
 */
const convertHHMMSSToHHMM = (time: string): string => {
  if (/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/.test(time)) {
    return time.slice(0, -3);
  }
  return time;
};

export default convertHHMMSSToHHMM;
