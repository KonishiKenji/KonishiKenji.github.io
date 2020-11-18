import { storiesOf } from "@storybook/react";
import * as React from "react";

import UserAgencyReceipt from "@components/organisms/download/print/UserAgencyReceipt";
import { InvoiceUserReceiptData } from "@stores/domain/invoice/type";

const stories = storiesOf("印刷プレビュー", module);

const results = [
  {
    date: {
      start_of_month: "2018-06-01",
      end_of_month: "2018-06-30"
    },
    facility: {
      type_service: "就労移行支援",
      name: "knowbe（ノウビー）チーム_テスト用施設I",
      gov_business_owner: "のうびー法人名"
    },
    users: [
      {
        name_sei: "加藤",
        name_mei: "裕次",
        recipient_number: "5555555555",
        payment_cost_amount: "34,238",
        city_name: "立川市"
      },
      {
        name_sei: "岩倉",
        name_mei: "花英",
        recipient_number: "1000000003",
        payment_cost_amount: "2,754",
        city_name: "さいたま市"
      }
    ]
  }
] as InvoiceUserReceiptData[];

stories.add(
  // UserAgencyReceipt
  "ダウンロード履歴 > 代理受領書  ",
  () => (
    <UserAgencyReceipt
      key={0}
      data={results[0]}
      targetDate="2011年11月1日"
      noticeDate="2011年11月2日"
    />
  )
);
