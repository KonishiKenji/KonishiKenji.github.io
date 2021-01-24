import getStaff from "./getStaff";
import { StaffState } from "@stores/domain/staff/types";

/**
 * staffからstaff_idに紐付く職員名を取り出す
 * @param staff
 * @param staffId
 */
const getStaffName = (
  staff: StaffState,
  staffId: number | string | null
): string => {
  if (staffId === null) return "";
  const res = getStaff(staff, +staffId);
  return res ? res.staffName : "";
};

export default getStaffName;
