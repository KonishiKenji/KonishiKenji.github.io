import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import RadioButtons, {
  RadioItemInterface
} from "@components/atoms/RadioButtons";

const radioItems: RadioItemInterface[] = [
  { label: "ラジオ1", value: "1" },
  { label: "ラジオ2", value: "2" },
  { label: "ラジオ3", value: "3" }
];

storiesOf("Atoms", module)
  .addDecorator(withKnobs)
  .add(
    "RadioButtons",
    () => (
      <RadioButtons
        name={text("name", "Radio Text")}
        label={text("label", "ラベル")}
        value={select("選択肢", { 1: "1", 2: "2", 3: "3" }, "1")}
        onChange={action("onChange")}
        radioItems={radioItems}
      />
    )
  );
