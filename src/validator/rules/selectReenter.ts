/**
 * selectフィールドのoptionsが変化した時、valueが含まれているかで再登録が必要かを判断する
 */
const selectReenter = (value: string, options: { value: string }[]) => {
  let errorMessage;
  if (options.findIndex(option => option.value === value) === -1) {
    errorMessage = "再度選択してください";
  }
  return errorMessage;
};

export default selectReenter;
