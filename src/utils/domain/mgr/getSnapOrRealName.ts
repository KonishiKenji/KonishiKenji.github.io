const getSnapOrRealName = (
  payload: { snapshot_name: string; name: string } | number,
  defaultValue: string
): string => {
  if (typeof payload !== "number") {
    const { snapshot_name, name } = payload;
    const result = snapshot_name || name;
    return result || defaultValue;
  }
  return defaultValue;
};
export default getSnapOrRealName;
