import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, boolean } from "@storybook/addon-knobs";

import Loading from "@components/atoms/Loading";

storiesOf("Atoms", module)
  .addDecorator(withKnobs)
  .add(
    "Loading",
    () => <Loading isShown={boolean("isShown", true)} />
  );
