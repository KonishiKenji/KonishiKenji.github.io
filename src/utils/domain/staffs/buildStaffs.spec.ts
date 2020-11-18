import { RecordDailyValues } from "@initialize/mgr/IAB/record/daily/initialValues";
import buildStaffs from "@utils/domain/staffs/buildStaffs";

describe("buildStaffs", () => {
  // 同行職員が存在しなかった時の空データ
  const initStaff = {
    display_order: 0,
    staff_name: "",
    staffs_in_facility_id: 0,
    working_hours: "",
    workplace_company_operation_id: 0
  };
  const staff1 = {
    display_order: 0,
    staff_name: "test01",
    staffs_in_facility_id: 1,
    working_hours: "1.0",
    workplace_company_operation_id: 1
  };
  const staff2 = {
    display_order: 0,
    staff_name: "test02",
    staffs_in_facility_id: 2,
    working_hours: "2.0",
    workplace_company_operation_id: 2
  };
  const staff3 = {
    display_order: 0,
    staff_name: "test03",
    staffs_in_facility_id: 3,
    working_hours: "3.0",
    workplace_company_operation_id: 3
  };

  it("case: 同行職員が1人", () => {
    const staffs = [staff1];
    const expected: RecordDailyValues["operation"]["workplace_company"][0]["staffs"] = [
      staff1,
      {
        ...initStaff,
        display_order: 1
      },
      {
        ...initStaff,
        display_order: 2
      }
    ];
    const actual = buildStaffs(staffs);
    expect(actual).toEqual(expected);
  });
  it("case: 同行職員が2人", () => {
    const staffs = [staff1, staff2];
    const expected: RecordDailyValues["operation"]["workplace_company"][0]["staffs"] = [
      staff1,
      {
        ...staff2,
        display_order: 1
      },
      {
        ...initStaff,
        display_order: 2
      }
    ];
    const actual = buildStaffs(staffs);
    expect(actual).toEqual(expected);
  });
  it("case: 同行職員が3人", () => {
    const staffs = [staff1, staff2, staff3];
    const expected: RecordDailyValues["operation"]["workplace_company"][0]["staffs"] = [
      staff1,
      {
        ...staff2,
        display_order: 1
      },
      {
        ...staff3,
        display_order: 2
      }
    ];
    const actual = buildStaffs(staffs);
    expect(actual).toEqual(expected);
  });
  it("case: 同行職員が4人(想定外のデータが登録されている場合)", () => {
    const staff4 = {
      ...staff1,
      display_order: 3
    };
    const staffs = [staff1, staff2, staff3, staff4];
    const expected: RecordDailyValues["operation"]["workplace_company"][0]["staffs"] = [
      staff1,
      {
        ...staff2,
        display_order: 1
      },
      {
        ...staff3,
        display_order: 2
      }
    ];
    const actual = buildStaffs(staffs);
    expect(actual).toEqual(expected);
  });
  it("case: 同行職員が0人(存在しない場合)", () => {
    const staffs: RecordDailyValues["operation"]["workplace_company"][0]["staffs"] = [];
    const expected: RecordDailyValues["operation"]["workplace_company"][0]["staffs"] = [
      initStaff,
      {
        ...initStaff,
        display_order: 1
      },
      {
        ...initStaff,
        display_order: 2
      }
    ];
    const actual = buildStaffs(staffs);
    expect(actual).toEqual(expected);
  });
});
