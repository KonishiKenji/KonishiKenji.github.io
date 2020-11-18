import { summary, summaryDetail } from "@utils/domain/workRecords/summary";
import { FacilityType } from "@constants/variables";

import workRecordMock from "./workRecord.mock.json";

test("サマリー一覧取得", () => {
  const results = summary("2020年3月", "利用者", workRecordMock.data.summary, [
    2230
  ]);
  expect(results[0][0]).toBe("利用者名");
  expect(results.length).toBe(2);
});

test("サマリー詳細取得", () => {
  // console.log(workRecordMock.data.details);
  const results = summaryDetail(
    FacilityType.A,
    "2020年3月",
    "顧客",
    workRecordMock.data.details,
    [2230]
  );
  expect(results.length).toBe(6);
  expect(results[0].length).toBe(12);
  expect(results[0][0]).toBe("顧客名");
  expect(results[2][6]).toBe("なし");
  expect(results[3][6]).toBe("あり");
});
