/**
 * エラーの存在数チェック
 */
const aggregateErrorCount = (errorData: { errors: {}[] }[]): number => {
  const errors = errorData
    .map(d => d.errors)
    .reduce((acc, errs) => acc.concat(errs), []);
  return errors.length;
};

export default aggregateErrorCount;
