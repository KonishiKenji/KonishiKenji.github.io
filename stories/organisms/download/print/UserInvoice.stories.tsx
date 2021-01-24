import { storiesOf } from "@storybook/react";
import * as React from "react";

import UserInvoice from "@components/organisms/download/print/UserInvoice";
import { InvoiceUserSeikyuData } from "@stores/domain/invoice/type";

const stories = storiesOf("印刷プレビュー", module);

const results = [
  {
    date: {
      start_of_month: "2018-09-01",
      end_of_month: "2018-09-30"
    },
    facility: {
      type_service: "就労継続支援B型",
      name: "株式会社knowbe　B",
      gov_business_owner: "株式会社ノウビー",
      unit_per_yen: "11.14"
    },
    users: [
      {
        name_sei: "赤木",
        name_mei: "萌花",
        recipient_number: "0000012345",
        service_contents: [
          {
            service_name: "就継ＢⅠ２７",
            units: "500",
            times: "1",
            service_unit: "500"
          },
          {
            service_name: "就継Ｂ施設外就労加算",
            units: "100",
            times: "1",
            service_unit: "100"
          }
        ],
        billing_amount: "0",
        subtotal_unit: "600",
        subtotal_yen: "6,684",
        payment_cost: "6,684",
        grant_amount: "0",
        user_cost_amount: "0"
      }
    ]
  },
  {
    date: {
      start_of_month: "2018-09-01",
      end_of_month: "2018-09-30"
    },
    facility: {
      type_service: "就労継続支援A型",
      name: "株式会社knowbe　A",
      gov_business_owner: "株式会社ノウビ−",
      unit_per_yen: "11.14"
    },
    users: []
  }
] as InvoiceUserSeikyuData[];

stories.add(
  // UserInvoice
  "ダウンロード履歴 > 請求書",
  () => (
    <UserInvoice key={0} data={results[0]} targetDate={"2019/1/1"} />
  )
);
