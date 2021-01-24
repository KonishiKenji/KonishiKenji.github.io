import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";

import GrayLabel from "@components/atoms/GrayLabel";

storiesOf("Atoms", module)
  .addDecorator(withKnobs)
  .add(
    "GrayLabel",
    () => <GrayLabel label={text("label", "ラベル")} />
  );
