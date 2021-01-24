import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";

import LinkButton from "@components/atoms/LinkButton";

storiesOf("Atoms", module)
  .addDecorator(withKnobs)
  .add(
    "LinkButton",
    () => (
      <LinkButton
        to={text("to", "https://knowbe.jp")}
        target={text("target", "blank")}
      >
        リンクボタン
      </LinkButton>
    )
  );
