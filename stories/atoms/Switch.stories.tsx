import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Switch from "@components/atoms/Switch";

storiesOf("Atoms", module)
  .addDecorator(withKnobs)
  .add(
    "Switch",
    () => (
      <Switch
        label={text("label", "スイッチラベル")}
        checked={boolean("checked", false)}
        value={text("value", "1")}
        onChange={action("onChange")}
      />
    )
  );
