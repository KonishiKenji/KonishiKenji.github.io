import makeTotalBreakTimeMinutes from "@utils/domain/report/makeTotalBreakTimeMinutes";

type BreakTimeItem = { start_time: string; end_time: string };

describe("makeTotalBreakTimeMinutes", () => {
  it("case1：正常時_開始と終了時間の範囲内に休憩時間が収まる時", () => {
    const expected = 60;
    const breakTimeItems: BreakTimeItem[] = [
      { start_time: "09:50", end_time: "10:00" },
      { start_time: "10:50", end_time: "11:00" },
      { start_time: "11:50", end_time: "12:00" },
      { start_time: "13:30", end_time: "14:00" }
    ];
    const actual = makeTotalBreakTimeMinutes(
      "09:00",
      "17:00",
      breakTimeItems,
      "1"
    );
    expect(actual).toEqual(expected);
  });
  it("case2：一部休憩時間が対象外の場合", () => {
    const expected = 30;
    const breakTimeItems: BreakTimeItem[] = [
      { start_time: "09:50", end_time: "10:00" },
      { start_time: "10:50", end_time: "11:00" },
      { start_time: "11:50", end_time: "12:00" },
      { start_time: "13:30", end_time: "14:00" }
    ];
    const actual = makeTotalBreakTimeMinutes(
      "00:00",
      "13:00",
      breakTimeItems,
      "1"
    );
    expect(actual).toEqual(expected);
  });
  it("case3：breakTimeItemsが空の場合", () => {
    const expected = 0;
    const breakTimeItems: BreakTimeItem[] = [];
    const actual = makeTotalBreakTimeMinutes(
      "09:00",
      "17:00",
      breakTimeItems,
      "1"
    );
    expect(actual).toEqual(expected);
  });
  it("case4：workStartTime,workEndTimeが異常値の場合 → 休憩時間を計上する", () => {
    const expected = 60;
    const breakTimeItems: BreakTimeItem[] = [
      { start_time: "09:50", end_time: "10:00" },
      { start_time: "10:50", end_time: "11:00" },
      { start_time: "11:50", end_time: "12:00" },
      { start_time: "13:30", end_time: "14:00" }
    ];
    const actual = makeTotalBreakTimeMinutes(
      "test",
      "test",
      breakTimeItems,
      "1"
    );
    expect(actual).toEqual(expected);
  });
  it("case5：breakTimeItems内で重複がある場合", () => {
    const expected = 60;
    const breakTimeItems: BreakTimeItem[] = [
      { start_time: "09:50", end_time: "10:00" },
      { start_time: "09:50", end_time: "10:00" },
      { start_time: "10:50", end_time: "11:00" },
      { start_time: "11:50", end_time: "12:00" },
      { start_time: "13:30", end_time: "14:00" }
    ];
    const actual = makeTotalBreakTimeMinutes(
      "09:00",
      "17:00",
      breakTimeItems,
      "1"
    );
    expect(actual).toEqual(expected);
  });
  it("case6：breakTimeItems内全てが対象外である場合", () => {
    const expected = 0;
    const breakTimeItems: BreakTimeItem[] = [
      { start_time: "08:50", end_time: "09:00" },
      { start_time: "17:50", end_time: "18:00" }
    ];
    const actual = makeTotalBreakTimeMinutes(
      "09:00",
      "17:00",
      breakTimeItems,
      "1"
    );
    expect(actual).toEqual(expected);
  });
  it("case7：unitEngraveが1以外の場合 → 登録できないはずの休憩時間は合計時間に含まない", () => {
    const expected = 30;
    const breakTimeItems: BreakTimeItem[] = [
      { start_time: "09:50", end_time: "10:00" }, // irregular case
      { start_time: "10:50", end_time: "11:00" }, // irregular case
      { start_time: "11:50", end_time: "12:00" }, // irregular case
      { start_time: "13:30", end_time: "14:00" }
    ];
    const actual = makeTotalBreakTimeMinutes(
      "09:00",
      "17:00",
      breakTimeItems,
      "15"
    );
    expect(actual).toEqual(expected);
  });
  it("case8：開始時間：入力、終了時間：未入力の場合 → 休憩時間を計上しない", () => {
    const expected = 0;
    const breakTimeItems: BreakTimeItem[] = [
      { start_time: "09:50", end_time: "10:00" },
      { start_time: "10:50", end_time: "11:00" },
      { start_time: "11:50", end_time: "12:00" },
      { start_time: "13:30", end_time: "14:00" }
    ];
    const actual = makeTotalBreakTimeMinutes("09:00", "", breakTimeItems, "1");
    expect(actual).toEqual(expected);
  });
  it("case9：開始時間：未入力、終了時間：入力の場合 → 登録されている休憩時間の合計を計上する", () => {
    const expected = 60;
    const breakTimeItems: BreakTimeItem[] = [
      { start_time: "09:50", end_time: "10:00" },
      { start_time: "10:50", end_time: "11:00" },
      { start_time: "11:50", end_time: "12:00" },
      { start_time: "13:30", end_time: "14:00" }
    ];
    const actual = makeTotalBreakTimeMinutes("", "17:00", breakTimeItems, "1");
    expect(actual).toEqual(expected);
  });
});
