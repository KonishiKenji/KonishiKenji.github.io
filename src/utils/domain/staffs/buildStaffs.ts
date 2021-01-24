import { RecordDailyValues } from "@initialize/mgr/IAB/record/daily/initialValues";
import get from "lodash-es/get";

type Staffs = RecordDailyValues["operation"]["workplace_company"][0]["staffs"];
type TempStaff =
  | {
      workplace_company_operation_id: number | undefined;
      staffs_in_facility_id: number | null;
      staff_name: string | null;
      working_hours: number | string | null;
      display_order: number;
    }
  | undefined;

/**
 * 画面表示用の同行職員(３枠)を組み立てる。
 * 日々の記録の初期状態：
 *   APIからの同行職員リストは存在しないので空の３枠を作成。
 * 登録がある場合：
 *   登録時の同行職員の表示位置(display_order)に応じて表示を設定。
 * @param staffs 同行職員リスト
 */
const buildStaffs = (staffs: Staffs): Staffs => {
  // 同行職員３枠を用意
  const tempStaffs: TempStaff[] = [undefined, undefined, undefined];
  const staffSize = staffs.length;
  if (staffSize === 1) {
    const [staff] = staffs;
    tempStaffs[staff.display_order] = staff;
  }
  if (staffSize === 2) {
    const [first, second] = staffs;
    if (first.display_order < second.display_order) {
      // 例: staffs = [ { display_order: 0 }, { display_order: 1 } ]
      tempStaffs[first.display_order] = first;
      tempStaffs[second.display_order] = second;
    } else if (first.display_order === 2) {
      // APIからのstaffsはdisplay_orderでソートされており、両方最後の項目の場合は indexを1, 2にする。
      // 例: staffs = [ { display_order: 2 }, { display_order: 2 } ]
      tempStaffs[1] = first;
      tempStaffs[2] = second;
    } else {
      // display_orderが0または1の同じ表示位置
      // 例: staffs = [ { display_order: 0 }, { display_order: 0 } ]
      const idx = first.display_order;
      tempStaffs[idx] = first;
      tempStaffs[idx + 1] = second;
    }
  }
  if (staffSize >= 3) {
    const [first, second, third] = staffs;
    tempStaffs[0] = first;
    tempStaffs[1] = second;
    tempStaffs[2] = third;
  }
  // 同行職員が存在しなかった時の空データ
  const initStaff = {
    workplace_company_operation_id: 0,
    staffs_in_facility_id: 0,
    staff_name: "",
    working_hours: "",
    display_order: 0
  };
  const sortedStaffs: Staffs = [];
  for (let i = 0; i < 3; i += 1) {
    const staff = tempStaffs[i];
    if (staff) {
      sortedStaffs[i] = staff;
    } else {
      sortedStaffs[i] = initStaff;
    }
  }

  const staffList: Staffs = [];
  for (let i = 0; i < 3; i += 1) {
    const staff = sortedStaffs[i];
    staffList.push({
      workplace_company_operation_id: get(
        staff,
        "workplace_company_operation_id"
      ),
      staffs_in_facility_id: get(staff, "staffs_in_facility_id"),
      staff_name: get(staff, "staff_name") || "",
      working_hours: get(staff, "working_hours") || "",
      display_order: i
    });
  }

  return staffList;
};

export default buildStaffs;
