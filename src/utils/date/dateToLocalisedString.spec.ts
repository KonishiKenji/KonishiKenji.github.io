import dateToLocalisedString from "@utils/date/dateToLocalisedString";

describe("dateToLocalisedString", () => {
  it("変換が正常に行えるか", () => {
    const format = "YYYY年MM月DD日";
    const res = "2020年01月01日";
    expect(dateToLocalisedString("2020-01-01", format)).toBe(res);
    expect(dateToLocalisedString("2020-01-01 00:00:00", format)).toBe(res);
    expect(dateToLocalisedString("2020-01", format)).toBe(res);
    expect(dateToLocalisedString("20200101", format)).toBe(res);
    expect(dateToLocalisedString("2020/01/01", format)).toBe(res);
    expect(dateToLocalisedString(new Date(2020, 0, 1), format)).toBe(res);
    expect(dateToLocalisedString(1577836800900, format)).toBe(res);
  });
});
