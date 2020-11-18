import * as React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs";

import Checkbox from "@components/atoms/Checkbox";

storiesOf("Atoms", module)
  .addDecorator(withKnobs)
  .add(
    "Checkbox",
    () => (
      <div>
        <Checkbox
          label="ラベル"
          value="1"
          checked={boolean("checked", true)}
          onChange={action("onChange")}
        />
      </div>
    )
  );
