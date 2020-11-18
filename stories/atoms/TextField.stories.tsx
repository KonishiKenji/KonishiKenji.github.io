import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";

import TextField from "@components/atoms/TextField";

storiesOf("Atoms", module)
  .addDecorator(withKnobs)
  .add(
    "TextField",
    () => (
      <TextField id="1" value={text("value", "テキストフィールド")} />
    )
  );
