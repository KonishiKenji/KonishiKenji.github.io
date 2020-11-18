/**
 * 渡されたobjectのvalueから{}とundefinedを除去する(nullと0は有効)
 */
export const toEffectiveObject = (obj: object): object | void => {
  const effectiveKey = Object.keys(obj).filter(key => {
    return obj[key] !== undefined;
  });
  const newObject = {};
  for (const key of effectiveKey) {
    const res =
      typeof obj[key] === "object" ? toEffectiveObject(obj[key]) : obj[key];
    if (res !== undefined) {
      newObject[key] = res;
    }
  }
  if (Object.keys(newObject).length) {
    return newObject;
  }
};
