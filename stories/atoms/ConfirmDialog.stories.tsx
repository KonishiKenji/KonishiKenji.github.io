import * as React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

import ConfirmDialog from "@components/atoms/ConfirmDialog";

storiesOf("Atoms", module)
  .addDecorator(withKnobs)
  .add(
    "ConfirmDialog",
    () => (
      <div>
        <ConfirmDialog
          isOpen={boolean("holiday", true)}
          onDelete={action("onDelete")}
          onCancel={action("onCancel")}
          title={text("title", "データ削除")}
          message={text("message", "このデータを削除しますか？")}
        />
      </div>
    )
  );
