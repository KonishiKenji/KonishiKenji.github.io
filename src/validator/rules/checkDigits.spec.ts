import checkDigits from "@validator/rules/checkDigits";

describe("validator/rules/checkDigits", () => {
  it("入力値が正常", () => {
    // 指定桁通り
    expect(checkDigits("aあ1１", 4)).toBeUndefined();
    // 空文字はチェックから除外される
    expect(checkDigits("", 4)).toBeUndefined();
  });
  it("入力値が不正", () => {
    const msg = "4桁で入力してください";
    // 1文字オーバー
    expect(checkDigits("aあ1１.", 4)).toBe(msg);
    // 1文字不足
    expect(checkDigits("aあ1", 4)).toBe(msg);
  });
});
