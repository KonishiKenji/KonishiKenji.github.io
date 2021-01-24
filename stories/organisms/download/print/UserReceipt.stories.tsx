import { storiesOf } from "@storybook/react";
import * as React from "react";

import UserReceipt from "@components/organisms/download/print/UserReceipt";
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
        user_cost_amount: "0"
      },
      {
        name_sei: "岩倉",
        name_mei: "花英",
        recipient_number: "1000000003",
        user_cost_amount: "306"
      }
    ]
  }
] as InvoiceUserReceiptData[];

stories.add(
  // UserReceipt
  "ダウンロード履歴 > 領収書",
  () => (
    <UserReceipt key={0} data={results[0]} targetDate="2018年11月1日" />
  )
);
