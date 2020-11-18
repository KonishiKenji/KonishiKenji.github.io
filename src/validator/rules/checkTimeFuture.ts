/**
 * 未来かどうかチェック
 */

const checkTimeFuture = (
  endTime: string,
  startTime: string,
  option = { firstLabel: "終了時間", secondLabel: "開始時間" }
) => {
  let errorMessage;
  const start = startTime.substr(0, 2).concat(startTime.substr(3, 4));
  const end = endTime.substr(0, 2).concat(endTime.substr(3, 4));

  if (parseInt(end, 10) - parseInt(start, 10) <= 0) {
    errorMessage = `${option.firstLabel}は${option.secondLabel}より後の時間を入力してください`;
  }
  return errorMessage;
};

export default checkTimeFuture;
