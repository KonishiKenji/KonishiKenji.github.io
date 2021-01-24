/**
 * 配列からfalse, undefined, nullを除外したものを返す
 */
const makeValidDataList = <T>(dataList: (false | undefined | null | T)[]) => {
  return dataList.filter(
    (v): v is T => v !== undefined && v !== null && typeof v !== "boolean"
  );
};

export default makeValidDataList;
