import { StaffState } from "@stores/domain/staff/types";

/**
 * staffからstaff_idに紐付くstaffItemを取得する
 * @param staff
 * @param staffId
 */
const getStaff = (
  staff: StaffState,
  staffId: number
): StaffState["staffItems"][0] | undefined => {
  return staff.staffItems.find(item => item.staffItemId === staffId);
};

export default getStaff;
