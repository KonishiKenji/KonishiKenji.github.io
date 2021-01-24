import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

import LineBreak from "@components/atoms/LineBreak";

storiesOf("Atoms", module)
  .addDecorator(withKnobs)
  .add(
    "LineBreak",
    () => (
      <LineBreak
        text={text("text", "テキスト内容\n改行をしたテキスト")}
        needBlankText={boolean("needBlankText", false)}
      />
    )
  );
