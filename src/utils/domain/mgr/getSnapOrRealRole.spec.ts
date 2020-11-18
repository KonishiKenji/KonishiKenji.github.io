import getSnapOrRealRole from "@utils/domain/mgr/getSnapOrRealRole";

describe("getSnapOrRealRole", () => {
  it("スナップされた役職 (snapshot_role) が抽出される", () => {
    const expected = "役職A";
    const defaultValue = "-";
    const src = { snapshot_role: "役職A", role: "役職A'" };
    const actual = getSnapOrRealRole(src, defaultValue);
    expect(actual).toEqual(expected);
  });
  it("スナップがない場合、役職 (role) が抽出される", () => {
    const expected = "役職A'";
    const defaultValue = "-";
    const src = { snapshot_role: "", role: "役職A'" };
    const actual = getSnapOrRealRole(src, defaultValue);
    expect(actual).toEqual(expected);
  });
  it("スナップ情報が非オブジェクトの場合、デフォルト値を返す", () => {
    const expected = "-";
    const defaultValue = "-";
    const src = 123;
    const actual = getSnapOrRealRole(src, defaultValue);
    expect(actual).toEqual(expected);
  });
});
