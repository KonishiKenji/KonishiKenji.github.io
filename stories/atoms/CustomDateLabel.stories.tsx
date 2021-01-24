import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

import CustomDateLabel from "@components/atoms/CustomDateLabel";

storiesOf("Atoms", module)
  .addDecorator(withKnobs)
  .add(
    "CustomDateLabel",
    () => (
      <div>
        <CustomDateLabel
          date={text("date", new Date().toString())}
          dateFormat={text("dateFormat", "YYYY-MM-DD")}
          holiday={boolean("holiday", true)}
        />
      </div>
    )
  );
