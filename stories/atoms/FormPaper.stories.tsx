import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";

import FormPaper from "@components/atoms/FormPaper";

storiesOf("Atoms", module)
  .addDecorator(withKnobs)
  .add(
    "FormPaper",
    () => <FormPaper>Form Paper</FormPaper>
  );
