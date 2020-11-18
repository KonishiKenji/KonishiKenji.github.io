const getSnapOrRealRole = (
  payload: { snapshot_role: string; role: string } | number,
  defaultValue: string
): string => {
  if (typeof payload !== "number") {
    const { snapshot_role, role } = payload;
    const result = snapshot_role || role;
    return result || defaultValue;
  }
  return defaultValue;
};
export default getSnapOrRealRole;
