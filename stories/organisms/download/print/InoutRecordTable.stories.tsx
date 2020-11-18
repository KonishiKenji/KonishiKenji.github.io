import { storiesOf } from "@storybook/react";
import * as React from "react";

import InoutRecordTable from "@components/organisms/download/print/InoutRecordTable";
import UsagePerformanceTable from "@components/organisms/download/print/UsagePerformanceTable";
import { InvoiceDataResult } from "@stores/domain/invoice/type";

const stories = storiesOf("印刷プレビュー", module);

const results = {
  data: [
    {
      date: {
        year: "2019",
        month: "01"
      },
      facility: {
        officeNo: "0000000011",
        officeName: "株式会社ノウビー",
        kindService: "I"
      },
      users: [
        {
          uifId: 2365,
          recipientNo: "1234567890",
          recipientName: "GH H",
          payment: "就労移行支援　原則の日数",
          dateBeginService: "1981-01-01",
          dateAfter30Days: "1981-01-30",
          cntDaysInitApply: 0,
          cntPickup: 0,
          cntVisit: 0,
          cntFood: 0,
          cntSupportSystem1: 0,
          cntSupportOutOfFacility: 0,
          cntSupportSystem1Total: 0,
          cntSupportOutOfFacilityTotal: 0,
          cntSupportMedical: 0,
          cntTrainCommute: 0,
          cntTrialUsage: 0,
          records: [
            {
              day: 24,
              dayOfWeek: "木",
              serviceStatus: null,
              startTime: "10:00",
              endTime: "05:00",
              memo: "",
              sameCorporationMovementFlg: null,
              additions: {
                isOutbound: false,
                isInbound: false,
                isSuppliedMeal: false,
                supportTime: null,
                supportSystem: null,
                supportOutOfFacility: null,
                supportMedical: null,
                isTrainCommute: false,
                trialUsage: null
              }
            }
          ],
          usage_performances: []
        },
        {
          uifId: 61,
          recipientNo: "1000000100",
          recipientName: "壽德 萌花",
          payment: "就労移行支援　原則の日数",
          dateBeginService: "2017-05-08",
          dateAfter30Days: "2017-06-06",
          cntDaysInitApply: 0,
          cntPickup: 2,
          cntVisit: 0,
          cntFood: 1,
          cntSupportSystem1: 0,
          cntSupportOutOfFacility: 0,
          cntSupportSystem1Total: 1,
          cntSupportOutOfFacilityTotal: 0,
          cntSupportMedical: 0,
          cntTrainCommute: 0,
          cntTrialUsage: 0,
          records: [
            {
              day: 27,
              dayOfWeek: "日",
              serviceStatus: null,
              startTime: "12:22",
              endTime: null,
              memo: null,
              sameCorporationMovementFlg: "0",
              additions: {
                isOutbound: true,
                isInbound: true,
                isSuppliedMeal: true,
                supportTime: null,
                supportSystem: null,
                supportOutOfFacility: null,
                supportMedical: null,
                isTrainCommute: false,
                trialUsage: null
              }
            }
          ],
          usage_performances: [
            {
              id: 1,
              users_in_facility_id: 61,
              target_date: "2019-01-01",
              status_type: 1,
              day: 1,
              day_of_week: "火",
              night_support_type: 1,
              hospitalization_support_type: 1,
              get_home_support_type: 1,
              daytime_support_type: 1,
              medical_support_type: 1,
              life_support_flg: 1,
              remarks: null
            },
            {
              id: 2,
              users_in_facility_id: 61,
              target_date: "2019-01-02",
              status_type: 7,
              day: 2,
              day_of_week: "水",
              night_support_type: 1,
              hospitalization_support_type: 1,
              get_home_support_type: 1,
              daytime_support_type: 1,
              medical_support_type: 1,
              life_support_flg: 1,
              remarks: null
            },
            {
              id: 3,
              users_in_facility_id: 61,
              target_date: "2019-01-03",
              status_type: 8,
              day: 3,
              day_of_week: "木",
              night_support_type: 1,
              hospitalization_support_type: 1,
              get_home_support_type: 1,
              daytime_support_type: 1,
              medical_support_type: 1,
              life_support_flg: 1,
              remarks: null
            },
            {
              id: 4,
              users_in_facility_id: 61,
              target_date: "2019-01-04",
              status_type: 2,
              day: 4,
              day_of_week: "金",
              night_support_type: 0,
              hospitalization_support_type: 1,
              get_home_support_type: 1,
              daytime_support_type: 1,
              medical_support_type: 1,
              life_support_flg: 0,
              remarks: null
            },
            {
              id: 5,
              users_in_facility_id: 61,
              target_date: "2019-01-05",
              status_type: 4,
              day: 5,
              day_of_week: "土",
              night_support_type: 1,
              hospitalization_support_type: 1,
              get_home_support_type: 1,
              daytime_support_type: 1,
              medical_support_type: 1,
              life_support_flg: 1,
              remarks: null
            },
            {
              id: 6,
              users_in_facility_id: 61,
              target_date: "2019-01-06",
              status_type: 3,
              day: 6,
              day_of_week: "日",
              night_support_type: 1,
              hospitalization_support_type: 1,
              get_home_support_type: 0,
              daytime_support_type: 1,
              medical_support_type: 0,
              life_support_flg: 0,
              remarks: null
            },
            {
              id: 7,
              users_in_facility_id: 61,
              target_date: "2019-01-08",
              status_type: 10,
              day: 8,
              day_of_week: "火",
              night_support_type: 1,
              hospitalization_support_type: 1,
              get_home_support_type: 0,
              daytime_support_type: 1,
              medical_support_type: 1,
              life_support_flg: 1,
              remarks: null
            }
          ]
        },
        {
          uifId: 89,
          recipientNo: "1000000128",
          recipientName: "新井 大一",
          payment: "就労移行支援　原則の日数",
          dateBeginService: "2017-12-15",
          dateAfter30Days: "2018-01-13",
          cntDaysInitApply: 0,
          cntPickup: 2,
          cntVisit: 0,
          cntFood: 0,
          cntSupportSystem1: 0,
          cntSupportOutOfFacility: 0,
          cntSupportSystem1Total: 0,
          cntSupportOutOfFacilityTotal: 0,
          cntSupportMedical: 0,
          cntTrainCommute: 0,
          cntTrialUsage: 0,
          records: [
            {
              day: 23,
              dayOfWeek: "水",
              serviceStatus: null,
              startTime: "12:18",
              endTime: null,
              memo: null,
              sameCorporationMovementFlg: null,
              additions: {
                isOutbound: true,
                isInbound: true,
                isSuppliedMeal: false,
                supportTime: null,
                supportSystem: null,
                supportOutOfFacility: null,
                supportMedical: null,
                isTrainCommute: false,
                trialUsage: null
              }
            }
          ],
          usage_performances: []
        },
        {
          uifId: 62,
          recipientNo: "1000000101",
          recipientName: "大沼 孝三",
          payment: "就労移行支援　原則の日数",
          dateBeginService: "2017-11-01",
          dateAfter30Days: "2017-11-30",
          cntDaysInitApply: 0,
          cntPickup: 2,
          cntVisit: 0,
          cntFood: 1,
          cntSupportSystem1: 0,
          cntSupportOutOfFacility: 0,
          cntSupportSystem1Total: 0,
          cntSupportOutOfFacilityTotal: 0,
          cntSupportMedical: 0,
          cntTrainCommute: 0,
          cntTrialUsage: 0,
          records: [
            {
              day: 23,
              dayOfWeek: "水",
              serviceStatus: null,
              startTime: "12:22",
              endTime: null,
              memo: null,
              sameCorporationMovementFlg: null,
              additions: {
                isOutbound: true,
                isInbound: true,
                isSuppliedMeal: true,
                supportTime: null,
                supportSystem: null,
                supportOutOfFacility: null,
                supportMedical: null,
                isTrainCommute: false,
                trialUsage: null
              }
            }
          ],
          usage_performances: []
        }
      ]
    }
  ]
} as InvoiceDataResult;

stories.add(
  // InoutRecordTable
  "移行/A/Bの実績記録票",
  () => (
    <InoutRecordTable key={1} invoiceData={results.data[0]} />
  )
);

stories.add(
  // UsagePerformanceTable
  "共同生活援助サービス提供実績記録票",
  () => (
    <UsagePerformanceTable key={2} invoiceData={results.data[0]} />
  )
);
