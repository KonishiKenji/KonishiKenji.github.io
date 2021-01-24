import fixDateAndTimeFormat from "@utils/dataNormalizer/fixDateAndTimeFormat";

describe("fixDateAndTimeFormat", () => {
  it("正しく補完されるか", () => {
    const res = "2020/01/01 09:00:00";
    expect(fixDateAndTimeFormat("2020-01-01 09:00:00")).toBe(res);
    expect(fixDateAndTimeFormat("2020-01-01")).toBe(res);
    expect(fixDateAndTimeFormat("2020-01")).toBe(res);
    expect(fixDateAndTimeFormat("20200101")).toBe(res);
    expect(fixDateAndTimeFormat("09:00:00")).toBe(res);
  });
});
