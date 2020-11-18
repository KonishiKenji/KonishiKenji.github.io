import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";

import GrayMiddleHeading from "@components/atoms/GrayMiddleHeading";

storiesOf("Atoms", module)
  .addDecorator(withKnobs)
  .add(
    "GrayMiddleHeading",
    () => (
      <GrayMiddleHeading text={text("text", "テキスト内容")} />
    )
  );
