import checkCharacterLength from "@validator/rules/checkCharacterLength";

describe("validator/rules/checkCharacterLength", () => {
  it("入力値が正常", () => {
    // 上限ピッタリ
    expect(checkCharacterLength("aあ1１", 4)).toBeUndefined();
    // 空文字はチェックから除外される
    expect(checkCharacterLength("", 4)).toBeUndefined();
  });
  it("入力値が不正", () => {
    const msg = "全半角4文字以内で入力してください";
    // 上限を1文字オーバー
    expect(checkCharacterLength("aあ1１.", 4)).toBe(msg);
  });
});
