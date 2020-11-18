import getSnapOrRealName from "@utils/domain/mgr/getSnapOrRealName";

describe("getSnapOrRealName", () => {
  it("スナップされた名前 (snapshot_name) が抽出される", () => {
    const expected = "職員A";
    const defaultValue = "-";
    const src = { snapshot_name: "職員A", name: "職員A'" };
    const actual = getSnapOrRealName(src, defaultValue);
    expect(actual).toEqual(expected);
  });
  it("スナップがない場合、名前 (name) が抽出される", () => {
    const expected = "職員A'";
    const defaultValue = "-";
    const src = { snapshot_name: "", name: "職員A'" };
    const actual = getSnapOrRealName(src, defaultValue);
    expect(actual).toEqual(expected);
  });
  it("スナップ情報が非オブジェクトの場合、デフォルト値を返す", () => {
    const expected = "-";
    const defaultValue = "-";
    const src = 123;
    const actual = getSnapOrRealName(src, defaultValue);
    expect(actual).toEqual(expected);
  });
});
