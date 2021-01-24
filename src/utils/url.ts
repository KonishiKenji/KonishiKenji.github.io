// URLパラメータの値を取得
export const getUrlParams = (item: string) => {
  const query = item && item.substring(1);
  if (!query) return {};

  return query.split("&").reduce((res, s) => {
    const keys = s.split("=");
    if (keys.length !== 2) return res;
    res[keys[0]] = keys[1];
    return res;
  }, {});
};
