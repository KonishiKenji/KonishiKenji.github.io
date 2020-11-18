import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import RectangleBox from "@components/atoms/RectangleBox";

storiesOf("Atoms", module)
  .addDecorator(withKnobs)
  .add(
    "RectangleBox",
    () => (
      <RectangleBox
        title={text("name", "欠席者数")}
        num={number("num", 5)}
        denom={number("denom", 0)}
        unit={text("unit", "人")}
      />
    )
  );
