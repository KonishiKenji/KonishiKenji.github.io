import omitByNoChanges from "@utils/dataNormalizer/omitByNoChanges";

describe("omitByNoChanges", () => {
  it("プリミティブ値の比較", () => {
    const expected = { b: 2 };
    const after = { a: 1, b: 2, c: 3 };
    const before = { a: 1, b: 1, c: 3 };
    const actual = omitByNoChanges(after, before);
    expect(actual).toEqual(expected);
  });
  it("プリミティブ値配列の比較", () => {
    const expected = { b: [1, 2] };
    const after = { a: 1, b: [1, 2], c: 3, d: [10, 20, 30] };
    const before = { a: 1, b: [1, 2, 3, 4], c: 3, d: [10, 20, 30] };
    const actual = omitByNoChanges(after, before);
    expect(actual).toEqual(expected);
  });
  it("オブジェクトの比較", () => {
    const expected = {
      b: [
        { aa: 111, bb: 222 },
        { aa: 333, bb: 444 }
      ]
    };
    const after = {
      a: 1,
      b: [
        { aa: 111, bb: 222 },
        { aa: 333, bb: 444 }
      ],
      c: 3,
      d: { a: 1, b: 2 }
    };
    const before = { a: 1, b: [{ aa: 111, bb: 222 }], c: 3, d: { a: 1, b: 2 } };
    const actual = omitByNoChanges(after, before);
    expect(actual).toEqual(expected);
  });
});
