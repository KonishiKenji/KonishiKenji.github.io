import * as React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";

import SimpleMenu from "@components/atoms/SimpleMenu";

storiesOf("Atoms", module)
  .addDecorator(withKnobs)
  .add(
    "SimpleMenu",
    () => (
      <div style={{ backgroundColor: "#000" }}>
        <SimpleMenu
          label={text("label", "セクションラベル")}
          menuLabel={text("menuLabel", "メニューラベル")}
          menuSelect={action("menuSelect")}
        />
      </div>
    )
  );
