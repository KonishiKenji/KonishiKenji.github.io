import { FieldItem } from "@interfaces/ui/form";
import { GetSupportPlanOnceResponse } from "@api/requests/supportPlan/A/getSupportPlanOnce";
import generateMergedStaffOptions from "@utils/domain/staffs/generateMergedStaffOptions";

describe("generateMergedStaffOptions", () => {
  it("職員一覧と職員一覧 更新・削除 スナップショットがマージされる", () => {
    const expected: FieldItem[] = [
      { label: "職員A", value: 1, deleteFlg: false },
      { label: "職員B", value: 2, deleteFlg: false },
      { label: "職員C", value: 3, deleteFlg: false },
      { label: "職員D", value: 1, deleteFlg: true },
      { label: "職員E", value: 4, deleteFlg: true }
    ];
    const baseOptions: FieldItem[] = [
      { label: "職員A", value: 1 },
      { label: "職員B", value: 2 },
      { label: "職員C", value: 3 }
    ];
    const historyOptions: GetSupportPlanOnceResponse["data"]["participant_history"] = [
      { name: "職員D", id: 1, facility_id: 1, role: "" }, // 職員一覧で「更新」されたスナップ 職員D -> 職員A
      { name: "職員E", id: 4, facility_id: 1, role: "" }, // 職員一覧で「削除」されたスナップ
      { name: "職員C", id: 3, facility_id: 1, role: "" } // イレギュラーケース ( 重複データ )
    ];
    const actual: FieldItem[] = generateMergedStaffOptions(
      baseOptions,
      historyOptions
    );
    expect(actual).toEqual(expected);
  });
  it("職員一覧と職員一覧 更新・削除 スナップショットがマージされる ( value 値に string が混在したケース)", () => {
    const expected: FieldItem[] = [
      { label: "職員A", value: 1, deleteFlg: false },
      { label: "職員B", value: 2, deleteFlg: false },
      { label: "職員C", value: 3, deleteFlg: false },
      { label: "職員D", value: 1, deleteFlg: true },
      { label: "職員E", value: 4, deleteFlg: true }
    ];
    const baseOptions: FieldItem[] = [
      { label: "職員A", value: "1" },
      { label: "職員B", value: "2" },
      { label: "職員C", value: "3" }
    ];
    const historyOptions: GetSupportPlanOnceResponse["data"]["participant_history"] = [
      { name: "職員D", id: 1, facility_id: 1, role: "" }, // 職員一覧で「更新」されたスナップ 職員D -> 職員A
      { name: "職員E", id: 4, facility_id: 1, role: "" }, // 職員一覧で「削除」されたスナップ
      { name: "職員C", id: 3, facility_id: 1, role: "" } // イレギュラーケース ( 重複データ )
    ];
    const actual: FieldItem[] = generateMergedStaffOptions(
      baseOptions,
      historyOptions
    );
    expect(actual).toEqual(expected);
  });
  it("職員一覧が空の場合、スナップの内容が整形して返される", () => {
    const expected: FieldItem[] = [
      { label: "職員D", value: 1, deleteFlg: true },
      { label: "職員E", value: 4, deleteFlg: true },
      { label: "職員C", value: 3, deleteFlg: true }
    ];
    const baseOptions: FieldItem[] = [];
    const historyOptions: GetSupportPlanOnceResponse["data"]["participant_history"] = [
      { name: "職員D", id: 1, facility_id: 1, role: "" },
      { name: "職員E", id: 4, facility_id: 1, role: "" },
      { name: "職員C", id: 3, facility_id: 1, role: "" }
    ];
    const actual: FieldItem[] = generateMergedStaffOptions(
      baseOptions,
      historyOptions
    );
    expect(actual).toEqual(expected);
  });
  it("スナップが空の場合、職員一覧をそのまま返す", () => {
    const expected: FieldItem[] = [
      { label: "職員A", value: 1, deleteFlg: false },
      { label: "職員B", value: 2, deleteFlg: false },
      { label: "職員C", value: 3, deleteFlg: false }
    ];
    const baseOptions: FieldItem[] = [
      { label: "職員A", value: 1 },
      { label: "職員B", value: 2 },
      { label: "職員C", value: 3 }
    ];
    const historyOptions: GetSupportPlanOnceResponse["data"]["participant_history"] = [];
    const actual: FieldItem[] = generateMergedStaffOptions(
      baseOptions,
      historyOptions
    );
    expect(actual).toEqual(expected);
  });
});
