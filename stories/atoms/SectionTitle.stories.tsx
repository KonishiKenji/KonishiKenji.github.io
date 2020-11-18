import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

import SectionTitle from "@components/atoms/SectionTitle";

storiesOf("Atoms", module)
  .addDecorator(withKnobs)
  .add(
    "SectionTitle",
    () => (
      <SectionTitle
        label={text("label", "セクションラベル")}
        subLabel={text("subLabel", "サブラベル")}
        subClassName={text("subClassName", "primary")}
        isTitleNoMargin={boolean("isTitleNoMargin", false)}
      />
    )
  );
