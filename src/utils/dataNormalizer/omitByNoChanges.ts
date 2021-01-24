import omitBy from "lodash-es/omitBy";
import deepEqual from "fast-deep-equal";

/**
 * 変更のないプロパティを除外したものを返す
 * @param after 変更後のデータ
 * @param before 変更前のデータ
 */
const omitByNoChanges = <T>(
  after: { [key: string]: T },
  before: { [key: string]: T }
): Partial<{ [key: string]: T }> => {
  return omitBy(after, (v, k) => deepEqual(before[k], v));
};

export default omitByNoChanges;
