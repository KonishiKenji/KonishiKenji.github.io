import checkTime from "@validator/rules/checkTime";

describe("validator/rules/checkTime", () => {
  it("入力値が正常", () => {
    // 有効な時刻
    expect(checkTime("00:00")).toBeUndefined();
    expect(checkTime("19:59")).toBeUndefined();
    expect(checkTime("20:00")).toBeUndefined();
    expect(checkTime("23:59")).toBeUndefined();
    // 空文字はチェックから除外される
    expect(checkTime("")).toBeUndefined();
  });
  it("入力値が不正", () => {
    const msg = "00:00の形式で入力してください";
    // 秒数は含まない
    expect(checkTime("00:00:00")).toBe(msg);
    // 形式は正しいが存在しない時刻
    expect(checkTime("24:00")).toBe(msg);
    expect(checkTime("30:00")).toBe(msg);
    expect(checkTime("00:60")).toBe(msg);
    // `:`が付いていない数値テキスト
    expect(checkTime("1000")).toBe(msg);
    // `:`は付いているが桁数が違う
    expect(checkTime("100:00")).toBe(msg);
    expect(checkTime("1:00")).toBe(msg);
    expect(checkTime("10:000")).toBe(msg);
    expect(checkTime("10:0")).toBe(msg);
  });
});
