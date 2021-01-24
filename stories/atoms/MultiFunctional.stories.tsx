import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, boolean, select, text } from "@storybook/addon-knobs";

import MultiFunctional from "@components/atoms/MultiFunctional";

const facilityTypeService = {
  就労継続支援A型: "A",
  就労継続支援B型: "B",
  就労移行支援: "I",
  共同生活援助: "G",
  生活介護: "SEIKATSUKAIGO",
  就労定着支援: "SHUROTEICHAKU",
  "自立訓練（生活訓練）": "JIRITSUKUNREN_SEIKATSU",
  短期入所: "TANKINYUSHO",
  施設入所支援: "SHISETSUNYUSHO"
};

storiesOf("Atoms", module)
  .addDecorator(withKnobs)
  .add(
    "MultiFunctional",
    () => (
      <MultiFunctional
        hidden={boolean("hidden", false)}
        facility={{
          id: 1,
          type_service: select("種別", facilityTypeService, "A"),
          name: text("施設名", "施設名"),
          gov_facility_number: "1234567890",
          gov_business_owner: "施設長",
          responsible_person: "責任者",
          test_facility_flg: 0
        }}
        multiFacilities={[]}
      />
    )
  );
