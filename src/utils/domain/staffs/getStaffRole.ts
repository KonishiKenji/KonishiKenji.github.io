import getStaff from "./getStaff";
import { StaffState } from "@stores/domain/staff/types";

/**
 * staffからstaff_idに紐付く役職を取り出す
 * @param staff
 * @param staffId
 */
const getStaffRole = (
  staff: StaffState,
  staffId: number | string | null
): string => {
  if (staffId === null) return "";
  const res = getStaff(staff, +staffId);
  return res ? res.roleName : "";
};

export default getStaffRole;
