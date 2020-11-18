import { formatHourAndMinutes } from "@utils/domain/workRecords/date";

describe("formatHourAndMinutes", () => {
  it("case:yyyy-MM-DD hh:mm:ss", () => {
    expect(formatHourAndMinutes("2020-01-01 12:30:00")).toBe("12:30");
  });
  it("case:hh:mm:ss", () => {
    expect(formatHourAndMinutes("12:30:00")).toBe("12:30");
  });
  it("case:hh:mm", () => {
    expect(formatHourAndMinutes("12:30")).toBe("12:30");
  });
  it("case:yyyy-MM-DD", () => {
    // 時刻が渡されないため、時:分が"undefined"で結果が返ってくる（年月日はそのままの形式で返ってくる）
    expect(formatHourAndMinutes("2020-01-01")).toBe("2020-01-01:undefined");
  });
  it("case:空文字列", () => {
    // 時刻が渡されないため、時:分が"undefined"で結果が返ってくる
    expect(formatHourAndMinutes("")).toBe(":undefined");
  });
});
