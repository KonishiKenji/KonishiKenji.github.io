import * as React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, select } from "@storybook/addon-knobs";

import DropDown from "@components/atoms/DropDown";

storiesOf("Atoms", module)
  .addDecorator(withKnobs)
  .add(
    "DropDown",
    () => (
      <div>
        <DropDown
          id="1"
          label={text("label", "ラベル")}
          value={select(
            "オプションのデフォルト値",
            { オプション1: "1", オプション2: "2", オプション3: "3" },
            "1"
          )}
          onChange={action("onChange")}
          onBlur={action("onBlur")}
          options={[
            { label: "オプション1", value: 1 },
            { label: "オプション2", value: 2 },
            { label: "オプション3", value: 3 }
          ]}
        />
      </div>
    )
  );
