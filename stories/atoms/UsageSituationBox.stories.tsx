import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";

import UsageSituationBox from "@components/atoms/UsageSituationBox";

storiesOf("Atoms", module)
  .addDecorator(withKnobs)
  .add(
    "UsageSituationBox",
    () => (
      <div>
        <p>
          <h2>normal</h2>
          <UsageSituationBox
            label={text("label", "通所者数")}
            unit={text("unit", "人")}
            value={text("value", "20")}
            size="normal"
          />
        </p>
        <p>
          <h2>small</h2>
          <UsageSituationBox
            label={text("label", "通所者数")}
            unit={text("unit", "人")}
            value={text("value", "20")}
            size="small"
          />
        </p>
      </div>
    )
  );
