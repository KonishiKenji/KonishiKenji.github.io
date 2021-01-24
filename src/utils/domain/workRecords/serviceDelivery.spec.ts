import {
  serviceDeliverySummary,
  serviceDeliveryDetail
} from "@utils/domain/workRecords/serviceDelivery";
import { FacilityType } from "@constants/variables";

import workRecordMock from "./workRecord.mock.json";

it("サービス提供サマリ集計 A型", () => {
  const results = serviceDeliverySummary(
    FacilityType.A,
    "2020年3月",
    "利用者",
    workRecordMock.data.summary,
    [2056]
  );
  expect(results[0]).toHaveLength(12);
  expect(results[1]).toHaveLength(12);
});

it("サービス提供サマリ集計 移行", () => {
  const results = serviceDeliverySummary(
    FacilityType.IKOU,
    "2020年3月",
    "利用者",
    workRecordMock.data.summary,
    [2056]
  );
  expect(results[0]).toHaveLength(12);
  expect(results[0]).toStrictEqual([
    "利用者名",
    "受給者証番号",
    "対象期間",
    "通所",
    "欠席時対応",
    "訪問",
    "体験利用支援",
    "移行準備支援I",
    "移行準備支援II",
    "欠席（加算なし）",
    "利用日数",
    "食事回数"
  ]);
  expect(results[1]).toHaveLength(12);
});

it("サービス提供詳細集計 A型", () => {
  const results = serviceDeliveryDetail(
    FacilityType.A,
    "2020年3月",
    "利用者",
    workRecordMock.data.details,
    [2056]
  );
  expect(results[0]).toHaveLength(13);
  expect(results[1]).toHaveLength(13);
});

it("サービス提供詳細集計 移行", () => {
  const results = serviceDeliveryDetail(
    FacilityType.IKOU,
    "2020年3月",
    "利用者",
    workRecordMock.data.details,
    [2230]
  );
  expect(results).toHaveLength(6);
  expect(results[0]).toHaveLength(13);
  expect(results[0]).toStrictEqual([
    "利用者名",
    "受給者証番号",
    "対象期間",
    "通所",
    "欠席時対応",
    "訪問",
    "体験利用支援",
    "移行準備支援I",
    "移行準備支援II",
    "欠席（加算なし）",
    "食事提供",
    "休憩合計時間",
    "メモ"
  ]);
  expect(results[1]).toHaveLength(13);
  expect(results[1][2]).toBe("03/05(木)");
});
